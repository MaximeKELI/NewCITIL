from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.models import BlogPost
from app.schemas.schemas import BlogPostResponse, BlogPostCreate, BlogPostUpdate
from app.api.core.deps import get_current_admin_user
from app.utils.file_utils import save_uploaded_file, get_file_url, delete_file
from typing import List

router = APIRouter()

@router.get("/blog-posts", response_model=List[BlogPostResponse])
async def get_blog_posts(db: Session = Depends(get_db)):
    """Obtenir tous les articles de blog publiés"""
    posts = db.query(BlogPost).filter(BlogPost.is_published == True).all()
    return [
        BlogPostResponse(
            id=post.id,
            title=post.title,
            content=post.content,
            excerpt=post.excerpt,
            slug=post.slug,
            is_published=post.is_published,
            image=get_file_url(post.image),
            created_at=post.created_at
        )
        for post in posts
    ]

@router.get("/blog-posts/{post_id}", response_model=BlogPostResponse)
async def get_blog_post(post_id: int, db: Session = Depends(get_db)):
    """Obtenir un article de blog par ID"""
    post = db.query(BlogPost).filter(BlogPost.id == post_id).first()
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Article non trouvé"
        )
    
    return BlogPostResponse(
        id=post.id,
        title=post.title,
        content=post.content,
        excerpt=post.excerpt,
        slug=post.slug,
        is_published=post.is_published,
        image=get_file_url(post.image),
        created_at=post.created_at
    )

@router.post("/admin/blog-posts", response_model=BlogPostResponse)
async def create_blog_post(
    title: str = Form(...),
    content: str = Form(None),
    excerpt: str = Form(None),
    slug: str = Form(...),
    is_published: bool = Form(True),
    image: UploadFile = File(None),
    db: Session = Depends(get_db),
    admin_user = Depends(get_current_admin_user)
):
    """Créer un nouvel article de blog (admin seulement)"""
    # Vérifier si le slug existe déjà
    existing_post = db.query(BlogPost).filter(BlogPost.slug == slug).first()
    if existing_post:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Un article avec ce slug existe déjà"
        )
    
    # Créer l'article
    post = BlogPost(
        title=title,
        content=content,
        excerpt=excerpt,
        slug=slug,
        is_published=is_published
    )
    
    # Gérer l'image
    if image:
        image_path = save_uploaded_file(image, "blog")
        post.image = image_path
    
    db.add(post)
    db.commit()
    db.refresh(post)
    
    return BlogPostResponse(
        id=post.id,
        title=post.title,
        content=post.content,
        excerpt=post.excerpt,
        slug=post.slug,
        is_published=post.is_published,
        image=get_file_url(post.image),
        created_at=post.created_at
    )

@router.put("/admin/blog-posts/{post_id}", response_model=BlogPostResponse)
async def update_blog_post(
    post_id: int,
    title: str = Form(None),
    content: str = Form(None),
    excerpt: str = Form(None),
    slug: str = Form(None),
    is_published: bool = Form(None),
    image: UploadFile = File(None),
    db: Session = Depends(get_db),
    admin_user = Depends(get_current_admin_user)
):
    """Mettre à jour un article de blog (admin seulement)"""
    post = db.query(BlogPost).filter(BlogPost.id == post_id).first()
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Article non trouvé"
        )
    
    # Vérifier si le nouveau slug existe déjà
    if slug and slug != post.slug:
        existing_post = db.query(BlogPost).filter(
            BlogPost.slug == slug,
            BlogPost.id != post_id
        ).first()
        if existing_post:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Un article avec ce slug existe déjà"
            )
    
    # Mettre à jour les champs
    if title is not None:
        post.title = title
    if content is not None:
        post.content = content
    if excerpt is not None:
        post.excerpt = excerpt
    if slug is not None:
        post.slug = slug
    if is_published is not None:
        post.is_published = is_published
    
    # Gérer l'image
    if image:
        # Supprimer l'ancienne image
        if post.image:
            delete_file(post.image)
        
        # Sauvegarder la nouvelle image
        image_path = save_uploaded_file(image, "blog")
        post.image = image_path
    
    db.commit()
    db.refresh(post)
    
    return BlogPostResponse(
        id=post.id,
        title=post.title,
        content=post.content,
        excerpt=post.excerpt,
        slug=post.slug,
        is_published=post.is_published,
        image=get_file_url(post.image),
        created_at=post.created_at
    )

@router.delete("/admin/blog-posts/{post_id}")
async def delete_blog_post(
    post_id: int,
    db: Session = Depends(get_db),
    admin_user = Depends(get_current_admin_user)
):
    """Supprimer un article de blog (admin seulement)"""
    post = db.query(BlogPost).filter(BlogPost.id == post_id).first()
    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Article non trouvé"
        )
    
    # Supprimer l'image s'il y en a une
    if post.image:
        delete_file(post.image)
    
    db.delete(post)
    db.commit()
    
    return {"message": "Article supprimé avec succès"}

@router.get("/admin/blog-posts", response_model=List[BlogPostResponse])
async def get_all_blog_posts_admin(
    db: Session = Depends(get_db),
    admin_user = Depends(get_current_admin_user)
):
    """Obtenir tous les articles de blog (admin seulement)"""
    posts = db.query(BlogPost).all()
    return [
        BlogPostResponse(
            id=post.id,
            title=post.title,
            content=post.content,
            excerpt=post.excerpt,
            slug=post.slug,
            is_published=post.is_published,
            image=get_file_url(post.image),
            created_at=post.created_at
        )
        for post in posts
    ]
