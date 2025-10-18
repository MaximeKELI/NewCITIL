#!/bin/bash
cd /home/maxime/PLATEFORME-CITIL/citil-backend

# Vérifier que Laravel fonctionne
echo "Vérification de Laravel..."
php artisan --version

# Nettoyer les caches
echo "Nettoyage des caches..."
php artisan config:clear
php artisan cache:clear
php artisan route:clear

# Démarrer le serveur
echo "Démarrage du serveur Laravel..."
php artisan serve --host=0.0.0.0 --port=8001