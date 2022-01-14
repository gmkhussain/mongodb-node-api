import React, { useState } from 'react'

import axios from 'axios'
import { Redirect } from "react-router-dom";

import { API_BASE_URL } from '../../../config/config'

const Login = () => {

    
        const [loginInfo, setLoginInfo] = useState({
            username: null,
            password: null,
            loggedIn: false,
            token: null,
        })


        // On form submit 
        const onSubmitForm = (event) => {
            event.preventDefault()

            console.log(  loginInfo )

            loginRequest( loginInfo ) // Request to Login API

        }

        

        const loginRequest =( _loginInfo )=> {

            console.log( " _loginInfo ", _loginInfo )
             
            axios.post(`${API_BASE_URL}/auth/login`, _loginInfo ).then( res => {

                    // Show data
                    console.log( "Res", res )

                    // Set values
                    localStorage.setItem('token', res.data.accessToken )
                    setLoginInfo({
                        token: localStorage.getItem('token'),
                        loggedIn: true,
                    })

                }
            ).catch( err => {
                    // Incase failed
                    console.log( "Err", err )
                }
            )
        }


        const { username, password, loggedIn } = loginInfo

        return (
            <section className="login-page">
               <div className="container">
                  

                    <div className="login-form col-md-4 offset-md-4">
                        
                        <h4>
                            { loggedIn ? <Redirect to="/dashboard" /> : "login"}
                        </h4>

                        <form onSubmit={ onSubmitForm }>

                            <div class="mb-3">
                                <label className="form-label">Username <mark>{ username }</mark></label>
                                <input  name="username"
                                        type="text"
                                        className="form-control"
                                        onKeyUp={e => setLoginInfo({ ...loginInfo, username: e.target.value})}
                                        />
                                <div class="form-text">We'll never share your email with anyone else.</div>
                            </div>

                            <div class="mb-3">
                                <label className="form-label">Password <mark>{ password }</mark></label>
                                <input
                                        name="password"
                                        type="password"
                                        className="form-control"
                                        autoComplete="true"
                                        onKeyUp={e => setLoginInfo({ ...loginInfo, password: e.target.value})}
                                        />
                            </div>

                            <div class="mb-3 form-check">
                                <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                <label class="form-check-label" for="exampleCheck1">Check me out</label>
                            </div>

                            <button type="submit" class="btn btn-primary">Login</button>
                            
                        </form>
                        
                    </div>

                    { localStorage.getItem('token') }
                   
               </div>
            </section>
          )
}

export default Login