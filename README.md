# Plateforme CITIL - Mémoire de BTS

Application web full-stack développée avec :
- **Frontend** : React.js
- **Backend** : Laravel 12
- **Base de données** : MySQL

## Structure du projet

citil-projet/
├── backend/     → API Laravel
├── frontend/    → Interface React
└── .gitignore   → Fichier de sécurité


## Installation

### Backend
```bash
cd backend
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate --seed
php artisan serve

# ### Frontend

cd frontend
cp .env.example .env
npm install
npm start

# Accès : 

    Frontend : http://localhost:3000 
    API : http://localhost:8000/api


---

###  ✅ Ordre des commandes Git

# Depuis la racine `citil-projet/` :

# bash

git init
git add .
git commit -m "Projet initialisé : backend Laravel + frontend React"
git remote add originhttps://github.com/FulbertDev-AI/PLATEFORME-CITIL.git
git branch -M main
git push -u origin main# CITIL
