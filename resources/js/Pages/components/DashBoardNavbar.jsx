import React, { useState } from "react";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link, usePage } from "@inertiajs/react";


import axios from "axios";


export default function DashboardNavbar(props){

    const [showSideBar,setShowSideBar] = useState(true)

    const {url} = usePage()

    const handleSideBarClose = () => {

        setShowSideBar(false)
    }

    const handleLogout = async () => {


            await axios.post('/signout').then(() => {

                window.location.href = '/userlogin';

            });


    }

    return (
        
        <>
            <Offcanvas show={showSideBar} data-bs-theme="dark" backdrop={false} onHide={handleSideBarClose} style={{width: 13 + "rem"}}>
                <Offcanvas.Header closeButton className="mt-3">
                    <Offcanvas.Title className="navbar-brand fs-4 fw-bold"> 
                        <span>Osiris</span>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body >

                    <Link className={url === '/home' ? 'btn btn-outline-secondary text-white border-0 rounded-1 w-100 text-start bg-secondary' : 'btn btn-outline-secondary text-white border-0 rounded-1 w-100 text-start '} ><span className="material-symbols-outlined material-icons" >widgets</span>&nbsp; <span className="sidebarbtntext">Dashboard</span> </Link>
                    <button className="btn btn-outline-secondary text-white border-0 rounded-1 w-100 text-start"><span className="material-symbols-outlined material-icons">group</span>&nbsp;  <span className="sidebarbtntext">Users</span></button>
                    <button className="btn btn-outline-secondary text-white border-0 rounded-1 w-100 text-start"><span className="material-symbols-outlined material-icons">overview</span>&nbsp;  <span className="sidebarbtntext">Attendance</span></button>
                    <button className="btn btn-outline-secondary text-white border-0 rounded-1 w-100 text-start"><span className="material-symbols-outlined material-icons">Payments</span>&nbsp;  <span className="sidebarbtntext">Payroll</span></button>
                    <button className="btn btn-outline-secondary text-white border-0 rounded-1 w-100 text-start"><span className="material-symbols-outlined material-icons">calendar_month</span>&nbsp;  <span className="sidebarbtntext">Job Schedule</span></button>
                    <button className="btn btn-outline-secondary text-white border-0 rounded-1 w-100 text-start"><span className="material-symbols-outlined material-icons">schedule</span>&nbsp;  <span className="sidebarbtntext">Time Clock</span></button>
                    <button className="btn btn-outline-secondary text-white border-0 rounded-1 w-100 text-start"><span className="material-symbols-outlined material-icons">hourglass_disabled</span>&nbsp;  <span className="sidebarbtntext">Time Offs </span></button>
                    
                </Offcanvas.Body>
               <footer className="p-3 d-flex justify-content-center">
                    <div className="container">
                        <div className="row">
                            <div className="col d-flex justify-content-center">
                                <img src="https://i.ibb.co/nm162TF/osirislogo2.png"  alt="" width="30%" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col mt-2">
                            <p className="text-center text-muted">Osiris v 1.2</p>
                            </div>
                        </div>
                    </div>
               </footer>
            </Offcanvas>
            <nav className="navbar navbar-light py-4 bg-white">
                
                <div className="container-fluid">
                   
                    <button className="navbar-toggler border-0" onClick={() => {setShowSideBar(true)}}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar" id="nav_lc">
                    
                       
                        <div className="ms-lg-auto">
                        <DropdownButton drop="down-centered" variant="btn btn-outline-dark border-0 " id="dropdown-item-button" title={props.name}>

                            <Dropdown.Item as="button"><i className="fa-solid fa-user"></i> &nbsp; Profile</Dropdown.Item>
                            <Dropdown.Item as="button"><i className="fa-solid fa-gear"></i> &nbsp; Settings</Dropdown.Item>
                            <Dropdown.Item as="button" onClick={handleLogout}><i class="fa-solid fa-arrow-right-from-bracket"></i>  &nbsp; Logout</Dropdown.Item>
                            
                        </DropdownButton>
                        </div>
                    </div>
                </div>
            </nav>
        </>

    );

}




