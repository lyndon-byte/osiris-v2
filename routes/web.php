<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\JobScheduleController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/',function(){

    return Inertia::render('LandingPage');

});

Route::get('/403',function(){

    return Inertia::render('Error403');

})->name('forbidden');

Route::get('/forgotpassword',function(){

    return Inertia::render('ForgotPassword');

});

Route::post('/forgotpasswordprocess',[PasswordResetLinkController::class,'store']);

Route::post('/resetpasswordprocess',[NewPasswordController::class,'store']);


Route::get('/userlogin',[UserController::class,'login'])->name('userlogin');

Route::post('/authenticate',[AuthenticatedSessionController::class,'store']);

Route::get('/accountconfirmation',EmailVerificationPromptController::class)->middleware(['auth']);

Route::post('/signout',[AuthenticatedSessionController::class,'destroy']);

Route::group(['middleware' => ['admin']], function(){

    Route::get('/home',[DashboardController::class,'dashboard'])->middleware(['auth','verified'])->name('mainpage');

   

    

    Route::get('/users',[UserController::class,'userviews'])->middleware(['auth','verified']);

    Route::post('/addminiuser',[UserController::class,'addemployee'])->middleware(['auth','verified']);

    Route::get('/finduser',[UserController::class,'searchuser'])->middleware(['auth','verified']);
    
    Route::get('/singleuser',[UserController::class,'getsingleuserinfo'])->middleware(['auth','verified']);
   
    Route::post('/addusercompanydetails',[UserController::class,'addcompanydetailsprocess'])->middleware(['auth','verified']);
   
    Route::post('/addjobsched',[JobScheduleController::class,'add'])->middleware(['auth','verified']);

    Route::post('/getjobscheddata',[JobScheduleController::class,'show'])->middleware(['auth','verified']);
});

Route::post('/verifynewemailprocess',[ProfileController::class,'changeemail'])->middleware(['auth','verified']);

Route::post('/editadminprofile',[ProfileController::class,'update'])->middleware(['auth','verified']);

Route::get('/verifynewemail{token}',function(){

    return Inertia::render('NewEmailVerified',[

        'status' => session('status')
    ]);
    
})->middleware(['auth','verified'])->name('verify.newemail');

Route::post('/getprofiledata',[ProfileController::class,'edit'])->middleware(['auth','verified']);

Route::get('/adminprofile',function(){

    return Inertia::render('AdminProfile');

})->middleware(['auth','verified'])->name('admin.profile');

Route::post('/changepassword',[PasswordController::class,'update'])->middleware(['auth','verified']);

Route::get('/employeepage',function(){

    return Inertia::render('MiniUser');

})->middleware(['auth','verified']);

Auth::routes(['verify' => true]);

Route::post('/sendemailverification',[EmailVerificationNotificationController::class,'store']);

Route::get('/register', [UserController::class,'index']);

Route::post('/adduser', [UserController::class,'addadminuser']);




