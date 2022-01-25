import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'

import axios from 'axios'

import { API_BASE_URL } from '../../../../config/config'


const BackendPageListing = () => {

    
    const [ pageInfo, setPageInfo ] = useState({
        pages: [],
        loading: false
    })


    const [ paginateInfo, setPagenateInfo] = useState( {
        page_size: 2,
        current_page: 0,
        total_pages: null
    })

    const getPageLists = ( paginate ) => {
        axios.get(`${API_BASE_URL}/pages?pageSize${paginate.page_size}&page=${paginate.current_page}`).then( res=> {
           
           setPageInfo({ ...pageInfo, pages: res.data })
           console.log(res.headers)
           setPagenateInfo({ ...paginateInfo, total_pages: res.headers.total_pages=='Infinity' ? 0 : res.headers.total_pages })
           
        }).catch( err=> {
            console.log("Err", err )
        })
    }


    useEffect(()=>{
        getPageLists(paginateInfo)
    }, [])


    

    const { pages } = pageInfo;
    const { total_pages } = paginateInfo;


    const pagiNav = [];

    // for( let i = 0; i = 1; i++ ) {
    //     console.log( i )
    //     pagiNav.push(i+1)
    // }

        return (
            <section className="dashboard-page">
                <div className="container">
                    {paginateInfo.total_pages}
                    {/* {
                        pagiNav.map( pagi => ( 
                            <div>
                             [p]
                            </div>
                        ) )
                    } */}

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
                        ))}
                        </tbody>
                    </table>

                </div>
            </section>
        )
}

export default BackendPageListing