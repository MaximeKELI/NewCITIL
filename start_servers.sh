#!/bin/bash

echo "🚀 DÉMARRAGE DES SERVEURS POUR LA SOUTENANCE"
echo "============================================="

# Arrêter les processus existants
echo "1. Arrêt des processus existants..."
pkill -f "php artisan serve" 2>/dev/null
pkill -f "npm start" 2>/dev/null
sleep 2

# Démarrer le backend
echo "2. Démarrage du backend Laravel (port 8002)..."
cd /home/maxime/PLATEFORME-CITIL/citil-backend
php artisan serve --host=0.0.0.0 --port=8002 &
BACKEND_PID=$!
echo "Backend démarré avec PID: $BACKEND_PID"

# Attendre que le backend soit prêt
echo "3. Attente du démarrage du backend..."
sleep 5

# Tester le backend
echo "4. Test du backend..."
if curl -s http://localhost:8002/api/test > /dev/null; then
    echo "✅ Backend opérationnel"
else
    echo "❌ Problème avec le backend"
fi

# Démarrer le frontend
echo "5. Démarrage du frontend React (port 3000)..."
cd /home/maxime/PLATEFORME-CITIL/citil-frontend
npm start &
FRONTEND_PID=$!
echo "Frontend démarré avec PID: $FRONTEND_PID"

# Attendre que le frontend soit prêt
echo "6. Attente du démarrage du frontend..."
sleep 10

# Tester le frontend
echo "7. Test du frontend..."
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Frontend opérationnel"
else
    echo "❌ Problème avec le frontend"
fi

echo ""
echo "🎉 SERVEURS DÉMARRÉS AVEC SUCCÈS !"
echo "=================================="
echo "Frontend: http://localhost:3000"
echo "Backend:  http://localhost:8002"
echo "Admin:    http://localhost:3000/admin-login"
echo ""
echo "Identifiants admin:"
echo "Email: admin@citil.com"
echo "Mot de passe: password"
echo ""
echo "Pour arrêter les serveurs:"
echo "kill $BACKEND_PID $FRONTEND_PID"
echo ""

# Garder le script actif
echo "Serveurs en cours d'exécution... (Ctrl+C pour arrêter)"
wait
