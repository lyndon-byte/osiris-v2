import React from "react";
import { useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import DashboardNavbar from "./components/DashBoardNavbar";
import axios from "axios";
import { useEffect } from "react";
import {router, usePage} from '@inertiajs/react'


export default function User(users){

    const {specifyuser} = usePage().props

    const [activeUserCounter,setActiveUserCounter] = useState(0)
    const [searchString,setSearchString] = useState('');
    const [refreshSearch,setRefreshSearch] = useState(false)

    const [showModalForAddUser,setShowModalForAddUser] = useState(false);
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [contactNumber,setContactNumber] = useState('');
    const [email,setEmail] = useState('');
    const [inputError,setInputError] = useState('')
    const [showModalAddUserSuccess,setShowModalAddUserSuccess] = useState(false)
    const [showLoading,setShowLoading] = useState('hidden')
    const [usersInfo,setUsersInfo] = useState([])
    const [idForSelection,setIdForSelection] = useState(0)

    
    
    useEffect(() =>{

        console.log(idForSelection)

    },[idForSelection])


    useEffect(() =>{

        setUsersInfo(users.users)
        setActiveUserCounter(users.users.length)
    },[])

    useEffect(() => {
        

        if(specifyuser){

            setUsersInfo(specifyuser)
           
        }

    },[specifyuser])



    useEffect(() =>{

        if(searchString != ""){

            router.visit('/users', {
                data: {searchString},
                preserveState: true,
                only: ['specifyuser']
              })
        }

    },[searchString])


    const handleResetSearch = () => {

        setRefreshSearch(true);
        window.location.reload();
    }
 

    const handleClose = () => setShowModalForAddUser(false);

    const showAddUser = () => {

        setShowModalForAddUser(true)
    }

    const handleCloseShowModalAddUserSuccess = () => {

        setShowModalAddUserSuccess(false)
        window.location.reload()
    }


    const addUser = async () =>{

        setShowLoading('');

        try{

            await axios.post('/addminiuser',{firstName,lastName,contactNumber,email})
             .then(() =>{

                    setInputError('')
                    setShowLoading('hidden')
                    setShowModalForAddUser(false)
                    setShowModalAddUserSuccess(true)
             })

        }catch(error){

            setInputError(error.response.data.errors)
            setShowLoading('hidden')
        }
    }

    return (

        <>  
             <Modal
                    show={showModalAddUserSuccess}
                    onHide={handleCloseShowModalAddUserSuccess}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                   
                    </Modal.Header>
                    <Modal.Body style={{fontSize: "14px"}} className="text-center">
                            
                            User was successfully added 
                            
                            
                    
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="dark rounded-1" style={{fontSize: "14px"}} onClick={handleCloseShowModalAddUserSuccess}>
                            Understood
                        </Button>
                   
                    </Modal.Footer>
            </Modal>
            <Modal
                    show={showModalForAddUser}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                            Add user
                    </Modal.Header>
                    <Modal.Body style={{fontSize: "14px"}} className="p-5">
                    <h5 className="mb-4 text-muted">Basic Info</h5>
                        <form >
                            <div className="mb-3">
                                <label className="form-label">First Name</label> <Spinner animation="border" variant="primary" size="sm" style={{visibility: showLoading}}/>
                                <div className="input-group">
                                
                                    <input type="text" className={inputError['firstName'] ? "form-control border-danger" : "form-control"} onChange={(e) => {setFirstName(e.target.value)}} aria-describedby="basic-addon3 basic-addon4"/>
                                </div>
                                <div className="form-text text-danger" id="basic-addon4">{inputError['firstName']}</div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Last Name</label> <Spinner animation="border" variant="primary" size="sm" style={{visibility: showLoading}}/>
                                <div className="input-group">
                                
                                    <input type="text" className={inputError['lastName'] ? "form-control border-danger" : "form-control"} onChange={(e) => {setLastName(e.target.value)}} aria-describedby="basic-addon3 basic-addon4"/>
                                </div>
                                <div className="form-text text-danger" id="basic-addon4">{inputError['lastName']}</div>
                            </div>
                            <div className="mb-3 w-75">
                                <label className="form-label">Contact Number</label> <Spinner animation="border" variant="primary" size="sm" style={{visibility: showLoading}}/>
                                <div className="input-group">
                                <span  className={inputError['contactNumber'] ? "input-group-text border-danger" : "input-group-text"} id="basic-addon3">+63</span>

                                    <input type="number" className={inputError['contactNumber'] ? "form-control border-danger" : "form-control"}  onChange={(e) => {setContactNumber(e.target.value)}}  aria-describedby="basic-addon3 basic-addon4"/>
                                </div>
                                <div className="form-text text-danger" id="basic-addon4">{inputError['contactNumber']}</div>
                            </div>
                            <div className="mb-4">
                                <label className="form-label">Email Address</label> <Spinner animation="border" variant="primary" size="sm" style={{visibility: showLoading}}/>
                                <div className="input-group">
                            

                                    <input type="text" className={inputError['email'] ? "form-control border-danger" : "form-control"} onChange={(e) => {setEmail(e.target.value)}} aria-describedby="basic-addon3 basic-addon4"/>
                                </div>
                                <div className="form-text text-danger" id="basic-addon4">{inputError['email']}</div>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="dark rounded-1" type="submit" style={{fontSize: "14px"}} onClick={addUser}>
                        Submit
                    </Button>
                   
                    </Modal.Footer>
            </Modal>
          
           
           <DashboardNavbar></DashboardNavbar>
            <div className="container">
                <div className="row mt-5">
                    <div className="col-lg-12 col-sm-12 p-4  bg-white rounded-2">
                       
                        <button className="btn btn-primary rounded-5 float-end mt-2" onClick={showAddUser}><i className="fa-regular fa-plus"></i> Add User</button>
                        <h5 className="mt-3 text-muted">Active User: &nbsp;<span className="text-success fw-bold">{activeUserCounter}</span></h5>
                
                    </div>
                </div>
                
                <div className="row bg-white rounded-2 mt-5">
                    <div className="col-lg-3 mt-2 p-4">

                        <div className="d-flex">
                            
                            <div className="input-group">
                                
                                <span  className="input-group-text bg-white border-end-0 rounded-0"><i className="fa-solid fa-magnifying-glass"></i></span>
                                <input className="form-control me-2 border-start-0" onChange={(e) => {setSearchString(e.target.value)}} type="search" placeholder="Search" aria-label="Search"/>
                                <button className="btn btn-outline-primary border-0 rounded-5" onClick={handleResetSearch}><i class={refreshSearch ? "fa-solid fa-spinner " : "fa-solid fa-rotate-right"}></i></button>
                            </div>
                           
                        </div> 
                        <p className="mt-3">{specifyuser ? 'Search Result: ' + usersInfo.length : ""}</p>
                    </div>
                    
                    <div className="col-lg-9 mt-2 p-4">
                       
                            <Dropdown drop="down-start" className="float-end">
                                <Dropdown.Toggle variant="btn btn-outline-primary rounded-1" style={{fontSize: "16px"}} id="dropdown-basic">
                                <i className="fa-solid fa-filter"></i> Departments
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="text-center">
                                    <Dropdown.Item as="button">Accounting</Dropdown.Item>
                                    <Dropdown.Item as="button">Production</Dropdown.Item>
                                    <Dropdown.Item as="button">Marketing</Dropdown.Item>
                                    <Dropdown.Item as="button"><button className="btn btn-primary rounded-1" style={{fontSize: "14px"}}><i className="fa-solid fa-gear"></i> Configure</button></Dropdown.Item>

                                </Dropdown.Menu>
                            </Dropdown>
                    </div>
                    <div className="col-lg-12 col-sm-12">
                       
                        <Table responsive hover variant="bg-white mt-1" style={{fontSize: "14px"}}>
                                <thead>
                                    <tr>
                                    <th className="p-4">Employee ID</th>
                                    <th className="p-4"> First Name</th>
                                    <th className="p-4">Last Name</th>
                                    <th className="p-4">Email</th>
                                    <th className="p-4">Contact number</th>
                                    <th className="p-4 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody >
                                   
                                        {

                                            usersInfo.map((data) => (

                                               <tr>
                                                     <td className="p-4">{data.employee_id}</td>
                                                     <td className="p-4">{data.firstname}</td>
                                                     <td className="p-4">{data.lastname}</td>
                                                     <td className="p-4">{data.email}</td>
                                                     <td className="p-4">+63{data.contactnumber}</td>
                                                     <td className="text-center"><button className="btn btn-dark mt-2 rounded-1" onClick={() => {setIdForSelection(data.employee_id)}}><i className="fa-regular fa-eye"></i> </button></td>
                                               </tr>
                                            ))


                                        }
                                        
                                    

                                </tbody>
                               
                                       
                                    
                               
                        </Table>
                        <h2  className="text-center mt-5 text-muted"> <i className="fa-solid fa-people-group"></i></h2>
                        <h5 className="text-center mt-2 mb-3 text-muted">Get your team on board!</h5>
                        <div className="col-lg-12 d-flex ">
                            <button className="btn btn-primary rounded-5 m-auto mb-5" onClick={showAddUser}><i className="fa-regular fa-plus"></i> Add User</button>
                        </div>
                    </div>
                </div>
            </div>

        </>

    );


}