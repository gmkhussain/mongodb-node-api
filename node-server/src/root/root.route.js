const jwt = require('jsonwebtoken')

require('dotenv').config()

const express = require('express')
const router = express.Router()



const bcrypt = require('bcrypt')

const hash = bcrypt.hash("<myPassword>", 12) // this returns a promise 
const hashSync = bcrypt.hashSync("<myPasword>", 12)

// Fetch All Users for testing...
router.get('/', async (req, res) => {
  
    res.json("Works fine..."+ hashSync)
  
})


module.exports = router
