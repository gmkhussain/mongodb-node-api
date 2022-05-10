// React stuff
import React, { useContext, useEffect, useState } from 'react'

// 3rd Party Lib
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap"; // <-- JS File
import axios from 'axios';


// Styles
import './App.scss';
// import { API_BASE_URL } from './config/config'


// import Context from './context/Context';


// Layouts
import DefaultLayout from './views/frontend/layouts/DefaultLayout';
import PlainLayout from './views/frontend/layouts/PlainLayout';
// Pages
import Home from './views/frontend/pages/Home'
import Login from './views/frontend/pages/Login'
import SignUp from './views/frontend/pages/Signup';

// Admin Layouts
import DashboardLayout from './views/backend/layouts/DashboardLayout';
// Admin Pages
import Dashboard from './views/backend/pages/Dashboard';
import Settings from './views/backend/pages/Settings';
import BackendUsersListing from './views/backend/pages/Users/UserListing'
import BackendAddUser from  './views/backend/pages/Users/AddUser'
import BackendUserDetails from './views/backend/pages/Users/UserDetails';

import BackendPagesListing from './views/backend/pages/Pages/PageListing'
import BackendPageEdit from './views/backend/pages/Pages/PageEdit'

import Context from './context/Context';




function App() {

  const theme = { headings_color: "green" }

  let [ styles, setStyles ] = useState(theme)
  
  
  return (
    <div className="App">
      <Context.Provider value={{styles, setStyles}}>
        <Router>
          <Switch>
            {/* <Route exact path="/">
              <DefaultLayout>
                <Home />
              </DefaultLayout>
            </Route> */}
            <Route exact path="/contact">
              <p>Contact works</p>
            </Route>

            <Route exact path="/logout">
              <p>Logged out!</p>
            </Route>
            <Route exact path="/">
              <PlainLayout>
                <Login />
              </PlainLayout>
            </Route>

            <Route exact path="/signup">
              <DefaultLayout>
                <SignUp />
              </DefaultLayout>
            </Route>


            <Route exact path="/dashboard">
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </Route>

            <Route exact path="/dashboard/settings">
              <DashboardLayout>
                <Settings />
              </DashboardLayout>
            </Route>

            <Route exact path="/dashboard/users">
              <DashboardLayout>
                <BackendUsersListing />
              </DashboardLayout>
            </Route>

            <Route exact path="/add-user">
              <DashboardLayout>
                <BackendAddUser />
              </DashboardLayout>
            </Route>

            <Route path="/dashboard/users/:id">
              <DashboardLayout>
                <BackendUserDetails />
              </DashboardLayout>
            </Route>



            <Route exact path="/dashboard/pages">
              <DashboardLayout>
                <BackendPagesListing />
              </DashboardLayout>
            </Route>

            
            <Route exact path="/dashboard/pages/:id">
              <DashboardLayout>
                <BackendPageEdit />
              </DashboardLayout>
            </Route>

          </Switch>
        </Router>
      </Context.Provider>

      <div className='mockup' style={ { "backgroundImage": `url(${process.env.REACT_APP_IMG})` } }></div>
    </div>
  );
}

export default App;
