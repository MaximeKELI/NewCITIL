<?php

namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{
    /**
     * Pile globale des middlewares HTTP de l'application.
     *
     * Ces middlewares sont exécutés à chaque requête reçue par l'application,
     * assurant des traitements globaux comme la gestion des proxys, la protection
     * contre les requêtes pendant la maintenance, et la normalisation des données.
     *
     * @var array<int, class-string|string>
     */
    protected $middleware = [
        // \App\Http\Middleware\TrustHosts::class, // Middleware pour gérer les hôtes de confiance (désactivé par défaut)
        \App\Http\Middleware\TrustProxies::class, // Gère la confiance des proxys HTTP (ex: pour récupérer l'IP réelle)
        \Fruitcake\Cors\HandleCors::class, // Gère les politiques CORS (Cross-Origin Resource Sharing)
        \App\Http\Middleware\PreventRequestsDuringMaintenance::class, // Bloque les requêtes si l'application est en mode maintenance
        \Illuminate\Foundation\Http\Middleware\ValidatePostSize::class, // Valide la taille des données POST pour éviter les surcharges
        \App\Http\Middleware\TrimStrings::class, // Supprime les espaces inutiles en début/fin des chaînes de caractères
        \Illuminate\Foundation\Http\Middleware\ConvertEmptyStringsToNull::class, // Convertit les chaînes vides en valeurs nulles
    ];

    /**
     * Groupes de middlewares pour les routes.
     *
     * Ces groupes permettent d'appliquer un ensemble de middlewares spécifiques
     * à des types de routes, par exemple les routes web ou API.
     *
     * @var array<string, array<int, class-string|string>>
     */
    protected $middlewareGroups = [
        'web' => [
            \App\Http\Middleware\EncryptCookies::class, // Chiffre les cookies pour la sécurité
            \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class, // Ajoute les cookies mis en file d'attente à la réponse HTTP
            \Illuminate\Session\Middleware\StartSession::class, // Démarre la session utilisateur
            \Illuminate\Session\Middleware\AuthenticateSession::class, // Authentifie la session utilisateur
            \Illuminate\View\Middleware\ShareErrorsFromSession::class, // Partage les erreurs de validation avec les vues
            \App\Http\Middleware\VerifyCsrfToken::class, // Protège contre les attaques CSRF (Cross-Site Request Forgery)
            \Illuminate\Routing\Middleware\SubstituteBindings::class, // Résout les liaisons de route (ex: modèles liés aux paramètres)
        ],

        'api' => [
            \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class, // Assure que les requêtes frontend sont stateful pour l'auth API
            \Illuminate\Routing\Middleware\ThrottleRequests::class.':api', // Limite le nombre de requêtes API pour éviter les abus
            \Illuminate\Routing\Middleware\SubstituteBindings::class, // Résout les liaisons de route pour les API
        ],
    ];

    /**
     * Middlewares de route individuels.
     *
     * Ces middlewares peuvent être assignés individuellement aux routes ou groupes de routes
     * pour gérer des aspects spécifiques comme l'authentification, la vérification d'email, etc.
     *
     * @var array<string, class-string|string>
     */
    protected $routeMiddleware = [
        'auth' => \App\Http\Middleware\Authenticate::class, // Vérifie que l'utilisateur est authentifié
        'auth.basic' => \Illuminate\Auth\Middleware\AuthenticateWithBasicAuth::class, // Authentification HTTP basique
        'auth.session' => \Illuminate\Session\Middleware\AuthenticateSession::class, // Authentifie la session utilisateur
        'cache.headers' => \Illuminate\Http\Middleware\SetCacheHeaders::class, // Définit les en-têtes HTTP de cache
        'can' => \Illuminate\Auth\Middleware\Authorize::class, // Vérifie les autorisations utilisateur
        'guest' => \App\Http\Middleware\RedirectIfAuthenticated::class, // Redirige les utilisateurs authentifiés hors des pages invitées
        'password.confirm' => \Illuminate\Auth\Middleware\RequirePassword::class, // Demande la confirmation du mot de passe
        'signed' => \App\Http\Middleware\ValidateSignature::class, // Valide la signature des URLs signées
        'throttle' => \Illuminate\Routing\Middleware\ThrottleRequests::class, // Limite le nombre de requêtes pour une route donnée
        'verified' => \Illuminate\Auth\Middleware\EnsureEmailIsVerified::class, // Vérifie que l'email de l'utilisateur est confirmé
    ];
}
