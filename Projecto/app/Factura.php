<?php

namespace Api;

use Illuminate\Database\Eloquent\Model;

class Factura extends Model
{
  protected $table = 'factura';
  protected $primaryKey = 'codigo';
  public $timestamps = false;
  protected $fillable = ['fecha','Monto','Usuario_idUsuario'];
}
