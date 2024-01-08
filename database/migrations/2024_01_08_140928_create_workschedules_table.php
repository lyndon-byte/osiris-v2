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
        Schema::create('workschedules', function (Blueprint $table) {
            $table->id();
            $table->string('user_id');
            $table->time('starts_at')->nullable();
            $table->time('ends_at')->nullable();
            $table->string('restday1')->nullable();
            $table->string('restday2')->nullable();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('workschedules');
    }
};
