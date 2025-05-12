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
            $table->string('entrenador');
            $table->string('logo');
            $table->string('descripcio');
            $table->boolean('actiu')->default(false); // Agregar valor predeterminado

            $table->timestamps();
        });

        Schema::table('equips', function (Blueprint $table) {
            $table->boolean('actiu')->default(false)->change(); // Cambiar el tipo de dato y establecer un valor predeterminado
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('equips', function (Blueprint $table) {
            $table->boolean('actiu')->change(); // Revertir el cambio si es necesario
        });

        Schema::dropIfExists('equips');
    }
};
