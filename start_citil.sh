#!/bin/bash

# Script de démarrage pour la plateforme CITIL complète
# Démarre le backend Python/FastAPI et le frontend React

echo "🚀 Démarrage de la plateforme CITIL..."
echo ""

# Couleurs pour les logs
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Fonction pour afficher les logs avec couleur
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Vérifier si les dossiers existent
if [ ! -d "citil-backend-python" ]; then
    log_error "Dossier citil-backend-python non trouvé!"
    exit 1
fi

if [ ! -d "citil-frontend" ]; then
    log_error "Dossier citil-frontend non trouvé!"
    exit 1
fi

# Fonction pour nettoyer les processus en arrière-plan
cleanup() {
    log_info "Arrêt des serveurs..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit 0
}

# Capturer Ctrl+C
trap cleanup SIGINT

# Démarrer le backend Python/FastAPI
log_info "Démarrage du backend Python/FastAPI sur le port 8001..."
cd citil-backend-python
source venv/bin/activate
python main.py &
BACKEND_PID=$!
cd ..

# Attendre que le backend démarre
sleep 3

# Vérifier si le backend fonctionne
if curl -s http://localhost:8001/ > /dev/null; then
    log_success "Backend Python/FastAPI démarré avec succès!"
else
    log_error "Échec du démarrage du backend!"
    exit 1
fi

# Démarrer le frontend React
log_info "Démarrage du frontend React sur le port 3000..."
cd citil-frontend
npm start &
FRONTEND_PID=$!
cd ..

# Attendre que le frontend démarre
sleep 5

log_success "🎉 Plateforme CITIL démarrée avec succès!"
echo ""
echo "📱 Frontend React: http://localhost:3000"
echo "🔧 Backend Python/FastAPI: http://localhost:8001"
echo "📚 Documentation API: http://localhost:8001/docs"
echo "🔧 Interface alternative: http://localhost:8001/redoc"
echo ""
echo "👤 Compte admin par défaut:"
echo "   Email: admin@citil.tg"
echo "   Mot de passe: admin123"
echo ""
echo "Appuyez sur Ctrl+C pour arrêter tous les serveurs"
echo ""

# Attendre que l'utilisateur arrête les serveurs
wait
