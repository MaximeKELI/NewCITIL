from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.models import Product, Category
from app.schemas.schemas import ProductResponse, ProductCreate, ProductUpdate, CategoryResponse
from app.api.core.deps import get_current_admin_user
from app.utils.file_utils import save_uploaded_file, get_file_url, delete_file
from typing import List, Optional

router = APIRouter()

@router.get("/products", response_model=List[ProductResponse])
async def get_products(db: Session = Depends(get_db)):
    """Obtenir tous les produits actifs"""
    products = db.query(Product).filter(Product.is_active == True).all()
    return [
        ProductResponse(
            id=product.id,
            name=product.name,
            description=product.description,
            price=product.price,
            stock=product.stock,
            reference=product.reference,
            category_id=product.category_id,
            is_active=product.is_active,
            image=get_file_url(product.image),
            created_at=product.created_at,
            category=CategoryResponse(
                id=product.category.id,
                name=product.category.name,
                slug=product.category.slug,
                description=product.category.description,
                created_at=product.category.created_at
            ) if product.category else None
        )
        for product in products
    ]

@router.get("/products/{product_id}", response_model=ProductResponse)
async def get_product(product_id: int, db: Session = Depends(get_db)):
    """Obtenir un produit par ID"""
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Produit non trouvé"
        )
    
    return ProductResponse(
        id=product.id,
        name=product.name,
        description=product.description,
        price=product.price,
        stock=product.stock,
        reference=product.reference,
        category_id=product.category_id,
        is_active=product.is_active,
        image=get_file_url(product.image),
        created_at=product.created_at,
        category=CategoryResponse(
            id=product.category.id,
            name=product.category.name,
            slug=product.category.slug,
            description=product.category.description,
            created_at=product.category.created_at
        ) if product.category else None
    )

@router.post("/admin/products", response_model=ProductResponse)
async def create_product(
    name: str = Form(...),
    description: str = Form(None),
    price: float = Form(...),
    stock: int = Form(0),
    reference: str = Form(None),
    category_id: int = Form(...),
    is_active: bool = Form(True),
    image: UploadFile = File(None),
    db: Session = Depends(get_db),
    admin_user = Depends(get_current_admin_user)
):
    """Créer un nouveau produit (admin seulement)"""
    # Vérifier que la catégorie existe
    category = db.query(Category).filter(Category.id == category_id).first()
    if not category:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Catégorie non trouvée"
        )
    
    # Créer le produit
    product = Product(
        name=name,
        description=description,
        price=price,
        stock=stock,
        reference=reference,
        category_id=category_id,
        is_active=is_active
    )
    
    # Gérer l'image
    if image:
        image_path = save_uploaded_file(image, "products")
        product.image = image_path
    
    db.add(product)
    db.commit()
    db.refresh(product)
    
    return ProductResponse(
        id=product.id,
        name=product.name,
        description=product.description,
        price=product.price,
        stock=product.stock,
        reference=product.reference,
        category_id=product.category_id,
        is_active=product.is_active,
        image=get_file_url(product.image),
        created_at=product.created_at,
        category=CategoryResponse(
            id=category.id,
            name=category.name,
            slug=category.slug,
            description=category.description,
            created_at=category.created_at
        )
    )

@router.put("/admin/products/{product_id}", response_model=ProductResponse)
async def update_product(
    product_id: int,
    name: str = Form(None),
    description: str = Form(None),
    price: float = Form(None),
    stock: int = Form(None),
    reference: str = Form(None),
    category_id: int = Form(None),
    is_active: bool = Form(None),
    image: UploadFile = File(None),
    db: Session = Depends(get_db),
    admin_user = Depends(get_current_admin_user)
):
    """Mettre à jour un produit (admin seulement)"""
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Produit non trouvé"
        )
    
    # Mettre à jour les champs
    if name is not None:
        product.name = name
    if description is not None:
        product.description = description
    if price is not None:
        product.price = price
    if stock is not None:
        product.stock = stock
    if reference is not None:
        product.reference = reference
    if category_id is not None:
        # Vérifier que la catégorie existe
        category = db.query(Category).filter(Category.id == category_id).first()
        if not category:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Catégorie non trouvée"
            )
        product.category_id = category_id
    if is_active is not None:
        product.is_active = is_active
    
    # Gérer l'image
    if image:
        # Supprimer l'ancienne image
        if product.image:
            delete_file(product.image)
        
        # Sauvegarder la nouvelle image
        image_path = save_uploaded_file(image, "products")
        product.image = image_path
    
    db.commit()
    db.refresh(product)
    
    return ProductResponse(
        id=product.id,
        name=product.name,
        description=product.description,
        price=product.price,
        stock=product.stock,
        reference=product.reference,
        category_id=product.category_id,
        is_active=product.is_active,
        image=get_file_url(product.image),
        created_at=product.created_at,
        category=CategoryResponse(
            id=product.category.id,
            name=product.category.name,
            slug=product.category.slug,
            description=product.category.description,
            created_at=product.category.created_at
        ) if product.category else None
    )

@router.delete("/admin/products/{product_id}")
async def delete_product(
    product_id: int,
    db: Session = Depends(get_db),
    admin_user = Depends(get_current_admin_user)
):
    """Supprimer un produit (admin seulement)"""
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Produit non trouvé"
        )
    
    # Supprimer l'image s'il y en a une
    if product.image:
        delete_file(product.image)
    
    db.delete(product)
    db.commit()
    
    return {"message": "Produit supprimé avec succès"}

@router.get("/admin/products", response_model=List[ProductResponse])
async def get_all_products_admin(
    db: Session = Depends(get_db),
    admin_user = Depends(get_current_admin_user)
):
    """Obtenir tous les produits (admin seulement)"""
    products = db.query(Product).all()
    return [
        ProductResponse(
            id=product.id,
            name=product.name,
            description=product.description,
            price=product.price,
            stock=product.stock,
            reference=product.reference,
            category_id=product.category_id,
            is_active=product.is_active,
            image=get_file_url(product.image),
            created_at=product.created_at,
            category=CategoryResponse(
                id=product.category.id,
                name=product.category.name,
                slug=product.category.slug,
                description=product.category.description,
                created_at=product.category.created_at
            ) if product.category else None
        )
        for product in products
    ]
