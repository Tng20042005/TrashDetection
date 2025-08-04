from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.database import get_db
from models.user import User
from schemas.admin import AdminLogin, AdminResponse
from cores.security import create_access_token, verify_password
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter()

@router.post("/login", response_model= AdminResponse)
def login_admin(form_data:OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    admin = db.query(User).filter(User.email == form_data.username, User.role == "ad").first()
    
    if not admin:
        raise HTTPException(status_code=400, detail="Admin not found")
    
    if form_data.password != admin.password:
        raise HTTPException(status_code=400, detail="Incorrect password")
    
    access_token = create_access_token(data={"sub": admin.email})
    return AdminResponse(
    username=admin.username,
    email=admin.email,
    access_token=access_token,
    token_type="bearer"
    )

