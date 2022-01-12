const jwt = require('jsonwebtoken')

require('dotenv').config()

const express = require('express')
const router = express.Router()


// Fetch All Users for testing...
router.get('/', async (req, res) => {
  
    res.json("Works fine...")
  
})


module.exports = router
