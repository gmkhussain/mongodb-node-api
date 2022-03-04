import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';

import axios from "axios";
// import { API_BASE_URL } from '../../../../config/config'

import Loader from '../../../util/Loader/Loader';
import Alert from '../../../util/Alert/Alert'

const BackendPageEdit = ( ) => {
    
    const { id } = useParams();
    
    const [pageInfo, setPageInfo] = useState({
        title: " ",
        content: " ",
        loading: false,
        alert: { 
            display: false,
            class: " alert-info",
            title: "Message Title",
            desc: "Message Description"
        }
    })
    
    


    const getPageData = () => {
        setPageInfo({ ...pageInfo, loading: true })

        axios.get(`${process.env.REACT_APP_API_BASE_URL}/pages/${id}`).then( res=> {
            console.log("Res", res)

            setPageInfo({ ...pageInfo, title: res.data.title, content: res.data.content, loading: false })

        }).catch( err=>{
            console.log("Err", err)
        })
    }

    useEffect( ()=> {
        getPageData()
    }, [])






    // Update Page Data
    const onSubmitUpdate =(e)=> {
        e.preventDefault();

        updatePageData()
    }

    const updatePageData = () => {

        setPageInfo({ ...pageInfo, loading: true })

        axios.patch(`${process.env.REACT_APP_API_BASE_URL}/pages/${id}`, pageInfo ).then(res=>{
            console.log("Res", res)

            setPageInfo({ ...pageInfo, loading: false, alert: { display: true, class: "success", title: "Changes Saved!" } })

        }).catch(err=>{
            console.log("Err", err)
        })
    }


    let updateInput = ( { target: { name, value } } ) => {
        setPageInfo({
            ...pageInfo,
            [name]: value
        })
        
        console.log( [name], value )
        console.log( pageInfo )
    }




    const { title, content, alert, loading } = pageInfo;

    return (
        <div>
            
            { loading ? <Loader /> : ""  }

            <div className="row">
                <div className="col-md-12">
                    <Link to="/dashboard/pages" className="btn btn-default"> Back </Link>
                </div>
            </div>


            <div className="col-md-6 offset-md-3">

                { alert?.display ? <Alert class="success" title={alert.title} /> : " " }
                
                <h4>Edit</h4>
            
                <form onSubmit={onSubmitUpdate}>
                    <div className="form-group">
                        <label>Title</label>
                        <input 
                            className="form-control"
                            type="text"
                            name="title"
                            value={title}
                            onChange={updateInput}
                            />
                    </div>  
                    <div className="form-group">
                        <label>Content</label>
                        <textarea 
                            className="form-control"
                            type="text"
                            name="content"
                            value={content}
                            onChange={updateInput}
                            ></textarea>
                    </div>

                    <div className="form-group mt-2">
                        <button className="btn btn-primary" type="submit">Update</button>
                    </div>
                </form>

            </div>

        </div>
    )
    
}

export default BackendPageEdit;