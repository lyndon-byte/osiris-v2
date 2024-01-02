import React from "react";
import { Link, Head } from "@inertiajs/react";
import DashboardNavbar from "./components/DashBoardNavbar";






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