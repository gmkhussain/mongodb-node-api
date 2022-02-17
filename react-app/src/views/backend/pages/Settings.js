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
        site_logo_url: undefined,
        site_logo_inactive_url: undefined,
        favicon_url: undefined,
        
        intro_shape_svg_1: '',
        intro_shape_svg_2: '',

        cursor_icon_svg: undefined,
        cursor_circle_size: '',
        cursor_circle_color: '',
        cursor_circle_text: '',
        cursor_blend_mode: true,

        background_color: '',
        background_image_url: '',
        
        headings_font: " ",
        headings_weight: " ",
        headings_color: " ",
        
        body_font: " ",
        body_weight: " ",
        body_color: " ",

        links_font: " ",
        links_weight: " ",
        links_color: " ",
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
        
        settingFormData.append('site_name', settingsData.site_name );
        settingFormData.append('site_desc', settingsData.site_desc );

        // Image file update in settingFormData
        settingFormData.append('site_logo', settingsData.site_logo );
        settingFormData.append('site_logo_url', settingsData.site_logo_url );
        settingFormData.append('site_logo_inactive_url', settingsData.
        site_logo_inactive_url );
        settingFormData.append('favicon_url', settingsData.
        favicon_url );


        // Intro
        settingFormData.append('intro_shape_svg_1', settingsData.intro_shape_svg_1 );
        settingFormData.append('intro_shape_svg_1', settingsData.intro_shape_svg_1 );


        // Cursor
        settingFormData.append('cursor_icon_svg', settingsData.cursor_icon_svg );
        settingFormData.append('cursor_circle_size', settingsData.cursor_circle_size );
        settingFormData.append('cursor_circle_color', settingsData.cursor_circle_color );
        settingFormData.append('cursor_circle_text', settingsData.cursor_circle_text );

        settingFormData.append('cursor_blend_mode', settingsData.cursor_blend_mode );


        //Background
        settingFormData.append('background_color', settingsData.background_color );
        settingFormData.append('background_image_url', settingsData.background_image_url );


        // Headings
        settingFormData.append('headings_font', settingsData.headings_font );
        settingFormData.append('headings_weight', settingsData.headings_weight );
        settingFormData.append('headings_color', settingsData.headings_color );

        
        // Body Content
        settingFormData.append('body_font', settingsData.body_font );
        settingFormData.append('body_weight', settingsData.body_weight );
        settingFormData.append('body_color', settingsData.body_color );


        // Links
        settingFormData.append('links_font', settingsData.links_font );
        settingFormData.append('links_weight', settingsData.links_weight );
        settingFormData.append('links_color', settingsData.links_color );


        axios.patch(`${API_BASE_URL}/settings/${SETTING_ID}`, settingFormData, HEADER_MULTIPART_FORM ).then( res => {
            
            console.log("Saved !")
            
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
    const {
            site_name,
            site_desc,
            site_logo_url,
            site_logo_url_inactive,
            favicon_url,

            intro_shape_svg_1,
            intro_shape_svg_2,

            cursor_circle_size,
            cursor_circle_color,
            cursor_circle_text,
            cursor_blend_mode,

            background_color,
            background_image_url,
            
            headings_font,
            headings_weight,
            headings_color,
            
            body_font,
            body_weight,
            body_color,

            links_font,
            links_weight,
            links_color,

            } = settingsData;

    
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
        
                    <hr />

                    <form onSubmit={ saveSettings }>
                        
                        <h4>Intro</h4>
                        
                        <div className="form-group">
                            <label>intro_shape_svg_1:</label>
                            <input  className="form-control"
                                    name="intro_shape_svg_1"
                                    id="intro_shape_svg_1"
                                    type="text"
                                    value={intro_shape_svg_1}
                                    onChange={ updateInput }
                                    />
                        </div>

                        
                        <div className="form-group">
                            <label>intro_shape_svg_2:</label>
                            <input  className="form-control"
                                    name="intro_shape_svg_2"
                                    id="intro_shape_svg_2"
                                    type="text"
                                    value={intro_shape_svg_2}
                                    onChange={ updateInput }
                                    />
                        </div>
                        


                         <h4>Site Info</h4>

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

                            <hr />

                        <div className="from-group">
                            <label>Site Logo Active</label>
                            <input
                                className="form-control"
                                type="file"
                                name="site_logo"
                                onChange={onChangeInputFile} />
                        </div>

                        <div className="from-group">
                            <label>Site Logo Inactive</label>
                            <input
                                className="form-control"
                                type="file"
                                name="site_logo_inactive"
                                onChange={onChangeInputFile} />
                        </div>

                        <hr />

                        <div className="from-group">
                            <label>Site Logo</label>
                            <input
                                className="form-control"
                                type="file"
                                name="site_logo"
                                onChange={onChangeInputFile} />
                        </div>



                        <hr />

                        <div className="from-group">
                            <label>favicon</label>
                            <input
                                className="form-control"
                                type="file"
                                name="favicon"
                                onChange={onChangeInputFile} />
                        </div>


                        <h4>Cursor</h4>

                        <div className="from-group">
                            <label>cursor_icon_svg</label>
                            <input
                                className="form-control"
                                type="file"
                                name="cursor_icon_svg"
                                onChange={onChangeInputFile} />
                        </div>


                        <div className="form-group">
                            <label>cursor_circle_size:</label>
                            <input  className="form-control"
                                    name="cursor_circle_size"
                                    id="cursor_circle_size"
                                    type="text"
                                    value={cursor_circle_size}
                                    onChange={ updateInput }
                                    />
                        </div>


                        <div className="form-group">
                            <label>cursor_circle_color:</label>
                            <input  className="form-control"
                                    name="cursor_circle_color"
                                    id="cursor_circle_color"
                                    type="text"
                                    value={cursor_circle_color}
                                    onChange={ updateInput }
                                    />
                        </div>

                        
                        <div className="form-group">
                            <label>cursor_circle_text:</label>
                            <input  className="form-control"
                                    name="cursor_circle_text"
                                    id="cursor_circle_text"
                                    type="text"
                                    value={cursor_circle_text}
                                    onChange={ updateInput }
                                    />
                        </div>

                        <div className="form-group">
                            <label>cursor_blend_mode:</label>
                            <input  className="form-control"
                                    name="cursor_blend_mode"
                                    id="cursor_blend_mode"
                                    type="checkbox"
                                    value={cursor_blend_mode}
                                    onChange={ updateInput }
                                    />
                        </div>



                        <h4>Page</h4>

                        <div className="form-group">
                            <label>background_color:</label>
                            <input  className="form-control"
                                    name="background_color"
                                    id="background_color"
                                    type="color"
                                    value={cursor_blend_mode}
                                    onChange={ updateInput }
                                    />
                        </div>


                        <div className="from-group">
                            <label>background_image_url</label>
                            <input
                                className="form-control"
                                type="file"
                                name="background_image_url"
                                onChange={onChangeInputFile} />
                        </div>



                        
                        <h4>Content</h4>

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

                        <div className="form-group">
                            <label>headings_weight:</label>
                            <input  className="form-control"
                                    name="headings_weight"
                                    id="headings_weight"
                                    type="text"
                                    value={headings_weight}
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


                        <h4>body_font</h4>
                        
                        <div className="form-group">
                            <label>body_font:</label>
                            <input  className="form-control"
                                    name="body_font"
                                    id="body_font"
                                    type="text"
                                    value={body_font}
                                    onChange={ updateInput }
                                    />
                        </div>
                        
                                 
                        <div className="form-group">
                            <label>body_weight:</label>
                            <input  className="form-control"
                                    name="body_weight"
                                    id="body_weight"
                                    type="text"
                                    value={body_weight}
                                    onChange={ updateInput }
                                    />
                        </div>
                                 

                        <div className="form-group">
                            <label>body_color:</label>
                            <input  className="form-control"
                                    name="body_color"
                                    id="body_color"
                                    type="text"
                                    value={body_color}
                                    onChange={ updateInput }
                                    />
                        </div>






                        <h4>Links</h4>
                        
                        <div className="form-group">
                            <label>links_font:</label>
                            <input  className="form-control"
                                    name="links_font"
                                    id="links_font"
                                    type="text"
                                    value={links_font}
                                    onChange={ updateInput }
                                    />
                        </div>
                        
                                 
                        <div className="form-group">
                            <label>links_weight:</label>
                            <input  className="form-control"
                                    name="links_weight"
                                    id="links_weight"
                                    type="text"
                                    value={links_weight}
                                    onChange={ updateInput }
                                    />
                        </div>
                                 
                                 
                        <div className="form-group">
                            <label>links_color:</label>
                            <input  className="form-control"
                                    name="links_color"
                                    id="links_color"
                                    type="text"
                                    value={links_color}
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