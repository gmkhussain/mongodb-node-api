import React from 'react'

// 3rd Party Lib
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

// Styles
import './App.css';

// Layouts
import DefaultLayout from './views/frontend/layouts/DefaultLayout';
// Pages
import Home from './views/frontend/pages/Home'
import Login from './views/frontend/pages/Login'

// Admin Layouts
import DashboardLayout from './views/backend/layouts/DashboardLayout';
// Admin Pages
import Dashboard from './views/backend/pages/Dashboard';
import Settings from './views/backend/pages/Settings';


function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <DefaultLayout>
              <Home />
            </DefaultLayout>
          </Route>
          <Route exact path="/contact">
            <p>Contact works</p>
          </Route>

          <Route exact path="/login">
            <DefaultLayout>
              <Login />
            </DefaultLayout>
          </Route>


          <Route exact path="/dashboard">
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </Route>

          <Route exact path="/settings">
            <DashboardLayout>
              <Settings />
            </DashboardLayout>
          </Route>
          
        </Switch>
      </Router>
    </div>
  );
}

export default App;
