# 🗄️ Base de Données CITIL - Documentation

## 📊 Vue d'ensemble

La base de données SQLite de la plateforme CITIL contient des données réalistes et fonctionnelles pour tester toutes les fonctionnalités de l'application.

## 📋 Structure des Données

### 👥 Utilisateurs (4 utilisateurs)

| Nom | Email | Rôle | Mot de passe |
|-----|-------|------|--------------|
| Admin CITIL | admin@citil.tg | admin | admin123 |
| Kossi Doe | kossi@example.com | client | password123 |
| Awa Koffi | awa@example.com | client | password123 |
| Kodjo Mensah | kodjo@example.com | client | password123 |

### 📂 Catégories (7 catégories)

1. **Arduino** - Cartes Arduino et accessoires
2. **Capteurs** - Capteurs pour projets IoT
3. **Kits** - Kits éducatifs et de démarrage
4. **Plaques solaires** - Solutions solaires
5. **Cartes & MCU** - Microcontrôleurs et cartes de développement
6. **Modules** - Modules de communication et capteurs
7. **Outils** - Outils et équipements électroniques

### 🛍️ Produits (10 produits)

| Produit | Prix (FCFA) | Stock | Catégorie |
|---------|-------------|-------|-----------|
| Arduino Uno R3 | 12,000 | 15 | Arduino |
| Capteur DS18B20 | 3,500 | 42 | Capteurs |
| Kit Robot Éducatif | 65,000 | 8 | Kits |
| Panneau Solaire 100W | 120,000 | 20 | Plaques solaires |
| Batterie 12V 20Ah | 90,000 | 12 | Plaques solaires |
| Raspberry Pi 4 (4GB) | 150,000 | 6 | Cartes & MCU |
| ESP32 DevKit | 18,000 | 25 | Cartes & MCU |
| Module Bluetooth HC-05 | 7,000 | 30 | Modules |
| Multimètre Digital | 25,000 | 10 | Outils |
| Fer à Souder 60W | 15,000 | 8 | Outils |

### 🎓 Formations (5 formations)

1. **Formation Arduino – Débutant** - 25,000 FCFA - 2 jours
2. **Introduction à l'IoT** - 40,000 FCFA - 3 jours
3. **Programmation Python pour l'IoT** - 50,000 FCFA - 4 jours
4. **Installation de Systèmes Solaires** - 75,000 FCFA - 5 jours
5. **Robotique avec Raspberry Pi** - 60,000 FCFA - 3 jours

### 📝 Articles de Blog (5 articles)

1. **Démarrer en électronique : Guide du débutant**
2. **IoT au Togo : Opportunités et Défis**
3. **Arduino vs Raspberry Pi : Quel choisir ?**
4. **Énergie Solaire au Togo : Guide Pratique**
5. **Programmation Python pour l'IoT : Premiers Pas**

### 🚀 Projets (4 projets)

1. **Station Météo IoT** - Station météorologique connectée
2. **Système d'Irrigation Intelligent** - Irrigation automatisée
3. **Suivi de Production Solaire** - Application de suivi
4. **Robot Suiveur de Ligne** - Robot autonome

### 📋 Candidatures de Stage (4 candidatures)

| Nom | Email | Statut |
|-----|-------|--------|
| Kodjo A. | kodjo@exemple.com | received |
| Aicha B. | aicha@exemple.com | reviewed |
| Komlan C. | komlan@exemple.com | accepted |
| Fatou D. | fatou@exemple.com | received |

### 🛒 Commandes (3 commandes)

1. **Commande #1** - Kossi Doe - 209,000 FCFA - Statut: pending
2. **Commande #2** - Awa Koffi - 552,000 FCFA - Statut: shipped
3. **Commande #3** - Awa Koffi - 350,000 FCFA - Statut: confirmed

## 🔧 Scripts de Gestion

### Peuplement de la base de données
```bash
python populate_database.py
```

### Vérification de la base de données
```bash
python check_database.py
```

### Démarrage avec vérification automatique
```bash
./start_server.sh
```

## 🧪 Tests Recommandés

### 1. Authentification
- Connexion admin : admin@citil.tg / admin123
- Connexion client : kossi@example.com / password123

### 2. Gestion des Produits
- Lister tous les produits
- Filtrer par catégorie
- Créer un nouveau produit (admin)
- Modifier un produit existant (admin)

### 3. Gestion des Formations
- Lister toutes les formations
- Créer une nouvelle formation (admin)
- Modifier une formation existante (admin)

### 4. Gestion des Utilisateurs
- Lister tous les utilisateurs (admin)
- Modifier le profil utilisateur
- Upload d'avatar

### 5. Candidatures de Stage
- Soumettre une nouvelle candidature
- Lister les candidatures (admin)
- Modifier le statut d'une candidature (admin)

## 📊 Statistiques

- **Total utilisateurs** : 4
- **Total catégories** : 7
- **Total produits** : 10
- **Total formations** : 5
- **Total articles** : 5
- **Total projets** : 4
- **Total candidatures** : 4
- **Total commandes** : 3

## 🔄 Réinitialisation

Pour réinitialiser la base de données avec de nouvelles données :

```bash
rm citil.db
python populate_database.py
```

## 📝 Notes

- Tous les mots de passe utilisent le hachage PBKDF2-SHA256
- Les prix sont en FCFA (Franc CFA)
- Les dates sont générées dynamiquement
- Les données sont réalistes et adaptées au contexte togolais
- La base de données est optimisée pour les tests et la démonstration
