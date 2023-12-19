<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
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

Route::get('/userlogin',[UserController::class,'login']);

Route::post('/authenticate',[AuthenticatedSessionController::class,'store']);

Route::get('/accountconfirmation',EmailVerificationPromptController::class);

Route::get('/home',[DashboardController::class,'dashboard']);

Auth::routes(['verify' => true]);

Route::post('/sendemailverification',[EmailVerificationNotificationController::class,'store']);

Route::get('/register', [UserController::class,'index']);

Route::post('/adduser', [UserController::class,'adduser']);



