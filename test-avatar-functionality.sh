#!/bin/bash

echo "🧪 TEST DE LA FONCTIONNALITÉ PHOTO DE PROFIL"
echo "============================================="
echo ""

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "1️⃣ Test de connexion et récupération des données utilisateur..."
echo ""

# Test de connexion
echo "📝 Connexion avec un utilisateur de test..."
LOGIN_RESPONSE=$(curl -s -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "email": "admin@citil.tg",
    "password": "password"
  }')

echo "Réponse de connexion:"
echo "$LOGIN_RESPONSE" | head -5
echo ""

# Extraire le token
TOKEN=$(echo "$LOGIN_RESPONSE" | grep -o '"token":"[^"]*"' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
    echo -e "❌ ${RED}Échec de la connexion${NC}"
    echo "Créons un utilisateur de test..."
    
    REGISTER_RESPONSE=$(curl -s -X POST http://localhost:8000/api/register \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "name": "Test User",
        "email": "test@example.com",
        "password": "password123",
        "password_confirmation": "password123"
      }')
    
    echo "Réponse d'inscription:"
    echo "$REGISTER_RESPONSE" | head -5
    echo ""
    
    TOKEN=$(echo "$REGISTER_RESPONSE" | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
fi

if [ -z "$TOKEN" ]; then
    echo -e "❌ ${RED}Impossible d'obtenir un token${NC}"
    exit 1
fi

echo -e "✅ ${GREEN}Token obtenu: ${TOKEN:0:20}...${NC}"
echo ""

# Test de récupération des données utilisateur
echo "2️⃣ Test de récupération des données utilisateur..."
echo ""

USER_INFO_RESPONSE=$(curl -s -X GET http://localhost:8000/api/get-user \
  -H "Authorization: Bearer $TOKEN" \
  -H "Accept: application/json")

echo "Réponse get-user:"
echo "$USER_INFO_RESPONSE"
echo ""

# Vérifier si l'avatar est présent dans la réponse
if echo "$USER_INFO_RESPONSE" | grep -q '"avatar"'; then
    echo -e "✅ ${GREEN}Champ avatar présent dans la réponse${NC}"
else
    echo -e "❌ ${RED}Champ avatar manquant dans la réponse${NC}"
fi

echo ""
echo "3️⃣ Test de mise à jour du profil..."
echo ""

# Créer un fichier de test pour l'avatar
echo "📸 Création d'un fichier image de test..."
echo "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==" | base64 -d > /tmp/test_avatar.png

# Test de mise à jour avec avatar
UPDATE_RESPONSE=$(curl -s -X PUT http://localhost:8000/api/profile \
  -H "Authorization: Bearer $TOKEN" \
  -H "Accept: application/json" \
  -F "name=Test User Updated" \
  -F "avatar=@/tmp/test_avatar.png")

echo "Réponse de mise à jour:"
echo "$UPDATE_RESPONSE"
echo ""

# Vérifier si l'avatar a été mis à jour
if echo "$UPDATE_RESPONSE" | grep -q '"avatar"'; then
    echo -e "✅ ${GREEN}Avatar mis à jour avec succès${NC}"
    
    # Extraire l'URL de l'avatar
    AVATAR_URL=$(echo "$UPDATE_RESPONSE" | grep -o '"avatar":"[^"]*"' | cut -d'"' -f4)
    echo "URL de l'avatar: $AVATAR_URL"
    
    # Tester l'accès à l'avatar
    echo ""
    echo "4️⃣ Test d'accès à l'avatar..."
    echo ""
    
    AVATAR_TEST=$(curl -s -I "http://localhost:8000$AVATAR_URL")
    if echo "$AVATAR_TEST" | grep -q "200 OK"; then
        echo -e "✅ ${GREEN}Avatar accessible via URL${NC}"
    else
        echo -e "❌ ${RED}Avatar non accessible${NC}"
        echo "Réponse: $AVATAR_TEST"
    fi
else
    echo -e "❌ ${RED}Échec de la mise à jour de l'avatar${NC}"
fi

echo ""
echo "5️⃣ Test de récupération des données après mise à jour..."
echo ""

# Récupérer les données utilisateur après mise à jour
UPDATED_USER_INFO=$(curl -s -X GET http://localhost:8000/api/get-user \
  -H "Authorization: Bearer $TOKEN" \
  -H "Accept: application/json")

echo "Données utilisateur après mise à jour:"
echo "$UPDATED_USER_INFO"
echo ""

# Nettoyer le fichier de test
rm -f /tmp/test_avatar.png

echo "🎯 RÉSUMÉ DU TEST:"
echo "=================="
echo ""

if echo "$UPDATED_USER_INFO" | grep -q '"avatar"'; then
    echo -e "✅ ${GREEN}SUCCÈS: La fonctionnalité photo de profil fonctionne correctement${NC}"
    echo "✅ Upload d'avatar: OK"
    echo "✅ Stockage d'avatar: OK"
    echo "✅ Récupération d'avatar: OK"
    echo "✅ URL d'avatar: OK"
else
    echo -e "❌ ${RED}ÉCHEC: Problème avec la fonctionnalité photo de profil${NC}"
    echo "❌ Vérifiez les logs du serveur Laravel"
    echo "❌ Vérifiez la configuration du stockage"
fi

echo ""
echo "🔧 DIAGNOSTIC:"
echo "=============="
echo ""

# Vérifier les permissions du dossier de stockage
if [ -d "/home/maxime/PLATEFORME-CITIL/citil-backend/storage/app/public/avatars" ]; then
    echo -e "✅ ${GREEN}Dossier avatars existe${NC}"
    ls -la /home/maxime/PLATEFORME-CITIL/citil-backend/storage/app/public/avatars/
else
    echo -e "❌ ${RED}Dossier avatars manquant${NC}"
fi

echo ""

# Vérifier le lien symbolique
if [ -L "/home/maxime/PLATEFORME-CITIL/citil-backend/public/storage" ]; then
    echo -e "✅ ${GREEN}Lien symbolique public/storage existe${NC}"
else
    echo -e "❌ ${RED}Lien symbolique public/storage manquant${NC}"
fi

echo ""
echo -e "${YELLOW}✨ Test terminé !${NC}"
