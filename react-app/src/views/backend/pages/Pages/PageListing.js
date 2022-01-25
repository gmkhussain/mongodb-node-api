import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

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

        axios.get( `${API_BASE_URL}/pages?pageSize=${paginate.page_size}&page=${paginate.current_page}` ).then( res=> {
           
           setPageInfo({ ...pageInfo, pages: res.data })
           console.log(res)
           setPagenateInfo({ ...paginateInfo, total_pages: res.headers.total_pages==='Infinity' ? 0 : res.headers.total_pages })
           
        }).catch( err=> {
            console.log("Err", err )
        })
    }


    useEffect(()=>{
        getPageLists(paginateInfo)
    }, [])



    const gotoNewPage = ( pn ) => {
        
        setPagenateInfo({
           ...paginateInfo,
           current_page: pn
        })

        console.log("pn", pn)
        console.log("paginateInfo", paginateInfo)

        let goto = {...paginateInfo, current_page: pn }; // to avoid SetState not updated

        getPageLists(goto)
    }

    

    const { pages } = pageInfo;
    const { total_pages } = paginateInfo;

    const pagiNav = [];

    for( let i = 0; i < total_pages; i++ ) {
        console.log( pagiNav )
        pagiNav.push(i)
    }

        return (
            <section className="dashboard-page">
                <div className="container">
                    
                    <p>Total pages: {paginateInfo.total_pages}</p>

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
                                <td>
                                    <Link to={`pages/${page._id}`}>Edit</Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>



                    
                    <nav>
                        <ul className="pagination">
                            <li className="page-item">
                                <a className="page-link" to="#">Previous</a>
                            </li>
                            {
                                pagiNav.map( pagi => ( 
                                    <React.Fragment key={pagi}>
                                        <li className="page-item">
                                            <Link className="page-link" to="#"
                                                  onClick={ ()=>{ gotoNewPage(pagi) } }>
                                                {pagi}
                                            </Link>
                                        </li>
                                    </React.Fragment>
                                ) )
                            }
                            <li className="page-item">
                                <Link className="page-link" to="#">Next</Link>
                            </li>
                        </ul>
                    </nav>

                  

                </div>
            </section>
        )
}

export default BackendPageListing