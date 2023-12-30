import React, { useEffect, useState } from "react";
import DashboardNavbar from "./components/DashBoardNavbar";
import axios from "axios";
import { Link, usePage } from "@inertiajs/react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function AdminProfile(status){

    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [email,setEmail] = useState('');
    const [checkNewEmail,setCheckNewEmail] = useState('');
    const [contactnumber,setContactNumber] = useState('');
    const [role,setRole] = useState('');
    const [seconds,setSeconds] = useState(0);
    const [activeInput,setActiveInput] = useState(true);
    const [showCurrentPassword,setShowCurrentPassword] = useState(false);
    const [showNewPassword,setShowNewPassword] = useState(false);
    const [showConfirmNewPassword,setShowConfirmNewPassword] = useState(false);

    const [showModalForEmailChange,setShowModalForEmailChange] = useState(false);
    const [showModalForEmailLinkSent,setShowModalForEmailLinkSent] = useState(false);
    const [showModalForChangePassword,setShowModalForChangePassword] = useState(false);
    const [inputError,setInputError] = useState('')
    const {url} = usePage();

    useEffect(() =>{

        if(seconds === 2){

            window.location.reload();
        }

    },[seconds])


    const handleClose = () => setShowModalForEmailLinkSent(false);

    const handleCloseForChangePassword = () => setShowModalForChangePassword(false);


    

    useEffect(() =>{

       
        setFirstName(status.auth.user.firstname)
        setLastName(status.auth.user.lastname)
        setEmail(status.auth.user.email)
        setContactNumber(status.auth.user.contactnumber)
        setCheckNewEmail(status.auth.user.email)
        setRole(status.auth.user.role)
        
    },[])



    const showToastMessage = () => {

        toast.info("Saving any changes", {
          position: toast.POSITION.TOP_RIGHT,
        })

    };

   const handleChangePassword = async () => {

        

   }

    const handleSaveEdit = async () => {

        if(activeInput){

            setActiveInput(false)

        }else{

            // setActiveInput(true)
            if(email != checkNewEmail){
                
                setShowModalForEmailChange(true);  

                try {

                    await axios.post('/editadminprofile',{firstName,lastName,contactnumber,email,})
                      .then(() => {
      
                            setShowModalForEmailChange(false);  
                            setShowModalForEmailLinkSent(true);
                      })
      
                  } catch(error){
      
                      setInputError(error.response.data.errors)
                  }

            }else{


                try {

                     await axios.post('/editadminprofile',{firstName,lastName,contactnumber,email,})
                      .then(() => {
      
                          showToastMessage();
                          setInterval(() => {
                               
                              setSeconds(seconds => seconds + 1);
                              
                          }, 1000);
                         
                      })
      
                  } catch(error){
      
                      setInputError(error.response.data.errors)
                  }
            }

            
                
        }

    }

    
    const handleCancelEdit = () => {

        window.location.reload();

    }

   
    return (

        <>  
      
            <ToastContainer />
            <Modal
                    show={showModalForEmailChange}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                   
                    </Modal.Header>
                    <Modal.Body style={{fontSize: "14px"}} className="text-center">
                            It looks like you want to change your email. We need to verify your new email address first
                            <br/>
                            Please wait...
                            <br/>
                            <div class="spinner-border text-primary m-auto mt-4" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                    </Modal.Body>
                    <Modal.Footer>
                    
                   
                    </Modal.Footer>
            </Modal>
            <Modal
                    show={showModalForEmailLinkSent}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                   
                    </Modal.Header>
                    <Modal.Body style={{fontSize: "14px"}}>
                            Email verification link was sent to {email}
                            <br/>
                            If you are not able to verify this email, we will not going to save it.
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="dark rounded-1" style={{fontSize: "14px"}} onClick={handleClose}>
                        Understood
                    </Button>
                   
                    </Modal.Footer>
            </Modal>
            <Modal
                    show={showModalForChangePassword}
                    onHide={handleCloseForChangePassword}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        Change your password
                    </Modal.Header>
                    <Modal.Body style={{fontSize: "14px"}}>

                            <div className="row">

                                <div className="col-lg-9 m-auto mt-3">

                                    <div className="mb-3">
                                        <label for="basic-url" className="form-label">Current Password</label>
                                        <div className="input-group">
                                            
                                            <input type={showCurrentPassword ? 'text' : 'password'} className="form-control border-end-0" id="basic-url" aria-describedby="basic-addon3 basic-addon4"/>
                                            <span class="input-group-text border-start-0 bg-white" onClick={() => {setShowCurrentPassword(true)}}><i className="fa-solid fa-eye"></i></span>

                                        </div>
                                        <div className="form-text" id="basic-addon4"></div>
                                    </div>

                                </div>
                                <div className="col-lg-9 m-auto ">

                                    <div className="mb-3">
                                        <label for="basic-url" className="form-label">New Password</label>
                                        <div className="input-group">
                                            
                                            <input type="text" className="form-control border-end-0" id="basic-url" aria-describedby="basic-addon3 basic-addon4"/>
                                            <span class="input-group-text border-start-0 bg-white" ><i className="fa-solid fa-eye"></i></span>

                                        </div>
                                        <div className="form-text" id="basic-addon4"></div>
                                    </div>

                                </div>
                                <div className="col-lg-9 m-auto ">

                                    <div className="mb-4">
                                        <label for="basic-url" className="form-label">Confirm New Password</label>
                                        <div className="input-group">
                                            
                                            <input type="text" className="form-control border-end-0" id="basic-url" aria-describedby="basic-addon3 basic-addon4"/>
                                            <span class="input-group-text border-start-0 bg-white" ><i className="fa-solid fa-eye"></i></span>
                                        </div>
                                        <div className="form-text" id="basic-addon4"></div>
                                    </div>

                                </div>

                            </div>

                        
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="dark rounded-1" style={{fontSize: "14px"}} onClick={handleChangePassword}>
                        Submit
                    </Button>
                   
                    </Modal.Footer>
            </Modal>
            
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
                            
                            
                            <li className="breadcrumb-item"><Link href="/adminprofile" className={url === '/adminprofile' ? 'text-secondary' : ''}><i className="fa-solid fa-user"></i> Profile</Link></li>
                        
                           
                            <li className="breadcrumb-item"><a href="#"><i className="fa-solid fa-gear"></i> Settings</a></li>
                        </ol>
                    </nav>
                    <hr className="mt-5"/>
                        <h4 className="text-muted mb-4 mt-4">My Profile</h4>
                        <h5 className="text-muted"><i className="fa-solid fa-circle-info text-danger"></i> Basic Info</h5>
                        <hr />
                        <div className="row mt-4">
                            <div className="col-lg-12">
                                <h5>Role: <span className="text-muted">{role}</span></h5>
                            </div>
                        </div>
                        <div className="row mt-2">
                            
                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <label className="form-label">First Name</label>
                                    <div className="input-group">
                                        
                                        <input type="text" disabled={activeInput} style={{fontSize: 15 + "px"}} className={inputError['firstName'] ? 'form-control border-danger' : 'form-control'} defaultValue={firstName} onChange={(e) => setFirstName(e.target.value)} id="" aria-describedby="basic-addon3 basic-addon4"/>
                                    </div>
                                    <div className="form-text text-danger" id="basic-addon4">{inputError['firstName']}</div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <label className="form-label">Last Name</label>
                                    <div className="input-group">
                                        
                                        <input type="text" disabled={activeInput} style={{fontSize: 15 + "px"}}  defaultValue={lastName} onChange={(e) => setLastName(e.target.value)} className={inputError['lastName'] ? 'form-control border-danger' : 'form-control'} id="" aria-describedby="basic-addon3 basic-addon4"/>
                                    </div>
                                    <div className="form-text text-danger" id="basic-addon4">{inputError['lastName']}</div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <label className="form-label">Contact Number</label>
                                    <div className="input-group">
                                        <span  className={inputError['contactnumber'] ? 'input-group-text border-danger' : 'input-group-text'} id="basic-addon1">+63</span>

                                        <input type="number" disabled={activeInput} style={{fontSize: 15 + "px"}} defaultValue={contactnumber}  onChange={(e) => setContactNumber(e.target.value)} className={inputError['contactnumber'] ? 'form-control border-danger' : 'form-control'} id="" aria-describedby="basic-addon3 basic-addon4" maxLength="10"/>
                                    </div>
                                    <div className="form-text text-danger" id="basic-addon4">{inputError['contactnumber']}</div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <div className="input-group">
                                        
                                        <input type="text" disabled={activeInput} style={{fontSize: 15 + "px"}} defaultValue={email} onChange={(e) => setEmail(e.target.value)} className={inputError['email'] ? 'form-control border-danger' : 'form-control'} id="" aria-describedby="basic-addon3 basic-addon4"/>
                                    </div>
                                    <div className="form-text text-danger" id="basic-addon4">{inputError['email']}</div>
                                    
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
                                    <button className="btn btn-dark rounded-1 mt-4" onClick={() => setShowModalForChangePassword(true)}>Change Password</button>
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