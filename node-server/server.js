require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())



const usersRouter = require('./src/users/users.route')
app.use('/users', usersRouter)

const authRouter = require('./src/auth/auth.route')
app.use('/auth', authRouter)

// API URL: localhost:3000
app.listen(4000, () => console.log('Server Started -> localhost:4000'))