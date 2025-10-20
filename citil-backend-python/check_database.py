#!/usr/bin/env python3
"""
Script de vérification de la base de données CITIL
"""

from app.database.database import SessionLocal
from app.models.models import (
    User, Category, Product, Training, BlogPost, Project, 
    Order, OrderItem, InternshipApplication
)

def check_database():
    db = SessionLocal()
    
    try:
        print("🔍 Vérification de la base de données CITIL...")
        print("=" * 50)
        
        # Utilisateurs
        users = db.query(User).all()
        print(f"👥 Utilisateurs ({len(users)}) :")
        for user in users:
            print(f"   - {user.name} ({user.email}) - Rôle: {user.role}")
        print()
        
        # Catégories
        categories = db.query(Category).all()
        print(f"📂 Catégories ({len(categories)}) :")
        for cat in categories:
            print(f"   - {cat.name} ({cat.slug})")
        print()
        
        # Produits
        products = db.query(Product).all()
        print(f"🛍️ Produits ({len(products)}) :")
        for prod in products:
            category_name = prod.category.name if prod.category else "Sans catégorie"
            print(f"   - {prod.name} - {prod.price} FCFA - Stock: {prod.stock} - Catégorie: {category_name}")
        print()
        
        # Formations
        trainings = db.query(Training).all()
        print(f"🎓 Formations ({len(trainings)}) :")
        for train in trainings:
            print(f"   - {train.title} - {train.price} FCFA - Durée: {train.duration}")
        print()
        
        # Articles de blog
        blog_posts = db.query(BlogPost).all()
        print(f"📝 Articles de blog ({len(blog_posts)}) :")
        for post in blog_posts:
            status = "Publié" if post.is_published else "Brouillon"
            print(f"   - {post.title} - {status}")
        print()
        
        # Projets
        projects = db.query(Project).all()
        print(f"🚀 Projets ({len(projects)}) :")
        for proj in projects:
            print(f"   - {proj.name}")
        print()
        
        # Candidatures
        applications = db.query(InternshipApplication).all()
        print(f"📋 Candidatures de stage ({len(applications)}) :")
        for app in applications:
            print(f"   - {app.full_name} ({app.email}) - Statut: {app.status}")
        print()
        
        # Commandes
        orders = db.query(Order).all()
        print(f"🛒 Commandes ({len(orders)}) :")
        for order in orders:
            user_name = order.user.name if order.user else "Utilisateur inconnu"
            print(f"   - Commande #{order.id} - {user_name} - {order.total_amount} FCFA - Statut: {order.status}")
        print()
        
        print("✅ Base de données vérifiée avec succès !")
        
    except Exception as e:
        print(f"❌ Erreur lors de la vérification : {e}")
    finally:
        db.close()

if __name__ == "__main__":
    check_database()
