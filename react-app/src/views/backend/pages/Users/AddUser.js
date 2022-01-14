import React, { useState } from "react";

import axios from "axios";
import { API_BASE_URL } from '../../../../config/config'


const BackendAddUser = () => {

    const [profileInfo, setProfileInfo] = useState({
        data: {}
    })

    const updateProfile = () => {

        axios.post(`${API_BASE_URL}/users`, profileInfo ).then(res=>{

        }).catch( err=> {
            console.log("Err", err )
        })

    }



    return (
        <div>
            <div className="col-md-6">
                <form onSubmit={updateProfile}> 
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
                            type="text" name="username" disabled />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input 
                            className="form-control"
                            type="email" name="email" />
                    </div>

                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    )
    
}

export default BackendAddUser;