import React from "react";
import { useState , useEffect} from "react";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";
import { usePage,Link } from "@inertiajs/react";


export default function EmployeeNavbar(){

    const [showSideBar,setShowSideBar] = useState();
    const {url,component} = usePage()

    const handleShowProfile = async () => {


        await axios.post('/getprofiledata').then(() => {

            window.location.href = '/adminprofile';

        });


    }

    const handleSideBarClose = () => {

        setShowSideBar(false)
    }

    useEffect(() =>{
       
        setShowSideBar(true)
        
        
    },[])

    const handleLogout = async () => {


        await axios.post('/signout').then(() => {

            window.location.href = '/userlogin';

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
                
                                <Link href='/myattendance' className={component === 'Attendance' ? "btn btn-outline-secondary text-white border-0 rounded-1 w-100 text-start bg-secondary" : "btn btn-outline-secondary text-white border-0 rounded-1 w-100 text-start"} style={{fontSize: "15px"}}><span className="material-symbols-outlined material-icons">overview</span>&nbsp;  <span className="sidebarbtntext">My Attendance</span></Link>
                                <Link href='/mypayroll'  className={component === 'Payslip' ? "btn btn-outline-secondary text-white border-0 rounded-1 w-100 text-start bg-secondary" : "btn btn-outline-secondary text-white border-0 rounded-1 w-100 text-start"} style={{fontSize: "15px"}}><span className="material-symbols-outlined material-icons">Payments</span>&nbsp;  <span className="sidebarbtntext">My Payslips</span></Link>
                                <Link href='/timeoffrequest' className={component === 'TimeOff' ? "btn btn-outline-secondary text-white border-0 rounded-1 w-100 text-start bg-secondary" : "btn btn-outline-secondary text-white border-0 rounded-1 w-100 text-start"} style={{fontSize: "15px"}}><span className="material-symbols-outlined material-icons">calendar_month</span>&nbsp;  <span className="sidebarbtntext">Time off Request</span></Link>
                                
                                
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
        
        </>

    );

}