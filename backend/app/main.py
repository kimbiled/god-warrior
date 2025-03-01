from fastapi import FastAPI, Depends, HTTPException, status
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
from .blockchain_monitor import start_monitoring as start_blockchain_monitoring

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
        expire = datetime.utcnow() + timedelta(minutes=15)
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
    return {"access_token": access_token, "token_type": "bearer"}


@app.post("/send-otp/")
def send_otp(phone_number: str, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_phone(db, phone_number=phone_number)
    if not db_user:
        raise HTTPException(status_code=400, detail="Phone number not registered")
    otp = str(random.randint(100000, 999999))
    crud.update_user_otp(db, db_user, otp)
    send_otp_via_whatsapp(phone_number, otp)
    return {"message": "OTP sent"}


@app.post("/deposit/", response_model=schemas.Deposit)
def create_deposit(
    deposit: schemas.DepositCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    db_deposit = crud.get_deposit_by_wallet_address(
        db, wallet_address=deposit.wallet_address
    )
    if db_deposit:
        raise HTTPException(status_code=400, detail="Wallet address already used")
    return crud.create_deposit(db=db, deposit=deposit, user_id=current_user.id)


@app.post("/prices/", response_model=schemas.Price)
def create_price(
    price: schemas.PriceCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    return crud.create_price(db=db, price=price, user_id=current_user.id)


@app.get("/prices/", response_model=List[schemas.Price])
def read_prices(
    db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)
):
    prices = crud.get_prices_by_user(db, user_id=current_user.id)
    return prices


@app.post("/withdraw/", response_model=schemas.Withdrawal)
def create_withdrawal(
    withdrawal: schemas.WithdrawalCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    if current_user.usd_balance < withdrawal.amount:
        raise HTTPException(status_code=400, detail="Insufficient balance")
    return crud.create_withdrawal(db=db, withdrawal=withdrawal, user_id=current_user.id)


@app.on_event("startup")
def on_startup():
    start_trading_monitoring()
    start_blockchain_monitoring()
