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
        Schema::create('equips', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('colors_representatius');
            $table->string('idioma_equip');
            $table->string('patrocinadors');
            $table->date('data_fundacio');
            $table->string('entrenador')->nullable();
            $table->string('logo')->nullable();
            $table->string('descripcio');
            $table->boolean('actiu');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('equips');
    }
};
