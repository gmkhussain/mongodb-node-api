import React, { useEffect } from 'react'

import axios from 'axios'

const Home = () => {


   const getUsers = () => {
      axios.get(`http://localhost:4000/users`).then( res=> {
         console.log("Res", res )
      }).catch( err=> {
         console.log("Err", err )
      })
   }


   // When loaded
   useEffect( ()=> {
      getUsers();
   }, [])



        return (
            <section>
               Home works
            </section>
          )
}

export default Home