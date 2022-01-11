import React from 'react'

// 3rd Party Lib
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

// Styles
import './App.css';

// Layouts
import DefaultLayout from './views/frontend/layouts/DefaultLayout';

// Pages
import Home from './views/frontend/pages/Home'


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
        </Switch>
      </Router>
    </div>
  );
}

export default App;
