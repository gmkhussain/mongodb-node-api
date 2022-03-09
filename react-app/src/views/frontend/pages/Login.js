import React, { useState } from 'react'

import axios from 'axios'
import { useHistory } from "react-router-dom";

const Login = () => {

        // const { setMyContext } = useContext("NEW LOGIN");
        // const { myContext } = useContext(StateContext)
        // console.log( myContext )

        const history = useHistory();

        const [loginInfo, setLoginInfo] = useState({
            username: '',
            password: '',
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
             
            axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, _loginInfo ).then( res => {

                    // Show data
                    console.log( "Res", res )

                    // Set values
                    localStorage.setItem('token', res.data.accessToken )
                    setLoginInfo({
                        token: localStorage.getItem('token'),
                        loggedIn: true,
                        loginMsg: ''
                    })

                    history.push('/dashboard/pages')

                }
            ).catch( err => {
                    // Incase failed
                    console.log( "Err", err )
                    setLoginInfo({
                        ...loginInfo,
                        loginMsg: 'Please login with correct credentials'
                    })
                }
            )
        }


        const { username, password, loginMsg } = loginInfo

        // const _token = localStorage.getItem('token');

        return (
            <section className="login-page">
               <div className="container">
                  
                   <div className="row">

                    <div className="login-form col-md-4 offset-md-4">
                        <h4>
                           Login
                        </h4>

                        <form onSubmit={ onSubmitForm }>

                            <div className="mb-3">
                                <label className="form-label">Username</label>
                                <input  name="username"
                                        type="text"
                                        className="form-control"
                                        defaultValue={username}
                                        onKeyUp={e => setLoginInfo({ ...loginInfo, username: e.target.value})}
                                        />
                                {/* <div className="form-text">We'll never share your email with anyone else.</div> */}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input
                                        name="password"
                                        type="password"
                                        className="form-control"
                                        autoComplete="true"
                                        defaultValue={password}
                                        onKeyUp={e => setLoginInfo({ ...loginInfo, password: e.target.value})}
                                        />
                            </div>

                            {/* <div className="mb-3 form-check">
                                <input type="checkbox" className="form-check-input" id="RemeberMe" />
                                <label className="form-check-label" forhtml="RemeberMe">Remember Me</label>
                            </div> */}

                            <button type="submit" className="btn btn-primary">Login</button>
                            
                            {
                                loginMsg? <div className="alert alert-danger mt-4">{loginMsg}</div> : " "
                            }

                        </form>
                        
                    </div>
 
                    {/* { 
                        _token ? history.push('/dashboard') : "Please login"
                    } */}

                  </div>
                   
               </div>
            </section>
          )
}

export default Login