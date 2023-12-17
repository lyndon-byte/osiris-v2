import React from "react";
import '/resources/css/spinner.css'

export default function Loader(){

    return (

        <>

            <div className="container" style={{marginTop: 370 + "px"}}>
                <div className="row d-flex ">
                    <div className="col-lg-4 col-sm-12 m-auto ">
                        <img src="https://i.ibb.co/nm162TF/osirislogo2.png" className="rounded mx-auto d-block" id="spinnerlogo" alt="" width="20%" />
                    </div>
                </div>
            </div>
        
        </>

    );

}