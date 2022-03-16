require('dotenv').config()


const express = require('express')
const app = express()
const mongoose = require('mongoose')

const cors = require('cors') // Access Control Origin Header error using Axios

const bodyParser = require('body-parser');


// Files / Folders listings on browser
const serveIndex = require('serve-index');

    app.use(express.static(__dirname + "/"))
    app.use('/uploads', serveIndex(__dirname + '/uploads'));


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))




/* Access Control Origin Header error using Axios */
// app.use( cors({ origin: "*", }) );
app.use(cors())


  
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE");
    // res.setHeader('Content-Type', 'multipart/form-data; boundary='+form.getBoundary());
     
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed 

    next();
});
/* Access Control Origin Header error using Axios */


app.use(bodyParser.urlencoded({ extended: false }))
// app.use(express.json())
app.use(bodyParser.json())


// Set EJS as templating engine 
app.set("view engine", "ejs");


const rootRouter = require('./src/root/root.route')
app.use('/', rootRouter )
// app.use('/', express.static('./public2'));


const usersRouter = require('./src/users/users.route')
app.use('/users', usersRouter)


const authRouter = require('./src/auth/auth.route')
app.use('/auth', authRouter)


const settingRouter = require('./src/settings/settings.route')
app.use('/settings', settingRouter)


const userImageRouter = require('./src/users/image.route')
app.use('/updateuserimage', userImageRouter)


const pagesRouter = require('./src/pages/pages.route')
app.use('/pages', pagesRouter)


app.use( function(req, res, next) {
    res.setTimeout(120000, function() {
      console.log('Request has timed out.');
        res.send(408);
      });

      next();
 });
 
// API URL: localhost:4000
app.listen(4000, () => console.log('Server Started -> localhost:4000'))

// var server = app.listen(4000);

// server.on('connection', function(socket) {
//   console.log("A new connection was made by a client.");
//   socket.setTimeout(50 * 1000); 
//   // 40 second timeout. Change this as you see fit.
// });

// server.keepAliveTimeout = 30000;
 