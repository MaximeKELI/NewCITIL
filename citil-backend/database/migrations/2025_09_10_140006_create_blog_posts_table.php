<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBlogPostsTable extends Migration
{
    public function up()
    {
        Schema::create('blog_posts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('excerpt')->nullable(); // Résumé de l'article
            $table->longText('content'); // Contenu complet (HTML ou Markdown)
            $table->string('image')->nullable();
            $table->foreignId('blog_category_id')->constrained()->onDelete('set null');
            $table->string('author');
            $table->boolean('published')->default(false);
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('blog_posts');
    }
}