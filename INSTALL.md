# Installation du projet CITIL Backend

## 1. Cloner le dépôt
```bash
git clone https://github.com/ton-utilisateur/citil-backend.git
cd citil-backend

## 2. Installer les dépendances
```bash

composer install

3. Configurer l'environnement

Copiez le fichier exemple : 
```bash
 
 cp .env.example .env

 Modifiez .env avec vos paramètres : 

    DB_DATABASE=...
    DB_USERNAME=...
    DB_PASSWORD=...
     

4. Générer la clé d'application 
bash
 
php artisan key:generate

5. Migrer la base de données 
bash
 
php artisan migrate --seed

6. Démarrer le serveur 
bash
 
php artisan serve

Accédez à : http://localhost:8000 
