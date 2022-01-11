## MongoDB for VS Code

- ```https://code.visualstudio.com/docs/azure/mongodb```






## Node Server
- Run ```node server.js```








## Access Control Origin Header error using Axios

- Add ```npm i cros```

#### server.js
```js
require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

const cors = require('cors') // Access Control Origin Header error using Axios



mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))




/* Access Control Origin Header error using Axios */
app.use(
    cors({
        origin: "*",
    })
);
  
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});
/* Access Control Origin Header error using Axios */



app.use(express.json())



const usersRouter = require('./src/users/users.route')
app.use('/users', usersRouter)

const authRouter = require('./src/auth/auth.route')
app.use('/auth', authRouter)

// API URL: localhost:4000
app.listen(4000, () => console.log('Server Started -> localhost:4000'))
```
































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












## Axios: fetch API date

- Note: run ```node server```

#### Home.js
```js
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
```

- [Access Control Origin Header error using Axios](#access-control-origin-header-error-using-axios)