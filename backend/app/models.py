from sqlalchemy import Column, Integer, String, Boolean, Float, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    phone_number = Column(String, unique=True, index=True)
    otp = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)

    deposits = relationship("Deposit", back_populates="user")


class Deposit(Base):
    __tablename__ = "deposits"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    wallet_address = Column(String, unique=True, index=True)
    amount = Column(Float)
    status = Column(String, default="pending")

    user = relationship("User", back_populates="deposits")
