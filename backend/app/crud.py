from sqlalchemy.orm import Session
from . import models, schemas
from fastapi import HTTPException, status
from datetime import datetime


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_phone(db: Session, phone_number: str):
    return (
        db.query(models.User).filter(models.User.phone_number == phone_number).first()
    )


def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()


def create_user(db: Session, user: schemas.UserCreate):
    db_user_by_phone = get_user_by_phone(db, user.phone_number)
    if db_user_by_phone:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Phone number already registered",
        )

    db_user = models.User(
        phone_number=user.phone_number,
        name=user.name,
        location=user.location,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    db_user.username = f"user{db_user.id}"
    db.commit()
    db.refresh(db_user)

    return db_user


def update_user(db: Session, db_user: models.User, user_update: schemas.UserUpdate):
    db_user.phone_number = user_update.phone_number
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


def get_deposits_by_user(db: Session, user_id: int):
    return db.query(models.Deposit).filter(models.Deposit.user_id == user_id).all()


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


def create_transaction(
    db: Session, transaction: schemas.TransactionCreate, user_id: int
):
    db_transaction = models.Transaction(**transaction.dict(), user_id=user_id)
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction


def get_transactions_by_user(db: Session, user_id: int):
    return (
        db.query(models.Transaction).filter(models.Transaction.user_id == user_id).all()
    )


def create_daily_balance(db: Session, user_id: int):
    user = get_user(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    daily_balance = models.DailyBalance(
        user_id=user_id,
        usd_balance=user.usd_balance,
        btc_balance=user.btc_balance,
        xrp_balance=user.xrp_balance,
    )
    db.add(daily_balance)
    db.commit()
    db.refresh(daily_balance)
    return daily_balance


def get_daily_balance(db: Session, user_id: int, date: datetime):
    return (
        db.query(models.DailyBalance)
        .filter(
            models.DailyBalance.user_id == user_id, models.DailyBalance.date == date
        )
        .first()
    )


def calculate_daily_earnings(db: Session, user_id: int):
    user = get_user(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    current_prices = get_current_market_prices(db)
    btc_price = next(
        (price.price for price in current_prices if price.currency == "BTC"), 0
    )
    xrp_price = next(
        (price.price for price in current_prices if price.currency == "XRP"), 0
    )

    start_of_day = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)
    daily_balance = get_daily_balance(db, user_id, start_of_day)
    if not daily_balance:
        daily_balance = create_daily_balance(db, user_id)

    current_balance_usd = (
        (user.btc_balance * btc_price)
        + (user.xrp_balance * xrp_price)
        + user.usd_balance
    )
    start_balance_usd = (
        (daily_balance.btc_balance * btc_price)
        + (daily_balance.xrp_balance * xrp_price)
        + daily_balance.usd_balance
    )

    daily_earnings = current_balance_usd - start_balance_usd

    return daily_earnings


def delete_user(db: Session, user_id: int):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if user:
        db.delete(user)
        db.commit()
    else:
        raise HTTPException(status_code=404, detail="User not found")
