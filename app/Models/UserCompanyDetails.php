<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserCompanyDetails extends Model
{
    use HasFactory;

    protected $fillable = [

        'user_id',
        'company_id',
        'employee_id',
        'role',
        'birthdate',
        'gender',
        'addressline',
        'city',
        'state',
        'postal',
        'jobtitle',
        'startdate',
        'department',
        'team',
        'updated_at',
        'created_at'
    ];


   
}
