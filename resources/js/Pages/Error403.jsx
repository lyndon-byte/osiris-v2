import {Link } from '@inertiajs/react';


export default function Error404(){

    return(

       <>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 m-auto d-flex justify-content-center mt-5">
                        <img src="https://static.thenounproject.com/png/957779-200.png"  alt="" srcset="" />
                        
                    </div>
                    <div className="col-lg-12">
                        <h5 className=" text-center mt-5 fw-bold">Error 403 | Forbidden</h5>
                         <p className="text-muted text-center">it looks like you didn't have authorization to visit this page</p>
                       
                    </div>
                    <div className="col-lg-12 d-flex justify-content-center">
                        <Link href='/' className="btn btn-danger rounded-1 mt-2">Go Home</Link>
                    </div>
                   
                </div>
            </div>
       </>
    );

}