<?php

namespace Api\Http\Controllers;

use Illuminate\Http\Request;
use Image;
use Api\Http\Requests;
use Api\Marca;
class marcaController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
      $Marca = Marca::all();
    return  response()->json($Marca->toArray());
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
    $nombre = $request->input('nombreMarca'). '.' .'jpg';//el nombre de la imagen es el numeron de carne con la extensio jpg
    $direccion = public_path('img/marca/' . $nombre);
    if(Image::make($imagen->getRealPath())->resize('550','500')->save($direccion)){//si se crea la imagen 100*100px entonces dar un mensaje
          echo "string";
        }
        Marca::create([
        'nombreMarca'=> $request['nombreMarca'],
        'imagenMarca'=>$request['nombreMarca']. '.jpg',
      ]);
return $request->nombreMarca;

  }

  /**
   * Display the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function show($id)
  {
      $Marca = Marca::find($id);
      return response()->json($Marca->toArray());
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
        $Marca = Marca::find($id);
        $Marca->fill($request->all());
        $Marca->save();
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
        $Marca = Marca::find($id);
        $Marca->delete();
        return response()->json(["mensaje"=>"Eliminada"]);
  }
}
