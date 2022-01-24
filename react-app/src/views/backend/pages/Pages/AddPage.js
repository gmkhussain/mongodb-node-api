import React, { useState } from "react";

import axios from "axios";
import { API_BASE_URL } from '../../../../config/config'


const BackendAddPage = () => {

    const [pageInfo, setPageInfo] = useState({
        data: {}
    })

    const updateProfile = () => {

        axios.post(`${API_BASE_URL}/users`, pageInfo ).then(res=>{

        }).catch( err=> {
            console.log("Err", err )
        })

    }



    return (
        <div>
            <div className="col-md-6">
                <form onSubmit={updateProfile}> 
                    <div className="form-group">
                        <label>Title</label>
                        <input 
                            className="form-control"
                            type="text" name="title" />
                    </div>
                    <div className="form-group">
                        <label>Content</label>
                        <input 
                            className="form-control"
                            type="text" name="content" />
                    </div>

                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    )
    
}

export default BackendAddPage;