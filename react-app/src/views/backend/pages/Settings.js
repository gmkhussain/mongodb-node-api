import React, { useEffect, useState } from 'react'

import axios from 'axios'

import { API_BASE_URL, HEADER_MULTIPART_FORM } from '../../../config/config'


const Settings = () => {

    const [pageInfo, setPageInfo] = useState({
        loading: false,
    })


    const [settingsData, setSettingsData] = useState({
        site_name: 'na',
        site_desc: 'na',
        site_logo: undefined,
        headings_font: " ",
        headings_color: " "
    });


    const [ previewImage, setPreviewImage] = useState({
        src: "",
        alt: ""
    })


   

    let updateInput = ( { target: { name, value } } ) => {
        setSettingsData({
            ...settingsData,
            [name]: value
        })
        console.log( [name], value )
        console.log( settingsData )
    }


 

    
    let onChangeInputFile = ( e ) => {
        setSettingsData({
            ...settingsData,
            site_logo: e.target.files[0]
        })

        setPreviewImage({
            src: URL.createObjectURL(e.target.files[0]),
            alt: e.target.files[0].name
        });    
    


        console.log( "previewImage >", previewImage )
    }



    const requestUpdateSiteLogo = async ( e ) => {
        e.preventDefault()

        const settingFormData = new FormData();
        // Image file update in settingFormData
        settingFormData.append('site_logo', settingsData.site_logo );
        settingFormData.append('site_name', "NEW" );
        
        axios.post(`${API_BASE_URL}/settings/site_logo`, settingFormData, HEADER_MULTIPART_FORM ).then( res=> {
            console.log("Logo updated")
        } ).catch( err=> {
            console.log("Err", err )
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
        
        let SETTING_ID = process.env.REACT_APP_SITE_SETTING_ID;


        const settingFormData = new FormData();
        // Image file update in settingFormData
        settingFormData.append('site_logo', settingsData.site_logo );
        settingFormData.append('site_name', settingsData.site_name );
        settingFormData.append('site_desc', settingsData.site_desc );

        settingFormData.append('headings_color', settingsData.headings_color );
        settingFormData.append('headings_font', settingsData.headings_font );


        axios.patch(`${API_BASE_URL}/settings/${SETTING_ID}`, settingFormData, HEADER_MULTIPART_FORM ).then( res => {
            
            console.log("SAVED !")
            
        }).catch( err=> {
            console.log( "Err", err )
        })
        

    }




    

    useEffect(()=>{
        getSettingsData()
    }, [])


    useEffect(()=>{
        console.log("settingsData UPDATED")
    }, [settingsData])






    const { loading } = pageInfo;
    const { site_name, site_desc, site_logo, headings_color, headings_font } = settingsData;

    
        return (
            <section className="settings-page">
               <div className="container">
                  
                <p>Settings</p>
                   
                { loading ? " loading..." : " Loaded" }

                <div className="setting-form col-md-4">
                   

                    <form onSubmit={requestUpdateSiteLogo} encType="multipart/form-data"> 
                        {/* <div className="from-group">
                            <label>Site Logo</label>
                            <input
                                className="form-control"
                                type="file"
                                name="site_logo"
                                onChange={onChangeInputFile} />
                        </div> */}

                        {
                            (previewImage.src === "" )
                                ?
                            "Select Image"
                                : 
                            <div className="preview__image"> 
                                <img src={previewImage.src} alt={previewImage.alt} />
                            </div>
                            }
                            
                        <div className="form-group mt-4">
                            <button className="btn btn-primary" type="submit">Upload Logo</button>
                        </div>
                    </form>
        

                    <form onSubmit={ saveSettings }>
                        <div className="from-group">
                            <label>Site Logo</label>
                            <input
                                className="form-control"
                                type="file"
                                name="site_logo"
                                onChange={onChangeInputFile} />
                        </div>

                        <div className="form-group">
                            <label>Sitename:</label>
                            <input  className="form-control"
                                    name="site_name"
                                    id="site_name"
                                    type="text"
                                    value={site_name}
                                    onChange={ updateInput }
                                    />
                        </div>
                        <div className="form-group">
                            <label>site_desc:</label>
                            <input  className="form-control"
                                    name="site_desc"
                                    id="site_desc"
                                    type="text"
                                    value={site_desc}
                                    onChange={ updateInput }
                                    />
                        </div>

                        <div className="form-group">
                            <label>headings_color:</label>
                            <input  className="form-control"
                                    name="headings_color"
                                    id="headings_color"
                                    type="text"
                                    value={headings_color}
                                    onChange={ updateInput }
                                    />
                        </div>

                        
                        <div className="form-group">
                            <label>headings_font:</label>
                            <input  className="form-control"
                                    name="headings_font"
                                    id="headings_font"
                                    type="text"
                                    value={headings_font}
                                    onChange={ updateInput }
                                    />
                        </div>

                        <div className="form-group mt-4">
                            <button className="btn btn-primary" type="submit">SAVE</button>
                        </div>
                    </form>

                </div>
 

               </div>
            </section>
          )
}

export default Settings