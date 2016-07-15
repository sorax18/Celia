<?php

use Illuminate\Database\Seeder;

class UserSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = [
          [
            'idUsuario'=>'123123',
            'nombre1'=> 'Alejandro',
            'apellido1'=>'Cerdas',
            'correo'=>'alex@gmail.com',
            'password'=> Hash::make('123'),
            'administrador' => '1'
          ]
        ];
        foreach ($users as $user) {
          \Api\User::create($user);
        }
    }
}
