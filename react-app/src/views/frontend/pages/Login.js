import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { Redirect } from "react-router-dom";

import { API_BASE_URL } from '../../../config/config'

const Login = () => {

    
        const [loginInfo, setLoginInfo] = useState({
            username: null,
            loggedIn: false,
            token: null
        })


        // On form submit 
        const onSubmitForm = (event) => {
            event.preventDefault()

            console.log(  loginInfo ) 
            loginRequest( loginInfo ) // Request to Login API

        }

        

        const loginRequest =( _loginInfo )=> {
             
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


        const { username, loggedIn } = loginInfo

        return (
            <section className="login-page">
               <div className="container">
                  
                   <p>Login</p>
                   
                   { loggedIn ? <Redirect to="/home" /> : "Please login"}
                   
                    <form onSubmit={ onSubmitForm }>
                        
                        <label>Username <mark>{ username }</mark></label>
                        <input  name="username" type="text"
                                onKeyUp={e => setLoginInfo({ username: e.target.value})} />
                        
                        <button type="submit">loginRequest</button>
                    </form>

                    { localStorage.getItem('token') }
                   
               </div>
            </section>
          )
}

export default Login