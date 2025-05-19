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
        Schema::create('tickets_queixa', function (Blueprint $table) {
            $table->id();
            $table->string('descripcio');
            $table->string('foto')->nullable();
            $table->string('video')->nullable();
            $table->string('estat');
            $table->unsignedBigInteger('torneig_id')->nullable();
            $table->foreign('torneig_id')->references('id')->on('tornejos')->onDelete('cascade');
            $table->unsignedBigInteger('culpable_id')->nullable();
            $table->foreign('culpable_id')->references('id')->on('users')->onDelete('cascade');
            $table->unsignedBigInteger('usuari_id')->nullable();
            $table->foreign('usuari_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tickets_queixa');
    }
};
