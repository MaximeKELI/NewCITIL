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
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'is_active' => 'nullable|in:0,1,true,false'
        ]);

        // Convertir les chaînes booléennes en booléens
        if (isset($validated['is_active'])) {
            $validated['is_active'] = in_array($validated['is_active'], ['1', 'true', true], true);
        }

        // Gérer l'upload de l'image
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
            $image->storeAs('public/trainings', $imageName);
            $validated['image'] = 'trainings/' . $imageName;
        }

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
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'is_active' => 'nullable|in:0,1,true,false'
        ]);

        // Convertir les chaînes booléennes en booléens
        if (isset($validated['is_active'])) {
            $validated['is_active'] = in_array($validated['is_active'], ['1', 'true', true], true);
        }

        // Gérer l'upload de l'image
        if ($request->hasFile('image')) {
            // Supprimer l'ancienne image si elle existe
            if ($training->image && \Storage::exists('public/' . $training->image)) {
                \Storage::delete('public/' . $training->image);
            }
            
            $image = $request->file('image');
            $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
            $image->storeAs('public/trainings', $imageName);
            $validated['image'] = 'trainings/' . $imageName;
        }

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