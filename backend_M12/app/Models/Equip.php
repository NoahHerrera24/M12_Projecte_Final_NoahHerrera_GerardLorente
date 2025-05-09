<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Equip extends Model
{
    protected $guarded = [];
    
    public function nom()
    {
        return "{$this->nom}";
    }

    public function users()
    {
        return $this->hasMany(User::class);
    }

}