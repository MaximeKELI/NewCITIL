from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.models import InternshipApplication
from app.schemas.schemas import InternshipApplicationResponse, InternshipApplicationCreate, InternshipApplicationUpdate
from app.api.core.deps import get_current_admin_user
from app.utils.file_utils import save_uploaded_file, get_file_url, delete_file
from typing import List

router = APIRouter()

@router.post("/internship-applications", response_model=InternshipApplicationResponse)
async def submit_internship_application(
    full_name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(None),
    message: str = Form(None),
    cv: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    """Soumettre une candidature de stage"""
    # Créer la candidature
    application = InternshipApplication(
        full_name=full_name,
        email=email,
        phone=phone,
        message=message,
        status="received"
    )
    
    # Gérer le CV
    if cv:
        cv_path = save_uploaded_file(cv, "cv")
        application.cv_path = cv_path
    
    db.add(application)
    db.commit()
    db.refresh(application)
    
    return InternshipApplicationResponse(
        id=application.id,
        full_name=application.full_name,
        email=application.email,
        phone=application.phone,
        message=application.message,
        cv_path=get_file_url(application.cv_path),
        status=application.status,
        created_at=application.created_at
    )

@router.get("/admin/internship-applications", response_model=List[InternshipApplicationResponse])
async def get_all_applications(
    db: Session = Depends(get_db),
    admin_user = Depends(get_current_admin_user)
):
    """Obtenir toutes les candidatures (admin seulement)"""
    applications = db.query(InternshipApplication).all()
    return [
        InternshipApplicationResponse(
            id=app.id,
            full_name=app.full_name,
            email=app.email,
            phone=app.phone,
            message=app.message,
            cv_path=get_file_url(app.cv_path),
            status=app.status,
            created_at=app.created_at
        )
        for app in applications
    ]

@router.get("/admin/internship-applications/{application_id}", response_model=InternshipApplicationResponse)
async def get_application(
    application_id: int,
    db: Session = Depends(get_db),
    admin_user = Depends(get_current_admin_user)
):
    """Obtenir une candidature par ID (admin seulement)"""
    application = db.query(InternshipApplication).filter(InternshipApplication.id == application_id).first()
    if not application:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Candidature non trouvée"
        )
    
    return InternshipApplicationResponse(
        id=application.id,
        full_name=application.full_name,
        email=application.email,
        phone=application.phone,
        message=application.message,
        cv_path=get_file_url(application.cv_path),
        status=application.status,
        created_at=application.created_at
    )

@router.put("/admin/internship-applications/{application_id}", response_model=InternshipApplicationResponse)
async def update_application_status(
    application_id: int,
    status: str,
    db: Session = Depends(get_db),
    admin_user = Depends(get_current_admin_user)
):
    """Mettre à jour le statut d'une candidature (admin seulement)"""
    application = db.query(InternshipApplication).filter(InternshipApplication.id == application_id).first()
    if not application:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Candidature non trouvée"
        )
    
    # Valider le statut
    valid_statuses = ["received", "reviewed", "accepted", "rejected"]
    if status not in valid_statuses:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Statut invalide. Statuts autorisés: {', '.join(valid_statuses)}"
        )
    
    application.status = status
    db.commit()
    db.refresh(application)
    
    return InternshipApplicationResponse(
        id=application.id,
        full_name=application.full_name,
        email=application.email,
        phone=application.phone,
        message=application.message,
        cv_path=get_file_url(application.cv_path),
        status=application.status,
        created_at=application.created_at
    )

@router.delete("/admin/internship-applications/{application_id}")
async def delete_application(
    application_id: int,
    db: Session = Depends(get_db),
    admin_user = Depends(get_current_admin_user)
):
    """Supprimer une candidature (admin seulement)"""
    application = db.query(InternshipApplication).filter(InternshipApplication.id == application_id).first()
    if not application:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Candidature non trouvée"
        )
    
    # Supprimer le CV s'il existe
    if application.cv_path:
        delete_file(application.cv_path)
    
    db.delete(application)
    db.commit()
    
    return {"message": "Candidature supprimée avec succès"}
