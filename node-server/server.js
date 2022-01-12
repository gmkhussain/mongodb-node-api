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

const settingRouter = require('./src/settings/settings.route')
app.use('/settings', settingRouter)

// API URL: localhost:4000
app.listen(4000, () => console.log('Server Started -> localhost:4000'))