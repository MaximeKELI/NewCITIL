from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.models import User
from app.schemas.schemas import UserResponse, UserUpdate
from app.api.core.deps import get_current_user, get_current_admin_user
from app.utils.file_utils import save_uploaded_file, get_file_url, delete_file
from typing import List

router = APIRouter()

@router.get("/user", response_model=UserResponse)
async def get_user(current_user: User = Depends(get_current_user)):
    """Obtenir les informations de l'utilisateur connecté (alias pour /auth/me)"""
    return UserResponse(
        id=current_user.id,
        name=current_user.name,
        email=current_user.email,
        phone=current_user.phone,
        role=current_user.role,
        avatar=get_file_url(current_user.avatar),
        created_at=current_user.created_at
    )

@router.get("/get-user", response_model=UserResponse)
async def get_user_info(current_user: User = Depends(get_current_user)):
    """Obtenir les informations de l'utilisateur connecté (alias pour compatibilité)"""
    return UserResponse(
        id=current_user.id,
        name=current_user.name,
        email=current_user.email,
        phone=current_user.phone,
        role=current_user.role,
        avatar=get_file_url(current_user.avatar),
        created_at=current_user.created_at
    )

@router.post("/profile", response_model=UserResponse)
async def update_profile_with_file(
    name: str = Form(None),
    email: str = Form(None),
    phone: str = Form(None),
    current_password: str = Form(None),
    new_password: str = Form(None),
    new_password_confirmation: str = Form(None),
    avatar: UploadFile = File(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Mettre à jour le profil utilisateur avec support des fichiers"""
    # Vérifier le mot de passe actuel si un nouveau mot de passe est fourni
    if new_password:
        if not current_password:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Le mot de passe actuel est requis"
            )
        
        from app.utils.auth import verify_password, get_password_hash
        if not verify_password(current_password, current_user.password):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Mot de passe actuel incorrect"
            )
        
        if new_password != new_password_confirmation:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Les nouveaux mots de passe ne correspondent pas"
            )
        
        current_user.password = get_password_hash(new_password)
    
    # Mettre à jour les autres champs
    if name is not None:
        current_user.name = name
    if email is not None:
        # Vérifier si l'email existe déjà
        existing_user = db.query(User).filter(
            User.email == email,
            User.id != current_user.id
        ).first()
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Un utilisateur avec cet email existe déjà"
            )
        current_user.email = email
    if phone is not None:
        current_user.phone = phone
    
    # Gérer l'avatar
    if avatar:
        # Supprimer l'ancien avatar
        if current_user.avatar:
            delete_file(current_user.avatar)
        
        # Sauvegarder le nouvel avatar
        avatar_path = save_uploaded_file(avatar, "avatars")
        current_user.avatar = avatar_path
    
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

@router.get("/admin/users", response_model=List[UserResponse])
async def get_all_users(
    db: Session = Depends(get_db),
    admin_user: User = Depends(get_current_admin_user)
):
    """Obtenir tous les utilisateurs (admin seulement)"""
    users = db.query(User).all()
    return [
        UserResponse(
            id=user.id,
            name=user.name,
            email=user.email,
            phone=user.phone,
            role=user.role,
            avatar=get_file_url(user.avatar),
            created_at=user.created_at
        )
        for user in users
    ]

@router.delete("/admin/users/{user_id}")
async def delete_user(
    user_id: int,
    db: Session = Depends(get_db),
    admin_user: User = Depends(get_current_admin_user)
):
    """Supprimer un utilisateur (admin seulement)"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Utilisateur non trouvé"
        )
    
    # Ne pas permettre la suppression de son propre compte
    if user.id == admin_user.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Vous ne pouvez pas supprimer votre propre compte"
        )
    
    # Supprimer l'avatar s'il existe
    if user.avatar:
        delete_file(user.avatar)
    
    db.delete(user)
    db.commit()
    
    return {"message": "Utilisateur supprimé avec succès"}
