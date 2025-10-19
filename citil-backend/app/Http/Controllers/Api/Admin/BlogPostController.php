<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Models\BlogCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class BlogPostController extends Controller
{
    public function index()
    {
        $posts = BlogPost::with('category')->get();
        return response()->json($posts);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'required|string|max:500',
            'content' => 'required|string',
            'author' => 'required|string|max:255',
            'published' => 'boolean',
            'blog_category_id' => 'required|exists:blog_categories,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        $data = $request->all();
        $data['slug'] = Str::slug($data['title']);
        
        // Gestion de l'image
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . Str::slug($data['title']) . '.' . $image->getClientOriginalExtension();
            $imagePath = $image->storeAs('blog', $imageName, 'public');
            $data['image'] = '/storage/' . $imagePath;
        } else {
            $data['image'] = '/assets/images/hero-banner.jpg'; // Image par défaut
        }

        $post = BlogPost::create($data);
        $post->load('category');

        return response()->json([
            'success' => true,
            'message' => 'Article créé avec succès',
            'post' => $post
        ], 201);
    }

    public function show($id)
    {
        $post = BlogPost::with('category')->findOrFail($id);
        return response()->json($post);
    }

    public function update(Request $request, $id)
    {
        $post = BlogPost::findOrFail($id);
        
        $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'required|string|max:500',
            'content' => 'required|string',
            'author' => 'required|string|max:255',
            'published' => 'boolean',
            'blog_category_id' => 'required|exists:blog_categories,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        $data = $request->all();
        $data['slug'] = Str::slug($data['title']);
        
        // Gestion de l'image
        if ($request->hasFile('image')) {
            // Supprimer l'ancienne image si elle existe
            if ($post->image && strpos($post->image, '/storage/') === 0) {
                $oldImagePath = str_replace('/storage/', '', $post->image);
                Storage::disk('public')->delete($oldImagePath);
            }
            
            $image = $request->file('image');
            $imageName = time() . '_' . Str::slug($data['title']) . '.' . $image->getClientOriginalExtension();
            $imagePath = $image->storeAs('blog', $imageName, 'public');
            $data['image'] = '/storage/' . $imagePath;
        }

        $post->update($data);
        $post->load('category');

        return response()->json([
            'success' => true,
            'message' => 'Article modifié avec succès',
            'post' => $post
        ]);
    }

    public function destroy($id)
    {
        $post = BlogPost::findOrFail($id);
        
        // Supprimer l'image associée
        if ($post->image && strpos($post->image, '/storage/') === 0) {
            $imagePath = str_replace('/storage/', '', $post->image);
            Storage::disk('public')->delete($imagePath);
        }
        
        $post->delete();

        return response()->json([
            'success' => true,
            'message' => 'Article supprimé avec succès'
        ]);
    }
}

