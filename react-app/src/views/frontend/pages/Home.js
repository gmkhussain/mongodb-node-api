import React, { useEffect, useState } from 'react'

import axios from 'axios'

import { API_BASE_URL } from '../../../config/config'

const Home = () => {

   const [homePage, setHomePage] = useState({
      data: [],
      loading: false
   });

   const getUsers = () => {
      
      axios.get(`${API_BASE_URL}/pages/${process.env.REACT_APP_PAGE_HOME_ID}`).then( res=> {

         console.log("Home", res )
         setHomePage({ data: res.data, loading: false })

      }).catch( err=> {
         console.log("Err", err )
      })
   }


   // When loaded
   useEffect( ()=> {
      getUsers();
   }, [])



    const { data } = homePage;

        return (
            <section className="home-page">
               <div className="container">

                  { data.length !== 0 ? ( // if data found
                     <>
                        <h4>{ data.title }</h4>
                        <p>{ data.content }</p>
                     </>
                  ) : (
                     <>
                        <p>Try again!</p>
                     </>
                  ) }
                  
               </div>
            </section>
          )
}

export default Home