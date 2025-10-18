<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use Illuminate\Http\Request;

class BlogPostController extends Controller
{
    public function index()
    {
        return response()->json(BlogPost::with('category')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'nullable|string',
            'content' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'blog_category_id' => 'required|exists:blog_categories,id',
            'author' => 'required|string',
            'published' => 'nullable|in:0,1,true,false',
            'published_at' => 'nullable|date'
        ]);

        // Convertir les chaînes booléennes en booléens
        if (isset($validated['published'])) {
            $validated['published'] = in_array($validated['published'], ['1', 'true', true], true);
        }

        // Gérer l'upload de l'image
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
            $image->storeAs('public/blog', $imageName);
            $validated['image'] = 'blog/' . $imageName;
        }

        $post = BlogPost::create($validated);
        return response()->json($post, 201);
    }

    public function show($id)
    {
        $post = BlogPost::with('category')->find($id);
        if (!$post) {
            return response()->json(['message' => 'Article non trouvé'], 404);
        }
        return response()->json($post);
    }

    public function update(Request $request, $id)
    {
        $post = BlogPost::find($id);
        if (!$post) {
            return response()->json(['message' => 'Article non trouvé'], 404);
        }

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'excerpt' => 'nullable|string',
            'content' => 'sometimes|required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'blog_category_id' => 'sometimes|required|exists:blog_categories,id',
            'author' => 'sometimes|required|string',
            'published' => 'nullable|in:0,1,true,false',
            'published_at' => 'nullable|date'
        ]);

        // Convertir les chaînes booléennes en booléens
        if (isset($validated['published'])) {
            $validated['published'] = in_array($validated['published'], ['1', 'true', true], true);
        }

        // Gérer l'upload de l'image
        if ($request->hasFile('image')) {
            // Supprimer l'ancienne image si elle existe
            if ($post->image && \Storage::exists('public/' . $post->image)) {
                \Storage::delete('public/' . $post->image);
            }
            
            $image = $request->file('image');
            $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
            $image->storeAs('public/blog', $imageName);
            $validated['image'] = 'blog/' . $imageName;
        }

        $post->update($validated);
        return response()->json($post);
    }

    public function destroy($id)
    {
        $post = BlogPost::find($id);
        if (!$post) {
            return response()->json(['message' => 'Article non trouvé'], 404);
        }

        $post->delete();
        return response()->json(['message' => 'Article supprimé']);
    }
}