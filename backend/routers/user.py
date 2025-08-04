from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from database.database import get_db
from schemas.user import UserCreate, UserLogin, UserInfo, UserResponse, RoleUpdate
from models.user import User
from cores.security import create_access_token, verify_password
from cores.security import hash_password
from fastapi import Body

router = APIRouter()

@router.post("/register", response_model=UserCreate)
def register_user(user: UserCreate,db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == user.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_user = User(
        username = user.username,
        password = hash_password(user.password),
        email = user.email,
        role = user.role
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.post("/login", response_model=UserResponse)
def login_user(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user :
        raise HTTPException(status_code=400, detail="User not found")
    
    if not verify_password(form_data.password, user.password):
        raise HTTPException(status_code=400, detail="Incorrect password")
    
    access_token = create_access_token(data={"sub": user.email})
    return UserResponse(
        username=user.username,
        email=user.email,
        access_token=access_token,
        token_type="bearer"
    )
    
@router.get("/allUsers", response_model=list[UserInfo])
def get_all_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    if not users:
        raise HTTPException(status_code=404, detail="Not found any users")
    
    return [UserInfo(
        username=user.username,
        email=user.email,
        role=user.role
    ) for user in users]

@router.delete("/deleteUser/{username}", response_model=str)
def delete_user(username: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    db.delete(user)
    db.commit()
    return f"User {username} deleted successfully"

@router.put("/updateRole/{username}", response_model=UserInfo)
def update_user_role(username: str, role: RoleUpdate , db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.role = role.role
    db.commit()
    db.refresh(user)
    return user