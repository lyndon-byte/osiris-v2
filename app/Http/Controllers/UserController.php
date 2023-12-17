<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;


class UserController extends Controller
{
    public function index(){

        return Inertia::render('Register');
    }

    public function adduser(Request $request){

       $newUser = $request->validate([

            'firstname' => ['required'],
            'lastname'  => ['required'],
            'contactnumber'  => ['required','min:10','max:10'],
            'email'  => ['required','email','unique:users,email'],
            'password' => ['required',
              Password::min(8)

                    ->letters()
                    ->mixedCase()
                    ->numbers()
                    ->symbols()
          
            ],
            'password_confirmation' => ['required','same:password']


       ]);

       User::create($newUser);

    } 

    public function accountconfirmation(){

      return Inertia::render('AccountConfirmation');

    }

    public function login(){

      return Inertia::render('Login');

    }
}
