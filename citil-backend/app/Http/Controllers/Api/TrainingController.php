<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Training;
use Illuminate\Http\Request;

class TrainingController extends Controller
{
    public function index()
    {
        return response()->json(Training::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required',
            'price' => 'required|numeric|min:0',
            'duration_hours' => 'required|integer|min:1',
            'start_date' => 'required|date',
            'schedule' => 'required|string',
            'image' => 'nullable|string',
            'is_active' => 'boolean'
        ]);

        $training = Training::create($validated);
        return response()->json($training, 201);
    }

    public function show($id)
    {
        $training = Training::find($id);
        if (!$training) {
            return response()->json(['message' => 'Formation non trouvée'], 404);
        }
        return response()->json($training);
    }

    public function update(Request $request, $id)
    {
        $training = Training::find($id);
        if (!$training) {
            return response()->json(['message' => 'Formation non trouvée'], 404);
        }

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required',
            'price' => 'sometimes|required|numeric|min:0',
            'duration_hours' => 'sometimes|required|integer|min:1',
            'start_date' => 'sometimes|required|date',
            'schedule' => 'sometimes|required|string',
            'image' => 'nullable|string',
            'is_active' => 'boolean'
        ]);

        $training->update($validated);
        return response()->json($training);
    }

    public function destroy($id)
    {
        $training = Training::find($id);
        if (!$training) {
            return response()->json(['message' => 'Formation non trouvée'], 404);
        }

        $training->delete();
        return response()->json(['message' => 'Formation supprimée']);
    }
}