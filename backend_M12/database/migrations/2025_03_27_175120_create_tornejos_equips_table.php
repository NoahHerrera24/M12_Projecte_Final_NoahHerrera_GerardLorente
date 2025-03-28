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
        Schema::create('tornejos_equips', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('torneig_id');
            $table->foreign('torneig_id')->references('id')->on('tornejos')->onDelete('cascade');
            $table->unsignedBigInteger('equip_id');
            $table->foreign('equip_id')->references('id')->on('equips')->onDelete('cascade');
            $table->boolean('guanyador')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tornejos_equips');
    }
};
