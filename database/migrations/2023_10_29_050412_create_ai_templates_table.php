<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('ai_templates', function (Blueprint $table) {
            $table->id();
            $table->uuid();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('preview')->nullable();
            $table->string('icon')->nullable();
            $table->enum('type', ['candidate', 'employer']);
            $table->string('status')->default('draft');
            $table->text('fields')->nullable();
            
            $table->text('prompt');
            $table->string('ai_model')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ai_templates');
    }
};
