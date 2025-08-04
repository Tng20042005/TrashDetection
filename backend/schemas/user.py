from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str
    role: str

    class Config:
        orm_mode = True

class UserLogin(BaseModel):
    username: str
    password: str

    class Config:
        orm_mode = True

class UserResponse(BaseModel):
    username : str
    email: EmailStr
    access_token: str
    token_type: str

    class Config:
        orm_mode = True

class UserInfo(BaseModel):
    username: str
    email: EmailStr
    role: str

    class Config:
        orm_mode = True
        
class RoleUpdate(BaseModel):
    role: str

    class Config:
        orm_mode = True