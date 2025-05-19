<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TicketQueixa extends Model
{
    protected $guarded = [];
    protected $table = 'tickets_queixa';

    public function creador()
    {
        return $this->belongsTo(User::class, 'usuari_id');
    }

    public function culpable()
    {
        return $this->belongsTo(User::class, 'culpable_id');
    }

}