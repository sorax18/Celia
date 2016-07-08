<?php

namespace Api;

use Illuminate\Database\Eloquent\Model;

class Marca extends Model
{
  protected $table = 'marca';
  protected $primaryKey = 'idMarca';
  public $timestamps = false;
  protected $fillable = ['nombreMarca'];
}
