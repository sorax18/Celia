<?php

namespace Api;

use Illuminate\Database\Eloquent\Model;

class Marca extends Model
{
  protected $table = 'marca';
  protected $primaryKey = 'idMarca';
  public $timestamps = false;
  protected $fillable = ['nombreMarca','imagenMarca'];

  public function producto() {

      return $this->hasMany('Api\Producto');
  }
}
