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
            'image' => 'nullable|string',
            'blog_category_id' => 'required|exists:blog_categories,id',
            'author' => 'required|string',
            'published' => 'boolean',
            'published_at' => 'nullable|date'
        ]);

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
            'image' => 'nullable|string',
            'blog_category_id' => 'sometimes|required|exists:blog_categories,id',
            'author' => 'sometimes|required|string',
            'published' => 'boolean',
            'published_at' => 'nullable|date'
        ]);

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