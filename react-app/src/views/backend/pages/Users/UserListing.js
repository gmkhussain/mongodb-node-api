import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'

import { API_BASE_URL } from '../../../../config/config'


import BackendAddUser from './AddUser'


const BackendUsersListing = () => {

    const [ usersData, setUsersData] = useState( {
        users: []
    })


    const getUser = () => {
        axios.get(`${API_BASE_URL}/users`).then(res=>{
            console.log("Res", res )

            setUsersData( {
                users: res.data
            } )

        }).catch( err =>{
            console.log("Err", err )
        }
       )
    }


    useEffect( ()=> {
        getUser()
    }, [])


    const { users } = usersData;

        return (
            <section className="dashboard-page">
               <div className="container">

                    <p>Users</p>

                    
                    <Link to="/add-user">Add User (Page)</Link>
                    <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#addUserPanel" aria-controls="offcanvasRight">Add User</button>

                    <div className="offcanvas offcanvas-end" tabIndex="-1" id="addUserPanel">
                        <div className="offcanvas-header">
                            <h5>Offcanvas right</h5>
                            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <BackendAddUser />
                        </div>
                    </div>


                   


                    <table className="table">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            { users.map( (user)=> (
                                <tr key={user._id}>
                                    <td>
                                        <Link to={`users/${user._id}`}>
                                            <i className="img" style={{
                                                border: '1px solid #000',
                                                display: 'inline-block',
                                                borderRadius: '50px',
                                                width: '32px',
                                                height: '32px',
                                                marginRight: '10px',
                                                overflow: 'hidden'
                                            }}>
                                                { user.image }
                                            </i>
                                            <span>{ user.username }</span>
                                        </Link> 
                                    </td>
                                    <td> { user.email } </td>
                                </tr>
                            )) }
                        </tbody>
                    </table>
               </div>
            </section>
          )
}

export default BackendUsersListing