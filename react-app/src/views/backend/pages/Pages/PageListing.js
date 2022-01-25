import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'

import axios from 'axios'

import { API_BASE_URL } from '../../../../config/config'


const BackendPageListing = () => {

    
    const [ pageInfo, setPageInfo ] = useState({
        pages: [],
        loading: false
    })


    const getPageLists = () => {
        axios.get(`${API_BASE_URL}/pages`).then( res=> {
           
           setPageInfo({ ...pageInfo, pages: res.data })

        }).catch( err=> {
            console.log("Err", err )
        })
    }


    useEffect(()=>{
        getPageLists()
    }, [])



    const { pages } = pageInfo;

        return (
            <section className="dashboard-page">
                <div className="container">

                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Content</th>
                            </tr>
                        </thead>
                        <tbody>
                        { pages.map( ( page, index )=>(
                            <tr key={index}>
                                <td>
                                    {page.title}
                                </td>
                                <td>
                                    {page.content}
                                </td>
                            </tr>
                            )
                            )}
                        </tbody>
                    </table>

                </div>
            </section>
        )
}

export default BackendPageListing