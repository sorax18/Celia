<?php

namespace Api\Http\Controllers;

use Illuminate\Http\Request;
use Image;
use Api\Http\Requests;
use Api\Producto;
class productoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
     public function index()
     {
         $Producto = Producto::with('categoria', 'marca')->get();
       return response()->json( $Producto->toArray());
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
       $nombre = $request->input('nombreProducto'). '.' .'jpg';//el nombre de la imagen es el numeron de carne con la extensio jpg
       $direccion = public_path('img/productos/' . $nombre);
       if(Image::make($imagen->getRealPath())->resize('550','500')->save($direccion)){//si se crea la imagen 100*100px entonces dar un mensaje
             echo "string";
           }
           Producto::create([
           'nombreProducto'=> $request['nombreProducto'],
           'imagenProducto'=>$request['nombreProducto']. '.jpg',
           'precio' => $request ['precio'],
           'cantidad'=> $request['cantidad'],
           'impuesto' => $request['impuesto'],
           'idCategoria'=>$request['idCategoria'],
           'idMarca'=> $request['idMarca'],
           'descripcion'=>$request['descripcion'],
         ]);
   return $request->nombreProducto;

     }

     /**
      * Display the specified resource.
      *
      * @param  int  $id
      * @return \Illuminate\Http\Response
      */
     public function show($id)
     {
         $Producto =Producto::with('categoria','marca')->where('idProducto','=', $id)->get();
         return response()->json($Producto->toArray());
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
           $Producto = Producto::find($id);
           $Producto->fill($request->all());
           $Producto->save();
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
           $Producto = Producto::find($id);
           $Producto->delete();
           return response()->json(["mensaje"=>"Eliminada"]);
     }
   }
