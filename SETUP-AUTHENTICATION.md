# 🔐 Configuration d'Authentification CITIL

## ✅ Problèmes Corrigés

### 1. **Modèle User**
- ❌ **Problème** : `HasApiTokens` utilisé deux fois
- ✅ **Corrigé** : Suppression du doublon

### 2. **Routes API**
- ❌ **Problème** : Import manquant du `AuthController`
- ✅ **Corrigé** : Ajout de l'import dans `routes/api.php`

### 3. **Configuration CORS**
- ❌ **Problème** : Seul `localhost:3000` autorisé
- ✅ **Corrigé** : Ajout de tous les ports frontend (3000, 5173, 127.0.0.1)

### 4. **Configuration Auth**
- ❌ **Problème** : Guard Sanctum manquant
- ✅ **Corrigé** : Ajout du guard `sanctum` dans `config/auth.php`

## 🚀 Configuration Rapide

### Option 1: Configuration Automatique
```bash
# Exécuter le script de configuration complète
setup-complete.bat
```

### Option 2: Configuration Manuelle

#### Backend Laravel
```bash
cd citil-backend

# 1. Installer les dépendances
composer install

# 2. Générer la clé d'application
php artisan key:generate

# 3. Créer la base de données SQLite
type nul > database/database.sqlite

# 4. Exécuter les migrations
php artisan migrate --force

# 5. Créer l'utilisateur admin
php artisan db:seed --class=AdminUserSeeder

# 6. Démarrer le serveur
php artisan serve
```

#### Frontend React
```bash
cd citil-frontend

# 1. Installer les dépendances
npm install

# 2. Démarrer le serveur de développement
npm run dev
```

## 🔑 Comptes de Test

### Administrateur
- **Email** : `admin@citil.tg`
- **Mot de passe** : `password`
- **Rôle** : `admin`

## 🌐 URLs d'Accès

- **Backend API** : http://localhost:8000
- **Frontend** : http://localhost:3000
- **API Documentation** : http://localhost:8000/api

## 🔧 Configuration d'Authentification

### Sanctum SPA Configuration
- **CSRF Protection** : Activé
- **Stateful Domains** : localhost:3000, 127.0.0.1:3000
- **Token Expiration** : Illimitée (null)
- **Credentials** : Activé

### CORS Configuration
```php
'allowed_origins' => [
    'http://localhost:3000',
    'http://127.0.0.1:3000'
],
'supports_credentials' => true
```

## 📡 Endpoints API

### Authentification
- `POST /api/login` - Connexion
- `POST /api/logout` - Déconnexion (protégé)
- `GET /api/user` - Profil utilisateur (protégé)

### Routes Publiques
- `GET /api/products` - Liste des produits
- `GET /api/trainings` - Liste des formations
- `GET /api/blog-posts` - Articles de blog
- `POST /api/internship-applications` - Candidatures

### Routes Protégées (Admin)
- `GET/POST/PUT/DELETE /api/admin/products` - Gestion produits
- `GET/POST/PUT/DELETE /api/admin/trainings` - Gestion formations
- `GET/POST/PUT/DELETE /api/admin/blog-posts` - Gestion blog
- `GET /api/admin/internship-applications` - Liste candidatures

## 🛡️ Sécurité

### Middleware d'Authentification
- **Sanctum** : Pour l'API token authentication
- **CORS** : Configuration pour les domaines autorisés
- **CSRF** : Protection contre les attaques CSRF

### Base de Données
- **SQLite** : Base de données locale
- **Migrations** : Structure complète créée
- **Seeders** : Utilisateur admin créé automatiquement

## 🐛 Dépannage

### Problèmes Courants

1. **Erreur CORS**
   - Vérifier que le frontend utilise le bon port
   - Vérifier la configuration CORS dans `config/cors.php`

2. **Erreur 419 (CSRF)**
   - Vérifier que Sanctum est bien configuré
   - Vérifier les domaines stateful dans `config/sanctum.php`

3. **Erreur 401 (Non authentifié)**
   - Vérifier que le token est bien stocké dans localStorage
   - Vérifier que l'API service utilise le bon token

### Logs
- **Backend** : `storage/logs/laravel.log`
- **Frontend** : Console du navigateur

## ✅ Vérification

Pour vérifier que tout fonctionne :

1. **Backend** : http://localhost:8000/api/products
2. **Frontend** : http://localhost:3000
3. **Login** : Utiliser admin@citil.tg / password
4. **Navigation** : Tester les pages protégées

---

🎉 **L'authentification est maintenant complètement configurée et fonctionnelle !**
