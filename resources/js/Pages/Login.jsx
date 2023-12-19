import React, { useEffect } from "react";
import HomeNavbar from "./components/homenavbar";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Head, Link } from '@inertiajs/react';
import axios from "axios";

import { useState } from "react";

function Login(){
    
    const [showPassword,setShowPassword] = useState(false);
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [inputErrors,setInputErrors] = useState("");

    const [show, setShow] = useState(false);

   
  
    const handleShowPassword = () =>{

        if(showPassword){

            setShowPassword(false)
        }else{

            setShowPassword(true)

        }

    }
    const getToken = async () =>{

        await axios.get('/sanctum/csrf-cookie');
 
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        try{

            await getToken();

            await axios.post('/authenticate',{email,password}).then(() => {

                window.location.href = '/home';

            });

        }catch(error){

            setInputErrors(error.response.data.errors)

        }

    }

    const handleClose = () => setShow(false);

    useEffect(() =>{

            if(inputErrors !== ""){

                setShow(true);
            }

    },[inputErrors])

    return (

        <>

                <HomeNavbar></HomeNavbar>
                <Head>
                    <title>Login</title>
                </Head>
                <Modal size="sm" show={show} onHide={handleClose} centered>
                    <Modal.Header className="border-0" closeButton>
                    
                    </Modal.Header >
                    <Modal.Body className="text-center mb-4">
                        
                        <p className="mt-4 text-muted">Login Failed</p>
                    </Modal.Body>
                    <Modal.Footer className="p-4">
                        
                        <Button variant="danger" className="rounded-1 w-75  m-auto" onClick={handleClose}>
                            Try again
                        </Button>
                    
                    </Modal.Footer>
                </Modal>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-lg-4 m-auto d-flex justify-content-center mt-4">
                            <img src="https://i.ibb.co/nm162TF/osirislogo2.png" alt="" width="20%" />
                        </div>
                    </div>
                    <div className="row">
                        
                        <div className="col-lg-4 m-auto mt-5 bg-white p-5 rounded-1 border-2">
                            <h5 className="text-center mt-2 mb-5">Sign in to your account</h5>
                           <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                        <label className="form-label">Email</label>
                                        <div className="input-group">
                                            
                                            <input type="text" className={inputErrors['email']? 'form-control border-danger' : 'form-control'} onChange={(e) => {setEmail(e.target.value)}} aria-describedby="basic-addon3 basic-addon4"/>

                                        </div>
                                        <div className="form-text text-danger" id="basic-addon4">{inputErrors['email']}</div>
                                    </div>
                                    <div className="mb-3">
                                
                                        <label className="form-label">Password</label>
                                        
                                        <div className="input-group">
                                            
                                            <input type={showPassword ? 'text' : 'password'} className={inputErrors['password']? 'form-control border-danger border-end-0' : 'form-control border-end-0'}  onChange={(e) => {setPassword(e.target.value)}} aria-describedby="basic-addon3 basic-addon4"/>
                                            <span className={inputErrors['password'] ? 'input-group-text bg-white border-start-0 border-danger' : 'input-group-text bg-white border-start-0 '} onClick={handleShowPassword}><i className={showPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}></i></span>
                                        </div>
                                        <div className="form-text text-danger" id="basic-addon4">{inputErrors['password']}</div>
                                        <div className="form-text text-end mt-3" id="basic-addon4">  <a href="">Forgot Password?</a></div>
                                        
                                        <button className="btn btn-dark w-100 mt-4 rounded-1" type="submit">Sign In</button>

                                        
                                    </div>
                           </form>
                            <div className="form-text text-center mt-4" id="basic-addon4">Doesn't have account yet? <Link href="/register">Register here</Link></div>
                           
                        </div>
                        <div className="form-text text-center mt-4 mb-5" id="basic-addon4">Osiris HRIS-Payroll Web App v1.2</div>
                    </div>
                </div>
           
           
        </>

    );

}
 

export default Login