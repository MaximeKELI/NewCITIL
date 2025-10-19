<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        try {
            $products = Product::with('category')->get();
            return response()->json($products);
        } catch (\Exception $e) {
            \Log::error('Erreur ProductController index: ' . $e->getMessage());
            return response()->json(['error' => 'Erreur lors de la récupération des produits'], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'price' => 'required|numeric|min:0',
                'stock' => 'required|integer|min:0',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
                'reference' => 'nullable|string|unique:products',
                'category_id' => 'required|exists:categories,id',
                'is_active' => 'nullable|boolean'
            ]);
        } catch (\Exception $e) {
            \Log::error('Erreur validation ProductController store: ' . $e->getMessage());
            return response()->json(['error' => 'Erreur de validation: ' . $e->getMessage()], 400);
        }

        // Convertir les chaînes booléennes en booléens
        if (isset($validated['is_active'])) {
            $validated['is_active'] = in_array($validated['is_active'], ['1', 'true', true], true);
        }

        // Génération automatique de référence si non fournie
        if (empty($validated['reference'])) {
            $validated['reference'] = 'REF-' . strtoupper(uniqid());
        }

        // Gérer l'upload de l'image
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
            $image->storeAs('public/products', $imageName);
            $validated['image'] = '/storage/products/' . $imageName;
        } else {
            $validated['image'] = '/assets/images/hero-banner.jpg'; // Image par défaut
        }

        try {
            $product = Product::create($validated);
            $product->load('category');
            return response()->json($product, 201);
        } catch (\Exception $e) {
            \Log::error('Erreur création produit: ' . $e->getMessage());
            return response()->json(['error' => 'Erreur lors de la création du produit'], 500);
        }
    }

    public function show($id)
    {
        try {
            $product = Product::with('category')->find($id);
            if (!$product) {
                return response()->json(['message' => 'Produit non trouvé'], 404);
            }
            return response()->json($product);
        } catch (\Exception $e) {
            \Log::error('Erreur ProductController show: ' . $e->getMessage());
            return response()->json(['error' => 'Erreur lors de la récupération du produit'], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $product = Product::find($id);
            if (!$product) {
                return response()->json(['message' => 'Produit non trouvé'], 404);
            }

            $validated = $request->validate([
                'name' => 'sometimes|required|string|max:255',
                'description' => 'sometimes|nullable|string',
                'price' => 'sometimes|required|numeric|min:0',
                'stock' => 'sometimes|required|integer|min:0',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
                'reference' => 'sometimes|required|string|unique:products,reference,' . $id,
                'category_id' => 'sometimes|required|exists:categories,id',
                'is_active' => 'nullable|boolean'
            ]);

            // Convertir les chaînes booléennes en booléens
            if (isset($validated['is_active'])) {
                $validated['is_active'] = in_array($validated['is_active'], ['1', 'true', true], true);
            }

            // Gérer l'upload de l'image
            if ($request->hasFile('image')) {
                // Supprimer l'ancienne image si elle existe
                if ($product->image && \Storage::exists('public/' . $product->image)) {
                    \Storage::delete('public/' . $product->image);
                }
                
                $image = $request->file('image');
                $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
                $image->storeAs('public/products', $imageName);
                $validated['image'] = '/storage/products/' . $imageName;
            }

            $product->update($validated);
            $product->load('category');
            return response()->json($product);
        } catch (\Exception $e) {
            \Log::error('Erreur ProductController update: ' . $e->getMessage());
            return response()->json(['error' => 'Erreur lors de la mise à jour du produit'], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $product = Product::find($id);
            if (!$product) {
                return response()->json(['message' => 'Produit non trouvé'], 404);
            }

            // Supprimer l'image associée si elle existe
            if ($product->image && \Storage::exists('public/' . $product->image)) {
                \Storage::delete('public/' . $product->image);
            }

            $product->delete();
            return response()->json(['message' => 'Produit supprimé']);
        } catch (\Exception $e) {
            \Log::error('Erreur ProductController destroy: ' . $e->getMessage());
            return response()->json(['error' => 'Erreur lors de la suppression du produit'], 500);
        }
    }
}
