import React from "react";
import { Link, Head, usePage } from "@inertiajs/react";
import { useState,useEffect } from "react";
import DashboardNavbar from "./components/DashBoardNavbar";






export default function Dashboard(){

    const userinfo = usePage().props.userinfo;

    const [formattedDate, setFormattedDate] = useState('');

        useEffect(() => {
        
            const formatDate = () => {
            const currentDate = new Date();
            const monthNames = [
                "January", "February", "March",
                "April", "May", "June", "July",
                "August", "September", "October",
                "November", "December"
            ];

            const month = monthNames[currentDate.getMonth()];
            const year = currentDate.getFullYear();
            const day = currentDate.getDate();

           
            const formattedDate = `${month} ${day}, ${year}`;
            
          
            setFormattedDate(formattedDate);
            };

            
            formatDate();
        }, []);



    return (
        
        <>
            <DashboardNavbar></DashboardNavbar>
            
            <div className="container mt-5">
                <div className="alert alert-primary p-5 fs-4 mt-5" data-bs-theme="dark" role="alert">
                        Good Day {userinfo.firstname} 😀
                        <span className="float-end text-white fs-5">{formattedDate}</span>
                </div>
                <div className="row">
                    <div className="col-lg-4 col-sm-12 mt-5">
                        <div class="card w-100 mb-3 border-0 shadow-sm">
                            <div class="card-body p-4">
                                <h5 class="card-title">Active Users</h5>
                                <h3 class="card-title mt-4 mb-4 text-success">10</h3>
                                <a href="/users" class="btn btn-primary rounded-1 w-100">See</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-12 mt-5">
                        <div class="card w-100 mb-3 border-0 shadow-sm">
                            <div class="card-body p-4">
                                <h5 class="card-title">Logged in Users</h5>
                                <h3 class="card-title mt-4 mb-4 text-success">10</h3>
                                <a href="/users" class="btn btn-primary rounded-1 w-100">See</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-12 mt-5">
                        <div class="card w-100 mb-3 border-0 shadow-sm">
                            <div class="card-body p-4">
                                <h5 class="card-title">Active Time Off Request</h5>
                                <h3 class="card-title mt-4 mb-4 text-success">10</h3>
                                <a href="/users" class="btn btn-primary rounded-1 w-100">See</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 mt-5">
                        <div class="card w-100 mb-3 border-0">
                            <div class="card-body p-4 bg-danger rounded-1">
                                <h5 class="card-title text-white">Absents For this Month</h5>
                                <h3 class="card-title mt-4 mb-4 text-white">10</h3>
                                <a href="/users" class="btn btn-dark rounded-1 w-25 float-end">See</a>
                            </div>
                        </div>
                    </div>
                </div>
           </div>
        </>

    );

}