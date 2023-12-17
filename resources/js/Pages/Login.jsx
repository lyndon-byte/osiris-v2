import React from "react";
import HomeNavbar from "./components/homenavbar";
import { Head } from '@inertiajs/react'

import { useState } from "react";

function Login(){
    
    const [showPassword,setShowPassword] = useState(false);
    
    const handleShowPassword = () =>{

        if(showPassword){

            setShowPassword(false)
        }else{

            setShowPassword(true)

        }

    }

    return (

        <>

                <HomeNavbar></HomeNavbar>
                <Head>
                    <title>Login</title>
                </Head>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-lg-4 m-auto d-flex justify-content-center mt-4">
                            <img src="https://i.ibb.co/nm162TF/osirislogo2.png" alt="" width="20%" />
                        </div>
                    </div>
                    <div className="row">
                        
                        <div className="col-lg-4 m-auto mt-5 bg-white p-5 rounded-1 border-2">
                            <h5 className="text-center mt-2 mb-5">Sign in to your account</h5>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <div className="input-group">
                                    
                                    <input type="text" className="form-control"  aria-describedby="basic-addon3 basic-addon4"/>

                                </div>
                                <div className="form-text" id="basic-addon4"></div>
                            </div>
                            <div className="mb-3">
                           
                                <label className="form-label">Password</label>
                                
                                <div className="input-group">
                                    
                                    <input type={showPassword ? 'text' : 'password'} className="form-control border-end-0 "  aria-describedby="basic-addon3 basic-addon4"/>
                                    <span className="input-group-text bg-white border-start-0 " onClick={handleShowPassword}><i className={showPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}></i></span>
                                </div>
                                <div className="form-text" id="basic-addon4"></div>
                                <div className="form-text text-end mt-3" id="basic-addon4">  <a href="">Forgot Password?</a></div>
                                
                                <button className="btn btn-dark w-100 mt-4 rounded-1">Sign In</button>

                                
                            </div>
                            <div className="form-text text-center mt-4" id="basic-addon4">Doesn't have account yet? <a href="">Register here</a></div>
                           
                        </div>
                        <div className="form-text text-center mt-4 mb-5" id="basic-addon4">Osiris HRIS-Payroll Web App v1.2</div>
                    </div>
                </div>
           
           
        </>

    );

}
 

export default Login