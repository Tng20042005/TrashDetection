from pydantic import BaseModel, EmailStr

class AdminLogin(BaseModel):
    email: str
    password: str  

    class Config:
        orm_mode = True

class AdminResponse(BaseModel):
    username: str
    email: EmailStr
    access_token: str
    token_type: str

    class Config:
        orm_mode = True