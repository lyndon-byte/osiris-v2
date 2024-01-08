import React from "react";
import { usePage , useForm , router } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState} from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import DashboardNavbar from "./components/DashBoardNavbar";
import UserCalendar from './UserCalendar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




export default function UserInfo(){

    const userbasicinfo = usePage().props.userbasicinfo
    const companydetails = usePage().props.companydetails
    const jobscheddata = usePage().props.jobscheduledata

    const [primaryid,setPrimaryidId] = useState(userbasicinfo[0].id)
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
    const [showModalForJobSched,setShowModalForJobSched] = useState(false)
    const [startTime,setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [restDay1,setRestDay1] = useState('');
    const [restDay2,setRestDay2] = useState('');

    const [jobdata1,setJobData1] = useState('')
    const [formattedTime1,setFormattedTime1] = useState('')
    const [formattedTime2,setFormattedTime2] = useState('')

    const [jobdata2,setJobData2] = useState('')
    const [jobdata3,setJobData3] = useState('')
    const [jobdata4,setJobData4] = useState('')
    const [day,setDay] = useState(

        {0: 'Saturday', 1: 'Sunday', 2: 'Monday', 3: 'Tuesday',4: 'Wednesday',5: 'Thursday', 6: 'Friday'}

    )    

    useEffect(() => {

        function convertTo12HourFormat(time24) {
            const [hours, minutes, seconds] = time24.split(':').map(Number);
            const period = hours >= 12 ? 'PM' : 'AM';
          
            let hours12 = hours % 12;
            hours12 = hours12 === 0 ? 12 : hours12; 
          
            return `${hours12}:${minutes}${seconds} ${period}`;
          }
          
          const time24 = jobdata1;
          const time12 = convertTo12HourFormat(time24);

          const secondtime24 = jobdata2;
          const secondtime12 = convertTo12HourFormat(secondtime24);
          
          setFormattedTime1(time12)
          setFormattedTime2(secondtime12)

    },[jobdata1])
    

    
    useEffect(() =>{
        console.log(seconds)
        if(seconds == 2){

            window.location.reload()

        }
    },[seconds])

    useEffect(() => {

       try{


            
            setBirthDate(companydetails.birthdate)
            setGender(companydetails.gender)
            setAddressline(companydetails.addressline)
            setCity(companydetails.city)
            setState(companydetails.state)
            setPostal(companydetails.postal)
            setJobTitle(companydetails.jobtitle)
            setStartDate(companydetails.startdate)
            setDepartment(companydetails.department)
            setTeam(companydetails.team)
            
            

              
       }catch(error){

            console.log(error)
       }
        
    },[])
    
    useEffect(() => {

        try{

            setJobData1(jobscheddata.starts_at)
            setJobData2(jobscheddata.ends_at)
            setJobData3(jobscheddata.restday1)
            setJobData4(jobscheddata.restday2)
            

        }catch(error){
            
            console.log(error)
        }

    },[])
   
    const showToastMessage = () => {

        toast.info("Saving changes", {
            position: toast.POSITION.TOP_RIGHT,
        })

    };
    
    // useEffect(() => {

    //    try{

    //         router.post('/getjobscheddata',{primaryid})

    //    }catch(error){

    //         console.log(error)
    //    }

    // },[])

    const handleAddUserCompanyDetails = async () => {

        setInputErrors('')
       
        
              try{
                 
                 await axios.post('/addusercompanydetails',

                        {
                                        primaryid,
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

   const showJobSchedModal = () => {


        setShowModalForJobSched(true)

   }

   const handleCloseWorkSchedModal = () => {

        setShowModalForJobSched(false)

   }

   const handleAddWorkSched = async () => {


       try {

        await axios.post('/addjobsched',{primaryid,startTime,endTime,restDay1,restDay2}).then(() =>{


        showToastMessage();
                       
           setInterval(() => {
                               
                setSeconds(seconds => seconds + 1);
                            
            }, 1000);
            setShowModalForJobSched(false)

        })

       }catch(error){

            setInputErrors(error.response.data.errors)

       }
   }


    return (
        
        
        <>  
            <Modal
                    show={showModalForJobSched}
                    onHide={handleCloseWorkSchedModal}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                            Set Work Schedule
                    </Modal.Header>
                    <Modal.Body style={{fontSize: "14px"}} className="p-5">
                            
                        <div class="mb-3">
                            <label class="form-label">Shift Start Time</label>
                            <div class="input-group">
                               
                                <input type="time" onChange={(e) => setStartTime(e.target.value)} className={inputErrors['startTime'] ? "form-control border-danger" : "form-control"}  aria-describedby="basic-addon3 basic-addon4"/>
                            </div>
                            <div class="form-text text-danger" id="basic-addon4">{inputErrors['startTime']}</div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">End of Shift Time</label>
                            <div class="input-group">
                               
                                <input type="time" onChange={(e) => setEndTime(e.target.value)}  className={inputErrors['endTime'] ? "form-control border-danger" : "form-control"}  aria-describedby="basic-addon3 basic-addon4"/>
                            </div>
                            <div class="form-text text-danger" id="basic-addon4">{inputErrors['endTime']}</div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Rest Day 1</label>
                            <div class="input-group">
                               
                                <select onChange={(e) => setRestDay1(e.target.value)} class="form-select" aria-label="Default select example">
                                    <option selected>Select Day</option>
                                    <option value="1">Sunday</option>
                                    <option value="2">Monday</option>
                                    <option value="3">Tuesday</option>
                                    <option value="4">Wednesday</option>
                                    <option value="5">Thursday</option>
                                    <option value="6">Friday</option>
                                    <option value="0">Saturday</option>
                                </select>
                            </div>
                            <div class="form-text" id="basic-addon4"></div>
                        </div>  
                        <div class="mb-3">
                            <label class="form-label">Rest Day 2</label>
                            <div class="input-group">
                               
                                <select class="form-select" onChange={(e) => setRestDay2(e.target.value)}  aria-label="Default select example">
                                    <option selected>Select Day</option>
                                    <option value="1">Sunday</option>
                                    <option value="2">Monday</option>
                                    <option value="3">Tuesday</option>
                                    <option value="4">Wednesday</option>
                                    <option value="5">Thursday</option>
                                    <option value="6">Friday</option>
                                    <option value="0">Saturday</option>
                                </select>
                            </div>
                            <div class="form-text" id="basic-addon4"></div>
                        </div>  
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="dark rounded-1" style={{fontSize: "14px"}} onClick={handleAddWorkSched}>
                            save
                        </Button>
                   
                    </Modal.Footer>
            </Modal>
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
                                    <button className="btn btn-outline-primary border-0 float-end" onClick={showJobSchedModal}><i className="fa-solid fa-gear"></i> Configure</button>
                                        <h6 className="mb-4 text-muted mt-5" >Current Job Schedule</h6>
                                        <div className="table-responsive ">
                                            <table className="table shadow-sm " >
                                            
                                                    <thead >
                                                        <tr >
                                                        
                                                        
                                                            <th scope="col" className="bg-info text-white fw-medium text-center" style={{fontSize: "15px"}}>Shift Start</th>
                                                            <th scope="col" className="bg-info text-white fw-medium text-center" style={{fontSize: "15px"}}>End Of Shift </th>
                                                            <th scope="col" className="bg-info text-white fw-medium text-center" style={{fontSize: "15px"}}>Rest Day 1</th>
                                                            <th scope="col" className="bg-info text-white fw-medium text-center" style={{fontSize: "15px"}}>Rest Day 2</th>
                                                        
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                        <tr >
                                                          
                                                            <td className="text-muted text-center" style={{fontSize: "14px"}}>{jobdata1 ? formattedTime1 : 'none'}</td>
                                                            <td className="text-muted text-center" style={{fontSize: "14px"}}>{jobdata2 ? formattedTime2 : 'none'}</td>
                                                            <td className="text-muted text-center" style={{fontSize: "14px"}}>{jobdata3 ? day[jobdata3] : 'none'}</td>
                                                            <td className="text-muted text-center" style={{fontSize: "14px"}}>{jobdata4 ? day[jobdata4] : 'none'}</td>
                                                            
                                                            
                                                        </tr>
                                            
                                                    
                                                    </tbody>
                                            </table>
                                  
                                        </div>
                                       
                                       <UserCalendar firstrestday={jobdata3} secondrestday={jobdata4}></UserCalendar>
                                        
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