import React, { useState } from "react";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link, usePage, router } from "@inertiajs/react";
import axios from "axios";
import { useEffect } from "react";


export default function DashboardNavbar(){

    const [showSideBar,setShowSideBar] = useState()

    useEffect(() =>{

        setShowSideBar(true)

    },[])

    const {url,component} = usePage()

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
            <div className={showSideBar ? 'offcanvas offcanvas-start show' : 'offcanvas offcanvas-start'} style={{width: 195 + "px"}} data-bs-theme="dark" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header mt-2">
                     <img src="https://i.ibb.co/nm162TF/osirislogo2.png" width="25%" alt=""  />
                     
                    <button type="button" className="btn-close text-muted" data-bs-dismiss="offcanvas" onClick={handleSideBarClose} aria-label="Close"></button>
                </div>
                <div className="offcanvas-body border-0 p-4" >
                  
                    <div className="row">
                        <Link href="/home" className={component === 'Dashboard' ? 'btn btn-outline-secondary text-white border-0 rounded-1 w-100 text-start bg-secondary' : 'btn btn-outline-secondary text-white border-0 rounded-1 w-100 text-start '} style={{fontSize: "15px"}} ><span className="material-symbols-outlined material-icons" >widgets</span>&nbsp; <span className="sidebarbtntext">Dashboard</span> </Link>
                        <Link href="/users" className={component === 'User' ? "btn btn-outline-secondary text-white border-0 rounded-1 w-100 text-start bg-secondary" : "btn btn-outline-secondary text-white border-0 rounded-1 w-100 text-start" } style={{fontSize: "15px"}}><span className="material-symbols-outlined material-icons">group</span>&nbsp;  <span className="sidebarbtntext">Users</span></Link>
                        <button className="btn btn-outline-secondary text-white border-0 rounded-1 w-100 text-start" style={{fontSize: "15px"}}><span className="material-symbols-outlined material-icons">overview</span>&nbsp;  <span className="sidebarbtntext">Attendance</span></button>
                        <button className="btn btn-outline-secondary text-white border-0 rounded-1 w-100 text-start" style={{fontSize: "15px"}}><span className="material-symbols-outlined material-icons">Payments</span>&nbsp;  <span className="sidebarbtntext">Payroll</span></button>
                        <button className="btn btn-outline-secondary text-white border-0 rounded-1 w-100 text-start" style={{fontSize: "15px"}}><span className="material-symbols-outlined material-icons">calendar_month</span>&nbsp;  <span className="sidebarbtntext">Job Schedule</span></button>
                        <button className="btn btn-outline-secondary text-white border-0 rounded-1 w-100 text-start" style={{fontSize: "15px"}}><span className="material-symbols-outlined material-icons">schedule</span>&nbsp;  <span className="sidebarbtntext">Time Clock</span></button>
                        <button className="btn btn-outline-secondary text-white border-0 rounded-1 w-100 text-start" style={{fontSize: "15px"}}><span className="material-symbols-outlined material-icons">hourglass_disabled</span>&nbsp;  <span className="sidebarbtntext">Time Offs </span></button>
                        
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
                                <i className="fa-regular fa-circle-user"></i> Admin
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item as="button" onClick={handleShowProfile}><i className="fa-solid fa-crown"></i> &nbsp; Profile</Dropdown.Item>
                                    <Dropdown.Item as="button"><i className="fa-solid fa-gear"></i> &nbsp; Settings</Dropdown.Item>
                                    <Dropdown.Item as="button" onClick={handleLogout}><i class="fa-solid fa-arrow-right-from-bracket"></i>  &nbsp; Logout</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        
                        </div>
                    </div>
                </div>
            </nav>
        </>

    );

}




