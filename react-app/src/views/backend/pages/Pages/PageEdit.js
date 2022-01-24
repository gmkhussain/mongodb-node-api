import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';

import axios from "axios";
import { API_BASE_URL } from '../../../../config/config'

const BackendPageDetails = ( ) => {
    
    const { id } = useParams();
    
    const [pageInfo, setPageInfo] = useState({
        title: " ",
        content: " ",
    })
    


    const getPageInfo = ( _id ) => {
        axios.get(`${API_BASE_URL}/pages/${ _id }`).then( res=> {

            setPageInfo( res.data );
            console.log("pageInfo", pageInfo)

        }).catch(err=>{
            console.log("Err", err )
        })
    }




    let updateInput = ( { target: { name, value } } ) => {
        setPageInfo({
            ...pageInfo,
            [name]: value
        })
        
        console.log( [name], value )
        console.log( pageInfo )
    }

    

    
    const updatePageInfo = ( _id ) => {
        console.log("_id > ", _id)

        axios.patch(`${API_BASE_URL}/pages/${ _id }`, pageInfo ).then(res=>{
            console.log( "Updated!", pageInfo )
        }).catch( err=> {
            console.log("Err", err )
        })
    }



    const onSubmitUserInfo = (e) => {
        e.preventDefault()
        updatePageInfo( id )
    }
    

    useEffect(() => {
        getPageInfo( id )
    }, [id]);




    const { titl, content }  = pageInfo;

    return (
        <div>
            
            <div className="row">
                <div className="col-md-12">
                    <Link to="/dashboard/users" className="btn btn-default"> Back </Link>
                </div>
            </div>


            <h4>Edit</h4>
            <div className="col-md-6">
            
                <form onSubmit={onSubmitUserInfo}> 

                    <div className="form-group">
                        <label>Title</label>
                        <input 
                            className="form-control"
                            type="text"
                            name="title"
                            value={title}
                            onChange={updateInput}
                            />
                    </div>  
                    <div className="form-group">
                        <label>Content</label>
                        <input 
                            className="form-control"
                            type="text"
                            name="content"
                            value={content}
                            onChange={updateInput}
                            />
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary" type="submit">Save</button>
                    </div>

                </form>
            </div>

        </div>
    )
    
}

export default BackendUserDetails;