import React, { useEffect, useState } from "react";
import HomeNavbar from "./components/HomeNavbar";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { Head } from "@inertiajs/react";
import axios from "axios";
import { info } from "autoprefixer";

export default function ForgotPassword(){

    const [email,setEmail] = useState('');
    const [emailAlert,setEmailAlert] = useState('');
    const [inputError,setInputError] = useState('');
    const [showAlert,setShowAlert] = useState(false);
    const [showLoading,setShowLoading] = useState('hidden');
    
    const handleClose = () => {
        
        
        setShowAlert(false);
    }
    useEffect(() =>{

        
        if(email !== ''){

            setEmailAlert(email);
        }

    },[email])

    const handleSendResetPasswordLink = async () =>{

       
       

        setShowLoading('visible');
        setInputError('');
       
       
        await axios.post('/forgotpasswordprocess',{email})
            .then(() => {   
                
                setInputError('');
                setShowLoading('hidden');
                setShowAlert(true);
                setEmail('');
                console.log('passwordresetlink was sent!');
                setShowAlert('visible');
                

            })
            .catch((error) =>{

                setInputError(error.response.data.errors)
                setShowLoading('hidden');

            });

    }

    return (

        <>      
                <Head>
                    <title>Forgot Password</title>
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
                    <Modal.Body style={{fontSize: "14px"}}>
                            Password reset link was succesfully sent to {emailAlert}
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="dark rounded-1" style={{fontSize: "14px"}} onClick={handleClose}>
                        Understood
                    </Button>
                   
                    </Modal.Footer>
                </Modal>
                <div className="container">
                  
                    <div className="row" style={{marginTop: 200 + "px"}}>
                       
                        <div className="col-lg-4 bg-white m-auto p-5" >
                            
                            <h5 className="mb-2 mt-4">Forgot Password</h5>
                            <p className="text-muted" style={{fontSize: 14 + "px"}}>Please enter your email address. You will receive a link to create a new password via email</p>
                            <div className="mb-3">

                                <label  className="form-label mt-1">Email Address</label> <Spinner animation="border" variant="primary" size="sm" style={{visibility: showLoading}}/>
                                <div className="input-group">
                                
                                    <input type="text" className={inputError['email'] ? 'form-control rounded-1 border-danger' : 'form-control rounded-1'} value={email} onChange={(e) => {setEmail(e.target.value)}} id="basic-url" aria-describedby="basic-addon3 basic-addon4"/>
                                    

                                </div>
                               
                                <div className="form-text text-danger" id="basic-addon4">{inputError['email']}</div>
                                <button className="btn btn-danger rounded-1 mt-5 float-end" onClick={handleSendResetPasswordLink}>Submit</button>
                            </div>

                        </div>
                    </div>
                </div>
        </>

    );

} 