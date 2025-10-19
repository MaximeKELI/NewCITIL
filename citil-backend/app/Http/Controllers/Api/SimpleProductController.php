<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;

class SimpleProductController extends Controller
{
    public function index()
    {
        try {
            // Requête simple sans relation pour éviter les erreurs
            $products = Product::all();
            
            // Ajouter manuellement les catégories
            $products->each(function($product) {
                $product->category = Category::find($product->category_id);
            });
            
            return response()->json($products);
        } catch (\Exception $e) {
            \Log::error('Erreur SimpleProductController: ' . $e->getMessage());
            return response()->json([
                'error' => 'Erreur lors de la récupération des produits',
                'message' => $e->getMessage()
            ], 500);
        }
    }
    
    public function show($id)
    {
        try {
            $product = Product::find($id);
            if (!$product) {
                return response()->json(['error' => 'Produit non trouvé'], 404);
            }
            
            $product->category = Category::find($product->category_id);
            return response()->json($product);
        } catch (\Exception $e) {
            \Log::error('Erreur SimpleProductController show: ' . $e->getMessage());
            return response()->json(['error' => 'Erreur lors de la récupération du produit'], 500);
        }
    }
}
