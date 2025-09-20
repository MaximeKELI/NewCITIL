<?php

namespace Database\Seeders;

use App\Models\Training;
use Illuminate\Database\Seeder;

class TrainingSeeder extends Seeder
{
    public function run()
    {
        $trainings = [
            [
                'title' => 'Initiation à Arduino',
                'description' => 'Apprenez à programmer un microcontrôleur Arduino et à créer vos premiers projets électroniques.',
                'price' => 15000,
                'duration_hours' => 20,
                'start_date' => '2025-10-01',
                'schedule' => 'Lun-Ven 18h-20h',
                'image' => 'images/arduino-training.jpg',
                'is_active' => true,
            ],
            [
                'title' => 'Programmation IoT avec ESP32',
                'description' => 'Découvrez comment connecter des capteurs à Internet et envoyer des données en temps réel.',
                'price' => 25000,
                'duration_hours' => 30,
                'start_date' => '2025-10-15',
                'schedule' => 'Sam-Dim 09h-12h',
                'image' => 'images/iot-training.jpg',
                'is_active' => true,
            ],
            [
                'title' => 'Robotique Éducative',
                'description' => 'Construisez et programmez un robot mobile capable d’éviter les obstacles.',
                'price' => 35000,
                'duration_hours' => 40,
                'start_date' => '2025-11-01',
                'schedule' => 'Sam 14h-18h',
                'image' => 'images/robotics-training.jpg',
                'is_active' => true,
            ],
        ];

        foreach ($trainings as $training) {
            Training::create($training);
        }
    }
}