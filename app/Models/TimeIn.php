<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TimeIn extends Model
{
    use HasFactory;

    protected $fillable = [

        'user_id',
        'company_id',
        'date_and_hour'


    ];
}
