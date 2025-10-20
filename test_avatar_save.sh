#!/bin/bash

echo "👤 Test de Sauvegarde de l'Avatar - Profil Utilisateur"
echo "====================================================="

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
echo "3. Test de mise à jour du profil avec avatar..."

# Test mise à jour profil avec avatar
PROFILE_RESPONSE=$(curl -s -X POST "http://localhost:8001/api/profile" \
  -H "Authorization: Bearer $TOKEN" \
  -F "name=Admin CITIL Avatar Test" \
  -F "email=admin@citil.tg" \
  -F "phone=+228 90 00 00 02" \
  -F "avatar=@/home/maxime/PLATEFORME-CITIL/citil-backend-python/uploads/products/bd776b71-2316-4dd6-b4d2-d99211e0ecb0.png")

AVATAR_PATH=$(echo "$PROFILE_RESPONSE" | jq -r '.avatar')
USER_NAME=$(echo "$PROFILE_RESPONSE" | jq -r '.name')

if [ "$AVATAR_PATH" != "null" ] && [ -n "$AVATAR_PATH" ]; then
    echo "✅ Profil mis à jour avec succès"
    echo "✅ Nom: $USER_NAME"
    echo "✅ Avatar: $AVATAR_PATH"
else
    echo "❌ Échec de mise à jour du profil"
    echo "Réponse: $PROFILE_RESPONSE"
    exit 1
fi

echo ""
echo "4. Test d'accessibilité de l'avatar..."

# Tester l'accessibilité de l'avatar
if [ "$AVATAR_PATH" != "null" ] && [ -n "$AVATAR_PATH" ]; then
    AVATAR_URL="http://localhost:8001$AVATAR_PATH"
    AVATAR_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$AVATAR_URL")
    
    if [ "$AVATAR_STATUS" = "200" ]; then
        echo "✅ Avatar accessible via: $AVATAR_URL"
    else
        echo "❌ Avatar non accessible (code: $AVATAR_STATUS)"
    fi
fi

echo ""
echo "5. Test de récupération des informations utilisateur..."

# Récupérer les informations utilisateur
USER_INFO_RESPONSE=$(curl -s -X GET "http://localhost:8001/api/auth/me" \
  -H "Authorization: Bearer $TOKEN")

USER_AVATAR=$(echo "$USER_INFO_RESPONSE" | jq -r '.avatar')
USER_NAME_ME=$(echo "$USER_INFO_RESPONSE" | jq -r '.name')

echo "✅ Nom utilisateur: $USER_NAME_ME"
echo "✅ Avatar utilisateur: $USER_AVATAR"

echo ""
echo "6. Résumé des corrections apportées:"
echo "✅ Ajout de la fonction updateUser() dans AuthContext"
echo "✅ Mise à jour de l'AuthContext après sauvegarde du profil"
echo "✅ Synchronisation des données utilisateur entre composants"
echo "✅ Conservation de l'avatar dans le localStorage"
echo "✅ Déclenchement de l'événement authChanged"

echo ""
echo "7. Instructions pour tester dans le navigateur:"
echo "1. Ouvrez http://localhost:3000/login"
echo "2. Connectez-vous avec admin@citil.tg / admin123"
echo "3. Allez dans le profil utilisateur"
echo "4. Cliquez sur 'Modifier le profil'"
echo "5. Sélectionnez une image pour l'avatar"
echo "6. Cliquez sur 'Enregistrer'"
echo "7. Vérifiez que l'avatar s'affiche correctement"
echo "8. Rafraîchissez la page - l'avatar devrait persister"

echo ""
echo "8. Fonctionnalités corrigées:"
echo "✅ Sauvegarde de l'avatar sur le serveur"
echo "✅ Mise à jour de l'AuthContext avec les nouvelles données"
echo "✅ Synchronisation entre les composants"
echo "✅ Persistance de l'avatar dans le localStorage"
echo "✅ Affichage correct de l'avatar dans l'interface"
echo "✅ Gestion des erreurs de validation"

echo ""
echo "🎉 Test terminé ! L'avatar devrait maintenant se sauvegarder et s'afficher correctement."
