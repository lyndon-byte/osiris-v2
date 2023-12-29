import React, { useEffect, useState } from "react";
import DashboardNavbar from "./components/DashBoardNavbar";
import axios from "axios";
import { Link, usePage } from "@inertiajs/react";

function AdminProfile(status){

    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [email,setEmail] = useState('');
    const [contactnumber,setContactNumber] = useState('');
    const [activeInput,setActiveInput] = useState(true);
    const {url} = usePage();
    const handleSaveEdit = () => {

        if(activeInput){

            setActiveInput(false)

        }else{

            // setActiveInput(true)
            axios.post('/editadminprofile',{firstName,lastName,email,contactnumber}).then(() => {

                console.log('edited!')
            })
        }

    }
    
    const handleCancelEdit = () => {

        window.location.reload();

    }

    useEffect(() =>{

       
        setFirstName(status.auth.user.firstname)
        setLastName(status.auth.user.lastname)
        setEmail(status.auth.user.email)
        setContactNumber(status.auth.user.contactnumber)

    },[])

    return (

        <>  
       
            <div className="container mt-5">
                <div className="row">
                        <div className="col-lg-4 m-auto d-flex justify-content-center mt-4">
                            <img src="https://i.ibb.co/nm162TF/osirislogo2.png" alt="" width="17%" />
                        </div>
                    </div>
                <div className="row">
                    <div className="col-lg-8 mt-5 bg-white m-auto p-5">
                    <nav  aria-label="breadcrumb">
                        <ol className="breadcrumb">
                        
                            <li className="breadcrumb-item "><a href="/home"><i className="fa-solid fa-home"></i> Dashboard</a></li>
                            
                            
                            <li className="breadcrumb-item"><Link href="/adminprofile" className={url === '/adminprofile' ? 'text-success' : ''}><i className="fa-solid fa-user"></i> Profile</Link></li>
                        
                           
                            <li className="breadcrumb-item"><a href="#"><i className="fa-solid fa-gear"></i> Settings</a></li>
                        </ol>
                    </nav>
                    <hr className="mt-5"/>
                        <h4 className="text-muted mb-4 mt-4">My Profile</h4>
                        <h5 className="text-muted"><i className="fa-solid fa-circle-info text-danger"></i> Basic Info</h5>
                        <hr />
                        <div className="row mt-4">
                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <label className="form-label">First Name</label>
                                    <div className="input-group">
                                        
                                        <input type="text" disabled={activeInput} style={{fontSize: 15 + "px"}} className="form-control" defaultValue={firstName} onChange={(e) => setFirstName(e.target.value)} id="" aria-describedby="basic-addon3 basic-addon4"/>
                                    </div>
                                    <div className="form-text" id="basic-addon4"></div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <label className="form-label">Last Name</label>
                                    <div className="input-group">
                                        
                                        <input type="text" disabled={activeInput} style={{fontSize: 15 + "px"}}  defaultValue={lastName} onChange={(e) => setLastName(e.target.value)} className="form-control" id="" aria-describedby="basic-addon3 basic-addon4"/>
                                    </div>
                                    <div className="form-text" id="basic-addon4"></div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <label className="form-label">Contact Number</label>
                                    <div className="input-group">
                                        
                                        <input type="text" disabled={activeInput} style={{fontSize: 15 + "px"}} defaultValue={contactnumber} onChange={(e) => setContactNumber(e.target.value)} className="form-control" id="" aria-describedby="basic-addon3 basic-addon4"/>
                                    </div>
                                    <div className="form-text" id="basic-addon4"></div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <div className="input-group">
                                        
                                        <input type="text" disabled={activeInput} style={{fontSize: 15 + "px"}} defaultValue={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="" aria-describedby="basic-addon3 basic-addon4"/>
                                    </div>
                                    <div className="form-text" id="basic-addon4"></div>
                                    
                                </div>
                                
                            </div>
                            <div className="col-lg-12">
                                     <div className="mb-3">
                                        <button className={activeInput ? 'btn btn-dark rounded-1 mt-4 float-end m-2' : 'btn btn-success rounded-1 mt-4 float-end m-2'} onClick={handleSaveEdit}>  {activeInput ? 'Edit Profile' : 'Save'}</button>
                                        <button className={activeInput ? 'btn btn-dark rounded-1 mt-4 float-end d-none' : 'btn btn-dark rounded-1 mt-4 float-end'} onClick={handleCancelEdit}>cancel</button>
                                    </div>
                            </div>
                            <h5 className="mt-2 text-muted"><i className="fa-solid fa-shield-halved text-danger"></i> Security</h5>
                            <hr className="mt-2"/>
                            <div className="col-lg-4">
                                <div className="">
                                    <label className="form-label mt-3">Password</label>
                                        <div className="input-group">
                                            
                                            <input type="password" disabled style={{fontSize: 15 + "px"}} defaultValue={email} onChange={(e) => setFirstName(e.target.value)} className="form-control" id="basic-url" aria-describedby="basic-addon3 basic-addon4"/>
                                        </div>
                                    <div className="form-text" id="basic-addon4"></div>
                                </div>
                                <div className="mb-3">
                                    <button className="btn btn-dark rounded-1 mt-4">Change Password</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="mt-5 p-5 text-center">
                <p className="text-muted">Osiris HRIS-Payroll v1.2</p>
            </footer>
        </>

    );


}


export default AdminProfile;