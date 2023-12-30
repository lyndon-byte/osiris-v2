import React, { useEffect } from "react";
import axios from "axios";
import {Link}  from '@inertiajs/react'


export default function NewEmailVerified(){

    useEffect(() =>{

       const emailVerified = async () =>{

            await axios.post('/verifynewemailprocess').then(() =>{

                console.log('information was updated')

            })

       }

       emailVerified();

    },[])

    return (

        <>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="card border-0" style={{width: "21rem",margin: "auto",marginTop: "220px"}}>
                                    <img src="https://i.ibb.co/nm162TF/osirislogo2.png"  className="card-img-top w-25 m-auto mt-5" alt="..." id="spinnerlogo"/>
                                    <div className="card-body p-4">
                                        
                                        <p className="card-text text-center mt-3">Your email address was successfully changed</p>
                                        <Link href='/adminprofile' className='btn btn-dark w-100 mt-3 mb-3 rounded-1'>Go back to profile page</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
        </>

    );


}