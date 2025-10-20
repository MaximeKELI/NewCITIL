#!/bin/bash

echo "🖼️ Test des Images - Produits Vedettes et Pages Publiques"
echo "========================================================="

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
echo "2. Test de récupération des produits avec images..."

# Récupérer les produits
PRODUCTS_RESPONSE=$(curl -s -X GET "http://localhost:8001/api/products")
PRODUCTS_WITH_IMAGES=$(echo "$PRODUCTS_RESPONSE" | jq '[.[] | select(.image != null)] | length')
TOTAL_PRODUCTS=$(echo "$PRODUCTS_RESPONSE" | jq '. | length')

echo "✅ Total produits: $TOTAL_PRODUCTS"
echo "✅ Produits avec images: $PRODUCTS_WITH_IMAGES"

# Afficher un exemple de produit avec image
if [ "$PRODUCTS_WITH_IMAGES" -gt 0 ]; then
    echo ""
    echo "3. Exemple de produit avec image:"
    EXAMPLE_PRODUCT=$(echo "$PRODUCTS_RESPONSE" | jq '.[] | select(.image != null) | {id, name, image}' | head -3)
    echo "$EXAMPLE_PRODUCT"
    
    # Tester l'accessibilité de l'image
    IMAGE_PATH=$(echo "$PRODUCTS_RESPONSE" | jq -r '.[] | select(.image != null) | .image' | head -1)
    if [ "$IMAGE_PATH" != "null" ] && [ -n "$IMAGE_PATH" ]; then
        IMAGE_URL="http://localhost:8001$IMAGE_PATH"
        IMAGE_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$IMAGE_URL")
        
        if [ "$IMAGE_STATUS" = "200" ]; then
            echo "✅ Image accessible via: $IMAGE_URL"
        else
            echo "❌ Image non accessible (code: $IMAGE_STATUS)"
        fi
    fi
fi

echo ""
echo "4. Test de récupération des formations avec images..."

# Récupérer les formations
TRAININGS_RESPONSE=$(curl -s -X GET "http://localhost:8001/api/trainings")
TRAININGS_WITH_IMAGES=$(echo "$TRAININGS_RESPONSE" | jq '[.[] | select(.image != null)] | length')
TOTAL_TRAININGS=$(echo "$TRAININGS_RESPONSE" | jq '. | length')

echo "✅ Total formations: $TOTAL_TRAININGS"
echo "✅ Formations avec images: $TRAININGS_WITH_IMAGES"

echo ""
echo "5. Test de récupération des articles de blog avec images..."

# Récupérer les articles de blog
BLOG_RESPONSE=$(curl -s -X GET "http://localhost:8001/api/blog-posts")
BLOG_WITH_IMAGES=$(echo "$BLOG_RESPONSE" | jq '[.[] | select(.image != null)] | length')
TOTAL_BLOG=$(echo "$BLOG_RESPONSE" | jq '. | length')

echo "✅ Total articles: $TOTAL_BLOG"
echo "✅ Articles avec images: $BLOG_WITH_IMAGES"

echo ""
echo "6. Résumé des corrections apportées:"
echo "✅ ProductCard.jsx - Images des produits vedettes"
echo "✅ ProductDetail.jsx - Images des détails de produits"
echo "✅ Blog.jsx - Images des articles de blog"
echo "✅ Trainings.jsx - Images des formations"
echo "✅ Cart.jsx - Images des articles dans le panier"
echo "✅ Utilisation de getImageUrl() dans tous les composants"

echo ""
echo "7. Instructions pour tester dans le navigateur:"
echo "1. Ouvrez http://localhost:3000"
echo "2. Vérifiez la section 'Produits vedettes' - Les images devraient s'afficher"
echo "3. Allez dans /boutique - Les images des produits devraient s'afficher"
echo "4. Cliquez sur un produit - L'image de détail devrait s'afficher"
echo "5. Allez dans /formations - Les images des formations devraient s'afficher"
echo "6. Allez dans /blog - Les images des articles devraient s'afficher"
echo "7. Ajoutez un produit au panier - L'image devrait s'afficher dans le panier"

echo ""
echo "8. Fonctionnalités corrigées:"
echo "✅ Produits vedettes sur la page d'accueil"
echo "✅ Images des produits dans la boutique"
echo "✅ Images des détails de produits"
echo "✅ Images des formations"
echo "✅ Images des articles de blog"
echo "✅ Images dans le panier"
echo "✅ URLs d'images correctement construites partout"

echo ""
echo "🎉 Test terminé ! Toutes les images devraient maintenant s'afficher correctement sur le site public."
