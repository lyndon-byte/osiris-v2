import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import HomeNavbar from "./components/HomeNavbar";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import EmployeeNavbar from "./components/EmployeeNavbar";
import Map from "./Map";
import axios from "axios";
import { useState,useEffect } from "react";
import { Head,Link,usePage } from "@inertiajs/react";
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AccordionCollapse } from "react-bootstrap";

function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${month}/${date}/${year}`;
}



export default function MiniUser(){

    const [formattedTime1,setFormattedTime1] = useState('')
    const [formattedTime2,setFormattedTime2] = useState('')
    const [seconds,setSeconds] = useState(0)

    const [day,setDay] = useState(

        {0: 'Saturday', 1: 'Sunday', 2: 'Monday', 3: 'Tuesday',4: 'Wednesday',5: 'Thursday', 6: 'Friday'}

    )   
    
    const [ip, setIP] = useState("");

    const jobscheduledata = usePage().props.jobscheduledata


    const name = usePage().props.name

    const timeinstatus = usePage().props.timeinstatus

    const timeoutstatus = usePage().props.timeoutstatus
    
    const [value, setValue] = useState(new Date());
    const [currrentDate,setCurrentDate] = useState(getDate())
    const [alreadyTimeIn,setAlreadyTimeIn] = useState(timeinstatus)

    
    const [showModalForPunch,setShowModalForPunch] = useState(false)

    useEffect(() => {

        function convertTo12HourFormat(time24) {
            const [hours, minutes, seconds] = time24.split(':').map(Number);
            const period = hours >= 12 ? 'PM' : 'AM';
          
            let hours12 = hours % 12;
            hours12 = hours12 === 0 ? 12 : hours12; 
          
            return `${hours12}:${minutes} ${period}`;
          }
          
          const time24 = jobscheduledata.starts_at;
          const time12 = convertTo12HourFormat(time24);

          const secondtime24 = jobscheduledata.ends_at;
          const secondtime12 = convertTo12HourFormat(secondtime24);
          
          setFormattedTime1(time12)
          setFormattedTime2(secondtime12)

    },[])
    
    useEffect(() => {
        const interval = setInterval(() => setValue(new Date()), 1000);
    
        return () => {
          clearInterval(interval);
        };
    }, []);
    
   
    
    
    
   
   

    useEffect(() =>{
        console.log(seconds)
        if(seconds == 2){

            window.location.reload()

        }
    },[seconds])

    const handleAddTimeIn = async () => {

        setAlreadyTimeIn(timeinstatus)

        if(timeoutstatus){

            toast.error("Error Occur, you've already time out today", {
                position: toast.POSITION.TOP_RIGHT,
            })
            setInterval(() => {
                                   
                setSeconds(seconds => seconds + 1);
                            
            }, 1000);

        }else{

            try {

                axios.post('/addtimein').then(() =>{
                    setShowModalForPunch(false)
                    toast.success(alreadyTimeIn ? "Time Out Success" : "Time In Success", {
                        position: toast.POSITION.TOP_RIGHT,
                    })
                    if(alreadyTimeIn){
    
                        setAlreadyTimeIn('')
                    }
                    setInterval(() => {
                                   
                        setSeconds(seconds => seconds + 1);
                                    
                    }, 1000);
                })
    
            }catch(error){
    
                console.log(error)
            }
        }

    }

    const handleCloseAddTimeIn = () => {

        setShowModalForPunch(false)
    }

    return (
        
        <>
            <Modal
                    show={showModalForPunch}
                    onHide={handleCloseAddTimeIn}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                           Time In/Out
                    </Modal.Header>
                    <Modal.Body style={{fontSize: "14px"}} className="p-5 text-center">
                                
                               {alreadyTimeIn ? 'Are you sure you want to time out?' : 'Are you sure you want to time in?'}
                        
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant={alreadyTimeIn ? "danger rounded-1" : "dark rounded-1"} style={{fontSize: "14px"}} onClick={handleAddTimeIn}>
                             {alreadyTimeIn ? 'Time Out' : 'Proceed'}
                        </Button>
                   
                    </Modal.Footer>
            </Modal>
            <ToastContainer></ToastContainer>
            
            <EmployeeNavbar></EmployeeNavbar>
        
            <div className="container mt-5 mb-5">
                <h4>Time Card</h4>
                <div className="row">
                <div className="col-lg-6 m-auto mt-5 rounded-3">
                        
                        <div class="alert alert-primary rounded-1 p-5 fs-4" data-bs-theme="dark" role="alert">
                               Good Day! {name}😃 
                               <span className="text-white float-end fs-5">{currrentDate}</span>
                        </div>
                 
                    <Map></Map>
                    
                </div>
                    <div className="col-lg-6 m-auto mt-5 p-4 bg-white rounded-3">
                        <div className="col mt-4 m-auto">
                            <Clock value={value} />
                        </div>
                       
                        
                        <h6 className="mb-3 mt-5">Current Job Schedule</h6>

                                        <div className="table-responsive">
                                            <table className="table shadow-sm " >
                                            
                                                    <thead >
                                                        <tr >
                                                        
                                                        
                                                            <th scope="col" className="bg-danger text-white fw-medium text-center" style={{fontSize: "15px"}}>Shift Start</th>
                                                            <th scope="col" className="bg-danger text-white fw-medium text-center" style={{fontSize: "15px"}}>End Of Shift </th>
                                                            <th scope="col" className="bg-dark text-white fw-medium text-center" style={{fontSize: "15px"}}>Rest Day 1</th>
                                                            <th scope="col" className="bg-dark text-white fw-medium text-center" style={{fontSize: "15px"}}>Rest Day 2</th>
                                                        
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                        <tr >
                                                          
                                                            <td className="text-muted text-center" style={{fontSize: "14px"}}>{jobscheduledata ? formattedTime1 : "not set"}</td>
                                                            <td className="text-muted text-center" style={{fontSize: "14px"}}>{jobscheduledata ? formattedTime2 : "not set"}</td>
                                                            <td className="text-muted text-center" style={{fontSize: "14px"}}>{jobscheduledata ? day[jobscheduledata.restday1] : "not set"}</td>
                                                            <td className="text-muted text-center" style={{fontSize: "14px"}}>{jobscheduledata ? day[jobscheduledata.restday2] : "not set"}</td>
                                                            
                                                            
                                                        </tr>
                                            
                                                    
                                                    </tbody>
                                            </table>
                                  
                                        </div>

                                        <div className="table-responsive mt-2">
                                            <table className="table shadow-sm " >
                                            
                                                    <thead >
                                                        <tr >
                                                        
                                                        
                                                            <th scope="col" className="bg-info text-white fw-medium text-center" style={{fontSize: "15px"}}>Time in Status</th>
                                                            <th scope="col" className="bg-info text-white fw-medium text-center" style={{fontSize: "15px"}}>Time out Status</th>
                                                            <th scope="col" className="bg-info text-white fw-medium text-center" style={{fontSize: "15px"}}>Date and time</th>
                                                        
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                        <tr >
                                                          
                                                           
                                                            <td className="text-muted text-center" style={{fontSize: "14px"}}><span className={timeinstatus ? "bg-success text-white p-1 rounded-1" : "p-1 rounded-1"}> {timeinstatus ? 'Logged In' : 'NA'}</span></td>
                                                            <td className="text-muted text-center" style={{fontSize: "14px"}}>{timeoutstatus ? timeoutstatus.timein_status + '-' + timeoutstatus.timeout_status  : 'NA'}</td>
                                                            <td className="text-muted text-center" style={{fontSize: "14px"}}>{timeoutstatus ? timeoutstatus.date : 'NA'}</td>
                                                            
                                                            
                                                        </tr>
                                            
                                                    
                                                    </tbody>
                                            </table>
                                  
                                        </div>
                    

                       
                       
                       <div className="col d-flex">
                             <button className="btn btn-primary rounded-1 mt-3 float-end mb-4 w-50 m-auto" onClick={() => {setShowModalForPunch(true)}}>Punch</button>
                       </div>
                    </div>
                   
                    
                </div>
           </div>
        </>

    );

}