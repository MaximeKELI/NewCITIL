#!/usr/bin/env python3
"""
Script de peuplement de la base de données CITIL avec des données réalistes
"""

from app.database.database import SessionLocal
from app.models.models import (
    User, Category, Product, Training, BlogPost, Project, 
    Order, OrderItem, InternshipApplication
)
from app.utils.auth import get_password_hash
from datetime import datetime, timedelta
import random

def create_sample_data():
    db = SessionLocal()
    
    try:
        print("🗄️ Création des données de test pour CITIL...")
        
        # 1. Créer des utilisateurs
        print("👥 Création des utilisateurs...")
        users_data = [
            {
                "name": "Admin CITIL",
                "email": "admin@citil.tg",
                "password": get_password_hash("admin123"),
                "role": "admin",
                "phone": "+228 90 00 00 00"
            },
            {
                "name": "Kossi Doe",
                "email": "kossi@example.com",
                "password": get_password_hash("password123"),
                "role": "client",
                "phone": "+228 91 11 22 33"
            },
            {
                "name": "Awa Koffi",
                "email": "awa@example.com",
                "password": get_password_hash("password123"),
                "role": "client",
                "phone": "+228 92 22 33 44"
            },
            {
                "name": "Kodjo Mensah",
                "email": "kodjo@example.com",
                "password": get_password_hash("password123"),
                "role": "client",
                "phone": "+228 93 33 44 55"
            }
        ]
        
        for user_data in users_data:
            existing_user = db.query(User).filter(User.email == user_data["email"]).first()
            if not existing_user:
                user = User(**user_data)
                db.add(user)
        
        db.commit()
        print("✅ Utilisateurs créés")
        
        # 2. Créer des catégories
        print("📂 Création des catégories...")
        categories_data = [
            {"name": "Arduino", "slug": "arduino", "description": "Cartes Arduino et accessoires"},
            {"name": "Capteurs", "slug": "capteurs", "description": "Capteurs pour projets IoT"},
            {"name": "Kits", "slug": "kits", "description": "Kits éducatifs et de démarrage"},
            {"name": "Plaques solaires", "slug": "plaques-solaires", "description": "Solutions solaires"},
            {"name": "Cartes & MCU", "slug": "cartes-mcu", "description": "Microcontrôleurs et cartes de développement"},
            {"name": "Modules", "slug": "modules", "description": "Modules de communication et capteurs"},
            {"name": "Outils", "slug": "outils", "description": "Outils et équipements électroniques"}
        ]
        
        categories = []
        for cat_data in categories_data:
            existing_cat = db.query(Category).filter(Category.slug == cat_data["slug"]).first()
            if not existing_cat:
                category = Category(**cat_data)
                db.add(category)
                categories.append(category)
            else:
                categories.append(existing_cat)
        
        db.commit()
        print("✅ Catégories créées")
        
        # 3. Créer des produits
        print("🛍️ Création des produits...")
        products_data = [
            {
                "name": "Arduino Uno R3",
                "description": "Carte de prototypage idéale pour apprendre l'électronique et la programmation.",
                "price": 12000.0,
                "stock": 15,
                "reference": "ARD-UNO-R3",
                "category_id": categories[0].id,
                "is_active": True
            },
            {
                "name": "Capteur DS18B20",
                "description": "Capteur de température numérique précis pour projets IoT.",
                "price": 3500.0,
                "stock": 42,
                "reference": "CAP-DS18B20",
                "category_id": categories[1].id,
                "is_active": True
            },
            {
                "name": "Kit Robot Éducatif",
                "description": "Kit complet pour découvrir la robotique avec des ateliers pratiques.",
                "price": 65000.0,
                "stock": 8,
                "reference": "KIT-ROBOT-EDU",
                "category_id": categories[2].id,
                "is_active": True
            },
            {
                "name": "Panneau Solaire 100W",
                "description": "Panneau solaire monocristallin 100W pour installations domestiques.",
                "price": 120000.0,
                "stock": 20,
                "reference": "SOL-100W",
                "category_id": categories[3].id,
                "is_active": True
            },
            {
                "name": "Batterie 12V 20Ah",
                "description": "Batterie AGM 12V 20Ah pour systèmes solaires.",
                "price": 90000.0,
                "stock": 12,
                "reference": "BAT-12V-20AH",
                "category_id": categories[3].id,
                "is_active": True
            },
            {
                "name": "Raspberry Pi 4 (4GB)",
                "description": "Mini-ordinateur polyvalent pour projets IoT et IA.",
                "price": 150000.0,
                "stock": 6,
                "reference": "RPI4-4GB",
                "category_id": categories[4].id,
                "is_active": True
            },
            {
                "name": "ESP32 DevKit",
                "description": "Module Wi-Fi/Bluetooth pour projets IoT avancés.",
                "price": 18000.0,
                "stock": 25,
                "reference": "ESP32-DEVKIT",
                "category_id": categories[4].id,
                "is_active": True
            },
            {
                "name": "Module Bluetooth HC-05",
                "description": "Module Bluetooth classique pour communication série avec microcontrôleurs.",
                "price": 7000.0,
                "stock": 30,
                "reference": "BT-HC05",
                "category_id": categories[5].id,
                "is_active": True
            },
            {
                "name": "Multimètre Digital",
                "description": "Multimètre professionnel pour mesures électriques précises.",
                "price": 25000.0,
                "stock": 10,
                "reference": "MM-DIGITAL",
                "category_id": categories[6].id,
                "is_active": True
            },
            {
                "name": "Fer à Souder 60W",
                "description": "Fer à souder professionnel avec contrôle de température.",
                "price": 15000.0,
                "stock": 8,
                "reference": "FER-60W",
                "category_id": categories[6].id,
                "is_active": True
            }
        ]
        
        for prod_data in products_data:
            existing_prod = db.query(Product).filter(Product.reference == prod_data["reference"]).first()
            if not existing_prod:
                product = Product(**prod_data)
                db.add(product)
        
        db.commit()
        print("✅ Produits créés")
        
        # 4. Créer des formations
        print("🎓 Création des formations...")
        trainings_data = [
            {
                "title": "Formation Arduino – Débutant",
                "description": "Apprenez les bases de l'Arduino avec des projets pratiques. Cette formation couvre la programmation, l'électronique de base et la réalisation de projets concrets.",
                "date": datetime.now() + timedelta(days=30),
                "duration": "2 jours",
                "price": 25000.0,
                "is_active": True
            },
            {
                "title": "Introduction à l'IoT",
                "description": "Découvrez l'Internet des Objets avec des capteurs, modules de communication et projets connectés. Formation pratique avec matériel fourni.",
                "date": datetime.now() + timedelta(days=45),
                "duration": "3 jours",
                "price": 40000.0,
                "is_active": True
            },
            {
                "title": "Programmation Python pour l'IoT",
                "description": "Maîtrisez Python pour développer des applications IoT. De la programmation de base aux interfaces avec capteurs et modules.",
                "date": datetime.now() + timedelta(days=60),
                "duration": "4 jours",
                "price": 50000.0,
                "is_active": True
            },
            {
                "title": "Installation de Systèmes Solaires",
                "description": "Formation complète sur l'installation et la maintenance de systèmes solaires photovoltaïques.",
                "date": datetime.now() + timedelta(days=75),
                "duration": "5 jours",
                "price": 75000.0,
                "is_active": True
            },
            {
                "title": "Robotique avec Raspberry Pi",
                "description": "Construisez et programmez des robots intelligents avec Raspberry Pi. Projets pratiques de robotique avancée.",
                "date": datetime.now() + timedelta(days=90),
                "duration": "3 jours",
                "price": 60000.0,
                "is_active": True
            }
        ]
        
        for train_data in trainings_data:
            existing_train = db.query(Training).filter(Training.title == train_data["title"]).first()
            if not existing_train:
                training = Training(**train_data)
                db.add(training)
        
        db.commit()
        print("✅ Formations créées")
        
        # 5. Créer des articles de blog
        print("📝 Création des articles de blog...")
        blog_posts_data = [
            {
                "title": "Démarrer en électronique : Guide du débutant",
                "content": "L'électronique peut sembler intimidante au premier abord, mais avec les bons outils et une approche méthodique, vous pouvez rapidement maîtriser les bases. Dans cet article, nous vous guidons à travers les concepts fondamentaux...",
                "excerpt": "Les bases pour débuter en électronique avec des projets simples et pratiques.",
                "slug": "demarrer-electronique-guide-debutant",
                "is_published": True
            },
            {
                "title": "IoT au Togo : Opportunités et Défis",
                "content": "L'Internet des Objets (IoT) représente une opportunité majeure pour le développement économique du Togo. Avec une population jeune et technophile, le pays est bien positionné pour adopter ces technologies...",
                "excerpt": "Pourquoi l'IoT est une chance pour le développement du Togo et comment en profiter.",
                "slug": "iot-togo-opportunites-defis",
                "is_published": True
            },
            {
                "title": "Arduino vs Raspberry Pi : Quel choisir ?",
                "content": "Arduino et Raspberry Pi sont deux plateformes populaires pour les projets électroniques, mais elles servent des objectifs différents. Découvrez leurs forces et faiblesses pour faire le bon choix...",
                "excerpt": "Comparaison détaillée entre Arduino et Raspberry Pi pour vos projets.",
                "slug": "arduino-vs-raspberry-pi-comparaison",
                "is_published": True
            },
            {
                "title": "Énergie Solaire au Togo : Guide Pratique",
                "content": "Le Togo bénéficie d'un excellent ensoleillement tout au long de l'année, ce qui en fait un terrain idéal pour l'énergie solaire. Ce guide pratique vous explique comment installer votre propre système...",
                "excerpt": "Comment installer et optimiser un système solaire au Togo.",
                "slug": "energie-solaire-togo-guide-pratique",
                "is_published": True
            },
            {
                "title": "Programmation Python pour l'IoT : Premiers Pas",
                "content": "Python est devenu le langage de référence pour l'IoT grâce à sa simplicité et sa richesse de bibliothèques. Découvrez comment utiliser Python pour vos projets IoT...",
                "excerpt": "Apprenez à utiliser Python pour développer des applications IoT.",
                "slug": "python-iot-premiers-pas",
                "is_published": True
            }
        ]
        
        for post_data in blog_posts_data:
            existing_post = db.query(BlogPost).filter(BlogPost.slug == post_data["slug"]).first()
            if not existing_post:
                blog_post = BlogPost(**post_data)
                db.add(blog_post)
        
        db.commit()
        print("✅ Articles de blog créés")
        
        # 6. Créer des projets
        print("🚀 Création des projets...")
        projects_data = [
            {
                "name": "Station Météo IoT",
                "description": "Station météorologique connectée utilisant des capteurs Arduino et transmission de données via WiFi.",
                "technologies": "Arduino, ESP32, Capteurs DHT22, BME280, API REST",
                "github_url": "https://github.com/citil/station-meteo-iot",
                "demo_url": "https://demo.citil.tg/meteo",
                "is_active": True
            },
            {
                "name": "Système d'Irrigation Intelligent",
                "description": "Système d'irrigation automatisé avec capteurs d'humidité et contrôle à distance via application mobile.",
                "technologies": "Raspberry Pi, Capteurs d'humidité, Relais, Python, Flask",
                "github_url": "https://github.com/citil/irrigation-intelligent",
                "demo_url": "https://demo.citil.tg/irrigation",
                "is_active": True
            },
            {
                "name": "Suivi de Production Solaire",
                "description": "Application web pour le suivi en temps réel de la production d'énergie solaire avec graphiques et alertes.",
                "technologies": "React, Node.js, Base de données temps réel, Graphiques",
                "github_url": "https://github.com/citil/suivi-solaire",
                "demo_url": "https://demo.citil.tg/solaire",
                "is_active": True
            },
            {
                "name": "Robot Suiveur de Ligne",
                "description": "Robot autonome capable de suivre une ligne noire avec détection d'obstacles et communication Bluetooth.",
                "technologies": "Arduino, Moteurs DC, Capteurs infrarouges, Bluetooth HC-05",
                "github_url": "https://github.com/citil/robot-suiveur",
                "demo_url": "https://demo.citil.tg/robot",
                "is_active": True
            }
        ]
        
        for proj_data in projects_data:
            existing_proj = db.query(Project).filter(Project.name == proj_data["name"]).first()
            if not existing_proj:
                project = Project(**proj_data)
                db.add(project)
        
        db.commit()
        print("✅ Projets créés")
        
        # 7. Créer des candidatures de stage
        print("📋 Création des candidatures de stage...")
        applications_data = [
            {
                "full_name": "Kodjo A.",
                "email": "kodjo@exemple.com",
                "phone": "+228 94 44 55 66",
                "message": "Passionné par l'IoT et l'électronique. Je souhaite contribuer aux projets innovants de CITIL.",
                "status": "received"
            },
            {
                "full_name": "Aicha B.",
                "email": "aicha@exemple.com",
                "phone": "+228 95 55 66 77",
                "message": "Développeuse web avec expérience en React et Node.js. Intéressée par les projets IoT.",
                "status": "reviewed"
            },
            {
                "full_name": "Komlan C.",
                "email": "komlan@exemple.com",
                "phone": "+228 96 66 77 88",
                "message": "Étudiant en génie électrique, spécialisé en énergies renouvelables. Motivé pour apprendre.",
                "status": "accepted"
            },
            {
                "full_name": "Fatou D.",
                "email": "fatou@exemple.com",
                "phone": "+228 97 77 88 99",
                "message": "Passionnée de robotique et programmation Python. Prête à contribuer aux projets CITIL.",
                "status": "received"
            }
        ]
        
        for app_data in applications_data:
            existing_app = db.query(InternshipApplication).filter(
                InternshipApplication.email == app_data["email"]
            ).first()
            if not existing_app:
                application = InternshipApplication(**app_data)
                db.add(application)
        
        db.commit()
        print("✅ Candidatures de stage créées")
        
        # 8. Créer quelques commandes d'exemple
        print("🛒 Création des commandes d'exemple...")
        users = db.query(User).filter(User.role == "client").all()
        products = db.query(Product).all()
        
        if users and products:
            # Créer 3 commandes d'exemple
            for i in range(3):
                user = random.choice(users)
                order_items = []
                total_amount = 0
                
                # Ajouter 2-4 produits par commande
                num_products = random.randint(2, 4)
                selected_products = random.sample(products, min(num_products, len(products)))
                
                for product in selected_products:
                    quantity = random.randint(1, 3)
                    order_item = OrderItem(
                        product_id=product.id,
                        quantity=quantity,
                        price=product.price
                    )
                    order_items.append(order_item)
                    total_amount += product.price * quantity
                
                order = Order(
                    user_id=user.id,
                    total_amount=total_amount,
                    status=random.choice(["pending", "confirmed", "shipped"]),
                    shipping_address=f"Adresse de livraison {i+1}, Lomé, Togo",
                    notes=f"Commande d'exemple {i+1}"
                )
                
                db.add(order)
                db.flush()  # Pour obtenir l'ID
                
                for item in order_items:
                    item.order_id = order.id
                    db.add(item)
        
        db.commit()
        print("✅ Commandes créées")
        
        print("\n🎉 Base de données peuplée avec succès !")
        print("\n📊 Résumé des données créées :")
        print(f"👥 Utilisateurs : {db.query(User).count()}")
        print(f"📂 Catégories : {db.query(Category).count()}")
        print(f"🛍️ Produits : {db.query(Product).count()}")
        print(f"🎓 Formations : {db.query(Training).count()}")
        print(f"📝 Articles de blog : {db.query(BlogPost).count()}")
        print(f"🚀 Projets : {db.query(Project).count()}")
        print(f"📋 Candidatures : {db.query(InternshipApplication).count()}")
        print(f"🛒 Commandes : {db.query(Order).count()}")
        
    except Exception as e:
        print(f"❌ Erreur lors de la création des données : {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    create_sample_data()
