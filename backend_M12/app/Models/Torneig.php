<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Torneig extends Model
{
    protected $guarded = [];

    protected $table = 'tornejos';

    public function jugadors()
    {
        return $this->belongsToMany(User::class, 'tornejos_users', 'torneig_id', 'user_id')
            ->withPivot('guanyador', 'expulsat');  
    }

}