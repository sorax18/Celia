<?php

namespace Api;

use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
  protected $table = 'usuario';
  protected $primaryKey = 'idUsuario';
  public $timestamps = false;
    protected $fillable = [
        'idUsuario','nombre1', 'nombre2', 'apellido1','apellido2','correo','password','direccion','telefono','zip','administrador'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];
}
