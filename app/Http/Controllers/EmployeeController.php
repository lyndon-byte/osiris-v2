<?php

namespace App\Http\Controllers;
use Carbon\Carbon;
use App\Models\User;
use Inertia\Inertia;
use App\Models\TimeIn;
use Carbon\CarbonInterface;
use Illuminate\Http\Request;
use App\Models\UserAttendance;
use App\Models\EmployeeCalendar;
use Illuminate\Support\Facades\Auth;
use Stevebauman\Location\Facades\Location;

class EmployeeController extends Controller
{
    public function showinfo(Request $request){

     $primary_id  =  Auth::user()->id;

     $formattedtimein = Carbon::parse(Carbon::now())->format('Y-m-d');


     $checktimeinifexist = TimeIn::where('user_id',$primary_id)
                                 ->where('date_and_hour','LIKE','%'.$formattedtimein.'%')
                                 ->first();

     $checktimeoutifexist = UserAttendance::where('user_id',$primary_id)
                                 ->where('date','LIKE','%'.$formattedtimein.'%')
                                 ->whereNotNull('timeout_time')
                                 ->first();     

        return Inertia::render('MiniUser',[

            'jobscheduledata' => User::find($primary_id)->jobschedule,

            'name' => Auth::user()->firstname,
            
            'timeinstatus' => $checktimeinifexist,

            'timeoutstatus' =>  $checktimeoutifexist
        ]);  

    }

    public function timein(Request $request){

        $primary_id  =  Auth::user()->id;
        $companyid = Auth::user()->company_id;

        $jobschedstart = User::find($primary_id)->jobschedule->starts_at;
        $jobschedsend = User::find($primary_id)->jobschedule->ends_at;

        $timein = Carbon::now();

        $formattedtimein = Carbon::parse(Carbon::now())->format('Y-m-d');


        $checktimeinifexist = TimeIn::where('user_id',$primary_id)
                                    ->where('date_and_hour','LIKE','%'.$formattedtimein.'%')
                                    ->first();

                           

        if($checktimeinifexist){

           

            $totalDuration = $timein->diffForHumans($jobschedsend,CarbonInterface::DIFF_RELATIVE_TO_OTHER,true);
        
            if (strpos($totalDuration,'after') !== false) {

                UserAttendance::where('user_id',$primary_id)->where('date',"LIKE","%".$formattedtimein."%")
                                                                        ->update([
                                                                                                                                
                                                                            'timeout_time' => $timein,
                                                                            'timeout_status' => 'Valid',
                                                                            
                                                                        
                                                                        ]);

               
            }
            else {

                UserAttendance::where('user_id',$primary_id)->where('date',"LIKE","%".$formattedtimein."%")
                                                                    ->update([
                                                                        
                                                                        'timeout_time' => $timein,
                                                                        'timeout_status' => 'Undertime',
                                                                        
                                                                        
                                                                    
                                                                    ]);
               
                }

        }else{

            TimeIn::insert([

                'user_id' => $primary_id,
                'company_id' => $companyid,
            

            ]);
            
            $totalDuration = $timein->diffForHumans($jobschedstart,CarbonInterface::DIFF_RELATIVE_TO_OTHER,true);
        
            if (strpos($totalDuration,'after') !== false) {

                UserAttendance::insert([
                    
                    'user_id' => $primary_id,
                    'company_id' => $companyid,
                    'timein_status' => 'Late',
                    'date' => $timein,
                ]);

                EmployeeCalendar::where('user_id',$primary_id)
                                   ->where('event_date',$date)
                               ->update([ 'title' => 'Late' ]);
            }
            else {

                UserAttendance::insert([
                    
                    'user_id' => $primary_id,
                    'company_id' => $companyid,
                    'timein_status' => 'Present',
                    'date' => $timein,
                ]);

                EmployeeCalendar::where('user_id',$primary_id)
                                   ->where('event_date',$date)
                               ->update([ 'title' => 'Present' ]);
            }
        };

        

       

    
    
    }
    public function attendance(Request $request){

        $primary_id = Auth::user()->id;

        $presentcountpermonth = UserAttendance::where('user_id',$primary_id)
                            ->where('timein_status','Present')
                            ->whereYear('date',Carbon::now()->year)
                            ->whereMonth('date',Carbon::now()->month)
                            ->orWhere([
                                
                                ['user_id',$primary_id],
                                ['timein_status','Late']
                               
                            ])
                            ->whereYear('date',Carbon::now()->year)
                            ->whereMonth('date',Carbon::now()->month)    
                            ->count();

        $latecountpermonth = UserAttendance::where('user_id',$primary_id)
                            ->where('timein_status','Late')
                            ->whereYear('date',Carbon::now()->year)
                            ->whereMonth('date',Carbon::now()->month)
                            ->count();     
                            
        $absentcountpermonth = UserAttendance::where('user_id',$primary_id)
                            ->where('timein_status','Absent')
                            ->whereYear('date',Carbon::now()->year)
                            ->whereMonth('date',Carbon::now()->month)
                            ->count();     

        $previousMonths = [];

        $currentDate = Carbon::now()->startOfMonth();
        while ($currentDate->year == Carbon::now()->year) {
                $previousMonths[] = $currentDate->format('F');
                $currentDate->subMonth();
        }                     

        

        return Inertia::render('Attendance',[

            'attendanceinfo' => User::find($primary_id)->attendance,

            'presentcountpermonth' => $presentcountpermonth,

            'latecountpermonth' =>   $latecountpermonth,

            'absentcountpermonth' => $absentcountpermonth,

            'months' => $previousMonths

        ]);
    }

    public function payslip(Request $request){

        return Inertia::render('Payslip');

    }

    public function timeoff(Request $request){

        $primary_id = Auth::user()->id;


        return Inertia::render('TimeOff',[
            
            'jobscheduledata' => User::find($primary_id)->jobschedule

        ]);

    }
}
