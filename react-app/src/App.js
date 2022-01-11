import React from 'react'

// 3rd Party Lib
import { BrowserRouter as Router, Switch, Route} from "react-router-dom"

import './App.css';

import Home from './Home'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
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
