<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use App\Models\UserCompanyDetails;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable;

   

    public $timestamps = false;
    
    public $incrementing = false;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [

        'id',
        'company_id',
        'employee_id',
        'firstname',
        'lastname',
        'contactnumber',
        'email',
        'email_verified_at',
        'password',
        'role'
        
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function companydetails() 
    {

       return $this->hasOne(UserCompanyDetails::class);
       
    }

    public function jobschedule() 
    {

       return $this->hasOne(workschedule::class);
       
    }
}
