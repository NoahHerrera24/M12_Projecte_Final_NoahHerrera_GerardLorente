<?php

namespace Database\Seeders;

use App\Models\Equip;
use App\Models\Torneig;
use App\Models\TicketQueixa;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

     /*    User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]); */

        Equip::create([
            'id' => 1,
            'nom' => 'Dragons FC',
            'colors_representatius' => 'Vermell, Negre',
            'idioma_equip' => 'Català',
            'patrocinadors' => 'Empresa A',
            'data_fundacio' => '1995-04-12',
            'entrenador' => 'Joan Garcia',
            'logo' => 'dragons_fc_logo.png',
            'descripcio' => 'Equip llegendari amb molts títols.',
            'actiu' => true,
        ]);

        Torneig::create([
            'id' => 1,
            'nom' => 'Copa Catalunya',
            'regles' => 'Regles del torneig',
            'premis' => 'Trofeu i medalles',
            'categoria' => 'Sènior',
            'format' => 'Eliminatòries',
            'data_inici' => '2025-05-01',
            'data_fi' => '2025-05-15',
        ]);
      

        TicketQueixa::create([
            'id' => 1,
            'descripcio' => 'Hi ha hagut un problema amb l\'assignació de l\'equip.',
            'proves' => json_encode(['document1.pdf', 'document2.jpg']),
            'estat' => 'Obert',
        ]);

    }
}



