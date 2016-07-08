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
            'nombre1'=> 'Alejandro',
            'apellido1'=>'Cerdas',
            'correo'=>'ale@gmai.com',
            'password'=> Hash::make('123')
          ]
        ];
        foreach ($users as $user) {
          \Api\User::create($user);
        }
    }
}
