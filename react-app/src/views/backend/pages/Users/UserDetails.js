import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';

import axios from "axios";
import { API_BASE_URL } from '../../../../config/config'

const BackendUserDetails = ( ) => {
    
    const { id } = useParams();

    // const [pageInfo, setPageInfo] = useState({
    //     userInfo: {}
    // })

    // User = pageInfo : for on page use
    


    const [userInfo, setUserInfo] = useState({
        username: '',
        email: '',
        contact_number: '',
        location: '',
    })
    


    const getUserInfo = ( _id ) => {
        axios.get(`${API_BASE_URL}/users/${ _id }`).then( res=> {

            setUserInfo( res.data );
            console.log("userInfo", userInfo)

        }).catch(err=>{
            console.log("Err", err )
        })
    }





    let updateInput = ( { target: { name, value } } ) => {
        setUserInfo({
            ...userInfo,
            [name]: value
        })
        
        console.log( [name], value )
        console.log( userInfo )
    }


    
    const updateUserInfo = ( _id ) => {

        axios.patch(`${API_BASE_URL}/users/${ _id }`, userInfo ).then(res=>{
            console.log( "Updated!", userInfo )
        }).catch( err=> {
            console.log("Err", err )
        })

    }

    const onSubmitUserInfo = (e) => {
        e.preventDefault()
        updateUserInfo( id )
    }
    

    useEffect(() => {
        getUserInfo( id )
    }, [id]);




    const user  = userInfo;

    return (
        <div>
            
            <div className="row">
                <div className="col-md-12">
                    <Link to="/dashboard/users" className="btn btn-default"> Back </Link>
                </div>
            </div>

            {/* <div className="row">

                <div className="card col-md-3">
                    <div className="card-img-top">
                        <img src={user.image} title={user.image} />
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{user.username}</h5> 
                        Email: {user.email}
                    </div>
                </div>
            </div> */}





        <h4>Edit</h4>
            <div className="col-md-6">
                <form onSubmit={onSubmitUserInfo}> 
                    <div className="form-group">
                        <label>Image</label>
                        <input 
                            className="form-control"
                            type="file" name="image" />
                    </div>
                    <div className="form-group">
                        <label>Username</label>
                        <input 
                            className="form-control"
                            type="text"
                            name="username"
                            value={user.username}
                            disabled />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input 
                            className="form-control"
                            type="email"
                            name="email"
                            value={user.email}
                            onKeyUp={updateInput}
                            />
                    </div>
                    <div className="form-group">
                        <label>Contact Number</label>
                        <input 
                            className="form-control"
                            type="text"
                            name="contact_number"
                            value={user.contact_number}
                            onKeyUp={updateInput}
                            />
                    </div>
                    <div className="form-group">
                        <label>Location</label>
                        <input 
                            className="form-control"
                            type="text"
                            name="location"
                            value={user.location}
                            onKeyUp={updateInput}
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