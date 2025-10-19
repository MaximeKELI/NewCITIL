<?php

use Illuminate\Support\Facades\Route;
use App\Models\Product;
use App\Models\Category;
use App\Models\Training;

// Routes de test pour la soutenance
Route::get('/api/test-products', function () {
    try {
        $products = Product::all();
        $products->each(function($product) {
            $product->category = Category::find($product->category_id);
        });
        return response()->json($products);
    } catch (Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
});

Route::get('/api/test-categories', function () {
    try {
        return response()->json(Category::all());
    } catch (Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
});

Route::get('/api/test-trainings', function () {
    try {
        return response()->json(Training::all());
    } catch (Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
});

Route::get('/api/test-all', function () {
    try {
        return response()->json([
            'products' => Product::all(),
            'categories' => Category::all(),
            'trainings' => Training::all(),
            'status' => 'success'
        ]);
    } catch (Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
});