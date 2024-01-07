import React from "react";
import { usePage , useForm , router } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState} from "react";
import DashboardNavbar from "./components/DashBoardNavbar";
import UserCalendar from './components/UserCalendar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function UserInfo(){

    const userbasicinfo = usePage().props.userbasicinfo
    const companydetails = usePage().props.companydetails
    const [defaultEmail,setDefaultEmail] = useState(userbasicinfo[0].email)
    const [companyid,setCompanyId] = useState(userbasicinfo[0].company_id)
    const [employeeid,setEmployeeId] = useState(userbasicinfo[0].employee_id)
    const [firstName,setFirstName] = useState(userbasicinfo[0].firstname)
    const [lastName,setLastName] = useState(userbasicinfo[0].lastname)
    const [email,setEmail] = useState(userbasicinfo[0].email)
    const [contactNumber,setContactNumber] = useState(userbasicinfo[0].contactnumber)
    const [birthdate,setBirthDate] = useState('')
    const [role,setRole] = useState('employee')
    const [gender,setGender] = useState('')
    const [addressline,setAddressline] = useState('')
    const [city,setCity] = useState('')
    const [state,setState] = useState('')
    const [postal,setPostal] = useState('')
    const [country,setCountry] = useState('philippines')
    const [jobtitle,setJobTitle] = useState('')
    const [startDate,setStartDate] = useState('')
    const [department,setDepartment] = useState('')
    const [team,setTeam] = useState('')
    const [active,setActive] = useState(false)
    const [seconds,setSeconds] = useState(0)
    const [inputErrors,setInputErrors] = useState('')



    useEffect(() => {

        console.log(inputErrors)

    },[inputErrors])


    useEffect(() =>{
        console.log(seconds)
        if(seconds == 2){

            window.location.reload()

        }
    },[seconds])

    useEffect(() => {

       try{
            setBirthDate(companydetails[0].birthdate)
            setGender(companydetails[0].gender)
            setAddressline(companydetails[0].addressline)
            setCity(companydetails[0].city)
            setState(companydetails[0].state)
            setPostal(companydetails[0].postal)
            setJobTitle(companydetails[0].jobtitle)
            setStartDate(companydetails[0].startdate)
            setDepartment(companydetails[0].department)
            setTeam(companydetails[0].team)

       }catch(error){

            console.log(error)
       }
        
    },[])
   
   
    const showToastMessage = () => {

        toast.info("Saving changes", {
            position: toast.POSITION.TOP_RIGHT,
        })

    };

    const handleAddUserCompanyDetails = async () => {

        setInputErrors('')
       
        
              try{
                 
                 await axios.post('/addusercompanydetails',

                        {
                                        companyid,
                                        employeeid,
                                        firstName,
                                        lastName,
                                        defaultEmail,
                                        email,
                                        contactNumber,
                                        role,
                                        birthdate,
                                        gender,
                                        addressline,
                                        city,
                                        state,
                                        country,
                                        postal,
                                        jobtitle,
                                        startDate,
                                        department,
                                        team,

                        }
                    ).then(() =>{

                        showToastMessage();
                       
                        setInterval(() => {
                               
                            setSeconds(seconds => seconds + 1);
                            
                        }, 1000);

                    })
                    
                   

              }catch(error){
                    
                
                  toast.error("Oops! it looks like you entered wrong information", {
                    position: toast.POSITION.TOP_CENTER,
                  });

                    setInputErrors(error.response.data.errors)

              }

    }

   

    return (
        
        
        <>  

            <ToastContainer></ToastContainer>
            <DashboardNavbar></DashboardNavbar>
            <div className="container mt-5" style={{marginBottom: "150px"}}>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/users"><i class="fa-solid fa-user-group"></i> Users View</a></li>
                        <li class="breadcrumb-item active" aria-current="page"><i class="fa-regular fa-user"></i> Specific User</li>
                    </ol>
                </nav>
            <div className="row mt-5" >
                <div className="col-lg-12 col-sm-12 p-4 bg-white rounded-2">
                       
                        <button className="btn btn-danger float-end rounded-1"><i className="fa-regular fa-envelope"></i> Send Email</button>
                        <h5 className="mt-2 text-muted">{userbasicinfo[0].employee_id}</h5>
                        

                </div>
                </div>
                <div className="row ">
                    <div className="col-lg-4 mt-5 rounded-2 bg-white p-5 overflow-y-scroll" style={{maxHeight: "900px" }}>
                        <h5 className="mb-5 mt-3 text-muted">Personal Info</h5>
                        <div className="mb-3 mt-3">
                            <label className="form-label">First Name</label>
                            <div className="input-group">
                                <input type="text" value={firstName} onChange={(e) => {setFirstName(e.target.value)}} className={inputErrors['firstName'] ? "form-control rounded-1 border-danger" : "form-control rounded-1"} aria-describedby="basic-addon3 basic-addon4"/>
                            </div>
                                <div className="form-text text-danger" id="basic-addon4">{inputErrors['firstName']}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Last Name</label>
                            <div className="input-group">
                                <input type="text" value={lastName} onChange={(e) => {setLastName(e.target.value)}} className={inputErrors['lastName'] ? "form-control rounded-1 border-danger" : "form-control rounded-1"} aria-describedby="basic-addon3 basic-addon4"/>
                            </div>
                                <div className="form-text text-danger" id="basic-addon4">{inputErrors['lastName']}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Contact Number</label>
                            <div className="input-group">
                                <span class="input-group-text" id="basic-addon1">+63</span>

                                <input type="text" value={contactNumber} onChange={(e) => {setContactNumber(e.target.value)}} className={inputErrors['contactNumber'] ? "form-control rounded-1 border-danger" : "form-control rounded-1"} aria-describedby="basic-addon3 basic-addon4"/>
                            </div>
                                <div className="form-text text-danger" id="basic-addon4">{inputErrors['contactNumber']}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <div className="input-group">
                                <input type="text" value={email} onChange={(e) => {setEmail(e.target.value)}} className={inputErrors['email'] ? "form-control rounded-1 border-danger" : "form-control rounded-1"} aria-describedby="basic-addon3 basic-addon4"/>
                            </div>
                                <div className="form-text text-danger" id="basic-addon4">{inputErrors['email']}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Birth Date</label>
                            <div className="input-group">
                                <input type="date" value={birthdate} onChange={(e) => {setBirthDate(e.target.value)}} className={inputErrors['birthdate'] ? "form-control rounded-1 border-danger" : "form-control rounded-1"} aria-describedby="basic-addon3 basic-addon4"/>
                            </div>
                                <div className="form-text text-danger" id="basic-addon4">{inputErrors['birthdate']}</div>
                        </div>
                        <div className="mb-3">
                            
                            <div className="input-group mt-4">
                                <select onChange={(e) => {setGender(e.target.value)}} className="form-select rounded-1" aria-label="Default select example">
                                    <option value={gender} selected>{gender}</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Rather not say">Rather not say</option>
                                </select>
                            </div>
                                <div className="form-text text-danger" id="basic-addon4">{inputErrors['gender']}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label mb-3 mt-3">Home Address</label>
                           
                                <div class="form-floating">
                                    <input type="text" value={addressline} onChange={(e) => {setAddressline(e.target.value)}} className={inputErrors['addressline'] ? "form-control rounded-1 border-danger" : "form-control rounded-1"} id="floatingPassword" placeholder="Password"/>
                                    <label className="text-muted">Address Line 1</label>
                                </div>
                            
                            <div className="form-text text-danger" id="basic-addon4">{inputErrors['addressline']}</div>
                        </div>
            
                        <div className="mb-3">
                                <div class="form-floating">
                                    <input type="text" value={city} onChange={(e) => {setCity(e.target.value)}} className={inputErrors['city'] ? "form-control rounded-1 border-danger" : "form-control rounded-1"} id="floatingPassword" placeholder="Password"/>
                                    <label className="text-muted">City</label>
                                </div>
                            
                            <div className="form-text text-danger" id="basic-addon4">{inputErrors['city']}</div>
                        </div>
                        <div className="mb-3">
                                <div class="form-floating">
                                    <input type="text" value={state} onChange={(e) => {setState(e.target.value)}} className={inputErrors['state'] ? "form-control rounded-1 border-danger" : "form-control rounded-1"} id="floatingPassword" placeholder="Password"/>
                                    <label className="text-muted">State/Province</label>
                                </div>
                            
                            <div className="form-text text-danger" id="basic-addon4">{inputErrors['state']}</div>
                        </div>
                       
                        <div className="mb-3">
                            
                          
                                <div class="form-floating">
                                    <input type="text" value="Philippines" disabled className="form-control rounded-1" id="floatingPassword" placeholder="Password"/>
                                    <label className="text-muted">Country</label>
                                </div>
                            
                            <div className="form-text" id="basic-addon4"></div>
                        </div>
                        <div className="mb-3">
                                <div class="form-floating">
                                    <input type="text" value={postal} onChange={(e) => {setPostal(e.target.value)}} className={inputErrors['postal'] ? "form-control rounded-1 border-danger" : "form-control rounded-1"} id="floatingPassword" placeholder="Password"/>
                                    <label className="text-muted">Postal Code</label>
                                </div>
                            
                            <div className="form-text text-danger" id="basic-addon4">{inputErrors['postal']}</div>
                        </div>
                        <h5 className="mb-5 mt-5 text-muted">Job Details</h5>
                        <div className="mb-3">
                                <div class="form-floating">
                                    <input type="text" value={companyid} disabled className="form-control rounded-1" id="floatingPassword" placeholder="Password"/>
                                    <label className="text-muted">Company ID</label>
                                </div>
                            <div className="form-text text-danger" id="basic-addon4"></div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Job Title</label>
                            <div className="input-group">
                                <select onChange={(e) => {setJobTitle(e.target.value)}} className={inputErrors['jobtitle'] ? "form-control rounded-1 border-danger" : "form-control rounded-1"} aria-label="Default select example">
                                    <option value={jobtitle} selected>{jobtitle}</option>
                                    <option value="Office Staff">Office Staff</option>
                                    <option value="Machine operator">Machine operator</option>
                                    <option value="Safety Officer">Safety Officer</option>
                                </select>
                            </div>
                            <div className="form-text text-danger" id="basic-addon4">{inputErrors['jobtitle']}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Start Date</label>
                            <div className="input-group">
                                <input type="date" value={startDate} onChange={(e) => {setStartDate(e.target.value)}} className={inputErrors['startDate'] ? "form-control rounded-1 border-danger" : "form-control rounded-1"} aria-describedby="basic-addon3 basic-addon4"/>
                            </div>
                                <div className="form-text text-danger" id="basic-addon4">{inputErrors['startDate']}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Department</label>
                            <div className="input-group">
                                <select onChange={(e) => {setDepartment(e.target.value)}}  className={inputErrors['department'] ? "form-control rounded-1 border-danger" : "form-control rounded-1"} aria-label="Default select example">
                                    <option value={department} selected>{department}</option>
                                    <option value="Accounting">Accounting</option>
                                    <option value="Production">Production</option>
                                    <option value="Marketing">Marketing</option>
                                </select>
                            </div>
                            <div className="form-text text-danger" id="basic-addon4">{inputErrors['department']}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Team</label>
                            <div className="input-group">
                                <select onChange={(e) => {setTeam(e.target.value)}} className={inputErrors['team'] ? "form-control rounded-1 border-danger" : "form-control rounded-1"} aria-label="Default select example">
                                    <option value={team} selected>{team}</option>
                                    <option value="Team A">Team A</option>
                                    <option value="Team B">Team B</option>
                                    <option value="Team C">Team C</option>
                                </select>
                            </div>
                            <div className="form-text text-danger" id="basic-addon4">{inputErrors['team']}</div>
                        </div>
                            
                        <button className="btn btn-dark rounded-1 mt-4 float-end" onClick={handleAddUserCompanyDetails}>Save</button>
                    </div>
                        
                    <div className="col-lg-8 mt-5 bg-white" >
                         <ul className="nav nav-tabs mt-3 " id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active"  data-bs-toggle="tab" data-bs-target="#schedule-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Job Schedule</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link"  data-bs-toggle="tab" data-bs-target="#timeoff-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Time Off</button>
                            </li>
                          
                            <li className="nav-item" role="presentation">
                                <button className="nav-link"  data-bs-toggle="tab" data-bs-target="#attendance-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Attendance</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link"  data-bs-toggle="tab" data-bs-target="#payroll-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Payroll</button>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="schedule-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
                                  
                                <div className="col-lg-11 m-auto ">
                                    <button className="btn btn-outline-primary border-0 float-end"><i className="fa-solid fa-gear"></i> Configure</button>
                                        <h6 className="mb-4 text-muted mt-5" >Current Job Schedule</h6>
                                        <div className="table-responsive ">
                                            <table className="table shadow-sm " >
                                            
                                                    <thead>
                                                        <tr >
                                                        
                                                        
                                                            <th scope="col" className="bg-info text-white fw-medium" style={{fontSize: "15px"}}>Shift Start</th>
                                                            <th scope="col" className="bg-info text-white fw-medium" style={{fontSize: "15px"}}>End Of Shift </th>
                                                            <th scope="col" className="bg-info text-white fw-medium" style={{fontSize: "15px"}}>Rest Day 1</th>
                                                            <th scope="col" className="bg-info text-white fw-medium" style={{fontSize: "15px"}}>Rest Day 2</th>
                                                        
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                        <tr >
                                                        
                                                            <td className="text-muted" style={{fontSize: "14px"}}>Not Se asdasdsadt</td>
                                                            <td className="text-muted" style={{fontSize: "14px"}}>Notasdasd Set</td>
                                                            <td className="text-muted" style={{fontSize: "14px"}}>Noasdasdast Set</td>
                                                            <td className="text-muted" style={{fontSize: "14px"}}>Notasdasd Set</td>
                                                            
                                                            
                                                        </tr>
                                            
                                                    
                                                    </tbody>
                                            </table>
                                  
                                        </div>
                                       
                                       <UserCalendar></UserCalendar>
                                        
                                </div> 
                            </div>
                            <div className="tab-pane fade" id="timeoff-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
                              
                               <div className="row mt-4 p-4">
                                     <h5 className="mb-5 text-muted mt-5">Time off Balances</h5>
                                    <div className="col-lg-4 m-auto mb-4">
                                            <div className="card text-bg-primary border-0">
        
                                                <div className="card-body p-4">
                                                    <h5 className="card-title">Time Off</h5>
                                                    <h5 className="card-text mt-4">10</h5>
                                                  
                                                </div>
                                                <div className="card-footer p-4">
                                                      will reset annually 
                                                </div>

                                            </div>
                                        </div>
                                        <div className="col-lg-4 m-auto mb-4">
                                            <div className="card text-bg-success border-0">
        
                                                <div className="card-body p-4">
                                                    <h5 className="card-title">Sick leave</h5>
                                                    <h5 className="card-text mt-4">10</h5>
                                                  
                                                </div>
                                                <div className="card-footer p-4">
                                                    will reset annually 
                                                </div>
                                                
                                            </div>
                                        </div>
                                        <div className="col-lg-4 m-auto mb-4">
                                            <div className="card text-bg-danger border-0">
        
                                                <div className="card-body p-4">
                                                    <h5 className="card-title">Unpaid Leave</h5>
                                                    <h5 className="card-text mt-4">0</h5>
                                                
                                                </div>
                                                <div className="card-footer p-4">
                                                    will reset annually 
                                                </div>
                                                
                                            </div>
                                        </div>
                               </div>

                            </div>
                            
                            <div className="tab-pane fade" id="attendance-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabindex="0">

                                <div className="table-responsive mt-5 p-4">
                                        
                                        <table className="table shadow-sm " >
                                                
                                                        <thead>
                                                            <tr >
                                                            
                                                            
                                                                <th scope="col" className="bg-info text-white fw-medium" style={{fontSize: "15px"}}>Shift Start</th>
                                                                <th scope="col" className="bg-info text-white fw-medium" style={{fontSize: "15px"}}>End Of Shift </th>
                                                                <th scope="col" className="bg-info text-white fw-medium" style={{fontSize: "15px"}}>Rest Day 1</th>
                                                                <th scope="col" className="bg-info text-white fw-medium" style={{fontSize: "15px"}}>Rest Day 2</th>
                                                            
                                                            </tr>
                                                        </thead>
                                                        <tbody>

                                                            <tr >
                                                            
                                                                <td className="text-muted" style={{fontSize: "14px"}}>Not Se asdasdsadt</td>
                                                                <td className="text-muted" style={{fontSize: "14px"}}>Notasdasd Set</td>
                                                                <td className="text-muted" style={{fontSize: "14px"}}>Noasdasdast Set</td>
                                                                <td className="text-muted" style={{fontSize: "14px"}}>Notasdasd Set</td>
                                                                
                                                                
                                                            </tr>
                                                
                                                        
                                                        </tbody>
                                        </table>
                                    
                                </div>


                            </div>
                            <div className="tab-pane fade" id="payroll-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabindex="0">xx</div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );



}