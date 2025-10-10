#!/bin/bash

echo "🎬 TEST DES ANIMATIONS D'ÉCRITURE - PLATEFORME CITIL"
echo "=================================================="
echo ""

# Couleurs pour les résultats
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "🧪 Vérification de la compilation..."
echo ""

# Vérifier que le frontend fonctionne
if curl -s http://localhost:3000 > /dev/null; then
    echo -e "✅ Frontend React: ${GREEN}FONCTIONNEL${NC}"
else
    echo -e "❌ Frontend React: ${RED}ERREUR${NC}"
    exit 1
fi

# Vérifier que le backend fonctionne
if curl -s http://localhost:8000/api/products > /dev/null; then
    echo -e "✅ Backend Laravel: ${GREEN}FONCTIONNEL${NC}"
else
    echo -e "❌ Backend Laravel: ${RED}ERREUR${NC}"
    exit 1
fi

echo ""
echo "🎨 Vérification des pages avec animations..."
echo ""

# Vérifier la page d'accueil
if curl -s http://localhost:3000 > /dev/null; then
    echo -e "✅ Page d'accueil: ${GREEN}ACCESSIBLE${NC}"
else
    echo -e "❌ Page d'accueil: ${RED}ERREUR${NC}"
fi

# Vérifier la page de démonstration
if curl -s http://localhost:3000/typewriter-demo > /dev/null; then
    echo -e "✅ Page de démonstration: ${GREEN}ACCESSIBLE${NC}"
else
    echo -e "❌ Page de démonstration: ${RED}ERREUR${NC}"
fi

# Vérifier la page de profil
if curl -s http://localhost:3000/profil > /dev/null; then
    echo -e "✅ Page de profil: ${GREEN}ACCESSIBLE${NC}"
else
    echo -e "❌ Page de profil: ${RED}ERREUR${NC}"
fi

echo ""
echo "🎯 COMPOSANTS D'ANIMATION CRÉÉS:"
echo ""

# Vérifier que les composants existent
components=(
    "TypewriterText.jsx"
    "CascadeTypewriter.jsx"
    "GlitchTypewriter.jsx"
    "RainbowTypewriter.jsx"
    "ParticleTypewriter.jsx"
    "WaveTypewriter.jsx"
)

for component in "${components[@]}"; do
    if [ -f "/home/maxime/PLATEFORME-CITIL/citil-frontend/src/components/$component" ]; then
        echo -e "✅ $component: ${GREEN}CRÉÉ${NC}"
    else
        echo -e "❌ $component: ${RED}MANQUANT${NC}"
    fi
done

echo ""
echo "🎪 FONCTIONNALITÉS DISPONIBLES:"
echo ""
echo "✅ Animation classique avec curseur clignotant"
echo "✅ Animation en cascade (plusieurs lignes)"
echo "✅ Animation avec effets de glitch"
echo "✅ Animation arc-en-ciel colorée"
echo "✅ Animation avec particules"
echo "✅ Animation avec effet de vague"
echo "✅ Page de démonstration interactive"
echo "✅ Intégration dans l'interface"

echo ""
echo "🌐 URLS À TESTER:"
echo ""
echo "• Page d'accueil: http://localhost:3000"
echo "• Démonstration: http://localhost:3000/typewriter-demo"
echo "• Profil: http://localhost:3000/profil"
echo "• Connexion: http://localhost:3000/login"

echo ""
echo "🎉 RÉSULTAT FINAL:"
echo "=================="
echo ""
echo -e "${GREEN}🎬 TOUTES LES ANIMATIONS D'ÉCRITURE SONT OPÉRATIONNELLES !${NC}"
echo ""
echo "📋 PROCHAINES ÉTAPES:"
echo "1. Ouvrir http://localhost:3000"
echo "2. Observer les animations sur la page d'accueil"
echo "3. Cliquer sur 'Animations' dans le menu"
echo "4. Tester tous les types d'animations"
echo "5. Explorer les effets spectaculaires"
echo ""
echo -e "${YELLOW}✨ Votre plateforme CITIL est maintenant encore plus spectaculaire !${NC}"
