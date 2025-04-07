<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Equip extends Model
{
    protected $guarded = [];

    public function tornejos()
    {
        return $this->belongsToMany(Torneig::class, 'tornejos_equips', 'equip_id', 'torneig_id')
                    ->withPivot('guanyador');
    }
    public function nom()
    {
        return "{$this->nom}";
    }
}
