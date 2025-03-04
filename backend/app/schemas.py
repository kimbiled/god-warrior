from pydantic import BaseModel


class UserBase(BaseModel):
    phone_number: str


class UserCreate(UserBase):
    pass


class User(UserBase):
    id: int
    is_active: bool

    class Config:
        orm_mode = True


class UserLogin(BaseModel):
    phone_number: str
    otp: str


class OTP(BaseModel):
    phone_number: str
    otp: str


class SendOTP(BaseModel):
    phone_number: str


class DepositBase(BaseModel):
    wallet_address: str
    amount: float


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


class WithdrawalBase(BaseModel):
    amount: float


class WithdrawalCreate(BaseModel):
    amount: float
    currency: str


class Withdrawal(BaseModel):
    id: int
    user_id: int
    amount: float
    status: str

    class Config:
        orm_mode = True


class UserDeposit(BaseModel):
    usd_balance: float

    class Config:
        orm_mode = True
