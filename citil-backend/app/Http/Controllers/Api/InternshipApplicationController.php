<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\InternshipApplication;
use Illuminate\Http\Request;

class InternshipApplicationController extends Controller
{
    public function index()
    {
        return response()->json(InternshipApplication::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'required|string',
            'cv_path' => 'required|string', // En prod, tu uploaderas le CV
            'message' => 'nullable|string',
            'status' => 'required|string|in:received,reviewed,accepted,rejected'
        ]);

        $application = InternshipApplication::create($validated);
        return response()->json($application, 201);
    }
}