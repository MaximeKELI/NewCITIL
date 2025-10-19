<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class TestProductController extends Controller
{
    public function index()
    {
        try {
            // Test simple sans relation
            $products = Product::all();
            return response()->json([
                'success' => true,
                'count' => $products->count(),
                'products' => $products
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ], 500);
        }
    }
    
    public function withCategory()
    {
        try {
            // Test avec relation
            $products = Product::with('category')->get();
            return response()->json([
                'success' => true,
                'count' => $products->count(),
                'products' => $products
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ], 500);
        }
    }
}
