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
        Schema::create('location_opening', function (Blueprint $table) {
            $table->id();
            $table->foreignId('opening_id')->constrained('openings')->cascadeOnDelete();
            $table->foreignId('country_id')->constrained('locations')->cascadeOnDelete(); //country id
            $table->foreignId('state_id')->constrained('locations')->cascadeOnDelete(); //state id
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('location_opening');
    }
};
