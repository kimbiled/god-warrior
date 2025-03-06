from sqlalchemy.orm import Session
from . import models, schemas


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_phone(db: Session, phone_number: str):
    return (
        db.query(models.User).filter(models.User.phone_number == phone_number).first()
    )


def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(
        phone_number=user.phone_number,
        name=user.name,
        username=user.username,
        location=user.location,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def update_user(db: Session, db_user: models.User, user_update: schemas.UserUpdate):
    db_user.name = user_update.name
    db_user.username = user_update.username
    db_user.location = user_update.location
    if user_update.avatar:
        db_user.avatar = user_update.avatar
    db.commit()
    db.refresh(db_user)
    return db_user


def update_user_otp(db: Session, db_user: models.User, otp: str):
    db_user.otp = otp
    db.commit()
    db.refresh(db_user)
    return db_user


def activate_user(db: Session, db_user: models.User):
    db_user.is_active = True
    db.commit()
    db.refresh(db_user)
    return db_user


def get_all_users(db: Session):
    return db.query(models.User).all()


def get_all_deposits(db: Session):
    return db.query(models.Deposit).all()


def get_all_withdrawals(db: Session):
    return db.query(models.Withdrawal).all()


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


def create_withdrawal(db: Session, withdrawal: schemas.WithdrawalCreate, user_id: int):
    db_withdrawal = models.Withdrawal(**withdrawal.dict(), user_id=user_id)
    db.add(db_withdrawal)
    db.commit()
    db.refresh(db_withdrawal)
    return db_withdrawal


def set_buy_price(db: Session, price: schemas.PriceCreate, user_id: int):
    db_price = models.Price(**price.dict(), user_id=user_id, type="buy")
    db.add(db_price)
    db.commit()
    db.refresh(db_price)
    return db_price


def set_sell_price(db: Session, price: schemas.PriceCreate, user_id: int):
    db_price = models.Price(**price.dict(), user_id=user_id, type="sell")
    db.add(db_price)
    db.commit()
    db.refresh(db_price)
    return db_price


def get_buy_orders(db: Session, user_id: int):
    return (
        db.query(models.Price)
        .filter(models.Price.user_id == user_id, models.Price.type == "buy")
        .all()
    )


def get_sell_orders(db: Session, user_id: int):
    return (
        db.query(models.Price)
        .filter(models.Price.user_id == user_id, models.Price.type == "sell")
        .all()
    )


def get_current_market_prices(db: Session):
    return db.query(models.CurrentPrice).all()


def update_current_market_price(db: Session, currency: str, price: float):
    db_price = (
        db.query(models.CurrentPrice)
        .filter(models.CurrentPrice.currency == currency)
        .first()
    )
    if db_price:
        db_price.price = price
    else:
        db_price = models.CurrentPrice(currency=currency, price=price)
        db.add(db_price)
    db.commit()
    db.refresh(db_price)
    return db_price


def execute_buy_order(db: Session, order: models.Price, user: models.User):
    # Логика выполнения покупки
    pass


def execute_sell_order(db: Session, order: models.Price, user: models.User):
    # Логика выполнения продажи
    pass
