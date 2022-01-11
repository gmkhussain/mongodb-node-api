## MongoDB for VS Code

- ```https://code.visualstudio.com/docs/azure/mongodb```






## Node Server
- Run ```node server.js```








# React App: Create
- ```npx create-react-app react-app```
- ```cd react-app```
- ```npm start```




#### Create routes
- ```npm install react-router-dom```

- ```npm install react-router-dom --save```


Note: 
```js
 "react-dom": "^17.0.2",
 "react-router-dom": "^5.3.0",
```


#### App.js

```js
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
```








## Layouts

#### Layouts/Default.js
```js
import React from 'react';

const DefaultLayout = ({ children }) => {
    return (
    <React.Fragment>
        <Header />
        <div className="navigationWrapper">
            <main>{children}</main>
        </div>
    </React.Fragment>
    );
};
export default DefaultLayout;
```






#### Layouts/Header.js
```js
import React from 'react'

const Home = () => {

        return (
            <header>
               Header works
            </header>
          )
}

export default Home
```









#### App.js
```js
import React from 'react'

// 3rd Party Lib
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

// Styles
import './App.css';

// Layouts
import DefaultLayout from './views/frontend/layouts/DefaultLayout'; // <-- NEW

// Pages
import Home from './views/frontend/pages/Home'


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <DefaultLayout> 
              <Home /> <!--New-->
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
```