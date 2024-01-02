import React, { useState } from "react";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link, usePage } from "@inertiajs/react";


export default function SideBar(){
    
    const [showSideBar,setShowSideBar] = useState(true)

    const {url} = usePage()


    const handleSideBarClose = () => {

        setShowSideBar(false)
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

                        <Link href="/home" className={url === '/home' ? 'btn btn-outline-secondary text-white border-0 rounded-1 w-100 text-start bg-secondary' : 'btn btn-outline-secondary text-white border-0 rounded-1 w-100 text-start '} ><span className="material-symbols-outlined material-icons" >widgets</span>&nbsp; <span className="sidebarbtntext">Dashboard</span> </Link>
                        <Link href="/users" className={url === '/users' ? "btn btn-outline-secondary text-white border-0 rounded-1 w-100 text-start bg-secondary" : "btn btn-outline-secondary text-white border-0 rounded-1 w-100 text-start" }><span className="material-symbols-outlined material-icons">group</span>&nbsp;  <span className="sidebarbtntext">Users</span></Link>
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
            
        
        </>
    );

}