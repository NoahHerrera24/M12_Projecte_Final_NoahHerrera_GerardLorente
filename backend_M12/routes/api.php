<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Models\User;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/check-email', [AuthenticatedSessionController::class, 'checkEmail']);

Route::post('/login', function (Request $request) {
    $request->validate([
        'email' => 'required|email',
        'password' => 'required'
    ]);

    $user = User::where('email', $request->email)->first();

    if (!$user || !Hash::check($request->password, $user->password)) {
        return response()->json(['message' => 'Credenciales inválidas'], 401);
    }

    Auth::login($user);

    return response()->json(['message' => 'Login correcto', 'user' => $user]);
});

Route::delete('logout', [AuthenticatedSessionController::class, 'destroy'])->middleware('auth:sanctum');

//// TORNEJOS

Route::get('tornejos', [ApiController::class, 'getTornejos']);

Route::get('torneig/get/{id}', [ApiController::class, 'getTorneig']);

Route::post('torneig/create', [ApiController::class, 'createTorneig']);

Route::post('torneig/{id}', [ApiController::class, 'updateTorneig']);

Route::delete('torneig/delete/{id}', [ApiController::class, 'deleteTorneig']);

Route::post('torneig/{torneigId}/join', [ApiController::class, 'joinTorneig']);

Route::post('torneig/{torneigId}/leave', [ApiController::class, 'leaveTorneig']);

//// EQUIPS

Route::get('equips', [ApiController::class, 'getEquips']);

Route::get('equip/get/{id}', [ApiController::class, 'getEquip']);

Route::post('equip/create', [ApiController::class, 'createEquip']);

Route::post('equip/{id}', [ApiController::class, 'updateEquip']);

Route::delete('equip/delete/{id}', [ApiController::class, 'deleteEquip']);

Route::get('equip/getimg/{id}', [ApiController::class, 'getEquipImg']);

Route::get('/equips-with-guanyador', [ApiController::class, 'getEquipsWithGuanyador']);

Route::post('/equips/{equipId}/tornejos/{torneigId}/assign', [ApiController::class, 'assignTorneigToEquip']);

Route::put('/equips/{equipId}/tornejos/{torneigId}/update-guanyador', [ApiController::class, 'updateGuanyador']);

Route::post('equip/{equipId}/join', [ApiController::class, 'joinEquip']);

Route::post('equip/{equipId}/leave', [ApiController::class, 'leaveEquip']);

//// TICKETS_QUEIXA

Route::get('tickets-queixa', [ApiController::class, 'getTicketsQueixa']);

Route::get('ticket-queixa/get/{id}', [ApiController::class, 'getTicketQueixa']);

Route::post('ticket-queixa/create', [ApiController::class, 'createTicketQueixa']);

Route::post('ticket-queixa/{id}', [ApiController::class, 'updateTicketQueixa']);

Route::delete('ticket-queixa/delete/{id}', [ApiController::class, 'deleteTicketQueixa']);

Route::get('ticket-queixa/getimg/{id}', [ApiController::class, 'getTicketQueixaImg']);

//// RANKINGS

Route::get('ranking-equips', [ApiController::class, 'getRankingEquips']);

Route::get('ranking-participants', [ApiController::class, 'getRankingParticipants']);

Route::get('ranking-tornejos', [ApiController::class, 'getRankingTornejos']);

//// USERS

Route::get('jugadors', [ApiController::class, 'getJugadors']);