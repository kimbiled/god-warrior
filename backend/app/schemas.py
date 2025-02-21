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


class DepositBase(BaseModel):
    wallet_address: str
    amount: float


class DepositCreate(DepositBase):
    pass


class Deposit(DepositBase):
    id: int
    user_id: int
    status: str

    class Config:
        orm_mode = True

class PriceBase(BaseModel):
    buy_price: float
    sell_price: float

class PriceCreate(PriceBase):
    pass

class Price(PriceBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True