from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.models import Training
from app.schemas.schemas import TrainingResponse, TrainingCreate, TrainingUpdate
from app.api.core.deps import get_current_admin_user
from app.utils.file_utils import save_uploaded_file, get_file_url, delete_file
from typing import List
from datetime import datetime

router = APIRouter()

@router.get("/trainings", response_model=List[TrainingResponse])
async def get_trainings(db: Session = Depends(get_db)):
    """Obtenir toutes les formations actives"""
    trainings = db.query(Training).filter(Training.is_active == True).all()
    return [
        TrainingResponse(
            id=training.id,
            title=training.title,
            description=training.description,
            date=training.date,
            duration=training.duration,
            price=training.price,
            is_active=training.is_active,
            image=get_file_url(training.image),
            created_at=training.created_at
        )
        for training in trainings
    ]

@router.get("/trainings/{training_id}", response_model=TrainingResponse)
async def get_training(training_id: int, db: Session = Depends(get_db)):
    """Obtenir une formation par ID"""
    training = db.query(Training).filter(Training.id == training_id).first()
    if not training:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Formation non trouvée"
        )
    
    return TrainingResponse(
        id=training.id,
        title=training.title,
        description=training.description,
        date=training.date,
        duration=training.duration,
        price=training.price,
        is_active=training.is_active,
        image=get_file_url(training.image),
        created_at=training.created_at
    )

@router.post("/admin/trainings", response_model=TrainingResponse)
async def create_training(
    title: str = Form(...),
    description: str = Form(None),
    date: str = Form(None),
    duration: str = Form(None),
    price: float = Form(...),
    is_active: bool = Form(True),
    image: UploadFile = File(None),
    db: Session = Depends(get_db),
    admin_user = Depends(get_current_admin_user)
):
    """Créer une nouvelle formation (admin seulement)"""
    # Convertir la date si fournie
    training_date = None
    if date:
        try:
            training_date = datetime.fromisoformat(date.replace('Z', '+00:00'))
        except ValueError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Format de date invalide"
            )
    
    # Créer la formation
    training = Training(
        title=title,
        description=description,
        date=training_date,
        duration=duration,
        price=price,
        is_active=is_active
    )
    
    # Gérer l'image
    if image:
        image_path = save_uploaded_file(image, "trainings")
        training.image = image_path
    
    db.add(training)
    db.commit()
    db.refresh(training)
    
    return TrainingResponse(
        id=training.id,
        title=training.title,
        description=training.description,
        date=training.date,
        duration=training.duration,
        price=training.price,
        is_active=training.is_active,
        image=get_file_url(training.image),
        created_at=training.created_at
    )

@router.put("/admin/trainings/{training_id}", response_model=TrainingResponse)
async def update_training(
    training_id: int,
    title: str = Form(None),
    description: str = Form(None),
    date: str = Form(None),
    duration: str = Form(None),
    price: float = Form(None),
    is_active: bool = Form(None),
    image: UploadFile = File(None),
    db: Session = Depends(get_db),
    admin_user = Depends(get_current_admin_user)
):
    """Mettre à jour une formation (admin seulement)"""
    training = db.query(Training).filter(Training.id == training_id).first()
    if not training:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Formation non trouvée"
        )
    
    # Mettre à jour les champs
    if title is not None:
        training.title = title
    if description is not None:
        training.description = description
    if date is not None:
        try:
            training.date = datetime.fromisoformat(date.replace('Z', '+00:00'))
        except ValueError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Format de date invalide"
            )
    if duration is not None:
        training.duration = duration
    if price is not None:
        training.price = price
    if is_active is not None:
        training.is_active = is_active
    
    # Gérer l'image
    if image:
        # Supprimer l'ancienne image
        if training.image:
            delete_file(training.image)
        
        # Sauvegarder la nouvelle image
        image_path = save_uploaded_file(image, "trainings")
        training.image = image_path
    
    db.commit()
    db.refresh(training)
    
    return TrainingResponse(
        id=training.id,
        title=training.title,
        description=training.description,
        date=training.date,
        duration=training.duration,
        price=training.price,
        is_active=training.is_active,
        image=get_file_url(training.image),
        created_at=training.created_at
    )

@router.delete("/admin/trainings/{training_id}")
async def delete_training(
    training_id: int,
    db: Session = Depends(get_db),
    admin_user = Depends(get_current_admin_user)
):
    """Supprimer une formation (admin seulement)"""
    training = db.query(Training).filter(Training.id == training_id).first()
    if not training:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Formation non trouvée"
        )
    
    # Supprimer l'image s'il y en a une
    if training.image:
        delete_file(training.image)
    
    db.delete(training)
    db.commit()
    
    return {"message": "Formation supprimée avec succès"}

@router.get("/admin/trainings", response_model=List[TrainingResponse])
async def get_all_trainings_admin(
    db: Session = Depends(get_db),
    admin_user = Depends(get_current_admin_user)
):
    """Obtenir toutes les formations (admin seulement)"""
    trainings = db.query(Training).all()
    return [
        TrainingResponse(
            id=training.id,
            title=training.title,
            description=training.description,
            date=training.date,
            duration=training.duration,
            price=training.price,
            is_active=training.is_active,
            image=get_file_url(training.image),
            created_at=training.created_at
        )
        for training in trainings
    ]
