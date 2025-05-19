<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChangePasswordRequest;
use DB;
use Symfony\Component\HttpFoundation\Response;
use App\Models\User;


class ChangePasswordController extends Controller
{
    public function process(ChangePasswordRequest $request)
    {

        return $this->getPasswordResetTableRow($request)
            ->count() > 0 ? $this->changePassword($request) :
            $this->tokenNotFoundResponse();


    }

    private function getPasswordResetTableRow($request)
    {


        return DB::table('password_resets')
            ->where(
                'email',
                $request->email,
                'token',
                $request->token
            );



    }

    public function tokenNotFoundResponse()
    {

        return response()->json(
            ['error' => 'Token o email no són correctes '],
            response::HTTP_UNPROCESSABLE_ENTITY
        );


    }

    public function changePassword($request)
    {

        $user = User::whereEmail($request->email)->first();

        $user->update([
            'password' => bcrypt($request->password)
        ]);

        $this->getPasswordResetTableRow($request)
            ->delete();

        return response()->json([
            'message' => 'Password canviada correctament',
            'redirect' => '/welcome'
        ], response::HTTP_CREATED);
    }
}
