@echo off
echo ========================================
echo    CONFIGURATION COMPLETE CITIL
echo ========================================
echo.

echo Configuration du backend Laravel...
call setup-backend.bat

echo.
echo Configuration du frontend React...
call setup-frontend.bat

echo.
echo ========================================
echo    CONFIGURATION TERMINEE!
echo ========================================
echo.
echo Pour demarrer l'application complete:
echo.
echo 1. Ouvrir un terminal pour le backend:
echo    cd citil-backend
echo    php artisan serve
echo.
echo 2. Ouvrir un autre terminal pour le frontend:
echo    cd citil-frontend
echo    npm start
echo.
echo URLs:
echo - Backend API: http://localhost:8000
echo - Frontend: http://localhost:3000
echo.
echo Compte admin:
echo - Email: admin@citil.tg
echo - Mot de passe: password
echo.
pause
