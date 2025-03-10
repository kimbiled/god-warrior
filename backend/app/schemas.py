from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class UserBase(BaseModel):
    phone_number: str
    name: Optional[str] = None
    username: Optional[str] = None
    location: Optional[str] = None


class UserCreate(UserBase):
    pass


class UserUpdate(UserBase):
    avatar: Optional[str] = None


class User(UserBase):
    id: int
    otp: Optional[str] = None
    avatar: Optional[str] = None
    is_active: bool
    is_admin: bool
    usd_balance: float
    btc_balance: float
    xrp_balance: float

    class Config:
        orm_mode = True


class UserLogin(BaseModel):
    phone_number: str
    otp: str


class DepositCreate(BaseModel):
    amount: float
    currency: str


class Deposit(BaseModel):
    id: int
    user_id: int
    amount: float
    currency: str

    class Config:
        orm_mode = True


class WithdrawalCreate(BaseModel):
    amount: float
    currency: str


class Withdrawal(BaseModel):
    id: int
    user_id: int
    amount: float

    class Config:
        orm_mode = True


class PriceBase(BaseModel):
    currency: str
    price: float
    amount: float


class PriceCreate(PriceBase):
    pass


class Price(PriceBase):
    id: int
    user_id: int
    type: str

    class Config:
        orm_mode = True


class CurrentPriceBase(BaseModel):
    currency: str
    price: float


class CurrentPriceCreate(CurrentPriceBase):
    pass


class CurrentPrice(CurrentPriceBase):
    id: int

    class Config:
        orm_mode = True


class OTP(BaseModel):
    phone_number: str
    otp: str


class SendOTP(BaseModel):
    phone_number: str


class UserDeposit(BaseModel):
    deposits: List[Deposit]

    class Config:
        orm_mode = True


class TransactionBase(BaseModel):
    currency: str
    amount: float
    transaction_type: str
    usd_amount: float
    timestamp: str


class TransactionCreate(TransactionBase):
    pass


class Transaction(TransactionBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True


class DailyBalanceBase(BaseModel):
    date: datetime
    usd_balance: float
    btc_balance: float
    xrp_balance: float


class DailyBalanceCreate(DailyBalanceBase):
    pass


class DailyBalance(DailyBalanceBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True
