from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

# Schémas de base
class UserBase(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None

class UserCreate(UserBase):
    password: str
    password_confirmation: str

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    current_password: Optional[str] = None
    new_password: Optional[str] = None
    new_password_confirmation: Optional[str] = None

class UserResponse(UserBase):
    id: int
    role: str
    avatar: Optional[str] = None
    created_at: datetime
    
    class Config:
        from_attributes = True

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    user_info: UserResponse

# Schémas pour les produits
class CategoryBase(BaseModel):
    name: str
    slug: str
    description: Optional[str] = None

class CategoryCreate(CategoryBase):
    pass

class CategoryUpdate(BaseModel):
    name: Optional[str] = None
    slug: Optional[str] = None
    description: Optional[str] = None

class CategoryResponse(CategoryBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class ProductBase(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    stock: int = 0
    reference: Optional[str] = None
    category_id: int
    is_active: bool = True

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    stock: Optional[int] = None
    reference: Optional[str] = None
    category_id: Optional[int] = None
    is_active: Optional[bool] = None

class ProductResponse(ProductBase):
    id: int
    image: Optional[str] = None
    created_at: datetime
    category: Optional[CategoryResponse] = None
    
    class Config:
        from_attributes = True

# Schémas pour les formations
class TrainingBase(BaseModel):
    title: str
    description: Optional[str] = None
    date: Optional[datetime] = None
    duration: Optional[str] = None
    price: float
    is_active: bool = True

class TrainingCreate(TrainingBase):
    pass

class TrainingUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    date: Optional[datetime] = None
    duration: Optional[str] = None
    price: Optional[float] = None
    is_active: Optional[bool] = None

class TrainingResponse(TrainingBase):
    id: int
    image: Optional[str] = None
    created_at: datetime
    
    class Config:
        from_attributes = True

# Schémas pour les articles de blog
class BlogPostBase(BaseModel):
    title: str
    content: Optional[str] = None
    excerpt: Optional[str] = None
    slug: str
    is_published: bool = True

class BlogPostCreate(BlogPostBase):
    pass

class BlogPostUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    excerpt: Optional[str] = None
    slug: Optional[str] = None
    is_published: Optional[bool] = None

class BlogPostResponse(BlogPostBase):
    id: int
    image: Optional[str] = None
    created_at: datetime
    
    class Config:
        from_attributes = True

# Schémas pour les projets
class ProjectBase(BaseModel):
    name: str
    description: Optional[str] = None
    technologies: Optional[str] = None
    github_url: Optional[str] = None
    demo_url: Optional[str] = None
    is_active: bool = True

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    technologies: Optional[str] = None
    github_url: Optional[str] = None
    demo_url: Optional[str] = None
    is_active: Optional[bool] = None

class ProjectResponse(ProjectBase):
    id: int
    image: Optional[str] = None
    created_at: datetime
    
    class Config:
        from_attributes = True

# Schémas pour les commandes
class OrderItemCreate(BaseModel):
    product_id: int
    quantity: int

class OrderCreate(BaseModel):
    items: List[OrderItemCreate]
    shipping_address: Optional[str] = None
    notes: Optional[str] = None

class OrderResponse(BaseModel):
    id: int
    user_id: int
    total_amount: float
    status: str
    shipping_address: Optional[str] = None
    notes: Optional[str] = None
    created_at: datetime
    
    class Config:
        from_attributes = True

# Schémas pour les candidatures de stage
class InternshipApplicationBase(BaseModel):
    full_name: str
    email: EmailStr
    phone: Optional[str] = None
    message: Optional[str] = None

class InternshipApplicationCreate(InternshipApplicationBase):
    pass

class InternshipApplicationUpdate(BaseModel):
    status: str

class InternshipApplicationResponse(InternshipApplicationBase):
    id: int
    cv_path: Optional[str] = None
    status: str
    created_at: datetime
    
    class Config:
        from_attributes = True
