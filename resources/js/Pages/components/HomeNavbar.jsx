import React from "react";



function HomeNavbar(){

    return (

        <>

            <nav className="navbar navbar-expand-lg navbar-light py-4 bg-white">
                <div className="container">
                    <a className="navbar-brand fs-2 text-danger fw-bold" href="#">
                  
                         Osiris

                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav_lc" aria-controls="nav_lc" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="nav_lc">
                        
                       
                        <div className="ms-lg-auto"><a className="btn btn-outline-dark border-0 rounded-1 me-2 " href="#">Log In</a><a className="btn  btn-outline-dark border-0 rounded-1" href="#">Register</a></div>
                    </div>
                </div>
            </nav>
           
           
        </>

    );

}

export default HomeNavbar;