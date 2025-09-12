<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    /**
     * Liste tous les projets
     */
    public function index()
    {
        return response()->json(Project::all());
    }

    /**
     * Crée un nouveau projet
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|string',
            'video_url' => 'nullable|url', // Lien YouTube ou autre
            'technologies' => 'required|json', // Ex: ["Arduino", "Python", "OpenCV"]
            'is_published' => 'boolean'
        ]);

        $project = Project::create($validated);
        return response()->json($project, 201);
    }

    /**
     * Affiche un projet spécifique
     */
    public function show($id)
    {
        $project = Project::find($id);
        if (!$project) {
            return response()->json(['message' => 'Projet non trouvé'], 404);
        }
        return response()->json($project);
    }

    /**
     * Met à jour un projet
     */
    public function update(Request $request, $id)
    {
        $project = Project::find($id);
        if (!$project) {
            return response()->json(['message' => 'Projet non trouvé'], 404);
        }

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'image' => 'nullable|string',
            'video_url' => 'nullable|url',
            'technologies' => 'sometimes|required|json',
            'is_published' => 'boolean'
        ]);

        $project->update($validated);
        return response()->json($project);
    }

    /**
     * Supprime un projet
     */
    public function destroy($id)
    {
        $project = Project::find($id);
        if (!$project) {
            return response()->json(['message' => 'Projet non trouvé'], 404);
        }

        $project->delete();
        return response()->json(['message' => 'Projet supprimé']);
    }
}