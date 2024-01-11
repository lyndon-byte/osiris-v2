<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function dashboard(){

        $userinfo = Auth::user();

        return Inertia::render('Dashboard',[

            'userinfo' =>  $userinfo,

        ]);
    }
}
