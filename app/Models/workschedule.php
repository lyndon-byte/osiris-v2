<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class workschedule extends Model
{
    use HasFactory;

    protected $fillable = [

       
        'user_id',
        'starts_at',
        'ends_at',
        'restday1',
        'restday2',
        'updated_at',
        'created_at'
        
    ];

}
