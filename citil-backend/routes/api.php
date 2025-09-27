<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\TrainingController;
use App\Http\Controllers\Api\BlogPostController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\InternshipApplicationController;

/*
|--------------------------------------------------------------------------
| Routes API Publiques (sans auth)
|--------------------------------------------------------------------------
| Ces routes sont accessibles aux visiteurs
*/


//Authentification
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);


// Liste des produits (lecture seule pour la boutique)
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);

// Catégories
Route::get('/categories', [CategoryController::class, 'index']);

// Formations
Route::get('/trainings', [TrainingController::class, 'index']);
Route::get('/trainings/{id}', [TrainingController::class, 'show']);

// Blog
Route::get('/blog-posts', [BlogPostController::class, 'index']);
Route::get('/blog-posts/{id}', [BlogPostController::class, 'show']);

// Projets
Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/{id}', [ProjectController::class, 'show']);

// Candidatures de stage (soumission ouverte)
Route::post('/internship-applications', [InternshipApplicationController::class, 'store']);

/*
|--------------------------------------------------------------------------
| Routes Protégées (Admin uniquement)
|--------------------------------------------------------------------------
| Accès réservé via Sanctum (token)
*/

Route::middleware('auth:sanctum')->group(function () {

    // Gestion des produits
    Route::apiResource('admin/products', ProductController::class);

    // Gestion des catégories
    Route::apiResource('admin/categories', CategoryController::class);

    // Gestion des formations
    Route::apiResource('admin/trainings', TrainingController::class);

    // Gestion des articles de blog
    Route::apiResource('admin/blog-posts', BlogPostController::class);

    // Gestion des projets
    Route::apiResource('admin/projects', ProjectController::class);

    // Gestion des commandes
    Route::apiResource('admin/orders', OrderController::class);

    // Liste des candidatures (admin seulement)
    Route::get('/admin/internship-applications', [InternshipApplicationController::class, 'index']);
});

/*
|--------------------------------------------------------------------------
| Route Utilisateur Connecté
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});