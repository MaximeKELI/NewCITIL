<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InternshipApplication extends Model
{
    use HasFactory;

    protected $fillable = [
        'full_name', 'email', 'phone', 'cv_path', 'message', 'status'
    ];
}