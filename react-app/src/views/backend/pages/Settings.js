import React, { useEffect, useState } from 'react'

import axios from 'axios'

import { API_BASE_URL } from '../../../config/config'


const Settings = () => {

    const [pageInfo, setPageInfo] = useState({
        loading: false,
    })

    const [settingsData, setSettingsData] = useState({
        site_name: 'na',
        headings: {
            font: '',
            color: ''
        }
    });






    let updateSiteName = (e) => {

        console.log( e )
        
        setSettingsData({
            site_name: e.target.value
        })
    }


    const getSettingsData = async () => {
         
        await axios.get(`${API_BASE_URL}/settings`).then( res => {
             
            console.log( "Res", res.data )

            // store API response into State
            setSettingsData( res.data[0] )

            // immediately update the state
            setSettingsData((state) => {
                console.log("immediately update the state --> setSettingsData", state); 
                return state;
            }); 

        }).catch( err=> {
            console.log( "Err", err )
        })
        
    }






    const saveSettings = (event) => {
        event.preventDefault()
        console.log( "saveSettings" )
    }



    

    useEffect(()=>{
        getSettingsData()
    }, [])


    useEffect(()=>{
        console.log("settingsData UPDATED")
    }, [settingsData])






    const { loading } = pageInfo;
    const { site_name, headings } = settingsData;

        return (
            <section className="settings-page">
               <div className="container">
                  
                   <p>Settings</p>
                   { loading ? " loading..." : " Loaded" }

                <form  onSubmit={ saveSettings }>
                    <table className="table">
                        <tbody>
                            <tr>
                                <td>Sitename:</td>
                                <td>
                                    <div>{ site_name }</div>
                                    <input  type="text" value={site_name}
                                            onChange={updateSiteName}
                                            />
                                </td>
                            </tr>
                            <tr>
                                <td>Headings Font</td>
                                <td>
                                    <div>{ headings.font }</div>
                                    <input  type="text" value={headings.font}
                                            onChange={updateSiteName}
                                            />
                                </td>
                            </tr>
                            
                            <tr>
                                <td>Headings Color</td>
                                <td>
                                    <div>{ headings.color }</div>
                                    <input  type="text" value={headings.color}
                                            onChange={updateSiteName}
                                            />
                                </td>
                            </tr>
                            
                        </tbody>
                    </table>

                    <button type="submit">SAVE</button>
                </form>


                   

               </div>
            </section>
          )
}

export default Settings