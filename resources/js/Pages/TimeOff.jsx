import React from "react";
import EmployeeCalendar from "./EmployeeCalendar";
import EmployeeNavbar from "./components/EmployeeNavbar";
import { usePage } from "@inertiajs/react";


function TimeOff(){

    const jobscheduledata = usePage().props.jobscheduledata

    return (

        <>      
                <EmployeeNavbar></EmployeeNavbar>
                <div className="container">
                    <div className="row">
                       <h4 className="mt-5 mb-5">Time Off Request</h4>
                        <div className="alert alert-primary mb-2 p-5" data-bs-theme="dark" role="alert">
                            To request time off, just click the workday slot of your desire time off date 😀
                          
                            <p className="text-white mt-4">Legends:</p>
                            <p className="text-white mt-2"><span class="badge text-bg-danger rounded-1">Absents</span> <span class="badge text-bg-warning rounded-1">Restdays</span> <span class="badge text-bg-success rounded-1">Present</span></p>
                            <p className="text-white mt-2"><span class="badge text-bg-primary rounded-1">Sick Leave</span> <span class="badge text-bg-info rounded-1">Time Off</span> <span class="badge text-bg-secondary rounded-1">Pending Request</span></p>
                        </div>
                        <div className="col-lg-12 bg-white p-5 rounded-3 mb-5 shadow-sm">
                            <h5>My Work Calendar</h5>
                            <EmployeeCalendar restday={jobscheduledata}></EmployeeCalendar>
                        </div>
                    </div>
                </div>
        
        </>

    )


}

export default TimeOff;