<?php

namespace Api\Http\Controllers;

use Illuminate\Http\Request;
use Image;
use Api\Http\Requests;
use Api\Categoria;
class categoriaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $categoria = Categoria::all();
      return  response()->json($categoria->toArray());
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
      $imagen = $request->file('file');
      $nombre = $request->input('nombreCategoria'). '.' .'jpg';//el nombre de la imagen es el numeron de carne con la extensio jpg
      $direccion = public_path('img/categoria/' . $nombre);
      if(Image::make($imagen->getRealPath())->resize('550','500')->save($direccion)){//si se crea la imagen 100*100px entonces dar un mensaje
            echo "string";
          }
          Categoria::create([
          'nombreCategoria'=> $request['nombreCategoria'],
          'imagenCategoria'=>$request['nombreCategoria']. '.jpg',
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
        $categoria = Categoria::find($id);
        return response()->json($categoria->toArray());
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
          $categoria = Categoria::find($id);
          $categoria->fill($request->all());
          $categoria->save();
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
          $categoria = Categoria::find($id);
          $categoria->delete();
          return response()->json(["mensaje"=>"Eliminada"]);
    }
}
