from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.models import Category
from app.schemas.schemas import CategoryResponse, CategoryCreate, CategoryUpdate
from app.api.core.deps import get_current_admin_user
from typing import List

router = APIRouter()

@router.get("/categories", response_model=List[CategoryResponse])
async def get_categories(db: Session = Depends(get_db)):
    """Obtenir toutes les catégories"""
    categories = db.query(Category).all()
    return [
        CategoryResponse(
            id=category.id,
            name=category.name,
            slug=category.slug,
            description=category.description,
            created_at=category.created_at
        )
        for category in categories
    ]

@router.post("/admin/categories", response_model=CategoryResponse)
async def create_category(
    category_data: CategoryCreate,
    db: Session = Depends(get_db),
    admin_user = Depends(get_current_admin_user)
):
    """Créer une nouvelle catégorie (admin seulement)"""
    # Vérifier si le slug existe déjà
    existing_category = db.query(Category).filter(Category.slug == category_data.slug).first()
    if existing_category:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Une catégorie avec ce slug existe déjà"
        )
    
    category = Category(
        name=category_data.name,
        slug=category_data.slug,
        description=category_data.description
    )
    
    db.add(category)
    db.commit()
    db.refresh(category)
    
    return CategoryResponse(
        id=category.id,
        name=category.name,
        slug=category.slug,
        description=category.description,
        created_at=category.created_at
    )

@router.put("/admin/categories/{category_id}", response_model=CategoryResponse)
async def update_category(
    category_id: int,
    category_data: CategoryUpdate,
    db: Session = Depends(get_db),
    admin_user = Depends(get_current_admin_user)
):
    """Mettre à jour une catégorie (admin seulement)"""
    category = db.query(Category).filter(Category.id == category_id).first()
    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Catégorie non trouvée"
        )
    
    # Vérifier si le nouveau slug existe déjà
    if category_data.slug and category_data.slug != category.slug:
        existing_category = db.query(Category).filter(
            Category.slug == category_data.slug,
            Category.id != category_id
        ).first()
        if existing_category:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Une catégorie avec ce slug existe déjà"
            )
    
    # Mettre à jour les champs
    if category_data.name is not None:
        category.name = category_data.name
    if category_data.slug is not None:
        category.slug = category_data.slug
    if category_data.description is not None:
        category.description = category_data.description
    
    db.commit()
    db.refresh(category)
    
    return CategoryResponse(
        id=category.id,
        name=category.name,
        slug=category.slug,
        description=category.description,
        created_at=category.created_at
    )

@router.delete("/admin/categories/{category_id}")
async def delete_category(
    category_id: int,
    db: Session = Depends(get_db),
    admin_user = Depends(get_current_admin_user)
):
    """Supprimer une catégorie (admin seulement)"""
    category = db.query(Category).filter(Category.id == category_id).first()
    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Catégorie non trouvée"
        )
    
    # Vérifier s'il y a des produits associés
    from app.models.models import Product
    products_count = db.query(Product).filter(Product.category_id == category_id).count()
    if products_count > 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Impossible de supprimer cette catégorie car {products_count} produit(s) y sont associés"
        )
    
    db.delete(category)
    db.commit()
    
    return {"message": "Catégorie supprimée avec succès"}

@router.get("/admin/categories", response_model=List[CategoryResponse])
async def get_all_categories_admin(
    db: Session = Depends(get_db),
    admin_user = Depends(get_current_admin_user)
):
    """Obtenir toutes les catégories (admin seulement)"""
    categories = db.query(Category).all()
    return [
        CategoryResponse(
            id=category.id,
            name=category.name,
            slug=category.slug,
            description=category.description,
            created_at=category.created_at
        )
        for category in categories
    ]
