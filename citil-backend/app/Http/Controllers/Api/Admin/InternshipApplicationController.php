<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\InternshipApplication;
use Illuminate\Http\Request;

class InternshipApplicationController extends Controller
{
    public function index()
    {
        $applications = InternshipApplication::all();
        return response()->json($applications);
    }

    public function show($id)
    {
        $application = InternshipApplication::findOrFail($id);
        return response()->json($application);
    }

    public function update(Request $request, $id)
    {
        $application = InternshipApplication::findOrFail($id);
        
        $request->validate([
            'status' => 'required|string|in:received,reviewed,accepted,rejected'
        ]);

        $application->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Statut de candidature mis à jour avec succès',
            'application' => $application
        ]);
    }

    public function destroy($id)
    {
        $application = InternshipApplication::findOrFail($id);
        $application->delete();

        return response()->json([
            'success' => true,
            'message' => 'Candidature supprimée avec succès'
        ]);
    }
}

