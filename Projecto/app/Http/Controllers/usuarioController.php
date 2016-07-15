<?php

namespace Api\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Route;
use Api\Http\Requests;
use Api\User;
class usuarioController extends Controller
{
  public function __construct(Route $route){

       $this->user = User::find($route->getParameter('registro', ['only' => ['show', 'update', 'destroy']]));
  }

    public function index()
    {
      $user =  User::all();
      return response()->json($user->toArray());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
      $token = null;
      if($request['administrador']==1){
        User::create([
           'idUsuario'=>$request['idUsuario'],
           'password'=>bcrypt($request['password']),
           'nombre1'=>$request['nombre1'],
           'nombre2'=>$request['nombre2'],
           'apellido1'=>$request['apellido1'],
           'apellido2'=>$request['apellido2'],
           'telefono'=>$request['telefono'],
           'direccion'=>$request['direccion'],
           'correo'=>$request['correo'],
           'zip'=>$request['zip'],
           'administrador'=>$request['administrador']
           ]);
         return response()->json(["Mensaje"=>"Usuario creado con Exito"]);
      }
      User::create([
         'idUsuario'=>$request['idUsuario'],
         'password'=>bcrypt($request['password']),
         'nombre1'=>$request['nombre1'],
         'nombre2'=>$request['nombre2'],
         'apellido1'=>$request['apellido1'],
         'apellido2'=>$request['apellido2'],
         'telefono'=>$request['telefono'],
         'direccion'=>$request['direccion'],
         'correo'=>$request['correo'],
         'zip'=>$request['zip'],
         ]);
       return response()->json(["Mensaje"=>"Usuario creado con Exito"]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return response()->json($this->user);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $token = null;
       $this->user->fill($request->all());
       $this->user->save();
      return response()->json(["mensaje"=>"Actualizada"]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
         $this->user->delete();
           return response()->json(["mensaje"=>"Eliminada"]);
    }
}
