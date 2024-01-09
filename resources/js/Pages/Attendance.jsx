import React from "react";
import { useEffect } from "react";
import { Table } from "react-bootstrap";
import EmployeeNavbar from "./components/EmployeeNavbar";
import { usePage } from "@inertiajs/react";

export default function Attendance (){

    const attendanceinfo = usePage().props.attendanceinfo

    useEffect(() => {

        console.log(attendanceinfo)

    },[])

    return (

        <>
            <EmployeeNavbar></EmployeeNavbar>
            <div className="container mt-5">
                <div className="row">
                     <h4 className="mt-4">My Attendance</h4>
                    <div className="col-lg-12 mt-5">
                    <Table responsive hover variant="bg-white" style={{fontSize: "14px"}}>
                            
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