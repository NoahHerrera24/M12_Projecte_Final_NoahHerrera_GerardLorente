<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;

use Illuminate\Http\Request;
use App\Models\Torneig;
use App\Models\Equip;
use App\Models\TicketQueixa;

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

        return response()->json($equips);
    }

    public function getEquip($id)
    {
        $equip = Equip::find($id);
        return response()->json($equip);
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
        $equip->actiu = $request->input('actiu');

        if ($request->file('logo')) {
            $file = $request->file('logo');

            $nom = $request->input('nom');
            $idAleatori = uniqid();
            $extensio = $file->getClientOriginalExtension();
            $filename = "{$nom}_{$idAleatori}.{$extensio}";
            $rutaImatges = public_path(env('RUTA_IMATGES', 'uploads/imatges'));

            $file->move($rutaImatges, $filename);

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

        if (isset($request->nom)) {
            $equip->nom = $request->nom;
        }

        if (isset($request->colors_representatius)) {
            $equip->colors_representatius = $request->colors_representatius;
        }

        if (isset($request->idioma_equip)) {
            $equip->idioma_equip = $request->idioma_equip;
        }

        if (isset($request->patrocinadors)) {
            $equip->patrocinadors = $request->patrocinadors;
        }

        if (isset($request->data_fundacio)) {
            $equip->data_fundacio = $request->data_fundacio;
        }

        if (isset($request->entrenador)) {
            $equip->entrenador = $request->entrenador;
        }

        if (isset($request->descripcio)) {
            $equip->descripcio = $request->descripcio;
        }

        if (isset($request->actiu)) {
            $equip->actiu = $request->actiu;
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
        $equip= Equip::find($id);
        $equip->delete();

        return $equip;
    }

    //// TICKETS QUEIXA:

    public function getTicketsQueixa()
    {
        $ticketsQueixa = TicketQueixa::all();

        return response()->json($ticketsQueixa);
    }

    public function getTicketQueixa($id)
    {
        $ticketQueixa = TicketQueixa::find($id);
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
                str_starts_with($file->getMimeType(), 'image') ? env('RUTA_IMATGES') : env('RUTA_VIDEOS'),
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
                str_starts_with($file->getMimeType(), 'image') ? env('RUTA_IMATGES') : env('RUTA_VIDEOS'),
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
}