<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;

use Illuminate\Http\Request;
use App\Models\Torneig;
use App\Models\Equip;
use App\Models\TicketQueixa;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class ApiController extends Controller
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    //// TORNEJOS:

    public function getTornejos()
    {
        $tornejos = Torneig::all();

        return response()->json($tornejos);
    }

    public function getTorneig($id)
    {
        $torneig = Torneig::find($id);
        return response()->json($torneig);
    }

    public function createTorneig(Request $request)
    {
        $torneig = new Torneig();

        $torneig->nom = $request->input('nom');
        $torneig->regles = $request->input('regles');
        $torneig->premis = $request->input('premis');
        $torneig->categoria = $request->input('categoria');
        $torneig->format = $request->input('format');
        $torneig->data_inici = $request->input('data_inici');
        $torneig->data_fi = $request->input('data_fi');

        $torneig->save();

        return response()->json($torneig, 201);
    }

    public function updateTorneig(Request $request, $id)
    {
        $torneig = Torneig::find($id);

        if (!$torneig) {
            return response()->json(['error' => 'Torneig no trobat'], 404);
        }

        if (isset($request->nom)) {
            $torneig->nom = $request->nom;
        }

        if (isset($request->regles)) {
            $torneig->regles = $request->regles;
        }

        if (isset($request->premis)) {
            $torneig->premis = $request->premis;
        }

        if (isset($request->categoria)) {
            $torneig->categoria = $request->categoria;
        }

        if (isset($request->format)) {
            $torneig->format = $request->format;
        }

        if (isset($request->data_inici)) {
            $torneig->data_inici = $request->data_inici;
        }

        if (isset($request->data_fi)) {
            $torneig->data_fi = $request->data_fi;
        }

        $torneig->save();

        return response()->json($torneig, 200);
    }

    public function deleteTorneig($id)
    {
        $torneig = Torneig::find($id);
        $torneig->delete();

        return $torneig;
    }

    //// EQUIPS:

    public function getEquips()
    {
        $equips = Equip::all();

        foreach ($equips as $equip) {
            // Generar la URL para acceder a la imagen del equipo
            $equip->logo = url('/api/equip/getimg/' . $equip->id);
        }

        return response()->json($equips);
    }

    public function getEquip($id)
    {
        $equip = Equip::find($id);

        if (!$equip) {
            return response()->json(['error' => 'Equip no trobat'], 404);
        }

        // Generar la URL para acceder a la imagen del equipo
        $equip->logo = url('/api/equip/getimg/' . $equip->id);

        return response()->json($equip);
    }

    public function getEquipImg($id)
    {
        $equip = Equip::find($id);
        
        if (!$equip || !$equip->logo) {
            return response()->json(['error' => 'Imagen no encontrada'], 404);
        }
        
        $path = public_path(env('RUTA_IMATGES') . '/' . $equip->logo);
        
        if (file_exists($path)) {
            $headers = ['Content-Type' => mime_content_type($path)];
            return response()->file($path, $headers);
        }
        
        return response()->json(['error' => 'Imagen no encontrada'], 404);
    }

    public function createEquip(Request $request)
    {
        $equip = new Equip();

        $equip->nom = $request->input('nom');
        $equip->colors_representatius = $request->input('colors_representatius');
        $equip->idioma_equip = $request->input('idioma_equip');
        $equip->patrocinadors = $request->input('patrocinadors');
        $equip->data_fundacio = $request->input('data_fundacio');
        $equip->entrenador = $request->input('entrenador');
        $equip->descripcio = $request->input('descripcio');
        $equip->actiu = filter_var($request->input('actiu'), FILTER_VALIDATE_BOOLEAN) ? 1 : 0; // Convertir a 1 o 0

        if ($request->has('guanyador')) {
            $equip->guanyador = $request->input('guanyador');
        }

        if ($request->file('logo')) {
            $file = $request->file('logo');
            $idAleatori = uniqid();
            $extensio = $file->getClientOriginalExtension();
            $filename = "{$equip->nom}_{$idAleatori}.{$extensio}";
            $file->move(public_path(env('RUTA_IMATGES')), $filename);
            $equip->logo = $filename;
        }

        $equip->save();

        return response()->json($equip, 201);
    }

    public function updateEquip(Request $request, $id)
    {
        $equip = Equip::find($id);

        if (!$equip) {
            return response()->json(['error' => 'Equip no trobat'], 404);
        }

        if ($request->has('nom')) {
            $equip->nom = $request->input('nom');
        }

        if ($request->has('colors_representatius')) {
            $equip->colors_representatius = $request->input('colors_representatius');
        }

        if ($request->has('idioma_equip')) {
            $equip->idioma_equip = $request->input('idioma_equip');
        }

        if ($request->has('patrocinadors')) {
            $equip->patrocinadors = $request->input('patrocinadors');
        }

        if ($request->has('data_fundacio')) {
            $equip->data_fundacio = $request->input('data_fundacio');
        }

        if ($request->has('entrenador')) {
            $equip->entrenador = $request->input('entrenador');
        }

        if ($request->has('descripcio')) {
            $equip->descripcio = $request->input('descripcio');
        }

        if ($request->has('actiu')) {
            $equip->actiu = $request->input('actiu');
        }

        // Solo asignar 'guanyador' si está presente en la solicitud
        if ($request->has('guanyador')) {
            $equip->guanyador = $request->input('guanyador');
        }

        if ($request->file('logo')) {
            $file = $request->file('logo');

            $nom = $equip->nom ?? 'equip';
            $idAleatori = uniqid();
            $extensio = $file->getClientOriginalExtension();
            $filename = "{$nom}_{$idAleatori}.{$extensio}";
            $rutaImatges = public_path(env('RUTA_IMATGES', 'uploads/imatges'));

            $file->move($rutaImatges, $filename);

            $equip->logo = $filename;
        }

        $equip->save();

        return response()->json($equip, 200);
    }

    public function deleteEquip($id)
    {
        $equip = Equip::find($id);
        $equip->delete();

        return $equip;
    }

    public function getEquipsWithGuanyador()
    {
        $equips = Equip::with(['tornejos' => function ($query) {
            $query->select('tornejos.id', 'tornejos.nom', 'tornejos_equips.guanyador');
        }])->get();

        return response()->json($equips);
    }

    public function assignTorneigToEquip(Request $request, $equipId, $torneigId)
    {
        $equip = Equip::find($equipId);
        $torneig = Torneig::find($torneigId);

        if (!$equip || !$torneig) {
            return response()->json(['error' => 'Equip o Torneig no trobat'], 404);
        }

        // Asociar el torneo con el equipo y establecer el valor del campo pivote 'guanyador'
        $equip->tornejos()->attach($torneigId, ['guanyador' => $request->input('guanyador', false)]);

        return response()->json(['message' => 'Torneig assignat al equip amb èxit'], 200);
    }

    public function updateGuanyador(Request $request, $equipId, $torneigId)
    {
        $equip = Equip::find($equipId);

        if (!$equip) {
            return response()->json(['error' => 'Equip no trobat'], 404);
        }

        // Actualizar el valor del campo pivote 'guanyador'
        $equip->tornejos()->updateExistingPivot($torneigId, ['guanyador' => $request->input('guanyador', false)]);

        return response()->json(['message' => 'Guanyador actualitzat amb èxit'], 200);
    }

    //// TICKETS QUEIXA:

    public function getTicketsQueixa()
    {
        $ticketsQueixa = TicketQueixa::all();

        // Decodificar el campo 'proves' para cada ticket
        $ticketsQueixa->transform(function ($ticket) {
            $ticket->proves = $ticket->proves ? json_decode($ticket->proves) : [];
            return $ticket;
        });

        return response()->json($ticketsQueixa);
    }

    public function getTicketQueixa($id)
    {
        $ticketQueixa = TicketQueixa::find($id);

        if (!$ticketQueixa) {
            return response()->json(['error' => 'Ticket de Queixa no trobat'], 404);
        }

        // Decodificar el campo 'proves' si no es nulo
        $ticketQueixa->proves = $ticketQueixa->proves ? json_decode($ticketQueixa->proves) : [];

        return response()->json($ticketQueixa);
    }

    public function createTicketQueixa(Request $request)
    {
        $ticketQueixa = new TicketQueixa();
        $ticketQueixa->descripcio = $request->input('descripcio');
        $ticketQueixa->estat = $request->input('estat');

        $files = [];
        if ($request->hasFile('proves')) {
            foreach ($request->file('proves') as $file) {
                $path = $file->store(
                    str_starts_with($file->getMimeType(), 'image') ? env('RUTA_IMATGES') :
                    (str_starts_with($file->getMimeType(), 'video') ? env('RUTA_VIDEOS') : env('RUTA_PDFS')),
                    'public'
                );
                $files[] = $path;
            }
        }

        $ticketQueixa->proves = json_encode($files);
        $ticketQueixa->save();

        return response()->json($ticketQueixa, 201);
    }

    public function updateTicketQueixa(Request $request, $id)
    {
        $ticketQueixa = TicketQueixa::find($id);

        if (!$ticketQueixa) {
            return response()->json(['error' => 'Ticket de Queixa no trobat'], 404);
        }

        if ($request->has('descripcio')) {
            $ticketQueixa->descripcio = $request->input('descripcio');
        }

        if ($request->has('estat')) {
            $ticketQueixa->estat = $request->input('estat');
        }

        $files = json_decode($ticketQueixa->proves, true) ?? [];

        if ($request->hasFile('proves')) {
            foreach ($request->file('proves') as $file) {
                $path = $file->store(
                    str_starts_with($file->getMimeType(), 'image') ? env('RUTA_IMATGES') :
                    (str_starts_with($file->getMimeType(), 'video') ? env('RUTA_VIDEOS') : env('RUTA_PDFS')),
                    'public'
                );
                $files[] = $path;
            }
        }

        $ticketQueixa->proves = json_encode($files);
        $ticketQueixa->save();

        return response()->json($ticketQueixa, 200);
    }

    public function deleteTicketQueixa($id)
    {
        $ticketQueixa = TicketQueixa::find($id);
        $ticketQueixa->delete();

        return $ticketQueixa;
    }

    public function getRankingEquips() 
    {
        try {
            $ranking = DB::table('equips')
                ->select('equips.id', 'equips.nom', DB::raw('COUNT(tornejos_equips.id) as victories'))
                ->join('tornejos_equips', 'equips.id', '=', 'tornejos_equips.equip_id')
                ->where('tornejos_equips.guanyador', 1) 
                ->groupBy('equips.id', 'equips.nom')
                ->orderByDesc('victories')
                ->get();

            return response()->json($ranking);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function getRankingParticipants()
    {
        try {
            $ranking = DB::table('users')
                ->select('users.id', 'users.name', DB::raw('COUNT(tornejos_users.id) as victories'))
                ->join('tornejos_users', 'users.id', '=', 'tornejos_users.user_id')
                ->where('tornejos_users.guanyador', 1) 
                ->where('users.role', 'participant') 
                ->groupBy('users.id', 'users.name')
                ->orderByDesc('victories')
                ->get();

            return response()->json($ranking);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function getRankingTornejos()
    {
        try {
            $ranking = DB::table('tornejos')
                ->select('tornejos.id', 'tornejos.nom', DB::raw('
                    COALESCE((SELECT COUNT(*) FROM tornejos_equips WHERE tornejos_equips.torneig_id = tornejos.id), 0) +
                    COALESCE((SELECT COUNT(*) FROM tornejos_users WHERE tornejos_users.torneig_id = tornejos.id), 0)
                    as total_inscrits
                '))
                ->orderByDesc('total_inscrits')
                ->get();

            return response()->json($ranking);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }  

    public function getJugadors()
    {
        $participants = User::where('role', 'participant')->get();

        return response()->json($participants);
    }

}