from pydantic import BaseModel

class UserCreate(BaseModel):
    phone_number: str
    password: str

class User(BaseModel):
    id: int
    phone_number: str
    is_active: bool

    class Config:
        orm_mode = True