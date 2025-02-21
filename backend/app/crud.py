from sqlalchemy.orm import Session
from . import models, schemas


def get_user_by_phone(db: Session, phone_number: str):
    return (
        db.query(models.User).filter(models.User.phone_number == phone_number).first()
    )


def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(phone_number=user.phone_number, is_active=False)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def update_user_otp(db: Session, user: models.User, otp: str):
    user.otp = otp
    db.commit()
    db.refresh(user)
    return user


def activate_user(db: Session, user: models.User):
    user.is_active = True
    db.commit()
    db.refresh(user)
    return user


def create_deposit(db: Session, deposit: schemas.DepositCreate, user_id: int):
    db_deposit = models.Deposit(**deposit.dict(), user_id=user_id)
    db.add(db_deposit)
    db.commit()
    db.refresh(db_deposit)
    return db_deposit


def get_deposit_by_wallet_address(db: Session, wallet_address: str):
    return (
        db.query(models.Deposit)
        .filter(models.Deposit.wallet_address == wallet_address)
        .first()
    )

def create_price(db: Session, price: schemas.PriceCreate, user_id: int):
    db_price = models.Price(**price.dict(), user_id=user_id)
    db.add(db_price)
    db.commit()
    db.refresh(db_price)
    return db_price

def get_prices_by_user(db: Session, user_id: int):
    return db.query(models.Price).filter(models.Price.user_id == user_id).all()
