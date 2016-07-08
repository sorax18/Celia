<?php

namespace Api;

use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
  protected $table = 'producto';
  protected $primaryKey = 'idProducto';
  public $timestamps = false;
  protected $fillable = ['nombreProducto','precio','cantidad','descripcion','impuesto','Categoria_idCategoria','Marca_idMarca'];
}
