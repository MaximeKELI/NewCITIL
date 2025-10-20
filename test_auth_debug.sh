#!/bin/bash

echo "🔍 Test d'authentification complet - Plateforme CITIL"
echo "=================================================="

# Vérifier que les services sont actifs
echo "1. Vérification des services..."
echo "Backend (port 8001):"
curl -s http://localhost:8001/api/test > /dev/null && echo "✅ Backend actif" || echo "❌ Backend inactif"

echo "Frontend (port 3000):"
curl -s http://localhost:3000 > /dev/null && echo "✅ Frontend actif" || echo "❌ Frontend inactif"

echo ""
echo "2. Test d'authentification admin..."

# Test de connexion admin
echo "Connexion admin@citil.tg..."
LOGIN_RESPONSE=$(curl -s -X POST "http://localhost:8001/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@citil.tg", "password": "admin123"}')

echo "Réponse de connexion:"
echo "$LOGIN_RESPONSE" | jq .

# Extraire le token
TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.access_token')
echo ""
echo "Token extrait: ${TOKEN:0:50}..."

if [ "$TOKEN" != "null" ] && [ "$TOKEN" != "" ]; then
    echo "✅ Token récupéré avec succès"
    
    echo ""
    echo "3. Test d'accès aux informations utilisateur..."
    USER_INFO=$(curl -s -X GET "http://localhost:8001/api/auth/me" \
      -H "Authorization: Bearer $TOKEN")
    
    echo "Informations utilisateur:"
    echo "$USER_INFO" | jq .
    
    USER_ROLE=$(echo "$USER_INFO" | jq -r '.role')
    echo ""
    echo "Rôle utilisateur: $USER_ROLE"
    
    if [ "$USER_ROLE" = "admin" ]; then
        echo "✅ Utilisateur admin identifié"
        
        echo ""
        echo "4. Test d'accès aux routes admin..."
        ADMIN_PRODUCTS=$(curl -s -X GET "http://localhost:8001/api/admin/products" \
          -H "Authorization: Bearer $TOKEN")
        
        echo "Test route admin/products:"
        echo "$ADMIN_PRODUCTS" | jq '. | length' 2>/dev/null && echo "✅ Route admin accessible" || echo "❌ Route admin inaccessible"
        
    else
        echo "❌ Utilisateur non admin (rôle: $USER_ROLE)"
    fi
    
else
    echo "❌ Échec de récupération du token"
fi

echo ""
echo "5. Test de la structure de données..."
echo "Structure attendue par le frontend:"
echo "- access_token: string"
echo "- user_info: { name, email, role, id, ... }"

echo ""
echo "6. Instructions pour tester dans le navigateur:"
echo "1. Ouvrez http://localhost:3000"
echo "2. Allez sur /admin-login"
echo "3. Connectez-vous avec admin@citil.tg / admin123"
echo "4. Vérifiez les logs dans la console du navigateur (F12)"
echo "5. Vous devriez être redirigé vers /admin/overview"

echo ""
echo "🔍 Si le problème persiste, vérifiez:"
echo "- Les logs de la console du navigateur"
echo "- L'onglet Network pour voir les requêtes API"
echo "- L'onglet Application > Local Storage pour voir les tokens stockés"
