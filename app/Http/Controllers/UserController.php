<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use Psy\Readline\Hoa\Event;
use Illuminate\Http\Request;
use App\Models\TimeOffCredits;
use App\Mail\NewUserCredential;
use App\Models\EmployeeCalendar;
use App\Models\UserCompanyDetails;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\RedirectResponse;
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

      
      // Mail::to($miniuseremail)->send(new NewUserCredential($minusername,$adminname,$employee_id ,$miniuseremail, $url ));

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

  public function getsingleuserinfo(Request $request): Response{

        $primary_id = $request->input('id');
       
        if($primary_id == null){

          return inertia::render('Error403');

        }

        $company_id = Auth::user()->company_id;

        

        return Inertia::render('UserInfo',[

            'userbasicinfo' => User::where('company_id', $company_id)
                              ->where('role','employee')
                              ->where('id',$primary_id)
                              ->get(), 

            'companydetails' =>  User::find($primary_id)->companydetails,

            'jobscheduledata' => User::find($primary_id)->jobschedule,
                                       
            'employeecalendar' => User::find($primary_id)->calendar,

            'timeoffbalance' => User::find($primary_id)->timeoffcredits,

            'attendance' => User::find($primary_id)->attendance,

        ]);

      //   return Inertia::render('UserCalendar',[

      //     'jobscheduledata' => User::find($primary_id)->jobschedule
                                    

      // ]);

    
  }

    public function addcompanydetailsprocess(Request $request){

        $primary_id = $request->input('primaryid');
        $employee_id = $request->input('employeeid');
        $company_id = $request->input('companyid');
        $currentemail =  $request->input('defaultEmail');
        $possiblenewemail = $request->input('email');

        if($currentemail != $possiblenewemail){

              $request->validate([

                'email' => ['required','email','unique:users,email'],
              
              ]);

        }

       
       
        $request->validate([

           
            'firstName' => ['required'],
            'lastName' => ['required'],
            'contactNumber' => ['required','min:10','max:10'],
            'birthdate' => ['required'],
            'role' => ['required'],
            'gender' => ['required'],
            'addressline' => ['required'],
            'city' => ['required'],
            'state' => ['required'],
            'country' => ['required'],
            'postal' => ['required','min:4','max:4'],
            'jobtitle' => ['required'],
            'startDate' => ['required','after:today'],
            'department' => ['required'],
            'team' => ['required']

        ]);

        if(TimeOffCredits::where('user_id',$primary_id)->exists()){

         
        }else{

          TimeOffCredits::insert([

                'user_id' => $primary_id,
                'company_id' =>  $company_id,
                'timeoff' => 10,
                'sickleave' => 10,
                'unpaid' => 0,


            ]);
              
          
        }

        User::where('company_id',$company_id)
                          ->where('employee_id',$employee_id)
                          ->update([

                            'firstname' => $request->input('firstName'),
                            'lastname' => $request->input('lastName'),
                            'email' =>  $request->input('email'),
                            'contactnumber' => $request->input('contactNumber')
                
                        ]);
        
        UserCompanyDetails::updateOrCreate(

            ['user_id' => $primary_id],

            [ 
              
              'company_id' =>  $company_id,
              'employee_id' =>  $employee_id ,
              'birthdate' => $request->input('birthdate'),
              'role' => $request->input('role'),
              'gender' => $request->input('gender'),
              'addressline' => $request->input('addressline'),
              'city' => $request->input('city'),
              'state' => $request->input('state'),
              'postal' => $request->input('postal'),
              'jobtitle' => $request->input('jobtitle'),
              'startdate' => $request->input('startDate'),
              'department' => $request->input('department'),
              'team' => $request->input('team'),
              
            ]

        );


    }
}
