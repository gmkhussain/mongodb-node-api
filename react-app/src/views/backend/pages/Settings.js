import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
// import SVG, { Props as SVGProps } from 'react-inlinesvg';
import Loader from '../../util/Loader/Loader';
import Alert from '../../util/Alert/Alert';

import Context from '../../../context/Context'

// Config
import { HEADER_MULTIPART_FORM } from '../../../config/config'

import Theme, { STYLES } from '../../theme/Theme'


const Settings = () => {
    
    let { styles, setStyles } = useContext(Context)
    // styles.color = 'Home'

    const [pageInfo, setPageInfo] = useState({
        loading: false,
        alert: {
            display: false,
            class: " C",
            title: " T",
            desc: " D"
        }
    })

    let fontWeights = [100,200,300,400,500,600,700,800,900];

    let fontFamilies = ['Arial', 'ITC-Benguiat', 'Verdana', 'Georgia', 'Comic Sans MS', 'Helvetica', 'Times New Roman', 'Impact']


    const [settingsData, setSettingsData] = useState({
        site_name: 'na',
        site_desc: 'na',
        site_logo: ' ', // For Form Only
        site_logo_url: '',
        site_logo_inactive_url: " ",
        favicon_url: " ",
        
        intro_shape_svg_1: '',
        intro_shape_svg_2: '',

        cursor_icon_url: " ",
        cursor_icon_svg: " ",
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
        
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/settings/site_logo`, settingFormData, HEADER_MULTIPART_FORM ).then( res=> {
            console.log("Logo updated")
        } ).catch( err=> {
            console.log("Err", err )
        })
    }


    const getSettingsData = async () => {

         
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/settings`).then( res => {
             
            // console.log( "Res", res.data )

            // store API response into State
            setSettingsData( res.data[0] )
            setStyles( res.data[0] );
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

        setPageInfo({ loading: true })

        event.preventDefault()
        
        let SETTING_ID = process.env.REACT_APP_SITE_SETTING_ID;


        const settingFormData = new FormData();
        
        settingFormData.append('site_name', settingsData.site_name );
        settingFormData.append('site_desc', settingsData.site_desc );

        // Image file update in settingFormData
        settingFormData.append('site_logo_url', settingsData.site_logo_url );
        settingFormData.append('site_logo_inactive_url', settingsData.site_logo_inactive_url );
        settingFormData.append('favicon_url', settingsData.favicon_url );

        // Logo SVG
        settingFormData.append('site_logo_svg', settingsData.site_logo_svg );
        settingFormData.append('site_logo_inactive_svg', settingsData.site_logo_inactive_svg );


        // Intro
        settingFormData.append('intro_shape_svg_1', settingsData.intro_shape_svg_1 );
        settingFormData.append('intro_shape_svg_2', settingsData.intro_shape_svg_2 );


        // Cursor
        settingFormData.append('cursor_icon_url', settingsData.cursor_icon_url );
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


        axios.patch(`${process.env.REACT_APP_API_BASE_URL}/settings/${SETTING_ID}`, settingFormData, HEADER_MULTIPART_FORM ).then( res => {
            
            console.log("Saved !")

            setPageInfo({ loading: false, alert: { display: true, title: "Changes Saved!" } })
            
        }).catch( err=> {
            console.log( "Err", err )
        })
        

    }




    

    useEffect(()=>{
        getSettingsData()

        // console.log("STYLES::::::", Theme )
    }, [])


    useEffect(()=>{
        console.log("settingsData UPDATED")
    }, [settingsData])





    const { loading, alert } = pageInfo;
    const {
            site_name,
            site_desc,
            site_logo_url,
            site_logo_inactive_url,
            favicon_url,

            site_logo_svg,
            site_logo_inactive_svg,

            intro_shape_svg_1,
            intro_shape_svg_2,

            cursor_icon_url,
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
                  
                { loading ? <Loader /> : ""  }
 

                <div className='row'>

                    <div className="setting-form col-md-12 ">
                        

                        <form className='row' onSubmit={ saveSettings } encType="multipart/form-data">
                            
                            { alert?.display ? <Alert className="success" title={alert.title} /> : " " }
                            
                            <div className="form-group pos-sticky mt-4">
                                <button className="btn btn-primary" type="submit">SAVE CHANGES</button>
                            </div>
                            
                            
                            <div className='col-md-12'>

                            <div className="card">


                                <h4
                                    data-bs-toggle="collapse"
                                    href="#collapseIntro"
                                    role="button"
                                    aria-expanded="false"
                                    aria-controls="collapseIntro"
                                    >Intro</h4>

                              <div className='collapse' id='collapseIntro'>
                                <div className="input-group">
                                    <span className="form-control">
                                        <label>Shape 1</label>
                                        <textarea  className="form-control"
                                            name="intro_shape_svg_1"
                                            id="intro_shape_svg_1"
                                            type="text"
                                            value={intro_shape_svg_1}
                                            onChange={ updateInput }
                                            ></textarea>
                                    </span>
                                    <span className="input-group-text">
                                        <span className='image_preview' dangerouslySetInnerHTML={{__html: intro_shape_svg_1}}></span>
                                    </span>
                                </div>

                                
                                <div className="input-group">
                                    <span className="form-control">
                                        <label>Shape 2</label>
                                        <textarea className="form-control"
                                            name="intro_shape_svg_2"
                                            id="intro_shape_svg_2"
                                            type="text"
                                            value={intro_shape_svg_2}
                                            onChange={ updateInput }
                                            ></textarea>
                                    </span>
                                    <span className="input-group-text">
                                        <span className='image_preview' dangerouslySetInnerHTML={{__html: intro_shape_svg_2}}></span>
                                    </span>
                                </div>
                              </div>

                            </div>

                            </div>
                            
                            
                            <div className='col-md-12'>

                                <div className="card">

                                    <h4
                                        data-bs-toggle="collapse"
                                        href="#collapseLogos"
                                        role="button"
                                        aria-expanded="false"
                                        aria-controls="collapseLogos"
                                        >Logos</h4>
                                    
                                    <div className='row collapse' id="collapseLogos">

                                        <div className='col-md-8'>

                                            <div className="input-group">
                                                <span className="form-control">
                                                    <label>site_logo_svg (active)</label>
                                                    <textarea className="form-control"
                                                        name="site_logo_svg"
                                                        id="site_logo_svg"
                                                        type="text"
                                                        value={site_logo_svg}
                                                        onChange={ updateInput }
                                                        ></textarea>
                                                </span>
                                                <span className="input-group-text">
                                                    <span className='image_preview' dangerouslySetInnerHTML={{__html: site_logo_svg}}></span>
                                                </span>
                                            </div>

                                            <div className="input-group">
                                                <span className="form-control">
                                                    <label>site_logo_inactive_svg (active)</label>
                                                    <textarea className="form-control"
                                                        name="site_logo_inactive_svg"
                                                        id="site_logo_inactive_svg"
                                                        type="text"
                                                        value={site_logo_inactive_svg}
                                                        onChange={ updateInput }
                                                        ></textarea>
                                                </span>
                                                <span className="input-group-text">
                                                    <span className='image_preview' dangerouslySetInnerHTML={{__html: site_logo_inactive_svg}}></span>
                                                </span>
                                            </div>


                                            
                                        </div>


                                        <div className='col-md-4'>

{/*                                             
                                            <div className="input-group">
                                                
                                                <div className="form-control">
                                                    <label>Logo Active</label>
                                                    <div className="file">
                                                        <input
                                                            className="form-control"
                                                            type="file"
                                                            name="site_logo_url"
                                                            onChange={onChangeInputFile} />
                                                        <span className='btn btn-outline-secondary'>Choose File</span>
                                                    </div>
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
                                                    <label>Logo Inactive</label>
                                                    
                                                    <div className="file">
                                                        <input
                                                            className="form-control"
                                                            type="file"
                                                            name="site_logo_inactive_url"
                                                            onChange={onChangeInputFile} />
                                                        <span className='btn btn-outline-secondary'>Choose File</span>
                                                    </div>

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
                                            </div> */}



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
                            

                            <div className='col-md-8'>

                                <div className="card">
                                    <h4
                                        data-bs-toggle="collapse"
                                        href="#collapseSiteInfo"
                                        role="button"
                                        aria-expanded="false"
                                        aria-controls="collapseSiteInfo"
                                    >Site Info</h4>

                                    <div className='collapse' id="collapseSiteInfo">

                                        <div className="form-group">
                                            <label>Site Name:</label>
                                            <input  className="form-control"
                                                    name="site_name"
                                                    id="site_name"
                                                    type="text"
                                                    value={site_name}
                                                    onChange={ updateInput }
                                                    />
                                        </div>

                                        <div className="form-group">
                                            <label>Site Description:</label>
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

                            </div>

                            
                            <div className='col-md-4'>
                                <div className='card'>

                                    <h4
                                        data-bs-toggle="collapse"
                                        href="#collapsePage"
                                        role="button"
                                        aria-expanded="false"
                                        aria-controls="collapsePage"
                                        >Page</h4>

                                    <div className='collapse' id="collapsePage">
                                        <div className="input-group">
                                            <div className="form-control">
                                                <label>Background Image Url</label>
                                                <div className="file">
                                                    <input
                                                        className="form-control"
                                                        type="file"
                                                        name="background_image_url"
                                                        onChange={onChangeInputFile} />
                                                    <span className='btn btn-outline-secondary'>Choose File</span>
                                                </div>
                                            </div>
                                            <span className="input-group-text">
                                                    
                                                {   (previewImage.background_image_url === "" )
                                                        ?
                                                    <img className="preview__image" src={`${process.env.REACT_APP_UPLOADS_URL}${background_image_url}`}
                                                    />
                                                        : 
                                                    <div className="preview__image"> 
                                                        <img src={previewImage.background_image_url} />
                                                    </div>
                                                }
                                            </span>
                                        </div>

                                        
                                        <div className="form-group">
                                            <label>Background Color:</label>
                                            <input  className="form-control"
                                                    name="background_color"
                                                    id="background_color"
                                                    type="color"
                                                    value={background_color}
                                                    onChange={ updateInput }
                                                    />
                                        </div>
                                    </div>

                                </div>
                                
                            </div>


                            <div className='col-md-12'>

                                <div className="card">
                                    
                                    <h4
                                        data-bs-toggle="collapse"
                                        href="#collapseCursor"
                                        role="button"
                                        aria-expanded="false"
                                        aria-controls="collapseCursor"
                                        >Cursor</h4>

                                    <div className='row collapse' id="collapseCursor">



                                            <div className="input-group">
                                                
                                                <div className="form-control">
                                                    <label>cursor_icon_url</label>
                                                    <input
                                                        className="form-control"
                                                        type="file"
                                                        name="cursor_icon_url"
                                                        onChange={onChangeInputFile} />
                                                </div>
                                                <span className="input-group-text">
                                                    {   ( previewImage.cursor_icon_url === "" )
                                                            ?
                                                            <img className="preview__image" src={process.env.REACT_APP_UPLOADS_URL+cursor_icon_url} />
                                                            : 
                                                        <div className="preview__image"> 
                                                            <img src={previewImage.cursor_icon_url} />
                                                        </div>
                                                    }
                                                </span>
                                            </div>

                                        <div className="input-group">
                                            <span className="form-control">
                                                <label>Icon</label>
                                                <textarea  className="form-control"
                                                        name="cursor_icon_svg"
                                                        id="cursor_icon_svg"
                                                        type="text"
                                                        value={cursor_icon_svg}
                                                        onChange={ updateInput }
                                                        ></textarea>
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


                                        <div className="form-group col-md-4">
                                            <label>Size:</label>
                                            <input  className="form-control"
                                                    name="cursor_circle_size"
                                                    id="cursor_circle_size"
                                                    type="text"
                                                    value={cursor_circle_size}
                                                    onChange={ updateInput }
                                                    />
                                        </div>


                                        <div className="form-group col-md-4">
                                            <label>Color:</label>
                                            <input  className="form-control"
                                                    name="cursor_circle_color"
                                                    id="cursor_circle_color"
                                                    type="color"
                                                    value={cursor_circle_color}
                                                    onChange={ updateInput }
                                                    />
                                        </div>

                                        
                                        <div className="form-group col-md-4">
                                            <label>Text:</label>
                                            <input  className="form-control"
                                                    name="cursor_circle_text"
                                                    id="cursor_circle_text"
                                                    type="text"
                                                    value={cursor_circle_text}
                                                    onChange={ updateInput }
                                                    />
                                        </div>

                                        <div className='col-md-12 form-group'>
                                            <div className="form-check form-switch">

                                                <input
                                                        className='form-check-input'
                                                        name="cursor_blend_mode"
                                                        id="cursor_blend_mode"
                                                        type="checkbox"
                                                        value={cursor_blend_mode}
                                                        onChange={ updateInput }
                                                        role="switch"
                                                        />
                                                <label className="form-check-label" htmlFor='cursor_blend_mode'>cursor_blend_mode</label>
                                                
                                            </div>
                                        </div>

                                    </div>  

                                </div>

                            </div>

                        


                            <div className=' col-md-12'>

                                <div className='card'>
                                    <div className='row'>

                                        <h4
                                            data-bs-toggle="collapse"
                                            href="#collapseContent"
                                            role="button"
                                            aria-expanded="false"
                                            aria-controls="collapseContent"
                                            >Content</h4>

                                      <div className='collapse row' id='collapseContent'>

                                        <div className='col col-md-4'>
                                            <h4 style={
                                                    {
                                                        fontFamily: headings_font,
                                                        fontWeight: headings_weight,
                                                        color: headings_color
                                                    }                                        
                                                }>heading_font</h4>

                                            <div className="row">
                                                <div className="form-group col-md-8">
                                                    <label>Font Family:</label>
                                                    <select  className="form-control"
                                                            name="headings_font"
                                                            id="headings_font"
                                                            type="text"
                                                            value={headings_font}
                                                            onChange={ updateInput }
                                                            >
                                                            {
                                                            fontFamilies.map( (ff, idx ) => (
                                                                <>
                                                                    <option style={{'font-family': ff }} value={ff}>{ff}</option>
                                                                </>
                                                                )
                                                            )}
                                                    </select>
                                                </div>

                                                <div className="form-group col-md-4">
                                                    <label>Color:</label>
                                                    <input  className="form-control"
                                                            name="headings_color"
                                                            id="headings_color"
                                                            type="color"
                                                            value={headings_color}
                                                            onChange={ updateInput }
                                                            />
                                                </div>

                                                <div className="form-group">
                                                    <label>Weight:</label>

                                                    <div className="btn-group w-100" role="group">
                                                        {
                                                            fontWeights.map( (fw, idx ) => (
                                                                <>
                                                                    <input key={idx} type="radio" className="btn-check" name="headings_weight"
                                                                            id={`headings_weight_${idx}`} value={fw}
                                                                            onChange={ updateInput }
                                                                            />
                                                                    <label className={`btn btn-outline-secondary ${(fw==headings_weight)?' active' : ' '}`} htmlFor={`headings_weight_${idx}`}>{fw}</label>
                                                                </>
                                                            ) )
                                                        }
                                                    </div>

                                                </div>
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
                                            
                                        <div className='row'>

                                            <div className="form-group col-md-8">
                                                <label>Font Family:</label>
                                                <select  className="form-control"
                                                            name="body_font"
                                                            id="body_font"
                                                            type="text"
                                                            value={body_font}
                                                            onChange={ updateInput }
                                                            >
                                                            {
                                                            fontFamilies.map( (ff, idx ) => (
                                                                <>
                                                                    <option style={{'font-family': ff }} value={ff}>{ff}</option>
                                                                </>
                                                                )
                                                            )}
                                                </select>
                                            </div>
                                            
                                            <div className="form-group col-md-4">
                                                <label>Color:</label>
                                                <input  className="form-control"
                                                        name="body_color"
                                                        id="body_color"
                                                        type="color"
                                                        value={body_color}
                                                        onChange={ updateInput }
                                                        />
                                            </div>

                                                    
                                            <div className="form-group">
                                                <label>Weight:</label>

                                                <div className="btn-group  w-100" role="group">
                                                    {
                                                        fontWeights.map( (fw, idx ) => (
                                                            <>
                                                                <input  key={idx} type="radio" className="btn-check" name="body_weight"
                                                                        id={`body_weight_${idx}`} value={fw}
                                                                        onChange={ updateInput }
                                                                        />
                                                                <label className={`btn btn-outline-secondary ${(fw==body_weight)?' active' : ' '}`} htmlFor={`body_weight_${idx}`}>{fw}</label>
                                                            </>
                                                        ) )
                                                    }
                                                </div>

                                            </div>
                                            
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
                                        <div className='row'>

                                            <div className="form-group  col-md-8">
                                                <label>Font Family:</label>
                                                
                                                <select  className="form-control"
                                                            name="links_font"
                                                            id="links_font"
                                                            type="text"
                                                            value={links_font}
                                                            onChange={ updateInput }
                                                            >
                                                            {
                                                            fontFamilies.map( (ff, idx ) => (
                                                                <>
                                                                    <option style={{'font-family': ff }} value={ff}>{ff}</option>
                                                                </>
                                                                )
                                                            )}
                                                </select>
                                            </div>

                                            <div className="form-group col-md-4">
                                                <label>Color:</label>
                                                <input  className="form-control"
                                                        name="links_color"
                                                        id="links_color"
                                                        type="color"
                                                        value={links_color}
                                                        onChange={ updateInput }
                                                        />
                                            </div>
                                            
                                                    
                                            <div className="form-group">
                                                <label>Weight:</label>
                                                
                                                <div className="btn-group  w-100" role="group">
                                                    {
                                                        fontWeights.map( (fw, idx ) => (
                                                    <>
                                                        <input key={idx} type="radio" className="btn-check" name="links_weight"
                                                                id={`links_weight_${idx}`} value={fw}
                                                                onChange={ updateInput }
                                                                />
                                                        <label  className={`btn btn-outline-secondary ${(fw==links_weight)?' active' : ' '}`}
                                                                htmlFor={`links_weight_${idx}`}>{fw}</label>

                                                    </>
                                                        ) )
                                                    }
                                                </div>

                                            </div>
                                        </div>         
                                                    
                                        
                                        </div>

                                      </div>

                                    </div>
                                </div>

                            </div>
    
                        </form>


                        {/* {JSON.stringify(styles)} */}
                        
                        <div className="card" style={{ backgroundColor: settingsData.background_color}}>
                            <h5 style={ STYLES.HEADING }>Preview</h5>
                            <h6 style={{ fontFamily: settingsData.headings_font, color: settingsData.headings_color }}>Headings</h6>
                            <p style={{ fontFamily: settingsData.body_font, color: settingsData.body_color}}>Demo body content</p>
                            <a style={{ fontFamily: settingsData.links_font, color: settingsData.links_color}} href="#">Demo link content</a>
                        </div>
            
                        <hr />

                    </div>
                </div>

               </div>
            </section>
          )
}

export default Settings