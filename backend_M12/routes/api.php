<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

//// TORNEJOS

Route::get('tornejos', [ApiController::class, 'getTornejos']);

Route::get('torneig/get/{id}', [ApiController::class, 'getTorneig']);

Route::post('torneig/create', [ApiController::class, 'createTorneig']);

Route::post('torneig/{id}', [ApiController::class, 'updateTorneig']);

Route::delete('torneig/delete/{id}', [ApiController::class, 'deleteTorneig']);

//// EQUIPS

Route::get('equips', [ApiController::class, 'getEquips']);

Route::get('equip/get/{id}', [ApiController::class, 'getEquip']);

Route::post('equip/create', [ApiController::class, 'createEquip']);

Route::post('equip/{id}', [ApiController::class, 'updateEquip']);

Route::delete('equip/delete/{id}', [ApiController::class, 'deleteEquip']);

//// TICKETS_QUEIXA

Route::get('tickets-queixa', [ApiController::class, 'getTicketsQueixa']);

Route::get('ticket-queixa/get/{id}', [ApiController::class, 'getTicketQueixa']);

Route::post('ticket-queixa/create', [ApiController::class, 'createTicketQueixa']);

Route::post('ticket-queixa/{id}', [ApiController::class, 'updateTicketQueixa']);

Route::delete('ticket-queixa/delete/{id}', [ApiController::class, 'deleteTicketQueixa']);