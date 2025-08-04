from sqlalchemy import Column, String, Integer
from database.database import Base

class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True,autoincrement=True, index=True)
    username = Column(String(50), unique=True, index=True)
    email = Column(String(50), unique=True, index=True)
    password = Column(String(255))
    role = Column(String(4)) 

