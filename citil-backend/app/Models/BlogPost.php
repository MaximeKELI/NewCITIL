<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlogPost extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'excerpt', 'content', 'image', 'blog_category_id', 'author', 'published', 'published_at'
    ];

    protected $casts = [
        'published' => 'boolean',
        'published_at' => 'datetime'
    ];

    public function category()
    {
        return $this->belongsTo(BlogCategory::class);
    }
}