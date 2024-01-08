import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import HomeNavbar from "./components/HomeNavbar";
import Map from "./Map";
import axios from "axios";
import { useState,useEffect } from "react";
import { Head,Link,usePage } from "@inertiajs/react";
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';




export default function MiniUser(){

    
    const [value, setValue] = useState(new Date());
    const [showSideBar,setShowSideBar] = useState()

    const {url,component} = usePage()

    useEffect(() => {
        const interval = setInterval(() => setValue(new Date()), 1000);
    
        return () => {
          clearInterval(interval);
        };
    }, []);
    
    
    useEffect(() =>{

        setShowSideBar(true)

    },[])

    const handleSideBarClose = () => {

        setShowSideBar(false)
    }


    const handleLogout = async () => {


        await axios.post('/signout').then(() => {

            window.location.href = '/userlogin';

        });


    }

    const handleShowProfile = async () => {


        await axios.post('/getprofiledata').then(() => {

            window.location.href = '/adminprofile';

        });


    }

    return (
        
        <>

            <div className={showSideBar ? 'offcanvas offcanvas-start show' : 'offcanvas offcanvas-start'} style={{width: 250 + "px"}} data-bs-theme="dark" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header mt-2">
                
                     <img src="https://i.ibb.co/nm162TF/osirislogo2.png" width="20%" alt=""  />
                     
                    <button type="button" className="btn-close text-muted" data-bs-dismiss="offcanvas" onClick={handleSideBarClose} aria-label="Close"></button>
                </div>
                <div className="offcanvas-body border-0 p-4" >
                  
                    <div className="row">
                        <Link href="/employeepage"  className={component === 'MiniUser' ? 'btn btn-outline-secondary text-white border-0 rounded-1 w-100 text-start bg-secondary' : 'btn btn-outline-secondary text-white border-0 rounded-1 w-100 text-start '} style={{fontSize: "15px"}} ><span className="material-symbols-outlined material-icons" >schedule</span>&nbsp; <span className="sidebarbtntext">Time Card</span> </Link>
        
                        <button className="btn btn-outline-secondary text-white border-0 rounded-1 w-100 text-start" style={{fontSize: "15px"}}><span className="material-symbols-outlined material-icons">overview</span>&nbsp;  <span className="sidebarbtntext">My Attendance</span></button>
                        <button className="btn btn-outline-secondary text-white border-0 rounded-1 w-100 text-start" style={{fontSize: "15px"}}><span className="material-symbols-outlined material-icons">Payments</span>&nbsp;  <span className="sidebarbtntext">My Payroll</span></button>
                        <button className="btn btn-outline-secondary text-white border-0 rounded-1 w-100 text-start" style={{fontSize: "15px"}}><span className="material-symbols-outlined material-icons">calendar_month</span>&nbsp;  <span className="sidebarbtntext">Time off Request</span></button>
                        
                        
                    </div>
                </div>
                <footer className="p-3 d-flex justify-content-center">
                        <div className="container">
                            
                            <div className="row">
                                <div className="col mt-2">
                                <p className="text-center text-muted">Osiris v 1.2</p>
                                </div>
                            </div>
                        </div>
                </footer>
            </div>
           
        <nav className="navbar navbar-light py-4 bg-white">
                
                <div className="container-fluid">
                    
                    <button className="navbar-toggler border-0" onClick={() => {setShowSideBar(true)}}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar" id="nav_lc">
                    
                       
                        <div className="ms-lg-auto">
                        
                            <Dropdown drop="down-start" >
                                <Dropdown.Toggle variant="btn btn-outline-dark border-0 rounded-1" style={{fontSize: "16px"}} id="dropdown-basic">
                                <i className="fa-regular fa-circle-user"></i> My Profile
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item as="button" onClick={handleShowProfile}><i className="fa-solid fa-user"></i> &nbsp; Profile</Dropdown.Item>
                                    <Dropdown.Item as="button"><i className="fa-solid fa-gear"></i> &nbsp; Settings</Dropdown.Item>
                                    <Dropdown.Item as="button" onClick={handleLogout}><i class="fa-solid fa-arrow-right-from-bracket"></i>  &nbsp; Logout</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        
                        </div>
                    </div>
                </div>
            </nav>
            <div className="container mt-5">
                <div className="row d-flex">
                         <div className="col m-auto">
                         <Clock value={value} />
                       </div>
                </div>
                <div className="row">
                  
                      
                    
                    <div className="col-lg-6 m-auto mt-5 p-4 bg-white rounded-3 ">
                        <h4 className="mb-5">Time Card</h4>
                        
                        <h6 className="mb-3">Current Job Schedule</h6>

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
                                                          
                                                            <td className="text-muted text-center" style={{fontSize: "14px"}}>ss</td>
                                                            <td className="text-muted text-center" style={{fontSize: "14px"}}>cc</td>
                                                            <td className="text-muted text-center" style={{fontSize: "14px"}}>dd</td>
                                                            <td className="text-muted text-center" style={{fontSize: "14px"}}>nn</td>
                                                            
                                                            
                                                        </tr>
                                            
                                                    
                                                    </tbody>
                                            </table>
                                  
                                        </div>
                       
                        <button className="btn btn-primary rounded-1 mt-3 float-end mb-4 w-25">Punch</button>
                    </div>
                    <div className="col-lg-6 m-auto mt-5 rounded-3">
                        <Map></Map>
                        
                    </div>
                </div>
           </div>
        </>

    );

}