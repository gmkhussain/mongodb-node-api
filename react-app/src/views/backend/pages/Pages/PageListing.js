import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'

import { API_BASE_URL } from '../../../../config/config'

// import BackendAddPage from './AddPage'


const BackendPageListing = () => {

    const [ pagesData, setPagesData] = useState( {
        pages: []
    })

    const [ paginateInfo, setPagenateInfo] = useState( {
        page_size: 1,
        current_page: 1,
        total_pages: 0
    })


    const getPages = ( paginate ) => {
        //?pageSize=${paginate.page_size}&page=${paginate.current_page}
        axios.get(`${API_BASE_URL}/pages`).then(res=>{
            
            console.log( "res ", res )
            setPagesData( { pages: res.data } )
            setPagenateInfo( { ...paginateInfo, total_pages: res.headers.total_pages })

        }).catch( err =>{
            console.log("Err", err )
        }
       )
    }



    // intial paginate
    const gotoPageNumber =( pn )=> {
        
        setPagenateInfo( { ...paginateInfo, current_page: pn } )
        console.log("paginate", pn , paginateInfo)

        let goto = {...paginateInfo, current_page: pn };

        getPages( goto );
        
    }


    useEffect( ()=> {
        getPages( paginateInfo )
    }, [])



    const { pages } = pagesData;
    const { total_pages } = paginateInfo;

    // Generating pagination Nav
    let pagiNav = [];
    for ( let i = 0; i < total_pages; i++) {
        pagiNav.push(<span> {i+1} </span>);
    }
    


        return (
            <section className="dashboard-page">
               <div className="container">

                    <p>Pages</p>
                    
                    <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#addPagePanel" aria-controls="offcanvasRight">Add Page</button>

                    <div className="offcanvas offcanvas-end" tabIndex="-1" id="addPagePanel">
                        <div className="offcanvas-header">
                            <h5>Offcanvas right</h5>
                            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            {/* <BackendAddPage /> */}
                        </div>
                    </div>


                   


                    <table className="table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Content</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            { pages.map( (page)=> (
                                <tr key={page._id}>
                                    <td>
                                        <Link to={`users/${page._id}`}>
                                          <span>{ page.title }</span>
                                        </Link> 
                                    </td>
                                    <td> { page.content } </td>
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
                                        onClick={ () => { gotoPageNumber( idx+1 ) } }>
                                            {idx+1} 
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

export default BackendPageListing