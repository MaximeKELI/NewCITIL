#!/bin/bash

# Script de démarrage pour le backend Python/FastAPI CITIL

echo "🚀 Démarrage du backend CITIL Python/FastAPI..."

# Vérifier si Python est installé
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

# Vérifier si pip est installé
if ! command -v pip3 &> /dev/null; then
    echo "❌ pip3 n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

# Créer un environnement virtuel s'il n'existe pas
if [ ! -d "venv" ]; then
    echo "📦 Création de l'environnement virtuel..."
    python3 -m venv venv
fi

# Activer l'environnement virtuel
echo "🔧 Activation de l'environnement virtuel..."
source venv/bin/activate

# Installer les dépendances
echo "📚 Installation des dépendances..."
pip install -r requirements.txt

# Créer les dossiers nécessaires
echo "📁 Création des dossiers..."
mkdir -p uploads/{avatars,products,trainings,blog,projects,cv}

# Créer la base de données SQLite
echo "🗄️ Initialisation de la base de données..."
python -c "
from app.database.database import engine
from app.models.models import Base
Base.metadata.create_all(bind=engine)
print('Base de données créée avec succès!')
"

# Vérifier si la base de données est peuplée
echo "🔍 Vérification de la base de données..."
USER_COUNT=$(python -c "
from app.database.database import SessionLocal
from app.models.models import User
db = SessionLocal()
count = db.query(User).count()
db.close()
print(count)
")

if [ "$USER_COUNT" -eq "0" ]; then
    echo "📊 Base de données vide, peuplement avec des données de test..."
    python populate_database.py
else
    echo "✅ Base de données déjà peuplée ($USER_COUNT utilisateurs)"
fi

echo "✅ Configuration terminée!"
echo ""
echo "🌐 Démarrage du serveur sur http://localhost:8001"
echo "📚 Documentation API: http://localhost:8001/docs"
echo "🔧 Interface alternative: http://localhost:8001/redoc"
echo ""
echo "👤 Compte admin par défaut:"
echo "   Email: admin@citil.tg"
echo "   Mot de passe: admin123"
echo ""
echo "Appuyez sur Ctrl+C pour arrêter le serveur"
echo ""

# Démarrer le serveur
uvicorn main:app --host 0.0.0.0 --port 8001 --reload
