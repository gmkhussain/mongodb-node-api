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
app.use(
    cors({
        origin: "*",
    })
);
  
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
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


// API URL: localhost:4000
app.listen(4000, () => console.log('Server Started -> localhost:4000'))