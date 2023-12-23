import React from "react";
import HomeNavbar from "./components/HomeNavbar";
import Collapse from 'react-bootstrap/Collapse';
import Spinner  from "react-bootstrap/Spinner";
import Modal  from "react-bootstrap/Modal";
import Button  from "react-bootstrap/Button";

import { Head } from "@inertiajs/react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ForgotPassword(credential){

    const [showPassword,setShowPassword] = useState(false);
    const [showConfirmPassword,setShowConfirmPassword] = useState(false);
    const [password,setPassword] = useState("");
    const [passwordStrength,setPasswordStrength] = useState(false);
    const [passwordMax,setPasswordMax] = useState(false);
    const [passwordCapital,setPasswordCapital] = useState(false)
    const [passwordNum,setPasswordNum] = useState(false);
    const [passwordSpecialChar,setPasswordSpecialChar] = useState(false)
    const [password_confirmation,setPassword_Confirmation] = useState("");
    const [inputErrors,setInputErrors] = useState("");
    const [showLoading,setShowLoading] = useState('hidden');
    const [showAlert,setShowAlert] = useState(false);



    const [email,setEmail] = useState('');
    const [token,setToken] = useState('');


    const handleClose = () => {
        
        
        window.location.href = '/userlogin';
        
    }

    useEffect(() => {

        setEmail(credential.email);
        setToken(credential.token);

    },[])

    const handleSubmitNewPassword = async () => {

        setShowLoading('visible')
        
        await axios.post('/resetpasswordprocess',{token,email,password,password_confirmation})
            .then(() =>{
                setShowLoading('hidden')
                console.log('password was reset successfully')
                setShowAlert(true)
                
            })
            .catch((error) => {

                setShowLoading('hidden')
                setInputErrors(error.response.data.errors);

            })
    }
    
    const handleShowPassword = () =>{

        if(showPassword){

            setShowPassword(false)
        }else{

            setShowPassword(true)

        }

    }

    const handleShowConfirmPassword = () =>{

        if(showConfirmPassword){

            setShowConfirmPassword(false)
        }else{

            setShowConfirmPassword(true)

        }

    }

    //Password Strength Checklist

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


    return (

        <>       
                <Head>
                    <title>Reset Password</title>
                </Head>
                <HomeNavbar></HomeNavbar>
                <Modal
                    show={showAlert}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                   
                    </Modal.Header>
                    <Modal.Body className="text-center p-5" style={{fontSize: "14px"}}>
                            Your password was changed successfully
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="dark">Proceed to login</Button>
                    </Modal.Footer>
                </Modal>
                <div className="container">
                    <div className="row" style={{marginTop: 200 + "px"}}>
                        <div className="col-lg-4 bg-white m-auto p-5" >
                            <h5 className="mb-2 mt-3">Reset your Password</h5>
                           
                            <div className="mb-3 mt-5">
                                            
                                               
                                               
                                            <label className="form-label">New Password</label>
                                                  &nbsp;  <Spinner animation="border" variant="primary" size="sm" style={{visibility: showLoading}}/>
                                                <div className="input-group">
                                                    
                                                    <input type={showPassword ? 'text' : 'password'} value={password} onFocus={() => setPasswordStrength(true)} onBlur={() => setPasswordStrength(false)} onChange={(e) => {setPassword(e.target.value)}}  className={inputErrors['password']? 'form-control border-danger border-end-0' : 'form-control border-end-0'} aria-describedby="basic-addon3 basic-addon4"/>
                                                    <span className={inputErrors['password']? 'input-group-text bg-white border-start-0 border-danger' : 'input-group-text bg-white border-start-0'} onClick={handleShowPassword}><i className={showPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}></i></span>
                                                </div>
                                            <div className="form-text text-danger" id="basic-addon4">{inputErrors['password']}</div>
                                            <Collapse in={passwordStrength}>
                                                            <div className="mt-3">
                                                                <p style={{fontSize: "14px"}}><i className={passwordMax ? 'fa-solid fa-circle-check text-success' : 'fa-regular fa-circle'}></i> must be at least 8 characters.</p>
                                                                <p style={{fontSize: "14px"}}><i className={passwordCapital ? 'fa-solid fa-circle-check text-success' : 'fa-regular fa-circle'}></i> Uppercase Letter</p>
                                                                <p style={{fontSize: "14px"}}><i className={passwordNum ? 'fa-solid fa-circle-check text-success' : 'fa-regular fa-circle'}></i> Number</p>
                                                                <p style={{fontSize: "14px"}}><i className={passwordSpecialChar ? 'fa-solid fa-circle-check text-success' : 'fa-regular fa-circle'}></i> Special Character</p> 
                                                            </div>
                                            </Collapse>
                                            <label className="form-label mt-4">Confirm New Password</label>
                                            &nbsp;  <Spinner animation="border" variant="primary" size="sm" style={{visibility: showLoading}} />
                                            <div className="input-group">

                                                <input type={showConfirmPassword ? 'text' : 'password'} value={password_confirmation} className={inputErrors['password_confirmation']? 'form-control border-danger border-end-0' : 'form-control border-end-0'}  onChange={(e) => {setPassword_Confirmation(e.target.value)}} aria-describedby="basic-addon3 basic-addon4"/>
                                                <span className={inputErrors['password_confirmation']? 'input-group-text bg-white border-start-0 border-danger' : 'input-group-text bg-white border-start-0'} onClick={handleShowConfirmPassword}><i className={showConfirmPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}></i></span>
                                            </div>
                                            <div className="form-text text-danger" id="basic-addon4">{inputErrors['password_confirmation']}</div>
                                            
                                           
                                           
                                            <button className="btn btn-danger mt-5 rounded-1 float-end" type="submit" onClick={handleSubmitNewPassword}>Submit</button>

                                        
                                </div>
                                   
                        </div>
                    </div>
                </div>
        </>

    );

} 