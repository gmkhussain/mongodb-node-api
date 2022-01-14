import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';

import axios from "axios";
import { API_BASE_URL } from '../../../../config/config'

const BackendUserDetails = ( ) => {
    
    const { id } = useParams();

    const [pageInfo, setPageInfo] = useState({
        userInfo: {}
    })

    const getUser = ( id ) => {
        axios.get(`${API_BASE_URL}/users/${id}`).then( res=> {
            
            setPageInfo( res.data );
            console.log("pageInfo", pageInfo)

        }).catch(err=>{
            console.log("Err", err )
        })
    }

    useEffect(() => {
        getUser( id )
    }, [id]);



    const user  = pageInfo;

    return (
        <div>
            
            <div className="row">
                <div className="col-md-12">
                    <Link to="/dashboard/users" class="btn btn-default"> Back </Link>
                </div>
            </div>

            <div className="row">

                <div className="card col-md-3">
                    <div className="card-img-top">
                        <img src={user.image} title={user.image} />
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{user.username}</h5> 
                        Email: {user.email}

                        Email: {user.email}
                    </div>
                </div>
            </div>
        </div>
    )
    
}

export default BackendUserDetails;