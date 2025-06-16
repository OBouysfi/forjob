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
        Schema::create('openings', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug');
            $table->longText('description');
            $table->text('short_description');
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete(); // employer id
            $table->foreignId('category_id')->constrained('categories')->cascadeOnDelete(); // service id
            $table->string('type');
            $table->string('salary_type');
            $table->text('salary_range')->nullable();
            $table->string('currency')->default('USD');
            $table->string('experience');
            $table->string('expertise');
            $table->date('featured_expire_at')->nullable();
            $table->date('live_expire_at')->nullable();
            $table->text('attachment')->nullable();
            $table->string('address')->nullable();
            $table->text('fields')->nullable(); //json array format
            $table->string('status')->default(0)->comment('0: inactive, 1: active, 2: pending;');
            $table->integer('apply_type')->default(0)->nullable()->comment('0: default, 1: email, 2: external'); //json format
            $table->text('meta')->nullable(); //json format
            $table->date('expired_at')->nullable();
            $table->integer('total_visits')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('openings');
    }
};
