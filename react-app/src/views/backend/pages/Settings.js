import React, { useEffect, useState } from 'react'
import axios from 'axios'
// import SVG, { Props as SVGProps } from 'react-inlinesvg';

// Config
import { API_BASE_URL, HEADER_MULTIPART_FORM } from '../../../config/config'



const Settings = () => {

    const [pageInfo, setPageInfo] = useState({
        loading: false,
    })


    const [settingsData, setSettingsData] = useState({
        site_name: 'na',
        site_desc: 'na',
        site_logo: undefined, // For Form Only
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
        site_logo_url: "",
        site_logo_inactive_url: "",
        favicon_url: ""
    })


   

    let updateInput = ( { target: { name, value } } ) => {
        setSettingsData({
            ...settingsData,
            [name]: value
        })
        console.log( [name], value )
        console.log( settingsData )
    }


 

    
    let onChangeInputFile = ( { target: { name, files } } ) => {
        console.log(files)
        setSettingsData({
            ...settingsData,
            [name]: files[0]
        })

        setPreviewImage({
            ...previewImage,
            [name]: URL.createObjectURL(files[0])
        });    
    

        console.log( "previewImage >", previewImage )
        console.log("onChangeInputFile", settingsData )
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
        settingFormData.append('site_logo_url', settingsData.site_logo_url );
        settingFormData.append('site_logo_inactive_url', settingsData.site_logo_inactive_url );
        settingFormData.append('favicon_url', settingsData.favicon_url );


        // Intro
        settingFormData.append('intro_shape_svg_1', settingsData.intro_shape_svg_1 );
        settingFormData.append('intro_shape_svg_2', settingsData.intro_shape_svg_2 );


        // // Cursor
        // settingFormData.append('cursor_icon_svg', settingsData.cursor_icon_svg );
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
            site_logo_inactive_url,
            favicon_url,

            intro_shape_svg_1,
            intro_shape_svg_2,

            cursor_icon_svg,
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
                  
                
                
                   
                { loading ? " loading..." : " " }

                <div className="setting-form col-md-12 mt-4">

                    <h4>Settings</h4>

                    <div class="card">
                        <h6>Demo Heading</h6>
                        <p>Demo body content</p>
                        <a href="#">Demo link content</a>
                    </div>
        
                    <hr />

                    <form className='row' onSubmit={ saveSettings } encType="multipart/form-data">

                        <div className="form-group mt-4">
                            <button className="btn btn-primary" type="submit">SAVE CHANGES</button>
                        </div>
                        
                        <div className='col-md-4'>

                          <div className="card">

                            <h4>Intro</h4>

                            <div className="input-group">
                                <span className="form-control">
                                    <label>intro_shape_svg_1</label>
                                    <input  className="form-control"
                                        name="intro_shape_svg_1"
                                        id="intro_shape_svg_1"
                                        type="text"
                                        value={intro_shape_svg_1}
                                        onChange={ updateInput }
                                        />
                                </span>
                                <span className="input-group-text">
                                    <span className='image_preview' dangerouslySetInnerHTML={{__html: intro_shape_svg_1}}></span>
                                </span>
                            </div>

                            
                            <div className="input-group">
                                <span className="form-control">
                                    <label>intro_shape_svg_2</label>
                                    <input  className="form-control"
                                        name="intro_shape_svg_2"
                                        id="intro_shape_svg_2"
                                        type="text"
                                        value={intro_shape_svg_2}
                                        onChange={ updateInput }
                                        />
                                </span>
                                <span className="input-group-text">
                                    <span className='image_preview' dangerouslySetInnerHTML={{__html: intro_shape_svg_2}}></span>
                                </span>
                            </div>

                          </div>

                        </div>
                        
                        
                        <div className='col-md-8'>

                            <div className="card">
                                <h4>Logos</h4>
                                
                                <div className='row'>
                                    <div className='col-md-6'>

                                        
                                        <div className="input-group">
                                            
                                            <div className="form-control">
                                                <label>Site Logo Active</label>
                                                <input
                                                    className="form-control"
                                                    type="file"
                                                    name="site_logo_url"
                                                    onChange={onChangeInputFile} />
                                            </div>
                                            <span className="input-group-text">
                                                    
                                                {   (previewImage.site_logo_url === "" )
                                                        ?
                                                    <img className="preview__image" src={`${process.env.REACT_APP_UPLOADS_URL}${site_logo_url}`}
                                                    />
                                                        : 
                                                    <div className="preview__image"> 
                                                        <img src={previewImage.site_logo_url} />
                                                    </div>
                                                }
                                            </span>
                                        </div>
    
    
                                        <div className="input-group">
                                            
                                            <div className="form-control">
                                                <label>Site Logo Inactive</label>
                                                <input
                                                    className="form-control"
                                                    type="file"
                                                    name="site_logo_inactive_url"
                                                    onChange={onChangeInputFile} />
                                            </div>
                                            <span className="input-group-text">
                                                {   ( previewImage.site_logo_inactive_url === "" )
                                                        ?
                                                        <img className="preview__image" src={process.env.REACT_APP_UPLOADS_URL+site_logo_inactive_url} />
                                                        : 
                                                    <div className="preview__image"> 
                                                        <img src={previewImage.site_logo_inactive_url} />
                                                    </div>
                                                }
                                            </span>
                                        </div>

                                    </div>
                                    <div className='col-md-6'>

                                        

                                            <div className="input-group">
                                            
                                            <div className="form-control">
                                                <label>FavIcon</label>
                                                <input
                                                    className="form-control"
                                                    type="file"
                                                    name="favicon_url"
                                                    onChange={onChangeInputFile} />
                                            </div>
                                            <span className="input-group-text">
                                                {   ( previewImage.favicon_url === "" )
                                                        ?
                                                        <img className="preview__image" src={process.env.REACT_APP_UPLOADS_URL+favicon_url} />
                                                        : 
                                                    <div className="preview__image"> 
                                                        <img src={previewImage.favicon_url} />
                                                    </div>
                                                }
                                            </span>
                                        </div>


                                    </div>
                                </div>
                            </div>

                        </div>
                        

                        <div className='col-md-4'>

                            <div className="card">
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
                            </div>

                        </div>


                        <div className='col-md-4'>

                          <div class="card">
                            <h4>Cursor</h4>

                            <div className="input-group">
                                <span className="form-control">
                                    <label>intro_shape_svg_2</label>
                                    <input  className="form-control"
                                        name="cursor_icon_svg"
                                        id="cursor_icon_svg"
                                        type="text"
                                        value={cursor_icon_svg}
                                        onChange={ updateInput }
                                        />
                                </span>
                                <span className="input-group-text">
                                    <span className='image_preview'
                                        style={
                                            {
                                                width: cursor_circle_size,
                                                height: cursor_circle_size,
                                            }
                                        }
                                    dangerouslySetInnerHTML={{__html: cursor_icon_svg}}></span>
                                </span>
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
                                        type="color"
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
                                <label htmlFor='cursor_blend_mode'>cursor_blend_mode:</label>
                                <input  
                                        name="cursor_blend_mode"
                                        id="cursor_blend_mode"
                                        type="checkbox"
                                        value={cursor_blend_mode}
                                        onChange={ updateInput }
                                        />
                            </div>
                          </div>

                        </div>

                    
                        <div className='col-md-4'>
                          <div className='card'>
                            <h4>Page</h4>

                            <div className="form-group">
                                <label>background_color:</label>
                                <input  className="form-control"
                                        name="background_color"
                                        id="background_color"
                                        type="color"
                                        value={background_color}
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
                          </div>
                        </div>


                        <div className=' col-md-12'>

                          <div className='card'>
                            <div className='row'>

                                <h4>Content</h4>

                                <div className='col col-md-4'>
                                    <h4 style={
                                            {
                                                fontFamily: headings_font,
                                                fontWeight: headings_weight,
                                                color: headings_color
                                            }                                        
                                        }>heading_font</h4>

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
                                            <select className="form-control"
                                                    name="headings_weight"
                                                    id="headings_weight"
                                                    type="text"
                                                    value={headings_weight}
                                                    onChange={ updateInput }
                                                    >
                                                <option value="100">100</option>
                                                <option value="200">200</option>
                                                <option value="300">300</option>
                                                <option value="400">400</option>
                                                <option value="500">500</option>
                                                <option value="600">600</option>
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label>headings_color:</label>
                                            <input  className="form-control"
                                                    name="headings_color"
                                                    id="headings_color"
                                                    type="color"
                                                    value={headings_color}
                                                    onChange={ updateInput }
                                                    />
                                        </div>
                                </div>

                            
                                <div className='col col-md-4'>

                                    <h4 style={
                                            {
                                                fontFamily: body_font,
                                                fontWeight: body_weight,
                                                color: body_color
                                            }                                        
                                        }>body_font</h4>
                                    
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
                                        <select  className="form-control"
                                                name="body_weight"
                                                id="body_weight"
                                                type="text"
                                                value={body_weight}
                                                onChange={ updateInput }
                                                >   
                                                <option value="100">100</option>
                                                <option value="200">200</option>
                                                <option value="300">300</option>
                                                <option value="400">400</option>
                                                <option value="500">500</option>
                                                <option value="600">600</option>
                                        </select>
                                    </div>
                                            

                                    <div className="form-group">
                                        <label>body_color:</label>
                                        <input  className="form-control"
                                                name="body_color"
                                                id="body_color"
                                                type="color"
                                                value={body_color}
                                                onChange={ updateInput }
                                                />
                                    </div>
                                
                                </div>




                                <div className='col col-md-4'>
                                    <h4 style={
                                            {
                                                fontFamily: links_font,
                                                fontWeight: links_weight,
                                                color: links_color
                                            }                                        
                                        }>Links</h4>
                                    
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
                                        <select className="form-control"
                                                name="links_weight"
                                                id="links_weight"
                                                type="text"
                                                value={links_weight}
                                                onChange={ updateInput }
                                                >
                                                    <option value="100">100</option>
                                                    <option value="200">200</option>
                                                    <option value="300">300</option>
                                                    <option value="400">400</option>
                                                    <option value="500">500</option>
                                                    <option value="600">600</option>
                                        </select>
                                    </div>
                                            
                                            
                                    <div className="form-group">
                                        <label>links_color:</label>
                                        <input  className="form-control"
                                                name="links_color"
                                                id="links_color"
                                                type="color"
                                                value={links_color}
                                                onChange={ updateInput }
                                                />
                                    </div>
                                </div>
                            </div>
                          </div>

                        </div>
 
                    </form>


                </div>
 

               </div>
            </section>
          )
}

export default Settings