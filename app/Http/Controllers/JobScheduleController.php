<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\workschedule;
use Illuminate\Http\Request;

class JobScheduleController extends Controller
{
    public function add(Request $request){

            $primary_id = $request->input('primaryid');
            
            $jobsched = $request->validate([
                
                'startTime' => ['required'],
                'endTime' => ['required'],

            ]);

            workschedule::updateOrCreate(

                ['user_id' => $primary_id],
                
                [

                    
                    'starts_at' => $request->input('startTime'),
                    'ends_at' => $request->input('endTime'),
                    'restday1' => $request->input('restDay1'),
                    'restday2' => $request->input('restDay2'),
                ]
        
            );

    }
    public function show(Request $request){

        $primary_id = $request->input('primaryid');
        

         return Inertia::render('UserInfo',[

            'jobscheduledata' => workschedule::where('user_id',$primary_id)

         ]);  



    }

    public function calculateAttendance()
    {

    }
}
