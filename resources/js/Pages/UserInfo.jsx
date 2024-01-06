import React from "react";
import { usePage , useForm  } from "@inertiajs/react";
import { useEffect, useState } from "react";
import DashboardNavbar from "./components/DashBoardNavbar";
import UserCalendar from './components/UserCalendar';

export default function UserInfo(){

    const selectedUserId = usePage().props.userid

    const [auth,setAuth] = useState(true)

     useEffect(() => {

        console.log(selectedUserId)
        if(selectedUserId == null){

            setAuth(false)
        }
    
    },[])

    return (
        
        
        <>
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
                        <h5 className="mt-2 text-muted">{selectedUserId}</h5>
                        

                </div>
                </div>
                <div className="row ">
                    <div className="col-lg-4 mt-5 rounded-2 bg-white p-5 overflow-y-scroll" style={{maxHeight: "900px" }}>
                        <h5 className="mb-5 mt-3 text-muted">Personal Info</h5>
                        <div className="mb-3 mt-3">
                            <label className="form-label">First Name</label>
                            <div className="input-group">
                                <input type="text" className="form-control rounded-1" aria-describedby="basic-addon3 basic-addon4"/>
                            </div>
                                <div className="form-text" id="basic-addon4"></div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Last Name</label>
                            <div className="input-group">
                                <input type="text" className="form-control rounded-1" aria-describedby="basic-addon3 basic-addon4"/>
                            </div>
                                <div className="form-text" id="basic-addon4"></div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Contact Number</label>
                            <div className="input-group">
                                <input type="text" className="form-control rounded-1" aria-describedby="basic-addon3 basic-addon4"/>
                            </div>
                                <div className="form-text" id="basic-addon4"></div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <div className="input-group">
                                <input type="text" className="form-control rounded-1" aria-describedby="basic-addon3 basic-addon4"/>
                            </div>
                                <div className="form-text" id="basic-addon4"></div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Birth Date</label>
                            <div className="input-group">
                                <input type="date" className="form-control rounded-1" aria-describedby="basic-addon3 basic-addon4"/>
                            </div>
                                <div className="form-text" id="basic-addon4"></div>
                        </div>
                        <div className="mb-3">
                            
                            <div className="input-group mt-4">
                                <select className="form-select rounded-1" aria-label="Default select example">
                                    <option selected>Gender</option>
                                    <option value="1">Male</option>
                                    <option value="2">Female</option>
                                    <option value="3">Rather not say</option>
                                </select>
                            </div>
                                <div className="form-text" id="basic-addon4"></div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label mb-3 mt-3">Home Address</label>
                           
                                <div class="form-floating">
                                    <input type="text" className="form-control rounded-1" id="floatingPassword" placeholder="Password"/>
                                    <label className="text-muted">Address Line 1</label>
                                </div>
                            
                            <div className="form-text" id="basic-addon4"></div>
                        </div>
                        <div className="mb-3">
                                <div class="form-floating">
                                    <input type="text" className="form-control rounded-1" id="floatingPassword" placeholder="Password"/>
                                    <label className="text-muted">Address Line 2</label>
                                </div>
                            
                            <div className="form-text" id="basic-addon4"></div>
                        </div>
                        <div className="mb-3">
                                <div class="form-floating">
                                    <input type="text" className="form-control rounded-1" id="floatingPassword" placeholder="Password"/>
                                    <label className="text-muted">City</label>
                                </div>
                            
                            <div className="form-text" id="basic-addon4"></div>
                        </div>
                        <div className="mb-3">
                                <div class="form-floating">
                                    <input type="text" className="form-control rounded-1" id="floatingPassword" placeholder="Password"/>
                                    <label className="text-muted">State/Province</label>
                                </div>
                            
                            <div className="form-text" id="basic-addon4"></div>
                        </div>
                        <div className="mb-3">
                            
                           
                                <div class="form-floating">
                                    <input type="text" value="Philippines" disabled className="form-control rounded-1" id="floatingPassword" placeholder="Password"/>
                                    <label className="text-muted">Country</label>
                                </div>
                            
                            <div className="form-text" id="basic-addon4"></div>
                        </div>
                        <h5 className="mb-5 mt-5 text-muted">Job Details</h5>
                        <div className="mb-3">
                                <div class="form-floating">
                                    <input type="text" value="cc id" disabled className="form-control rounded-1" id="floatingPassword" placeholder="Password"/>
                                    <label className="text-muted">Company ID</label>
                                </div>
                            <div className="form-text" id="basic-addon4"></div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Job Title</label>
                            <div className="input-group">
                                <select className="form-select rounded-1" aria-label="Default select example">
                                    <option selected>Select Option</option>
                                    <option value="1">Office Staff</option>
                                    <option value="2">Machine operator</option>
                                    <option value="3">Safety Officer</option>
                                </select>
                            </div>
                            <div className="form-text" id="basic-addon4"></div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Start Date</label>
                            <div className="input-group">
                                <input type="date" className="form-control rounded-1" aria-describedby="basic-addon3 basic-addon4"/>
                            </div>
                                <div className="form-text" id="basic-addon4"></div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Department</label>
                            <div className="input-group">
                                <select className="form-select rounded-1" aria-label="Default select example">
                                    <option selected>Select Option</option>
                                    <option value="1">Accounting</option>
                                    <option value="2">Production</option>
                                    <option value="3">Marketing</option>
                                </select>
                            </div>
                            <div className="form-text" id="basic-addon4"></div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Team</label>
                            <div className="input-group">
                                <select className="form-select rounded-1" aria-label="Default select example">
                                    <option selected>Select Option</option>
                                    <option value="1">Team A</option>
                                    <option value="2">Team B</option>
                                    <option value="3">Team C</option>
                                </select>
                            </div>
                            <div className="form-text" id="basic-addon4"></div>
                        </div>
                        <button className="btn btn-dark rounded-1 mt-4 float-end">Save</button>
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