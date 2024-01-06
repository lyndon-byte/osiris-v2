<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\User;
use Inertia\Inertia;
use Psy\Readline\Hoa\Event;
use Illuminate\Http\Request;
use App\Mail\NewUserCredential;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Auth\Events\Registered;
use Illuminate\Validation\Rules\Password;
use Haruncpi\LaravelIdGenerator\IdGenerator;


class UserController extends Controller
{
    public function index(){

        return Inertia::render('Register');
    }

    public function addadminuser(Request $request){
      
     
      
      $request->validate([
            
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
            'password_confirmation' => ['required','same:password'],
            'role' => 'required'

       ]);

       $id = IdGenerator::generate(['table' => 'users', 'length' => 9,'prefix' => 'OS']);

       $company_id = IdGenerator::generate(['table' => 'users', 'length' => 9, 'prefix' => 'CID']);

       $user = User::create([
           'id' => $id,
           'company_id' => $company_id,
           'firstname' => $request->input('firstname'),
           'lastname' => $request->input('lastname'),
           'contactnumber'=> $request->input('contactnumber'),
           'email' => $request->input('email'),
           'password' => $request->input('password'),
           'role' => $request->input('role'),

       ]);

       event(new Registered($user));

       Auth::login($user);
    } 


    public function addemployee(Request $request){
      
      
      
      $request->validate([
            
            'firstName' => ['required'],
            'lastName'  => ['required'],
            'contactNumber'  => ['required','min:10','max:10'],
            'email'  => ['required','email','unique:users,email'],

       ]);

       $miniuseremail = $request->input('email');

       $minusername =   $request->input('firstName');

       $adminname = Auth::user()->firstname;

       $url = url('/userlogin');

       $id = IdGenerator::generate(['table' => 'users', 'length' => 9, 'prefix' => 'OS']);

       $company_id = Auth::user()->company_id;

       $employee_id = IdGenerator::generate(['table' => 'users', 'length' => 9, 'prefix' => 'EID']);

       $password = $employee_id . "@" . "osiris";

       $role = "employee";

       User::create([

           'id' =>  $id, 
           'company_id' => $company_id,
           'employee_id' => $employee_id,
           'firstname' => $request->input('firstName'),
           'lastname' => $request->input('lastName'),
           'contactnumber'=> $request->input('contactNumber'),
           'email' => $request->input('email'),
           'password' =>  $password,
           'role' => $role,

       ]);

      
      Mail::to($miniuseremail)->send(new NewUserCredential($minusername,$adminname,$employee_id ,$miniuseremail, $url ));

    } 

    public function login(){

      return Inertia::render('Login');

    }

    public function userviews(Request $request){

        $searchstring = $request->input('searchString');

        $company_id = Auth::user()->company_id;

        
        
        return Inertia::render('User',[

          'users' =>  User::where('company_id',$company_id )
                                ->where('role','employee')
                                ->orderBy('employee_id','desc')
                                ->paginate(5),


          'specifyuser' => Inertia::lazy(fn () => User::where([
            
                            ['company_id',$company_id],
                            ['role','employee'], 
                            ['firstname','LIKE','%'.$searchstring.'%']
            
                       ])
                       ->orWhere([
            
                            ['company_id',$company_id],
                            ['role','employee'], 
                            ['employee_id','LIKE','%'.$searchstring.'%']
            
                       ])
                       ->orWhere([
            
                            ['company_id',$company_id],
                            ['role','employee'], 
                            ['lastname','LIKE','%'.$searchstring.'%']
        
                       ])
                       ->orWhere([
            
                            ['company_id',$company_id],
                            ['role','employee'], 
                            ['email','LIKE','%'.$searchstring.'%']
        
                       ])
                      ->orderBy('employee_id','desc')
                      ->paginate(5)),

        ]);

        
        
    }

    public function searchuser(Request $request){

      
      $searchstring = $request->input('searchString');

      $company_id = Auth::user()->company_id;
     
      $users = User::where([
            
                    ['company_id',$company_id],
                    ['role','employee'], 
                    ['firstname','LIKE','%'.$searchstring.'%']

              ])
              ->orWhere([

                    ['company_id',$company_id],
                    ['role','employee'], 
                    ['employee_id','LIKE','%'.$searchstring.'%']

              ])
              ->orWhere([

                    ['company_id',$company_id],
                    ['role','employee'], 
                    ['lastname','LIKE','%'.$searchstring.'%']

              ])
              ->orWhere([

                    ['company_id',$company_id],
                    ['role','employee'], 
                    ['email','LIKE','%'.$searchstring.'%']

              ])
              ->orderBy('employee_id','desc')
              ->paginate(5);

      return Inertia::render('User',[

        'users' => $users

      ]);
     

  }

  public function getsingleuserinfo(Request $request){

    $userid =  $request->input('idForSelection');

    return Inertia::render('UserInfo',[

      'userid' => $userid

    ]);

  }
}
