<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProfileController;

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

Route::get('/login',[UserController::class,'login']);

Route::get('/accountconfirmation',[UserController::class,'accountconfirmation']);

Route::get('/register', [UserController::class,'index']);

Route::post('/adduser', [UserController::class,'adduser']);



