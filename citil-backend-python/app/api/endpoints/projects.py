from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.models import Project
from app.schemas.schemas import ProjectResponse, ProjectCreate, ProjectUpdate
from app.api.core.deps import get_current_admin_user
from app.utils.file_utils import save_uploaded_file, get_file_url, delete_file
from typing import List

router = APIRouter()

@router.get("/projects", response_model=List[ProjectResponse])
async def get_projects(db: Session = Depends(get_db)):
    """Obtenir tous les projets actifs"""
    projects = db.query(Project).filter(Project.is_active == True).all()
    return [
        ProjectResponse(
            id=project.id,
            name=project.name,
            description=project.description,
            technologies=project.technologies,
            github_url=project.github_url,
            demo_url=project.demo_url,
            is_active=project.is_active,
            image=get_file_url(project.image),
            created_at=project.created_at
        )
        for project in projects
    ]

@router.get("/projects/{project_id}", response_model=ProjectResponse)
async def get_project(project_id: int, db: Session = Depends(get_db)):
    """Obtenir un projet par ID"""
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Projet non trouvé"
        )
    
    return ProjectResponse(
        id=project.id,
        name=project.name,
        description=project.description,
        technologies=project.technologies,
        github_url=project.github_url,
        demo_url=project.demo_url,
        is_active=project.is_active,
        image=get_file_url(project.image),
        created_at=project.created_at
    )

@router.post("/admin/projects", response_model=ProjectResponse)
async def create_project(
    name: str = Form(...),
    description: str = Form(None),
    technologies: str = Form(None),
    github_url: str = Form(None),
    demo_url: str = Form(None),
    is_active: bool = Form(True),
    image: UploadFile = File(None),
    db: Session = Depends(get_db),
    admin_user = Depends(get_current_admin_user)
):
    """Créer un nouveau projet (admin seulement)"""
    # Créer le projet
    project = Project(
        name=name,
        description=description,
        technologies=technologies,
        github_url=github_url,
        demo_url=demo_url,
        is_active=is_active
    )
    
    # Gérer l'image
    if image:
        image_path = save_uploaded_file(image, "projects")
        project.image = image_path
    
    db.add(project)
    db.commit()
    db.refresh(project)
    
    return ProjectResponse(
        id=project.id,
        name=project.name,
        description=project.description,
        technologies=project.technologies,
        github_url=project.github_url,
        demo_url=project.demo_url,
        is_active=project.is_active,
        image=get_file_url(project.image),
        created_at=project.created_at
    )

@router.put("/admin/projects/{project_id}", response_model=ProjectResponse)
async def update_project(
    project_id: int,
    name: str = Form(None),
    description: str = Form(None),
    technologies: str = Form(None),
    github_url: str = Form(None),
    demo_url: str = Form(None),
    is_active: bool = Form(None),
    image: UploadFile = File(None),
    db: Session = Depends(get_db),
    admin_user = Depends(get_current_admin_user)
):
    """Mettre à jour un projet (admin seulement)"""
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Projet non trouvé"
        )
    
    # Mettre à jour les champs
    if name is not None:
        project.name = name
    if description is not None:
        project.description = description
    if technologies is not None:
        project.technologies = technologies
    if github_url is not None:
        project.github_url = github_url
    if demo_url is not None:
        project.demo_url = demo_url
    if is_active is not None:
        project.is_active = is_active
    
    # Gérer l'image
    if image:
        # Supprimer l'ancienne image
        if project.image:
            delete_file(project.image)
        
        # Sauvegarder la nouvelle image
        image_path = save_uploaded_file(image, "projects")
        project.image = image_path
    
    db.commit()
    db.refresh(project)
    
    return ProjectResponse(
        id=project.id,
        name=project.name,
        description=project.description,
        technologies=project.technologies,
        github_url=project.github_url,
        demo_url=project.demo_url,
        is_active=project.is_active,
        image=get_file_url(project.image),
        created_at=project.created_at
    )

@router.delete("/admin/projects/{project_id}")
async def delete_project(
    project_id: int,
    db: Session = Depends(get_db),
    admin_user = Depends(get_current_admin_user)
):
    """Supprimer un projet (admin seulement)"""
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Projet non trouvé"
        )
    
    # Supprimer l'image s'il y en a une
    if project.image:
        delete_file(project.image)
    
    db.delete(project)
    db.commit()
    
    return {"message": "Projet supprimé avec succès"}
