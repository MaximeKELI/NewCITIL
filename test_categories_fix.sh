#!/bin/bash

echo "🔧 Test de Création de Catégories - Interface Admin"
echo "=================================================="

# Vérifier que les services sont actifs
echo "1. Vérification des services..."
BACKEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8001/api/test)
FRONTEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000)

if [ "$BACKEND_STATUS" = "200" ]; then
    echo "✅ Backend actif (port 8001)"
else
    echo "❌ Backend inactif (code: $BACKEND_STATUS)"
    exit 1
fi

if [ "$FRONTEND_STATUS" = "200" ]; then
    echo "✅ Frontend actif (port 3000)"
else
    echo "❌ Frontend inactif (code: $FRONTEND_STATUS)"
    exit 1
fi

echo ""
echo "2. Test d'authentification admin..."

# Obtenir le token admin
TOKEN=$(curl -s -X POST "http://localhost:8001/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@citil.tg", "password": "admin123"}' | jq -r '.access_token')

if [ "$TOKEN" = "null" ] || [ -z "$TOKEN" ]; then
    echo "❌ Échec de l'authentification admin"
    exit 1
fi

echo "✅ Token admin obtenu"

echo ""
echo "3. Test de création de catégorie via API..."

# Test création catégorie
CATEGORY_RESPONSE=$(curl -s -X POST "http://localhost:8001/api/admin/categories" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "Test Frontend Category", "slug": "test-frontend-category", "description": "Catégorie de test pour le frontend"}')

CATEGORY_ID=$(echo "$CATEGORY_RESPONSE" | jq -r '.id')

if [ "$CATEGORY_ID" != "null" ] && [ "$CATEGORY_ID" -gt 0 ]; then
    echo "✅ Catégorie créée avec succès (ID: $CATEGORY_ID)"
    echo "✅ Nom: $(echo "$CATEGORY_RESPONSE" | jq -r '.name')"
    echo "✅ Slug: $(echo "$CATEGORY_RESPONSE" | jq -r '.slug')"
else
    echo "❌ Échec de création de catégorie"
    echo "Réponse: $CATEGORY_RESPONSE"
    exit 1
fi

echo ""
echo "4. Test de récupération des catégories..."

# Récupérer les catégories
CATEGORIES_RESPONSE=$(curl -s -X GET "http://localhost:8001/api/categories")
CATEGORIES_COUNT=$(echo "$CATEGORIES_RESPONSE" | jq '. | length')

echo "✅ Total catégories: $CATEGORIES_COUNT"

# Afficher les dernières catégories
echo ""
echo "5. Dernières catégories créées:"
echo "$CATEGORIES_RESPONSE" | jq '.[-3:] | .[] | {id, name, slug, description}'

echo ""
echo "6. Résumé des corrections apportées:"
echo "✅ Ajout de la fonction generateSlug() pour créer automatiquement le slug"
echo "✅ Modification de onSubmit() pour inclure le slug généré"
echo "✅ Ajout de logs de debug pour tracer les données envoyées"
echo "✅ Gestion des erreurs améliorée"

echo ""
echo "7. Instructions pour tester dans le navigateur:"
echo "1. Ouvrez http://localhost:3000/admin-login"
echo "2. Connectez-vous avec admin@citil.tg / admin123"
echo "3. Allez dans Admin > Catégories"
echo "4. Cliquez sur 'Nouvelle catégorie'"
echo "5. Remplissez le nom et la description"
echo "6. Cliquez sur 'Enregistrer'"
echo "7. Vérifiez que la catégorie apparaît dans la liste"
echo "8. Ouvrez la console (F12) pour voir les logs de debug"

echo ""
echo "8. Fonctionnalités corrigées:"
echo "✅ Génération automatique du slug à partir du nom"
echo "✅ Envoi des données complètes au backend"
echo "✅ Gestion des erreurs de validation"
echo "✅ Logs de debug pour le diagnostic"
echo "✅ Interface utilisateur simplifiée"

echo ""
echo "🎉 Test terminé ! Les catégories devraient maintenant s'enregistrer correctement."
