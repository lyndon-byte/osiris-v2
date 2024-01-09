<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserAttendance extends Model
{
    use HasFactory;

    protected $fillable = [

        'user_id',
        'company_id',
        'timein_status',
        'timeout_time',
        'timeout_status',
        'updated_at',
        'created_at',
        'date'

    ];
}
