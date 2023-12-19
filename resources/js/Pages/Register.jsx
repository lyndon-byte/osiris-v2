import React, { useEffect, useState } from "react";
import { Accordion , Button } from "react-bootstrap";
import Collapse from 'react-bootstrap/Collapse';
import { useNavigate } from "react-router-dom";
import HomeNavbar from "./components/HomeNavbar";
import { Head , Link} from "@inertiajs/react";
import axios from "axios";


function Login(){
   
    const [showPassword,setShowPassword] = useState(false);
    const [showConfirmPassword,setShowConfirmPassword] = useState(false);
    const [firstname,setFirstname] = useState("");
    const [lastname,setLastname] = useState("");
    const [contactnumber,setContactNumber] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [passwordStrength,setPasswordStrength] = useState(false);
    const [passwordMax,setPasswordMax] = useState(false);
    const [passwordCapital,setPasswordCapital] = useState(false)
    const [passwordNum,setPasswordNum] = useState(false);
    const [passwordSpecialChar,setPasswordSpecialChar] = useState(false)
    const [password_confirmation,setPassword_Confirmation] = useState("");
    const [inputErrors,setInputErrors] = useState("");

    const getToken = async () =>{

       await axios.get('/sanctum/csrf-cookie');

    }

    const handleSubmit = async (e) =>{

        e.preventDefault()

       try{

            await getToken();
        
            await axios.post('/adduser',{
    
                firstname,
                lastname,
                contactnumber,
                email,
                password,
                password_confirmation
    
    
            }).then(() =>{

                window.location.href = '/accountconfirmation';
                
            })        
      

       }catch (error){

             
             setInputErrors(error.response.data.errors)
            

       }

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

                <HomeNavbar></HomeNavbar>
                <Head>
                    <title>Admin Registration</title>
                </Head>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-lg-4 m-auto d-flex justify-content-center mt-4">
                            <img src="https://i.ibb.co/nm162TF/osirislogo2.png" alt="" width="20%" />
                        </div>
                    </div>
                    <div className="row">
                        
                       <form onSubmit={handleSubmit}>
                            <div className="col-lg-4 m-auto mt-5 bg-white p-5 rounded-1 border-2">
                                    <h5 className="text-center mt-2 mb-5">Admin Account Registration</h5>
                                    <div className="mb-3">
                                        <label className="form-label">First Name</label>
                                        <div className="input-group">
                                            
                                            <input type="text" className={inputErrors['firstname']? 'form-control border-danger' : 'form-control'} onChange={(e) => {setFirstname(e.target.value)}} name="firstname" aria-describedby="basic-addon3 basic-addon4"/>

                                        </div>
                                        <div className="form-text text-danger" id="basic-addon4">{inputErrors['firstname']}</div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Last Name</label>
                                        <div className="input-group">
                                            
                                            <input type="text" className={inputErrors['lastname']? 'form-control border-danger' : 'form-control'} onChange={(e) => {setLastname(e.target.value)}} aria-describedby="basic-addon3 basic-addon4"/>

                                        </div>
                                        <div className="form-text text-danger" id="basic-addon4">{inputErrors['lastname']}</div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Contact Number</label>
                                        <div className="input-group">
                                            <span className={inputErrors['contactnumber']? 'input-group-text bg-white border-danger' : 'input-group-text bg-white'}>+63</span>
                                            <input type="number" className={inputErrors['contactnumber']? 'form-control border-danger' : 'form-control'} onChange={(e) => {setContactNumber(e.target.value)}} aria-describedby="basic-addon3 basic-addon4"/>

                                        </div>
                                        <div className="form-text text-danger" id="basic-addon4">{inputErrors['contactnumber']? 'required/must be 10 digits' : ''}</div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Email</label>
                                        <div className="input-group">
                                            
                                            <input type="text" className={inputErrors['email']? 'form-control border-danger' : 'form-control'}  onChange={(e) => {setEmail(e.target.value)}} aria-describedby="basic-addon3 basic-addon4"/>
                                          

                                        </div>
                                        <div className="form-text text-danger" id="basic-addon4">{inputErrors['email']}</div>
                                    </div>
                                  
                                    <div className="mb-3">
                                            
                                               
                                               
                                                <label className="form-label">Password</label>
                                                    
                                                    <div className="input-group">
                                                        
                                                        <input type={showPassword ? 'text' : 'password'}  onFocus={() => setPasswordStrength(true)} onBlur={() => setPasswordStrength(false)} onChange={(e) => {setPassword(e.target.value)}}  className={inputErrors['password']? 'form-control border-danger border-end-0' : 'form-control border-end-0'} aria-describedby="basic-addon3 basic-addon4"/>
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
                                                <label className="form-label mt-2">Confirm Password</label>
                                                
                                                <div className="input-group">

                                                    <input type={showConfirmPassword ? 'text' : 'password'} className={inputErrors['password_confirmation']? 'form-control border-danger border-end-0' : 'form-control border-end-0'}  onChange={(e) => {setPassword_Confirmation(e.target.value)}} aria-describedby="basic-addon3 basic-addon4"/>
                                                    <span className={inputErrors['password_confirmation']? 'input-group-text bg-white border-start-0 border-danger' : 'input-group-text bg-white border-start-0'} onClick={handleShowConfirmPassword}><i className={showConfirmPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}></i></span>
                                                </div>
                                                <div className="form-text text-danger" id="basic-addon4">{inputErrors['password_confirmation']}</div>
                                                
                                               
                                                
                                                <button className="btn btn-dark w-100 mt-5 rounded-1" type="submit">Submit</button>

                                            
                                    </div>
                                       
                                    
                                 
                                    <div className="form-text text-center mt-4" id="basic-addon4">Already have account? <Link href='/userlogin'>Login here</Link></div>
                                
                                </div>
                            </form>
                        <div className="form-text text-center mt-4 mb-5" id="basic-addon4">Osiris HRIS-Payroll Web App v1.2</div>
                    </div>
                </div>
           
           
        </>

    );

}
 

export default Login