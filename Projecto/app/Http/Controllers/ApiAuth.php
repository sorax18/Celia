<?php

namespace Api\Http\Controllers;

use Illuminate\Http\Request;
use Api\Http\Requests;
use JWTAuth;

class ApiAuth extends Controller
{
  //funcion de auth
    public function UserAuth(Request $request){
      $credentials = $request->only('correo','password');
      $token = null;
      //si sale mal
      try{
          if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['error'=>'invalid_credential'], 500);
          }
      }catch(JWTException $ex){
        return response()->json(['error'=>'algo anda mal'], 500);
      }
      //sino
      $user = JWTAuth::toUser($token);//buscar el usuario relacionado con el token
      return response()->json(compact('token','user'));

    }
    public function index()
{
    echo "made it";
}
}
