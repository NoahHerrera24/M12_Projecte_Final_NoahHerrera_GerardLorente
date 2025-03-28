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
        Schema::create('tornejos', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('regles');
            $table->string('premis');
            $table->string('categoria');
            $table->string('format');
            $table->date('data_inici');
            $table->date('data_fi');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tornejos');
    }
};
