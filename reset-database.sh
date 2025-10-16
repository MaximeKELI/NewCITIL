#!/bin/bash

echo "🔄 Réinitialisation de la base de données..."

# Aller dans le dossier backend
cd citil-backend

# Supprimer la base de données existante
echo "🗑️  Suppression de la base de données existante..."
rm -f database/database.sqlite

# Créer une nouvelle base de données
echo "📦 Création d'une nouvelle base de données..."
touch database/database.sqlite

# Exécuter les migrations
echo "🔧 Exécution des migrations..."
php artisan migrate --force

# Exécuter seulement le seeder admin
echo "👤 Création de l'utilisateur admin..."
php artisan db:seed --class=AdminUserSeeder --force

echo "✅ Base de données réinitialisée avec succès !"
echo "📝 Seul l'utilisateur admin a été créé."
echo "🔑 Connectez-vous avec les identifiants admin pour commencer à ajouter du contenu."
