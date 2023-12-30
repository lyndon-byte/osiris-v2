<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Mail\ChangeEmailVerification;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Redirect;
use Laravel\Sanctum\PersonalAccessToken;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('AdminProfile', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(Request $request): RedirectResponse
    {   
        
       
        $currentemail = Auth::user()->email;
        $firstname = $request->input('firstName');
        $lastname = $request->input('lastName');
        $contactnumber = $request->input('contactnumber');
        $newemailrequest = $request->input('email');

        $token = Session::token();
        $url = route('verify.newemail',[$token]);

       
        if($currentemail != $newemailrequest){

            $request->validate([

                'firstName' => ['required'],
                'lastName'  => ['required'],
                'contactnumber'  => ['required','min:10','max:10'],
                'email'  => ['required','email','unique:users,email']
    
    
            ]);
    

            Mail::to($newemailrequest)->send(new ChangeEmailVerification($firstname,$url));
            Session::put('newemail',$newemailrequest);
            Session::put('newfname',$firstname);
            Session::put('newlname',$lastname);
            Session::put('newcontactnumber',$contactnumber);
            
            
        }else{

            $request->validate([

                'firstName' => ['required'],
                'lastName'  => ['required'],
                'contactnumber'  => ['required','min:10','max:10'],
                
    
            ]);
    

            $request->user()->fill([

                'firstname' => $request->input('firstName'),
                'lastname'  => $request->input('lastName'),
                'contactnumber'  =>  $request->input('contactnumber'),
                // 'email'  =>  $request->input('email'),
                
            ]);
    
            $request->user()->save();

        }

      

        return Redirect::route('admin.profile');
        
        
    
    

        
    }

    public function changeemail(Request $request)
    {

        $request->user()->fill([

            'firstname' =>  Session::get('newfname'),
            'lastname'  => Session::get('newlname'),
            'contactnumber'  =>  Session::get('newcontactnumber'),
            'email'  =>  Session::get('newemail')
            
        ]);

        $request->user()->save();


    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
