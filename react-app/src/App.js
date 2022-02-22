// React stuff
import React, { useContext } from 'react'
import { StateContext } from './context/State' 

// 3rd Party Lib
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap"; // <-- JS File

// Styles
import './App.css';

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

function App() {

  const { myContext } = useContext(StateContext)

  console.log( "Data from context >", myContext )

  return (
    <div className="App">
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

          <Route exact path="/">
            <PlainLayout>
              <Login />
            </PlainLayout>
          </Route>
          <Route exact path="/login">
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
    </div>
  );
}

export default App;
