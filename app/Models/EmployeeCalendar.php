<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeeCalendar extends Model
{
    use HasFactory;

    protected $fillable = [

            'user_id',
            'company_id',
            'event_date',
            'updated_at',
            'created_at',
            'title'
        
    ];
}
