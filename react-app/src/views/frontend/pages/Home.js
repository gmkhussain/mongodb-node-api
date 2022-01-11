import React, { useEffect, useState } from 'react'

import axios from 'axios'

import { API_BASE_URL } from '../../../config/config'

const Home = () => {

   const [usersData, setUsersData] = useState({
      users: [],
      loading: false
   });

   const getUsers = () => {
      
      axios.get(`${API_BASE_URL}/users`).then( res=> {
         
         console.log("Res", res )
         setUsersData({ users: res.data, loading: false })

      }).catch( err=> {
         console.log("Err", err )
      })
   }


   // When loaded
   useEffect( ()=> {
      getUsers();
   }, [])



   const {  users } = usersData;

        return (
            <section className="home-page">
               <div className="container">
                  Home works
                  <table className="table" border="1">
                  <thead>
                     <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Contact Number</th>
                        <th>Location</th>
                        </tr>
                  </thead>
                  <tbody>
                        {
                           users.map( ( user )=> (
                              <tr className="user-box" key={user._id}>
                                 <td> { user._id } </td>
                                 <td> { user.username } </td>
                                 <td> { user.email } </td>
                                 <td> { user.contact_number } </td>
                                 <td> { user.location } </td>
                              </tr>
                           ))
                        }
                  </tbody>
                  </table>
               </div>
            </section>
          )
}

export default Home