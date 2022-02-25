import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from '../../config/config'

const Theme = () => {

const [ themeInfo, setThemeInfo ] = useState({
        heading: {},
        body: {},
        link: {}
    });

    const getThemeSetting = () => {
        axios.get(`${API_BASE_URL}/setting/${process.env.REACT_APP_SITE_SETTING_ID}`).then( res=> {
            
            console.log("Res", res)
            setThemeInfo(res.data)

        }).catch( err=> {
            console.log("Err", err )
        })
    }


    useEffect(()=> {
        getThemeSetting()
    }, [])

    return (
        <div>DD</div>
    );


}

export default Theme;

export const STYLES = {
    HEADING: {
        color: '#00aa00'
    }
};
