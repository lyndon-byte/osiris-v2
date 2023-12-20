import React from "react";
import { Link } from "@inertiajs/react";
import DashboardNavbar from "./components/DashBoardNavbar";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';





export default function Dashboard(){

    return (
        
        <>
          <DashboardNavbar></DashboardNavbar>
            <div className="container">
                <div className="row">
                    <div className="col mt-5">
                        <h4>Dashboard</h4>
                    </div>
                </div>
           </div>
        </>

    );

}