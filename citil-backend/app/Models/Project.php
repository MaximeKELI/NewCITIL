<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'description', 'image', 'video_url', 'technologies', 'is_published'
    ];

    protected $casts = [
        'technologies' => 'array',
        'is_published' => 'boolean'
    ];
}