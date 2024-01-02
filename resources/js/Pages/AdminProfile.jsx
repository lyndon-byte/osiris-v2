import React, { useEffect, useState } from "react";
import DashboardNavbar from "./components/DashBoardNavbar";
import axios from "axios";
import { Link, usePage } from "@inertiajs/react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Spinner from 'react-bootstrap/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TRUE } from "sass";


function AdminProfile(status){
    const [companyId,setCompanyId] = useState('')
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
    const [showChangePasswordSuccess,setShowChangePasswordSuccess] = useState(false)
    
    const [current_password,setCurrentPassword] = useState("");
    const [passwordStrength,setPasswordStrength] = useState(false);
    const [passwordMax,setPasswordMax] = useState(false);
    const [passwordCapital,setPasswordCapital] = useState(false)
    const [passwordNum,setPasswordNum] = useState(false);
    const [passwordSpecialChar,setPasswordSpecialChar] = useState(false)
    const [password_confirmation,setPassword_Confirmation] = useState("");
    const [password,setPassword] = useState('');

    const [showModalForEmailChange,setShowModalForEmailChange] = useState(false);
    const [showModalForEmailLinkSent,setShowModalForEmailLinkSent] = useState(false);
    const [showModalForChangePassword,setShowModalForChangePassword] = useState(false);
    const [inputError,setInputError] = useState('');
    const [showLoading,setShowLoading] = useState('hidden');

    const {url} = usePage();

    const handleShowCurrentPassword = () =>{

            if(showCurrentPassword){
                setShowCurrentPassword(false)
            }else{

                setShowCurrentPassword(true)
            }
    }

    const handleShowNewPassword = () =>{

        if(showNewPassword){
            setShowNewPassword(false)
        }else{

            setShowNewPassword(true)
        }
    }

    const handleShowConfirmNewPassword = () =>{

        if(showConfirmNewPassword){
            setShowConfirmNewPassword(false)
        }else{

            setShowConfirmNewPassword(true)
        }
    }


    useEffect(() =>{

        if(seconds === 2){

            window.location.reload();
        }

    },[seconds])


    const handleClose = () => setShowModalForEmailLinkSent(false);

    const handleCloseForChangePassword = () => setShowModalForChangePassword(false);


    

    useEffect(() =>{

        setCompanyId(status.auth.user.company_id)
        setFirstName(status.auth.user.firstname)
        setLastName(status.auth.user.lastname)
        setEmail(status.auth.user.email)
        setContactNumber(status.auth.user.contactnumber)
        setCheckNewEmail(status.auth.user.email)
        setRole(status.auth.user.role)
        console.log(status);
    },[])



    const showToastMessage = () => {

        toast.info("Saving any changes", {
          position: toast.POSITION.TOP_RIGHT,
        })

    };

    useEffect(() =>{

        if(password.length >= 8){

            setPasswordMax(true)

        }else{

            setPasswordMax(false)

        }
        
        
        if(/[A-Z]/.test(password)){

            setPasswordCapital(true)

        }else{

            setPasswordCapital(false)
        }

        if(/\d/.test(password)){

            setPasswordNum(true)

        }else{

            setPasswordNum(false)
        }

        if(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password)){

            setPasswordSpecialChar(true)

        }else{

            setPasswordSpecialChar(false)

        }

},[password])

   const handleChangePassword = async () => {
        setShowLoading('')
        try{

            await axios.post('/changepassword',{current_password,password,password_confirmation})
                .then(() =>{

                    console.log('password was changed')
                    setShowModalForChangePassword(false);
                    setShowChangePasswordSuccess(true);
                    setShowLoading('hidden')
                    setInputError('')

                })

        }catch(error){
            setShowLoading('hidden')
            setInputError(error.response.data.errors)
        }

   }

   const handleCloseChangePasswordSuccess = () => {

        setShowChangePasswordSuccess(false);

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
                            setInputError('')
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
                          setInputError('')
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
                    show={showChangePasswordSuccess}
                    onHide={handleCloseChangePasswordSuccess}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                   
                    </Modal.Header>
                    <Modal.Body style={{fontSize: "14px"}} className="text-center">
                            Your password was successfully changed!
                            <br/>
                            
                    
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="dark rounded-1" style={{fontSize: "14px"}} onClick={handleCloseChangePasswordSuccess}>
                            Understood
                        </Button>
                   
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
                                        <label for="basic-url" className="form-label">Current Password</label> <Spinner animation="border" variant="primary" size="sm" style={{visibility: showLoading}}  />
                                        <div className="input-group">
                                            
                                            <input type={showCurrentPassword ? 'text' : 'password'} onChange={(e) => {setCurrentPassword(e.target.value)}} className={inputError['current_password'] ? 'form-control border-end-0 border-danger' : 'form-control border-end-0'} id="basic-url" aria-describedby="basic-addon3 basic-addon4"/>
                                                <span className={inputError['current_password'] ? "input-group-text border-start-0 bg-white border-danger" : "input-group-text border-start-0 bg-white" } onClick={handleShowCurrentPassword}><i className={showCurrentPassword ? 'fa-solid fa-eye' :  'fa-solid fa-eye-slash'}></i></span>

                                        </div>
                                        <div className="form-text text-danger" id="basic-addon4">{inputError['current_password']}</div>
                                    </div>

                                </div>
                                <div className="col-lg-9 m-auto ">

                                    <div className="mb-3">
                                        <label for="basic-url" className="form-label">New Password</label> <Spinner animation="border" variant="primary" size="sm" style={{visibility: showLoading}}  />
                                        <div className="input-group">
                                            
                                            <input type={showNewPassword ? 'text' : 'password'} onChange={(e) => {setPassword(e.target.value)}} onFocus={() => setPasswordStrength(true)} onBlur={() => setPasswordStrength(false)} className={inputError['password'] ? "form-control border-end-0 border-danger" : "form-control border-end-0"} id="basic-url" aria-describedby="basic-addon3 basic-addon4"/>
                                            <span className={inputError['password'] ? "input-group-text border-start-0 bg-white border-danger" : "input-group-text border-start-0 bg-white"} onClick={handleShowNewPassword}><i className={showNewPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}></i></span>

                                        </div>
                                        <div className="form-text text-danger" id="basic-addon4">{inputError['password']}</div>
                                        <Collapse in={passwordStrength}>
                                                                <div className="mt-3">
                                                                    <p style={{fontSize: "14px"}}><i className={passwordMax ? 'fa-solid fa-circle-check text-success' : 'fa-regular fa-circle'}></i> must be at least 8 characters.</p>
                                                                    <p style={{fontSize: "14px"}}><i className={passwordCapital ? 'fa-solid fa-circle-check text-success' : 'fa-regular fa-circle'}></i> Uppercase Letter</p>
                                                                    <p style={{fontSize: "14px"}}><i className={passwordNum ? 'fa-solid fa-circle-check text-success' : 'fa-regular fa-circle'}></i> Number</p>
                                                                    <p style={{fontSize: "14px"}}><i className={passwordSpecialChar ? 'fa-solid fa-circle-check text-success' : 'fa-regular fa-circle'}></i> Special Character</p> 
                                                                </div>
                                        </Collapse>
                                    </div>

                                </div>
                                <div className="col-lg-9 m-auto ">

                                    <div className="mb-4">
                                        <label for="basic-url" className="form-label">Confirm New Password</label>  <Spinner animation="border" variant="primary" size="sm" style={{visibility: showLoading}}  />

                                        <div className="input-group">
                                            
                                            <input type={showConfirmNewPassword ? 'text' : 'password'} onChange={(e) => {setPassword_Confirmation(e.target.value)}} className={inputError['password_confirmation'] ? "form-control border-end-0 border-danger" : "form-control border-end-0"} id="basic-url" aria-describedby="basic-addon3 basic-addon4"/>
                                            <span className={inputError['password_confirmation'] ? "input-group-text border-start-0 bg-white border-danger" : "input-group-text border-start-0 bg-white"} onClick={handleShowConfirmNewPassword} ><i className={showConfirmNewPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}></i></span>
                                        </div>
                                        <div className="form-text text-danger" id="basic-addon4">{inputError['password_confirmation']}</div>
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
                                <h5>Company Id: <span className="text-muted">{companyId}</span></h5>
                            </div>
                            <div className="col-lg-12 mt-2">
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