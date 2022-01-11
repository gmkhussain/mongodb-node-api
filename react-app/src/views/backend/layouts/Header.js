import React from 'react'

// import axios from 'axios'
// import { API_BASE_URL } from '../../../config/config'


const Home = () => {

      const logoutRequest =()=> {
         // axios.get(`${API_BASE_URL}/logout`)
         localStorage.removeItem('token')
         window.location.reload(false);
      }

        return (
            <header>
               Header works
               <a href="/">Home</a> | 
               <a href="/singup">Signup</a> | 

               {
                  localStorage.getItem('token')
               ?
                  <button onClick={logoutRequest}>Logout</button>
               :
                  <a href="/login">Login</a>
               }
            </header>
          )
}

export default Home