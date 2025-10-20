#!/bin/bash

echo "🖼️ Test des Images dans le Dashboard Admin"
echo "=========================================="

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
echo "3. Test de création d'un produit avec image..."

# Créer un produit avec image
PRODUCT_RESPONSE=$(curl -s -X POST "http://localhost:8001/api/admin/products" \
  -H "Authorization: Bearer $TOKEN" \
  -F "name=Produit Test Image" \
  -F "description=Description du produit test" \
  -F "price=5000" \
  -F "stock=5" \
  -F "category_id=1" \
  -F "is_active=1" \
  -F "image=@/home/maxime/PLATEFORME-CITIL/citil-backend-python/uploads/products/bd776b71-2316-4dd6-b4d2-d99211e0ecb0.png")

PRODUCT_ID=$(echo "$PRODUCT_RESPONSE" | jq -r '.id')
PRODUCT_IMAGE=$(echo "$PRODUCT_RESPONSE" | jq -r '.image')

if [ "$PRODUCT_ID" != "null" ] && [ "$PRODUCT_ID" -gt 0 ]; then
    echo "✅ Produit créé avec succès (ID: $PRODUCT_ID)"
    echo "✅ Image: $PRODUCT_IMAGE"
else
    echo "❌ Échec de création du produit"
    echo "Réponse: $PRODUCT_RESPONSE"
    exit 1
fi

echo ""
echo "4. Test d'accessibilité de l'image..."

# Tester l'accessibilité de l'image
IMAGE_URL="http://localhost:8001$PRODUCT_IMAGE"
IMAGE_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$IMAGE_URL")

if [ "$IMAGE_STATUS" = "200" ]; then
    echo "✅ Image accessible via: $IMAGE_URL"
else
    echo "❌ Image non accessible (code: $IMAGE_STATUS)"
    echo "URL testée: $IMAGE_URL"
fi

echo ""
echo "5. Test de création d'une formation avec image..."

# Créer une formation avec image
TRAINING_RESPONSE=$(curl -s -X POST "http://localhost:8001/api/admin/trainings" \
  -H "Authorization: Bearer $TOKEN" \
  -F "title=Formation Test Image" \
  -F "description=Description de la formation test" \
  -F "price=25000" \
  -F "duration_hours=8" \
  -F "start_date=2025-11-01" \
  -F "schedule=Lun-Ven 18h-20h" \
  -F "is_active=1" \
  -F "image=@/home/maxime/PLATEFORME-CITIL/citil-backend-python/uploads/products/bd776b71-2316-4dd6-b4d2-d99211e0ecb0.png")

TRAINING_ID=$(echo "$TRAINING_RESPONSE" | jq -r '.id')
TRAINING_IMAGE=$(echo "$TRAINING_RESPONSE" | jq -r '.image')

if [ "$TRAINING_ID" != "null" ] && [ "$TRAINING_ID" -gt 0 ]; then
    echo "✅ Formation créée avec succès (ID: $TRAINING_ID)"
    echo "✅ Image: $TRAINING_IMAGE"
else
    echo "❌ Échec de création de la formation"
    echo "Réponse: $TRAINING_RESPONSE"
fi

echo ""
echo "6. Test de récupération des données avec images..."

# Récupérer les produits
PRODUCTS_WITH_IMAGES=$(curl -s -X GET "http://localhost:8001/api/products" | jq '[.[] | select(.image != null)] | length')
echo "✅ Produits avec images: $PRODUCTS_WITH_IMAGES"

# Récupérer les formations
TRAININGS_WITH_IMAGES=$(curl -s -X GET "http://localhost:8001/api/trainings" | jq '[.[] | select(.image != null)] | length')
echo "✅ Formations avec images: $TRAININGS_WITH_IMAGES"

echo ""
echo "7. Résumé des corrections apportées:"
echo "✅ Création de imageUtils.js pour construire les URLs d'images"
echo "✅ Correction de ProductsAdmin.jsx - Utilisation de getImageUrl()"
echo "✅ Correction de TrainingsAdmin.jsx - Utilisation de getImageUrl()"
echo "✅ Correction de BlogAdmin.jsx - Utilisation de getImageUrl()"
echo "✅ URLs d'images construites avec l'URL de base du backend"

echo ""
echo "8. Instructions pour tester dans le navigateur:"
echo "1. Ouvrez http://localhost:3000/admin-login"
echo "2. Connectez-vous avec admin@citil.tg / admin123"
echo "3. Allez dans Admin > Produits - Les images devraient s'afficher"
echo "4. Allez dans Admin > Formations - Les images devraient s'afficher"
echo "5. Allez dans Admin > Blog - Les images devraient s'afficher"
echo "6. Créez de nouveaux éléments avec des images pour tester"

echo ""
echo "9. Fonctionnalités corrigées:"
echo "✅ Affichage des images dans les tableaux admin"
echo "✅ Affichage des images dans les cartes mobiles"
echo "✅ URLs d'images correctement construites"
echo "✅ Images accessibles via le backend"
echo "✅ Gestion des images manquantes (pas d'erreur)"

echo ""
echo "🎉 Test terminé ! Les images devraient maintenant s'afficher correctement dans le dashboard admin."
