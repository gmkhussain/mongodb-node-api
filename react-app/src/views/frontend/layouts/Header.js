import React from 'react'

// import axios from 'axios'
// import { API_BASE_URL } from '../../../config/config'


const Home = () => {

      const logoutRequest =()=> {
         // axios.get(`${API_BASE_URL}/logout`)
         localStorage.removeItem('token')
      }

        return (
            <header>
               Header works
               <a href="/">Home</a> | 
               <a href="/singup">Signup</a> | 
               <a href="/login">Login</a> |
               <button onClick={logoutRequest}>Logout</button> | 
            </header>
          )
}

export default Home