<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Torneig extends Model
{
    protected $guarded = [];

    protected $table = 'tornejos';

    public function equips()
    {
        return $this->belongsToMany(Equip::class, 'tornejos_equips');
    }

    public function jugadors()
    {
        return $this->belongsToMany(User::class, 'tornejos_users');
    }

}