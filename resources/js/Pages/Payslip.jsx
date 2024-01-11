import React from "react";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import EmployeeNavbar from "./components/EmployeeNavbar";
import { usePage } from "@inertiajs/react";


export default function Payslip(){


    return (

        <>
            <EmployeeNavbar></EmployeeNavbar>
            
            <div className="container mt-5">
                <div className="row">
                    <div className="col-lg-12 mt-4">
                    <h4 className="mb-5">My Payslips</h4>
                    <Table responsive hover variant="bg-white shadow-sm" style={{fontSize: "14px"}}>
                            
                            <thead className="text-center">
                                <tr>
                                    <th className="p-4">Pay Period</th>
                                    <th className="p-4">Time Out Status</th>
                                    <th className="p-4">Time</th>
                                    <th className="p-4">Net Pay</th>
                                   
                                  
                                </tr>
                                
                            </thead>
                          
                            <tbody >

                                

                                        
                                       
                               
                                            <tr>
                                                 <td className="p-4 text-center"></td>
                                                 <td className="p-4 text-center"></td>
                                                 <td className="p-4 text-center"></td>
                                                 <td className="p-4 text-center"></td>
                                                 
                                           </tr>
                                      
                                  

                            

                                        


                                    
                                    
                                

                            </tbody>
                           
                                   
                                
                           
                    </Table>
                    </div>
                </div>
            </div>

        </>

    );


}
