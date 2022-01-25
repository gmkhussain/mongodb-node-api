import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from '../../../config/config'

const Theme = () => {

    const [ themeInfo, setThemeInfo ] = useState();

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

  

}

export default Theme

export const STYLES = {color: '#dd0000'};
