import React from "react";
import { Link, Head } from "@inertiajs/react";
import DashboardNavbar from "./components/DashBoardNavbar";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';





export default function Dashboard(status){

    return (
        
        <>
         <Head>
                <title>Dashboard</title>
         </Head>
          <DashboardNavbar name={status.auth.user.firstname + " " + status.auth.user.lastname}></DashboardNavbar>
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