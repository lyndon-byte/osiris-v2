import React from "react";
import { Head } from '@inertiajs/react'
import { useState, useEffect } from "react";
import Loader from "./components/Loader";
import '/resources/css/spinner.css'
import axios from "axios";


function Login(status){

  
        const sendEmailVerification = async () => {
            
            await axios.post('/sendemailverification');
           
        }

        sendEmailVerification();

        useEffect(() => {

            

                window.location.reload();
            

        },[status])

        return (

            <>

                    <Head>
                        <title>Account Confirmation</title>
                    </Head>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="card border-0" style={{width: "21rem",margin: "auto",marginTop: "220px"}}>
                                    <img src="https://i.ibb.co/nm162TF/osirislogo2.png"  className="card-img-top w-25 m-auto mt-5" alt="..." id="spinnerlogo"/>
                                    <div className="card-body ">
                                        
                                        <p className="card-text text-center mt-3">Please verify your email address</p>
                                        <p className="card-text text-center text-muted">We have sent a verification link to {status.auth.user.email}</p>
                                        <p className="text-center text-muted">Click on the link to complete the verification process</p>
                                        <button className="btn btn-dark w-100 mt-3 mb-3" onClick={sendEmailVerification}>Resend Email</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                   
            
            
            </>

        );

     
            

}
 

export default Login