import React, { useState } from "react";
import axios from "axios";

import { API_BASE_URL } from '../../../config/config'


const SignUp = () => {

    // const today = new Date('05 October 2011 14:48 UTC');

    const [signupInfo, setSingupInfo] = useState({
        username: "_",
        email: "@",
        password: "",
        contact_number: "#",
        email_verfiy: "",
        image: "",
        location: "",
        // created_at: today.toISOString(), // Dates Handled on API Side
        // updated_at: today.toISOString(),
        status: '0'
    })




    const updateInput = ( { target: { name, value } } ) => {
        setSingupInfo({
            ...signupInfo,
            [name]: value
        })
    }








    const onSignupSubmit = ( e ) => {
        
        e.preventDefault()

        axios.post(`${API_BASE_URL}/users/signup`, signupInfo).then( res=> {
            console.log("Res", res )
        }).catch( err=> {
            console.log("Err", err )
        })

    }


    const userInfo = signupInfo;

    return (
        <section className="signup-page">
            <div className="container">
                <div className="row">
                    
                    <div className="col-md-4 offset-md-4 signup-form">
                        
                        <form onSubmit={onSignupSubmit} >
                            
                            <h4>Signup</h4>
                            
                            <div className="form-group">
                                <label>Username</label>
                                <input
                                        className="form-control"
                                        type="text"
                                        name="username"
                                        value={userInfo.username}
                                        onChange={updateInput}
                                        />
                            </div>

                             <div className="form-group">
                                <label>Password</label>
                                <input  className="form-control"
                                        type="password"
                                        name="password"
                                        value={userInfo.password}
                                        onChange={updateInput}
                                        />
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input  className="form-control"
                                        type="text"
                                        name="email"
                                        value={userInfo.email}
                                        onChange={updateInput}
                                        />
                            </div>

                            <div className="form-group">
                                <label>Contact Number</label>
                                <input  className="form-control"
                                        type="text"
                                        name="contact_number"
                                        value={userInfo.contact_number}
                                        onChange={updateInput}
                                        />
                            </div>

                            <div className="form-group">
                                <label>Image</label>
                                <input  className="form-control"
                                        type="file"
                                        name="image"
                                        value=''
                                        onChange={updateInput}
                                        />
                            </div>

                            <div className="form-group my-4">
                                <button className="btn btn-primary" type="submit">Sign Up!</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignUp;