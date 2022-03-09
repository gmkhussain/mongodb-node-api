import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'

// import { API_BASE_URL } from '../../../../config/config'

import BackendAddUser from './AddUser'


const BackendUsersListing = () => {

    const [ usersData, setUsersData] = useState( {
        users: []
    })

    const [ paginateInfo, setPagenateInfo] = useState( {
        page_size: 2,
        current_page: 0,
        total_pages: 0
    })


    const getUser = async ( paginate ) => {
        
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/users?pageSize=${paginate.page_size}&page=${paginate.current_page}`).then(res=>{
            
            setUsersData( { users: res.data } )
            setPagenateInfo( { ...paginateInfo, total_pages: res.headers.total_pages })

        }).catch( err =>{
            console.log("Err", err )
        }
       )
    }



    // intial paginate
    const gotoPageNumber = ( pn ) => {        
        setPagenateInfo( { ...paginateInfo, current_page: pn } )
        console.log("paginate", pn , paginateInfo)

        let goto = {...paginateInfo, current_page: pn };
        getUser( goto );        
    }


    useEffect( ()=> {
        getUser( paginateInfo )
    }, [])


    

    const { users } = usersData;
    const { total_pages } = paginateInfo;

    // Generating pagination Nav
    let pagiNav = [];
    for ( let i = 0; i < total_pages; i++) {
        pagiNav.push(<span> {i+1} </span>);
    }
    


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


                    <nav aria-label="Page navigation">
                        <ul className="pagination">
                          {
                            pagiNav.map( (p, idx) => ( 
                                <li 
                                    className={`page-item ${(paginateInfo.current_page === idx+1) ? "active" : " " }`}
                                    key={idx}>
                                    <button 
                                        className="page-link"
                                        onClick={ () => { gotoPageNumber( idx ) } }>
                                            {idx} 
                                    </button>
                                </li>
                            ) )
                          }
                        </ul>
                    </nav>
                    
               </div>
            </section>
          )
}

export default BackendUsersListing