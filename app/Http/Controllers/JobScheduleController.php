<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\workschedule;
use Illuminate\Http\Request;
use App\Models\TimeOffCredits;
use App\Models\EmployeeCalendar;
use Illuminate\Support\Facades\Auth;

class JobScheduleController extends Controller
{
    public function add(Request $request){

            $primary_id = $request->input('primaryid');

            $jobsched = $request->validate([
                
                'startTime' => ['required'],
                'endTime' => ['required'],
                'restDay1' => ['required'],
                'restDay2' => ['required'],

            ]);

            EmployeeCalendar::where('user_id',$primary_id)
                               ->where('title','Work Day')
                               ->delete();

            foreach($request->input('workDaysThisYear') as $value) {

                EmployeeCalendar::updateOrCreate(

                        [ 'user_id' => $primary_id,'company_id' => Auth::user()->company_id,'event_date' => $value, 'title' => 'Work Day']

                );
            }
            
           

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

    public function changecalendarevent(Request $request){

        $company_id = Auth::user()->company_id;

        $primary_id = $request->input('primaryid');

        $date = $request->input('eventSlotDate');

        $title = $request->input('eventSlotTitle');

        $new_event = $request->input('eventStatus');

        

        EmployeeCalendar::where('user_id',$primary_id)
                            ->where('event_date',$date)
                    ->update([ 'title' => $new_event ]);

        if($new_event == 'Vacation'){

            TimeOffCredits::where('user_id',$primary_id)
            ->decrement('timeoff');

        }else if ($new_event == 'Absent'){

            TimeOffCredits::where('user_id',$primary_id)
            ->increment('unpaid');

        }else if ($new_event == 'Sick Leave'){

            TimeOffCredits::where('user_id',$primary_id)
            ->decrement('sickleave');

        }

    }

    public function calculateAttendance()
    {

    }
}
