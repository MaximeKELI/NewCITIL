@echo off
echo Configuration du backend Laravel CITIL...

cd citil-backend

echo.
echo 1. Installation des dependances PHP...
composer install

echo.
echo 2. Generation de la cle d'application...
php artisan key:generate

echo.
echo 3. Configuration de la base de donnees SQLite...
if not exist database\database.sqlite (
    echo Creation de la base de donnees SQLite...
    type nul > database\database.sqlite
)

echo.
echo 4. Execution des migrations...
php artisan migrate --force

echo.
echo 5. Creation de l'utilisateur admin...
php artisan db:seed --class=AdminUserSeeder

echo.
echo 6. Configuration des permissions de stockage...
php artisan storage:link

echo.
echo Configuration terminee!
echo.
echo Pour demarrer le serveur backend:
echo php artisan serve
echo.
echo L'API sera disponible sur: http://localhost:8000
echo Utilisateur admin: admin@citil.tg / password
echo.
pause
