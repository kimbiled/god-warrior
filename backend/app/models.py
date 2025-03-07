from sqlalchemy import Column, Integer, String, Boolean, Float, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    phone_number = Column(String, unique=True, index=True)
    otp = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    is_admin = Column(Boolean, default=False)
    name = Column(String, nullable=True)
    username = Column(String, unique=True, index=True, nullable=True)
    location = Column(String, nullable=True)
    avatar = Column(String, nullable=True, default="default.jpg")
    xrp_balance = Column(Float, default=0.0)
    btc_balance = Column(Float, default=0.0)
    usd_balance = Column(Float, default=0.0)
    deposits = relationship("Deposit", back_populates="user")
    prices = relationship("Price", back_populates="user")
    withdrawals = relationship("Withdrawal", back_populates="user")
    transactions = relationship("Transaction", back_populates="user")


class Deposit(Base):
    __tablename__ = "deposits"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    amount = Column(Float)
    currency = Column(String, default="USD")

    user = relationship("User", back_populates="deposits")


class Price(Base):
    __tablename__ = "prices"

    id = Column(Integer, primary_key=True, index=True)
    currency = Column(String, index=True)
    price = Column(Float)
    amount = Column(Float)
    user_id = Column(Integer, ForeignKey("users.id"))
    type = Column(String)

    user = relationship("User", back_populates="prices")


class CurrentPrice(Base):
    __tablename__ = "current_prices"

    id = Column(Integer, primary_key=True, index=True)
    currency = Column(String, unique=True, index=True)
    price = Column(Float)


class Withdrawal(Base):
    __tablename__ = "withdrawals"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    amount = Column(Float)
    status = Column(String, default="pending")

    user = relationship("User", back_populates="withdrawals")


class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    currency = Column(String)
    amount = Column(Float)
    transaction_type = Column(String)  # "buy" или "sell"
    usd_amount = Column(Float)
    timestamp = Column(String)

    user = relationship("User", back_populates="transactions")
