import React from "react";
import { Link } from "@inertiajs/react";


function HomeNavbar(){

    return (

        <>

            <nav className="navbar navbar-expand-lg navbar-light py-4 bg-white">
                <div className="container">
                    <Link className="navbar-brand fs-2 text-danger fw-bold" href="/">
                  
                         Osiris

                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav_lc" aria-controls="nav_lc" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="nav_lc">
                        
                       
                        <div className="ms-lg-auto"><Link className="btn btn-outline-dark border-0 rounded-1 me-2 " href="/userlogin">Log In</Link><Link className="btn  btn-outline-dark border-0 rounded-1" href="/register">Register</Link></div>
                    </div>
                </div>
            </nav>
           
           
        </>

    );

}

export default HomeNavbar;