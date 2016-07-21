<?php

namespace Api\Http\Controllers;

use Illuminate\Http\Request;
use Api\Producto;
use Api\Http\Requests;
use Api\Factura;
class departamentoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
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
        if (!Factura::where('idUsuario','=',$request['idUsuario'])->where('estado','=','en proceso')) {
          Factura::create([
            'idUsuario'=>$request['idUsuario'],
            'estado' => "en proceso"
          ]);
          $fact = Factura::where('idUsuario','=',$request['idUsuario'])->where('estado','=','en proceso')->get();
          $pro = Producto::find($request['idProducto']);
          $pro->cantidad = $pro->cantidad - $request['cantidad'];

          $fact->producto()->attach($request['idProducto'],['cantidad'=>$request['cantidad']]);
          $pro->save();

        }
        else {
          $fact = Factura::where('idUsuario','=',$request['idUsuario'])->where('estado','=','en proceso')->get();
          $pro = Producto::find($request['idProducto']);
          $pro->cantidad = $pro->cantidad - $request['cantidad'];
          foreach ($fact as  $fac) {
            $fac->producto()->attach($request['idProducto'],['cantidad'=>$request['cantidad']]);
          }
         $pro->save();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $producto = Producto::with('categoria','marca')->where('idCategoria','=', $id)->get();
         return response()->json($producto->toArray());
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
