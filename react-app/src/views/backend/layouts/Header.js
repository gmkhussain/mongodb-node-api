import React from 'react'
import { Link } from 'react-router-dom'
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

               <nav className="navbar navbar-expand-lg navbar-light bg-light">
                  <div className="container-fluid">
                     
                     <Link to="#" className="navbar-brand">Navbar</Link>

                     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                     </button>

                     <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                           <li className="nav-item">
                              <Link to="/" className="nav-link">Home</Link>
                           </li>
                           <li className="nav-item">
                              <Link to="/signup" className="nav-link">Sign Up</Link>
                           </li>
                        </ul>

                        <ul className="navbar-nav my-auto mb-2 mb-lg-0">
                           <li className="nav-item">
                              {
                                 localStorage.getItem('token')
                              ?
                                 <button  onClick={logoutRequest}
                                          className="nav-link">Logout</button>
                              :
                                 <Link to="/login" className="nav-link">Login</Link>
                              }
                           </li>
                        </ul>

                     </div>
                  </div>
               </nav>
               
            </header>
          )
}

export default Home