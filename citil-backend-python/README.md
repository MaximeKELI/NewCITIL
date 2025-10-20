# CITIL Backend Python/FastAPI

## 🚀 Nouveau Backend pour la Plateforme CITIL

Ce nouveau backend remplace l'ancien backend Laravel/PHP avec une architecture moderne basée sur **Python/FastAPI**.

## ✨ Fonctionnalités

- **Authentification JWT** : Système d'authentification moderne et sécurisé
- **API REST complète** : Toutes les fonctionnalités de l'ancien backend
- **Gestion des fichiers** : Upload et optimisation automatique des images
- **Base de données SQLite** : Simple et efficace pour le développement
- **Documentation automatique** : Swagger/OpenAPI intégré
- **Validation des données** : Validation automatique avec Pydantic
- **CORS configuré** : Compatible avec le frontend React

## 🛠️ Technologies Utilisées

- **FastAPI** : Framework web moderne et rapide
- **SQLAlchemy** : ORM pour la base de données
- **JWT** : Authentification par tokens
- **Pillow** : Gestion et optimisation des images
- **Pydantic** : Validation des données
- **SQLite** : Base de données légère

## 📋 Endpoints Disponibles

### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `GET /api/auth/me` - Informations utilisateur
- `POST /api/auth/logout` - Déconnexion
- `POST /api/profile` - Mise à jour du profil

### Produits
- `GET /api/products` - Liste des produits
- `GET /api/products/{id}` - Détail d'un produit
- `POST /api/admin/products` - Créer un produit (admin)
- `PUT /api/admin/products/{id}` - Modifier un produit (admin)
- `DELETE /api/admin/products/{id}` - Supprimer un produit (admin)

### Catégories
- `GET /api/categories` - Liste des catégories
- `POST /api/admin/categories` - Créer une catégorie (admin)
- `PUT /api/admin/categories/{id}` - Modifier une catégorie (admin)
- `DELETE /api/admin/categories/{id}` - Supprimer une catégorie (admin)

### Formations
- `GET /api/trainings` - Liste des formations
- `GET /api/trainings/{id}` - Détail d'une formation
- `POST /api/admin/trainings` - Créer une formation (admin)
- `PUT /api/admin/trainings/{id}` - Modifier une formation (admin)
- `DELETE /api/admin/trainings/{id}` - Supprimer une formation (admin)

### Blog
- `GET /api/blog-posts` - Liste des articles
- `GET /api/blog-posts/{id}` - Détail d'un article
- `POST /api/admin/blog-posts` - Créer un article (admin)
- `PUT /api/admin/blog-posts/{id}` - Modifier un article (admin)
- `DELETE /api/admin/blog-posts/{id}` - Supprimer un article (admin)

### Projets
- `GET /api/projects` - Liste des projets
- `GET /api/projects/{id}` - Détail d'un projet
- `POST /api/admin/projects` - Créer un projet (admin)
- `PUT /api/admin/projects/{id}` - Modifier un projet (admin)
- `DELETE /api/admin/projects/{id}` - Supprimer un projet (admin)

### Candidatures de Stage
- `POST /api/internship-applications` - Soumettre une candidature
- `GET /api/admin/internship-applications` - Liste des candidatures (admin)
- `PUT /api/admin/internship-applications/{id}` - Modifier le statut (admin)

### Commandes
- `POST /api/admin/orders` - Créer une commande (admin)
- `GET /api/admin/orders` - Liste des commandes (admin)
- `PUT /api/admin/orders/{id}` - Modifier le statut (admin)

## 🚀 Démarrage Rapide

1. **Cloner et naviguer vers le dossier** :
   ```bash
   cd citil-backend-python
   ```

2. **Démarrer le serveur** :
   ```bash
   ./start_server.sh
   ```

3. **Accéder à l'API** :
   - Serveur : http://localhost:8001
   - Documentation : http://localhost:8001/docs
   - Interface alternative : http://localhost:8001/redoc

## 👤 Compte Admin par Défaut

- **Email** : admin@citil.tg
- **Mot de passe** : admin123

## 🔧 Configuration

Le fichier `config.py` contient toutes les configurations :
- Clé secrète JWT
- URL de base de données
- Paramètres d'upload de fichiers
- Configuration CORS

## 📁 Structure du Projet

```
citil-backend-python/
├── app/
│   ├── api/
│   │   ├── endpoints/     # Routes API
│   │   └── core/         # Dépendances et utilitaires
│   ├── database/         # Configuration base de données
│   ├── models/          # Modèles SQLAlchemy
│   ├── schemas/         # Schémas Pydantic
│   ├── services/        # Services métier
│   └── utils/           # Utilitaires
├── uploads/             # Fichiers uploadés
├── tests/               # Tests unitaires
├── main.py              # Point d'entrée
├── config.py            # Configuration
├── requirements.txt     # Dépendances
└── start_server.sh      # Script de démarrage
```

## 🔄 Migration depuis Laravel

Ce nouveau backend est **100% compatible** avec le frontend React existant. Les endpoints sont identiques et les réponses JSON suivent le même format.

### Changements principaux :
- **Authentification** : JWT au lieu de Sanctum
- **Port** : 8001 au lieu de 8000
- **Performance** : Plus rapide et plus léger
- **Maintenance** : Code plus simple et plus lisible

## 🧪 Tests

Pour tester l'API, vous pouvez utiliser :
- La documentation interactive : http://localhost:8001/docs
- Postman ou Insomnia
- curl depuis le terminal

## 📝 Notes

- Le backend Laravel original est conservé dans `citil-backend/`
- Ce nouveau backend est prêt pour la production
- Compatible avec Docker pour le déploiement
- Support des migrations de base de données avec Alembic
