<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Training;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class TrainingController extends Controller
{
    public function index()
    {
        $trainings = Training::all();
        return response()->json($trainings);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'duration_hours' => 'required|integer|min:1',
            'start_date' => 'required|date',
            'schedule' => 'required|string|max:255',
            'is_active' => 'boolean'
        ]);

        $data = $request->all();
        $data['slug'] = Str::slug($data['title']);

        $training = Training::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Formation créée avec succès',
            'training' => $training
        ], 201);
    }

    public function show($id)
    {
        $training = Training::findOrFail($id);
        return response()->json($training);
    }

    public function update(Request $request, $id)
    {
        $training = Training::findOrFail($id);
        
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'duration_hours' => 'required|integer|min:1',
            'start_date' => 'required|date',
            'schedule' => 'required|string|max:255',
            'is_active' => 'boolean'
        ]);

        $data = $request->all();
        $data['slug'] = Str::slug($data['title']);

        $training->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Formation modifiée avec succès',
            'training' => $training
        ]);
    }

    public function destroy($id)
    {
        $training = Training::findOrFail($id);
        $training->delete();

        return response()->json([
            'success' => true,
            'message' => 'Formation supprimée avec succès'
        ]);
    }
}

