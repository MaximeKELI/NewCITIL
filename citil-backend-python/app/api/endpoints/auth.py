from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBearer
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.models import User
from app.schemas.schemas import UserCreate, UserLogin, Token, UserResponse, UserUpdate
from app.utils.auth import verify_password, get_password_hash, create_access_token
from app.utils.file_utils import save_uploaded_file, get_file_url
from app.api.core.deps import get_current_user
from datetime import timedelta
from config import ACCESS_TOKEN_EXPIRE_MINUTES

router = APIRouter()

@router.post("/register", response_model=Token)
async def register(user_data: UserCreate, db: Session = Depends(get_db)):
    """Inscription d'un nouvel utilisateur"""
    # Vérifier si l'email existe déjà
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Un utilisateur avec cet email existe déjà"
        )
    
    # Vérifier la confirmation du mot de passe
    if user_data.password != user_data.password_confirmation:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Les mots de passe ne correspondent pas"
        )
    
    # Créer l'utilisateur
    hashed_password = get_password_hash(user_data.password)
    db_user = User(
        name=user_data.name,
        email=user_data.email,
        phone=user_data.phone,
        password=hashed_password,
        role="client"
    )
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    # Créer le token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(db_user.id)}, expires_delta=access_token_expires
    )
    
    # Préparer la réponse
    user_info = UserResponse(
        id=db_user.id,
        name=db_user.name,
        email=db_user.email,
        phone=db_user.phone,
        role=db_user.role,
        avatar=get_file_url(db_user.avatar),
        created_at=db_user.created_at
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user_info": user_info
    }

@router.post("/login", response_model=Token)
async def login(user_credentials: UserLogin, db: Session = Depends(get_db)):
    """Connexion d'un utilisateur"""
    # Trouver l'utilisateur
    user = db.query(User).filter(User.email == user_credentials.email).first()
    
    if not user or not verify_password(user_credentials.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou mot de passe incorrect",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Créer le token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(user.id)}, expires_delta=access_token_expires
    )
    
    # Préparer la réponse
    user_info = UserResponse(
        id=user.id,
        name=user.name,
        email=user.email,
        phone=user.phone,
        role=user.role,
        avatar=get_file_url(user.avatar),
        created_at=user.created_at
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user_info": user_info
    }

@router.get("/me", response_model=UserResponse)
async def get_user_info(current_user: User = Depends(get_current_user)):
    """Obtenir les informations de l'utilisateur connecté"""
    return UserResponse(
        id=current_user.id,
        name=current_user.name,
        email=current_user.email,
        phone=current_user.phone,
        role=current_user.role,
        avatar=get_file_url(current_user.avatar),
        created_at=current_user.created_at
    )

@router.post("/logout")
async def logout():
    """Déconnexion (côté client)"""
    return {"message": "Déconnexion réussie"}

@router.post("/profile", response_model=UserResponse)
async def update_profile(
    user_data: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Mettre à jour le profil utilisateur"""
    # Vérifier le mot de passe actuel si un nouveau mot de passe est fourni
    if user_data.new_password:
        if not user_data.current_password:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Le mot de passe actuel est requis"
            )
        
        if not verify_password(user_data.current_password, current_user.password):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Mot de passe actuel incorrect"
            )
        
        if user_data.new_password != user_data.new_password_confirmation:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Les nouveaux mots de passe ne correspondent pas"
            )
        
        current_user.password = get_password_hash(user_data.new_password)
    
    # Mettre à jour les autres champs
    if user_data.name is not None:
        current_user.name = user_data.name
    if user_data.email is not None:
        # Vérifier si l'email existe déjà
        existing_user = db.query(User).filter(
            User.email == user_data.email,
            User.id != current_user.id
        ).first()
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Un utilisateur avec cet email existe déjà"
            )
        current_user.email = user_data.email
    if user_data.phone is not None:
        current_user.phone = user_data.phone
    
    db.commit()
    db.refresh(current_user)
    
    return UserResponse(
        id=current_user.id,
        name=current_user.name,
        email=current_user.email,
        phone=current_user.phone,
        role=current_user.role,
        avatar=get_file_url(current_user.avatar),
        created_at=current_user.created_at
    )
