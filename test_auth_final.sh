#!/bin/bash

echo "🎯 Test Final - Authentification Admin CITIL"
echo "============================================="

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

# Test de connexion admin
LOGIN_RESPONSE=$(curl -s -X POST "http://localhost:8001/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@citil.tg", "password": "admin123"}')

echo "Réponse de connexion:"
echo "$LOGIN_RESPONSE" | jq .

# Vérifier la structure de la réponse
HAS_ACCESS_TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.access_token != null')
HAS_USER_INFO=$(echo "$LOGIN_RESPONSE" | jq -r '.user_info != null')
USER_ROLE=$(echo "$LOGIN_RESPONSE" | jq -r '.user_info.role')

echo ""
echo "Structure de la réponse:"
echo "- access_token présent: $HAS_ACCESS_TOKEN"
echo "- user_info présent: $HAS_USER_INFO"
echo "- rôle utilisateur: $USER_ROLE"

if [ "$HAS_ACCESS_TOKEN" = "true" ] && [ "$HAS_USER_INFO" = "true" ] && [ "$USER_ROLE" = "admin" ]; then
    echo "✅ Structure de réponse correcte"
    
    # Extraire le token pour test d'accès
    TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.access_token')
    
    echo ""
    echo "3. Test d'accès aux routes admin..."
    
    # Test route admin/products
    ADMIN_PRODUCTS_RESPONSE=$(curl -s -X GET "http://localhost:8001/api/admin/products" \
      -H "Authorization: Bearer $TOKEN")
    
    PRODUCTS_COUNT=$(echo "$ADMIN_PRODUCTS_RESPONSE" | jq '. | length' 2>/dev/null)
    
    if [ "$PRODUCTS_COUNT" != "null" ] && [ "$PRODUCTS_COUNT" -gt 0 ]; then
        echo "✅ Route admin/products accessible ($PRODUCTS_COUNT produits)"
    else
        echo "❌ Route admin/products inaccessible"
    fi
    
    echo ""
    echo "4. Test de l'endpoint /api/auth/me..."
    USER_INFO_RESPONSE=$(curl -s -X GET "http://localhost:8001/api/auth/me" \
      -H "Authorization: Bearer $TOKEN")
    
    ME_ROLE=$(echo "$USER_INFO_RESPONSE" | jq -r '.role')
    
    if [ "$ME_ROLE" = "admin" ]; then
        echo "✅ Endpoint /api/auth/me fonctionne (rôle: $ME_ROLE)"
    else
        echo "❌ Endpoint /api/auth/me ne fonctionne pas (rôle: $ME_ROLE)"
    fi
    
else
    echo "❌ Structure de réponse incorrecte"
    exit 1
fi

echo ""
echo "5. Résumé des corrections apportées:"
echo "✅ AuthContext.js - Correction user_info vs user"
echo "✅ ApiService.js - Correction user_info vs user"  
echo "✅ AdminLogin.jsx - Correction result.user_info vs result.user"
echo "✅ getUserInfo() - Retourne { user_info: response.data }"
echo "✅ Logs de debug ajoutés pour traçage"

echo ""
echo "6. Instructions pour tester dans le navigateur:"
echo "1. Ouvrez http://localhost:3000/admin-login"
echo "2. Connectez-vous avec:"
echo "   - Email: admin@citil.tg"
echo "   - Mot de passe: admin123"
echo "3. Vous devriez être redirigé vers /admin/overview"
echo "4. Vérifiez les logs dans la console (F12) pour voir le processus"

echo ""
echo "7. Si le problème persiste:"
echo "- Ouvrez la console du navigateur (F12)"
echo "- Regardez l'onglet Network pour voir les requêtes"
echo "- Vérifiez l'onglet Application > Local Storage"
echo "- Les logs de debug vous aideront à identifier le problème"

echo ""
echo "🎉 Test terminé ! L'authentification admin devrait maintenant fonctionner."
