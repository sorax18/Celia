<?php

namespace Api;

use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
  protected $table = 'producto';
  protected $primaryKey = 'idProducto';
  public $timestamps = false;
  protected $fillable = ['nombreProducto','precio','cantidad','descripcion','impuesto','idCategoria','idMarca','imagenProducto'];


  public function categoria() {

      return $this->belongsTo('Api\Categoria', 'idCategoria','idCategoria');
  }
  public function marca() {

      return $this->belongsTo('Api\Marca', 'idMarca','idMarca');
  }
  public function factura(){
    return $this->belongstoMany('Api\Factura', 'vende', 'idProducto', 'codigo')->withPivot('estado');
  }
}
