<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TestController extends Controller
{
    public function test()
    {
        return response()->json([
            'message' => 'API Laravel fonctionne',
            'timestamp' => now(),
            'trainings' => [
                [
                    'id' => 1,
                    'title' => 'Formation Arduino Débutant',
                    'description' => 'Apprenez les bases de l\'Arduino',
                    'price' => 25000,
                    'is_active' => true
                ]
            ]
        ]);
    }

    public function trainings()
    {
        return response()->json([
            [
                'id' => 1,
                'title' => 'Formation Arduino Débutant',
                'description' => 'Apprenez les bases de l\'Arduino',
                'price' => 25000,
                'is_active' => true
            ],
            [
                'id' => 2,
                'title' => 'Formation IoT Avancé',
                'description' => 'Développement d\'applications IoT',
                'price' => 45000,
                'is_active' => true
            ]
        ]);
    }
}
