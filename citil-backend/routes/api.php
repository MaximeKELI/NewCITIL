<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Api\AuthController; 
use Illuminate\Support\Facades\Route;
//use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\TrainingController;
use App\Http\Controllers\Api\BlogPostController;
use App\Http\Controllers\Api\BlogCategoryController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\InternshipApplicationController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\TestController;
use App\Http\Controllers\Api\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Api\Admin\TrainingController as AdminTrainingController;
use App\Http\Controllers\Api\Admin\CategoryController as AdminCategoryController;
use App\Http\Controllers\Api\Admin\BlogPostController as AdminBlogPostController;
use App\Http\Controllers\Api\Admin\UserController as AdminUserController;
use App\Http\Controllers\Api\Admin\InternshipApplicationController as AdminInternshipApplicationController;

/*
|--------------------------------------------------------------------------
| Routes API Publiques (sans auth)
|--------------------------------------------------------------------------
| Ces routes sont accessibles aux visiteurs
*/


// //Authentification
// Route::post('/login', [AuthController::class, 'login']);
// Route::post('/register', [AuthController::class, 'register']);
// Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);


//New authentication routes


// Authentification
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Authentification Admin (compatible avec le frontend)
Route::post('/auth/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->get('/auth/me', [AuthController::class, 'userInfo']);

    // Protégées
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logOut']);
        Route::get('/user', [AuthController::class, 'userInfo']);
        Route::get('/get-user', [AuthController::class, 'userInfo']);
        Route::post('/profile', [AuthController::class, 'updateProfile']);
    });


// Liste des produits (lecture seule pour la boutique) - Version stable
Route::get('/products', [App\Http\Controllers\Api\SimpleProductController::class, 'index']);
Route::get('/products/{id}', [App\Http\Controllers\Api\SimpleProductController::class, 'show']);

// Catégories
Route::get('/categories', [CategoryController::class, 'index']);

// Formations
Route::get('/trainings', [TrainingController::class, 'index']);
Route::get('/trainings/{id}', [TrainingController::class, 'show']);

// Blog
Route::get('/blog-posts', [BlogPostController::class, 'index']);
Route::get('/blog-posts/{id}', [BlogPostController::class, 'show']);

// Blog Categories
Route::get('/blog-categories', [BlogCategoryController::class, 'index']);

// Projets
Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/{id}', [ProjectController::class, 'show']);

// Candidatures de stage (soumission ouverte)
Route::post('/internship-applications', [InternshipApplicationController::class, 'store']);

// Test API
Route::get('/test', [TestController::class, 'test']);
Route::get('/test-trainings', [TestController::class, 'trainings']);
Route::get('/test-products', [App\Http\Controllers\Api\TestProductController::class, 'index']);
Route::get('/test-products-with-category', [App\Http\Controllers\Api\TestProductController::class, 'withCategory']);

// Routes admin pour les données (sans auth pour la démonstration)
Route::get('/admin/categories', [AdminCategoryController::class, 'index']);
Route::get('/admin/products', [AdminProductController::class, 'index']);
Route::get('/admin/trainings', [AdminTrainingController::class, 'index']);
Route::get('/admin/blog-posts', [AdminBlogPostController::class, 'index']);
Route::get('/admin/users', [AdminUserController::class, 'index']);

/*
|--------------------------------------------------------------------------
| Routes Protégées (Admin uniquement)
|--------------------------------------------------------------------------
| Accès réservé via Sanctum (token)
*/

Route::middleware('auth:sanctum')->group(function () {

    // Gestion des produits (Admin)
    Route::apiResource('admin/products', AdminProductController::class);

    // Gestion des catégories (Admin)
    Route::apiResource('admin/categories', AdminCategoryController::class);

    // Gestion des formations (Admin)
    Route::apiResource('admin/trainings', AdminTrainingController::class);

    // Gestion des articles de blog (Admin)
    Route::apiResource('admin/blog-posts', AdminBlogPostController::class);

    // Gestion des projets
    Route::apiResource('admin/projects', ProjectController::class);

    // Gestion des commandes
    Route::apiResource('admin/orders', OrderController::class);

    // Gestion des candidatures (Admin)
    Route::apiResource('admin/internship-applications', AdminInternshipApplicationController::class);
    
    // Gestion des utilisateurs (Admin)
    Route::apiResource('admin/users', AdminUserController::class);
});

/*
|--------------------------------------------------------------------------
| Route Utilisateur Connecté
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});