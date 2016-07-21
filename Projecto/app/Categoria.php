<?php

namespace Api;

use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
   protected $table = 'categoria';
   protected $primaryKey = 'idCategoria';
   public $timestamps = false;
   protected $fillable = ['nombreCategoria','imagenCategoria'];
   public function producto() {

       return $this->hasMany('Api\Producto');
   }
}
