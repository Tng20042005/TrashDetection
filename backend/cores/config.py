import os 
from pydantic_settings import BaseSettings

class Setttings(BaseSettings):
    SECRET_KEY: str =  "maiminhtung20042005@"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30


settings = Setttings()
