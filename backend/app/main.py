from fastapi import (
    FastAPI,
    Depends,
    HTTPException,
    status,
    BackgroundTasks,
    File,
    UploadFile,
)
from sqlalchemy.orm import Session
from . import models, schemas, crud, database
import http.client
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from datetime import datetime, timedelta
import random
import os
import json
from dotenv import load_dotenv
from sqlalchemy.orm import sessionmaker
from typing import List
from .trading_logic import start_monitoring as start_trading_monitoring
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

INFOBIP_API_KEY = os.getenv("INFOBIP_API_KEY")
INFOBIP_BASE_URL = os.getenv("INFOBIP_BASE_URL")

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=database.engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes(15))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def get_current_user(
    db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        phone_number: str = payload.get("sub")
        if phone_number is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = crud.get_user_by_phone(db, phone_number=phone_number)
    if user is None:
        raise credentials_exception
    return user


def get_current_admin_user(
    db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)
):
    user = get_current_user(db, token)
    if not user.is_admin:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    return user


def send_otp_via_whatsapp(phone_number: str, otp: str):
    conn = http.client.HTTPSConnection("api.infobip.com")
    payload = json.dumps(
        {
            "messages": [
                {
                    "from": "447860099299",  # Whatsapp
                    "to": phone_number,
                    "messageId": "40fbbce4-151b-432f-85ec-9d6c866acef8",
                    "content": {
                        "templateName": "test_whatsapp_template_en",
                        "templateData": {"body": {"placeholders": [otp]}},
                        "text": f"Your OTP code is {otp}",
                        "language": "en",
                    },
                }
            ]
        }
    )
    headers = {
        "Authorization": f"App {INFOBIP_API_KEY}",
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
    conn.request("POST", "/whatsapp/1/message/template", payload, headers)
    res = conn.getresponse()
    data = res.read()


@app.post("/register/", response_model=schemas.User)
def register_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_phone(db, phone_number=user.phone_number)
    if db_user:
        raise HTTPException(status_code=400, detail="Phone number already registered")
    otp = str(random.randint(100000, 999999))
    new_user = crud.create_user(db=db, user=user)
    crud.update_user_otp(db, new_user, otp)
    send_otp_via_whatsapp(user.phone_number, otp)
    return new_user


@app.post("/verify-otp/")
def verify_otp(otp_data: schemas.OTP, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_phone(db, phone_number=otp_data.phone_number)
    if not db_user or db_user.otp != otp_data.otp:
        raise HTTPException(status_code=400, detail="Invalid phone number or OTP")
    crud.activate_user(db, db_user)
    return {"message": "Phone number verified"}


@app.post("/login/")
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_phone(db, phone_number=user.phone_number)
    if not db_user or not db_user.is_active or db_user.otp != user.otp:
        raise HTTPException(status_code=400, detail="Invalid phone number or OTP")
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": db_user.phone_number}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "Bearer"}


@app.post("/send-otp/")
def send_otp(otp_data: schemas.SendOTP, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_phone(db, phone_number=otp_data.phone_number)
    if not db_user:
        raise HTTPException(status_code=400, detail="Phone number not registered")
    otp = str(random.randint(100000, 999999))
    crud.update_user_otp(db, db_user, otp)
    send_otp_via_whatsapp(otp_data.phone_number, otp)
    return {"message": "OTP sent"}


@app.post("/deposit/", response_model=schemas.Deposit)
def create_deposit(
    deposit: schemas.DepositCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    if deposit.currency == "USD":
        current_user.usd_balance += deposit.amount
    elif deposit.currency == "BTC":
        current_user.btc_balance += deposit.amount
    elif deposit.currency == "XRP":
        current_user.xrp_balance += deposit.amount
    else:
        raise HTTPException(status_code=400, detail="Unsupported currency")

    db.commit()
    return crud.create_deposit(db=db, deposit=deposit, user_id=current_user.id)


@app.post("/withdraw/", response_model=schemas.Withdrawal)
def create_withdrawal(
    withdrawal: schemas.WithdrawalCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    if withdrawal.currency == "USD":
        if current_user.usd_balance < withdrawal.amount:
            raise HTTPException(status_code=400, detail="Insufficient balance")
        current_user.usd_balance -= withdrawal.amount
    elif withdrawal.currency == "BTC":
        if current_user.btc_balance < withdrawal.amount:
            raise HTTPException(status_code=400, detail="Insufficient balance")
        current_user.btc_balance -= withdrawal.amount
    elif withdrawal.currency == "XRP":
        if current_user.xrp_balance < withdrawal.amount:
            raise HTTPException(status_code=400, detail="Insufficient balance")
        current_user.xrp_balance -= withdrawal.amount
    else:
        raise HTTPException(status_code=400, detail="Unsupported currency")

    db.commit()
    return crud.create_withdrawal(db=db, withdrawal=withdrawal, user_id=current_user.id)


@app.post("/set-buy-price/", response_model=schemas.Price)
def set_buy_price(
    price: schemas.PriceCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    return crud.set_buy_price(db=db, price=price, user_id=current_user.id)


@app.post("/set-sell-price/", response_model=schemas.Price)
def set_sell_price(
    price: schemas.PriceCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    return crud.set_sell_price(db=db, price=price, user_id=current_user.id)


@app.get("/current-prices/", response_model=List[schemas.CurrentPrice])
def get_current_prices(db: Session = Depends(get_db)):
    return crud.get_current_market_prices(db)


@app.get("/user-deposit/", response_model=schemas.UserDeposit)
def get_user_deposit(current_user: models.User = Depends(get_current_user)):
    return {"usd_balance": current_user.usd_balance}


@app.get("/admin/users/", response_model=List[schemas.User])
def get_all_users(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_admin_user),
):
    return crud.get_all_users(db)


@app.get("/admin/deposits/", response_model=List[schemas.Deposit])
def get_all_deposits(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_admin_user),
):
    return crud.get_all_deposits(db)


@app.get("/admin/withdrawals/", response_model=List[schemas.Withdrawal])
def get_all_withdrawals(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_admin_user),
):
    return crud.get_all_withdrawals(db)


@app.get("/user/{user_id}", response_model=schemas.User)
def get_user_by_id(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    user = crud.get_user(db, user_id=user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@app.put("/user/{user_id}", response_model=schemas.User)
def update_user(
    user_id: int,
    user_update: schemas.UserUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    user = crud.get_user(db, user_id=user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    if user.id != current_user.id and not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    updated_user = crud.update_user(db, user, user_update)
    return updated_user


@app.post("/user/{user_id}/avatar", response_model=schemas.User)
def upload_avatar(
    user_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    user = crud.get_user(db, user_id=user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    if user.id != current_user.id and not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Not enough permissions")

    file_location = f"avatars/{user_id}_{file.filename}"
    with open(file_location, "wb") as f:
        f.write(file.file.read())

    user_update = schemas.UserUpdate(
        phone_number=user.phone_number,
        name=user.name,
        username=user.username,
        location=user.location,
        avatar=file_location,
    )
    updated_user = crud.update_user(db, user, user_update)
    return updated_user


@app.get("/user/{user_id}/transactions", response_model=List[schemas.Transaction])
def get_user_transactions(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    user = crud.get_user(db, user_id=user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    if user.id != current_user.id and not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    return crud.get_transactions_by_user(db, user_id)


@app.on_event("startup")
def on_startup():
    start_trading_monitoring()
