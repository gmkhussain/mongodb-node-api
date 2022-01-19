import React, { useState } from 'react'

import axios from 'axios'
import { Redirect, useHistory } from "react-router-dom";

import { API_BASE_URL } from '../../../config/config'

const Login = () => {

        const history = useHistory();

        const [loginInfo, setLoginInfo] = useState({
            username: 'abc',
            password: '123',
            loggedIn: false,
            token: null,
            loginMsg: ''
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
                        loginMsg: ''
                    })

                    history.push('/dashboard')

                }
            ).catch( err => {
                    // Incase failed
                    console.log( "Err", err )
                    setLoginInfo({
                        loginMsg: 'Please login with correct credentials'
                    })
                }
            )
        }


        const { username, password, loggedIn, loginMsg } = loginInfo

        return (
            <section className="login-page">
               <div className="container">
                  

                    <div className="login-form col-md-4 offset-md-4">
                        
                        <h4>
                           Login
                        </h4>

                        <form onSubmit={ onSubmitForm }>

                            <div className="mb-3">
                                <label className="form-label">Username <mark>{ username }</mark></label>
                                <input  name="username"
                                        type="text"
                                        className="form-control"
                                        defaultValue={username}
                                        onKeyUp={e => setLoginInfo({ ...loginInfo, username: e.target.value})}
                                        />
                                <div className="form-text">We'll never share your email with anyone else.</div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Password <mark>{ password }</mark></label>
                                <input
                                        name="password"
                                        type="password"
                                        className="form-control"
                                        autoComplete="true"
                                        defaultValue={password}
                                        onKeyUp={e => setLoginInfo({ ...loginInfo, password: e.target.value})}
                                        />
                            </div>

                            <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" id="RemeberMe" />
                                <label className="form-check-label" forhtml="RemeberMe">Remember Me</label>
                            </div>

                            <button type="submit" className="btn btn-primary">Login</button>
                            
                            {
                                loginMsg? <div class="alert alert-danger">{loginMsg}</div> : " "
                            }
                            

                        </form>
                        
                    </div>

                    { localStorage.getItem('token') }
                   
               </div>
            </section>
          )
}

export default Login