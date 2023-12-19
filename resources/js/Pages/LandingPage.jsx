import React from "react";
import HomeNavbar from "./components/HomeNavbar";
import { Head,Link } from "@inertiajs/react";

export default function LandingPage(){

    return (
        
        <>
        <Head>
            <title>Home</title>
        </Head>
        <HomeNavbar></HomeNavbar>
           <div className="container">
                <div className="row">
                    <div className="col mt-5">
                        <h4>Landing Page</h4>
                    </div>
                </div>
           </div>
        </>

    );

}