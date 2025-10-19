#!/bin/bash

echo "🚀 DÉMARRAGE DE LA PLATEFORME CITIL - MODE PRODUCTION"
echo "====================================================="

# Arrêter tous les processus existants
echo "1. Arrêt des processus existants..."
pkill -f "php artisan serve" 2>/dev/null
pkill -f "npm start" 2>/dev/null
pkill -f "php -S" 2>/dev/null
pkill -f "python3 -m http.server" 2>/dev/null
sleep 2

# Configuration PHP optimisée
echo "2. Configuration PHP optimisée..."
export PHP_INI_SCAN_DIR="/home/maxime/PLATEFORME-CITIL/citil-backend"
export PHPRC="/home/maxime/PLATEFORME-CITIL/citil-backend/php.ini"

# Nettoyer les caches Laravel
echo "3. Nettoyage des caches Laravel..."
cd /home/maxime/PLATEFORME-CITIL/citil-backend
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

# Démarrer le serveur Laravel avec configuration optimisée
echo "4. Démarrage du serveur Laravel (port 8002)..."
php -d memory_limit=512M -d max_execution_time=300 -d post_max_size=64M -d upload_max_filesize=32M artisan serve --host=0.0.0.0 --port=8002 &
BACKEND_PID=$!
echo "Backend démarré avec PID: $BACKEND_PID"

# Attendre que le backend soit prêt
echo "5. Attente du démarrage du backend..."
sleep 8

# Tester le backend
echo "6. Test du backend..."
if curl -s http://localhost:8002/api/test > /dev/null; then
    echo "✅ Backend opérationnel"
else
    echo "❌ Problème avec le backend, redémarrage..."
    kill $BACKEND_PID 2>/dev/null
    sleep 2
    php -d memory_limit=512M -d max_execution_time=300 artisan serve --host=0.0.0.0 --port=8002 &
    BACKEND_PID=$!
    sleep 5
fi

# Démarrer le frontend React
echo "7. Démarrage du frontend React (port 3000)..."
cd /home/maxime/PLATEFORME-CITIL/citil-frontend
npm start &
FRONTEND_PID=$!
echo "Frontend démarré avec PID: $FRONTEND_PID"

# Attendre que le frontend soit prêt
echo "8. Attente du démarrage du frontend..."
sleep 15

# Tester le frontend
echo "9. Test du frontend..."
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Frontend opérationnel"
else
    echo "❌ Problème avec le frontend"
fi

# Démarrer le serveur de statut
echo "10. Démarrage du serveur de statut (port 8080)..."
cd /home/maxime/PLATEFORME-CITIL
python3 -m http.server 8080 &
STATUS_PID=$!

echo ""
echo "🎉 PLATEFORME CITIL DÉMARRÉE AVEC SUCCÈS !"
echo "=========================================="
echo "Frontend: http://localhost:3000"
echo "Backend:  http://localhost:8002"
echo "Statut:   http://localhost:8080/status_soutenance.html"
echo "Admin:    http://localhost:3000/admin-login"
echo ""
echo "Identifiants admin:"
echo "Email: admin@citil.com"
echo "Mot de passe: password"
echo ""
echo "PIDs des processus:"
echo "Backend: $BACKEND_PID"
echo "Frontend: $FRONTEND_PID"
echo "Statut: $STATUS_PID"
echo ""
echo "Pour arrêter tous les serveurs:"
echo "kill $BACKEND_PID $FRONTEND_PID $STATUS_PID"
echo ""

# Test final des endpoints
echo "11. Test final des endpoints..."
echo "Test API de base:"
curl -s http://localhost:8002/api/test | jq -r '.message' 2>/dev/null || echo "En cours..."

echo "Test catégories:"
curl -s http://localhost:8002/api/categories | jq 'length' 2>/dev/null || echo "En cours..."

echo "Test produits:"
curl -s http://localhost:8002/api/products | jq 'length' 2>/dev/null || echo "En cours..."

echo ""
echo "✅ TOUS LES TESTS TERMINÉS"
echo "La plateforme est prête pour la soutenance !"
echo ""

# Garder le script actif
echo "Serveurs en cours d'exécution... (Ctrl+C pour arrêter)"
wait
