<?php

namespace Api;

use Illuminate\Database\Eloquent\Model;

class Factura extends Model
{
  protected $table = 'factura';
  protected $primaryKey = 'codigo';
  public $timestamps = false;
  protected $fillable = ['fecha','monto','idUsuario','estado'];

  public function producto() {

      return $this->belongsToMany('Api\Producto','vende', 'idFactura','idProducto')->withPivot('estado','cantidad');
  }

  public function usuario(){

    return $this->belongto('Api\User', 'idUsuario', 'idUsuario');
  }
}
