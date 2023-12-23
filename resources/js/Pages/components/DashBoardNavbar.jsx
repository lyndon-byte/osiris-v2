
import React from "react";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from "axios";


export default function DashboardNavbar(props){

    const handleLogout = async () => {


            await axios.post('/signout').then(() => {

                window.location.href = '/userlogin';

            });


    }

    return (
        
        <>
            <nav className="navbar navbar-expand-lg navbar-light py-4 bg-white">
                <div className="container-fluid">
                   
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav_lc" aria-controls="nav_lc" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="nav_lc">
                    
                       
                        <div className="ms-lg-auto">
                        <DropdownButton drop="down-centered" variant="btn btn-outline-dark border-0" id="dropdown-item-button" title={props.name}>

                            
                            <Dropdown.Item as="button"><i class="fa-regular fa-user"></i> &nbsp; Profile</Dropdown.Item>
                            <Dropdown.Item as="button" onClick={handleLogout}><i class="fa-solid fa-arrow-right-from-bracket"></i>  &nbsp; Logout</Dropdown.Item>
                            
                        </DropdownButton>
                        </div>
                    </div>
                </div>
            </nav>
        </>

    );

}




