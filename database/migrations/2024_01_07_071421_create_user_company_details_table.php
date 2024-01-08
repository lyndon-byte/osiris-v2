<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * 
     * 
     */
   

    public function up(): void
    {
        Schema::create('user_company_details', function (Blueprint $table) {
            
            $table->id();
            $table->string('user_id');
            $table->string('company_id');
            $table->string('employee_id');
            $table->string('role');
            $table->date('birthdate');
            $table->string('gender');
            $table->string('addressline');
            $table->string('city');
            $table->string('state');
            $table->integer('postal');
            $table->string('jobtitle');
            $table->date('startdate');
            $table->string('department');
            $table->string('team');
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();

            
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_company_details');
    }
};
