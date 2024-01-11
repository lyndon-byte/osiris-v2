import React from "react";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import EmployeeNavbar from "./components/EmployeeNavbar";
import { usePage } from "@inertiajs/react";

export default function Attendance (){

    const attendanceinfo = usePage().props.attendanceinfo

    const presentcountpermonth = usePage().props.presentcountpermonth

    const latecountpermonth = usePage().props.latecountpermonth

    const absentcountpermonth = usePage().props.absentcountpermonth

    const months = usePage().props.months

    const date = new Date();

    const [activemonth,setActiveMonth] = useState(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'])

    useEffect(() => {

        console.log(presentcountpermonth)  

    },[])

    return (

        <>
            <EmployeeNavbar></EmployeeNavbar>
            <div className="container mt-5">
                <div className="row">
                     <h4 className="mt-4">My Attendance</h4>
                     <div className="col-lg-3">
                     <select class="form-select mt-3" aria-label="Default select example">
                                    
                                    <option selected>{activemonth[date.getMonth()] + " " + date.getFullYear()}</option>
                                    {
                                        months.map((data) =>(

                                            <>
                                                
                                                    <option value={data}>{data} 2024</option>
                                                
                                            </>
                                        ))

                                    }
                       
                     </select>
                     </div>
                    <div className="col-lg-12 mt-4">
                    <div className="row mb-5">
                        <div className="col-lg-4">
                            <div class="card bg-danger mb-2">
                                <div class="card-header text-white">
                                   Absents
                                </div>
                                <div class="card-body p-4">
                                    <blockquote class="blockquote mb-0">
                                    <h2 className="mb-4 text-white">{absentcountpermonth}</h2>
                                    
                                    </blockquote>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-2">
                            <div class="card" data-bs-theme="dark">
                                <div class="card-header">
                                    Lates
                                </div>
                                <div class="card-body p-4">
                                    <blockquote class="blockquote mb-0">
                                    <h2 className="mb-4">{latecountpermonth}</h2>

                                    </blockquote>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-2">
                            <div class="card bg-success" >
                                <div class="card-header text-white">
                                    Presents
                                </div>
                                <div class="card-body p-4">
                                    <blockquote class="blockquote mb-0">
                                    <h2 className="mb-4 text-white">{presentcountpermonth}</h2>

                                    </blockquote>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Table responsive hover variant="bg-white shadow-sm" style={{fontSize: "14px"}}>
                            
                            <thead className="text-center">
                                <tr>
                                    <th className="p-4">Time In Status</th>
                                    <th className="p-4">Time Out Status</th>
                                    <th className="p-4">Time</th>
                                    <th className="p-4">Date</th>
                                   
                                  
                                </tr>
                                
                            </thead>
                          
                            <tbody >

                                

                                        
                                       
                                {

                                    attendanceinfo.map((data) =>(

                                        <>
                                            <tr>
                                                 <td className="p-4 text-center">{data.timein_status}</td>
                                                 <td className="p-4 text-center">{data.timeout_status}</td>
                                                 <td className="p-4 text-center">{data.timeout_time}</td>
                                                 <td className="p-4 text-center">{data.date}</td>
                                                 
                                           </tr>
                                      
                                        </> 

                                    ))

                                }           

                            

                                        


                                    
                                    
                                

                            </tbody>
                           
                                   
                                
                           
                    </Table>
                    </div>
                </div>
            </div>

        </>

    );

}