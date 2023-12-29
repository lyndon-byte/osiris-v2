<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
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
        $request->user()->fill([

            'firstname' => $request->input('firstName'),
            'lastname'  => $request->input('lastName'),
            'contactnumber'  =>  $request->input('contactnumber'),
            'email'  =>  $request->input('email'),
            'email_verified_at' => Carbon::now()
        ]);


        if ($request->user()->isDirty('email')) {


            $request->user()->sendEmailVerificationNotification();

        }

        if ($request->user()->markEmailAsVerified()) {

            $request->user()->save();
            event(new Verified($request->user()));
        }

        return Redirect::route('admin.profile');
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
