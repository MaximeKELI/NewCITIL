<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInternshipApplicationsTable extends Migration
{
    public function up()
    {
        Schema::create('internship_applications', function (Blueprint $table) {
            $table->id();
            $table->string('full_name');
            $table->string('email');
            $table->string('phone');
            $table->string('cv_path'); // Chemin vers le fichier CV uploadé
            $table->text('message')->nullable();
            $table->string('status')->default('received'); // received, reviewed, accepted, rejected
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('internship_applications');
    }
}