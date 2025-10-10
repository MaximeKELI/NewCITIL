# 🧪 GUIDE DE TEST COMPLET - PLATEFORME CITIL

## 📋 Tests à effectuer sur l'interface web

### 🌐 **Accès à l'application**
- **URL Frontend** : http://localhost:3000
- **URL Backend API** : http://localhost:8000/api

---

## 1️⃣ **TEST DE CONNEXION**

### 🔐 **Connexion Admin**
1. Aller sur http://localhost:3000
2. Cliquer sur "Connexion" dans la navbar
3. Saisir les identifiants :
   - **Email** : `admin@citil.tg`
   - **Mot de passe** : `password`
4. Cliquer sur "Se connecter"

**✅ Résultat attendu :**
- Connexion réussie
- Nom "Admin CITIL" affiché dans la navbar
- Badge "Administrateur" visible
- Menu de profil accessible

### 👤 **Connexion Client**
1. Utiliser un compte client existant ou créer un nouveau compte
2. Tester la connexion avec les identifiants du client

**✅ Résultat attendu :**
- Connexion réussie
- Nom du client affiché dans la navbar
- Pas de badge administrateur
- Menu de profil accessible

---

## 2️⃣ **TEST D'INSCRIPTION**

### 📝 **Création d'un nouveau compte**
1. Aller sur la page d'inscription
2. Remplir le formulaire :
   - **Nom** : Test User
   - **Email** : test@citil.tg
   - **Mot de passe** : password123
   - **Confirmation** : password123
3. Cliquer sur "S'inscrire"

**✅ Résultat attendu :**
- Inscription réussie
- Connexion automatique
- Redirection vers la page d'accueil
- Nom affiché dans la navbar

---

## 3️⃣ **TEST DU PROFIL UTILISATEUR**

### 👤 **Accès au profil**
1. Cliquer sur le nom/avatar dans la navbar
2. Sélectionner "Mon profil" dans le menu déroulant

**✅ Résultat attendu :**
- Page de profil s'affiche
- Informations utilisateur visibles
- Avatar avec initiales
- Statistiques affichées

### ✏️ **Modification du profil**
1. Cliquer sur "Modifier le profil"
2. Modifier le nom : "Test User Updated"
3. Ajouter un téléphone : "+228 90 12 34 56"
4. Cliquer sur "Sauvegarder les modifications"

**✅ Résultat attendu :**
- Modification réussie
- Message de succès affiché
- Informations mises à jour
- Mode édition fermé

### 🔒 **Changement de mot de passe**
1. Cliquer sur "Modifier le profil"
2. Remplir les champs de mot de passe :
   - **Mot de passe actuel** : password123
   - **Nouveau mot de passe** : newpassword123
   - **Confirmation** : newpassword123
3. Cliquer sur "Sauvegarder les modifications"

**✅ Résultat attendu :**
- Mot de passe changé avec succès
- Message de confirmation
- Possibilité de se reconnecter avec le nouveau mot de passe

---

## 4️⃣ **TEST DES ROUTES PROTÉGÉES**

### 🛡️ **Accès aux pages protégées**
1. Se déconnecter
2. Essayer d'accéder à `/profil` directement
3. Essayer d'accéder à `/admin` directement

**✅ Résultat attendu :**
- Redirection vers la page de connexion
- Impossible d'accéder aux pages protégées sans authentification

### 🔐 **Accès admin**
1. Se connecter en tant qu'admin
2. Accéder à `/admin`
3. Naviguer dans les différentes sections admin

**✅ Résultat attendu :**
- Accès autorisé aux pages admin
- Interface d'administration fonctionnelle
- Toutes les fonctionnalités admin accessibles

---

## 5️⃣ **TEST DE NAVIGATION**

### 🧭 **Navigation générale**
1. Tester tous les liens de la navbar
2. Vérifier les animations et transitions
3. Tester la navigation mobile (menu hamburger)

**✅ Résultat attendu :**
- Tous les liens fonctionnent
- Animations fluides
- Menu mobile responsive

### 🎨 **Test des animations**
1. Observer les animations de la page d'accueil
2. Tester les effets hover sur les cartes
3. Vérifier les animations de scroll

**✅ Résultat attendu :**
- Animations fluides et attrayantes
- Effets hover fonctionnels
- Animations de scroll au défilement

---

## 6️⃣ **TEST DES PERMISSIONS**

### 👑 **Permissions Admin**
1. Se connecter en tant qu'admin
2. Vérifier l'accès aux sections admin
3. Tester les fonctionnalités réservées aux admins

**✅ Résultat attendu :**
- Accès complet aux fonctionnalités admin
- Interface d'administration complète
- Gestion des utilisateurs et produits

### 👤 **Permissions Client**
1. Se connecter en tant que client
2. Vérifier l'accès limité aux sections admin
3. Tester les fonctionnalités client

**✅ Résultat attendu :**
- Accès limité aux fonctionnalités client
- Pas d'accès aux sections admin
- Fonctionnalités client complètes

---

## 7️⃣ **TEST DE DÉCONNEXION**

### 🚪 **Déconnexion**
1. Cliquer sur le menu de profil
2. Sélectionner "Déconnexion"

**✅ Résultat attendu :**
- Déconnexion réussie
- Redirection vers la page d'accueil
- Menu de connexion affiché
- Token supprimé du localStorage

---

## 🎯 **CHECKLIST DE VALIDATION**

### ✅ **Fonctionnalités de base**
- [ ] Connexion admin fonctionnelle
- [ ] Connexion client fonctionnelle
- [ ] Inscription de nouveaux utilisateurs
- [ ] Affichage du nom dans la navbar
- [ ] Menu de profil accessible

### ✅ **Gestion du profil**
- [ ] Page de profil accessible
- [ ] Modification des informations personnelles
- [ ] Changement de mot de passe
- [ ] Validation des données
- [ ] Messages d'erreur/succès

### ✅ **Sécurité et permissions**
- [ ] Routes protégées fonctionnelles
- [ ] Accès admin restreint
- [ ] Déconnexion sécurisée
- [ ] Gestion des tokens

### ✅ **Interface utilisateur**
- [ ] Animations fluides
- [ ] Design responsive
- [ ] Navigation intuitive
- [ ] Feedback visuel

---

## 🚨 **PROBLÈMES POTENTIELS À SURVEILLER**

1. **Erreurs de validation** : Vérifier les messages d'erreur
2. **Problèmes de token** : Vérifier la persistance de l'authentification
3. **Erreurs de navigation** : Tester tous les liens
4. **Problèmes de responsive** : Tester sur différentes tailles d'écran
5. **Erreurs de performance** : Surveiller les temps de chargement

---

## 📞 **INFORMATIONS DE TEST**

### 🔑 **Comptes de test**
- **Admin** : admin@citil.tg / password
- **Client** : Créer via l'interface d'inscription

### 🌐 **URLs importantes**
- **Frontend** : http://localhost:3000
- **Backend API** : http://localhost:8000/api
- **Page de connexion** : http://localhost:3000/login
- **Page d'inscription** : http://localhost:3000/register
- **Page de profil** : http://localhost:3000/profil
- **Interface admin** : http://localhost:3000/admin

---

## 🎉 **RÉSULTAT FINAL**

Si tous les tests passent avec succès, la plateforme CITIL est prête pour la production avec :
- ✅ Authentification complète et sécurisée
- ✅ Gestion des profils utilisateur
- ✅ Interface moderne et animée
- ✅ Permissions et sécurité appropriées
- ✅ Navigation intuitive et responsive
