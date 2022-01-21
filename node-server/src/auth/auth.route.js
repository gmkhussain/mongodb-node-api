const jwt = require('jsonwebtoken')

require('dotenv').config()

const express = require('express')
const router = express.Router()
const NewUser = require('./auth.model')
  


// Fetch All Users for testing...
router.get('/', async (req, res) => {
  try {
    const users = await NewUser.find()
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})




let refreshTokens = []

router.post('/token', (req, res) => {
  const refreshToken = req.body.token
  if (refreshToken == null) return res.sendStatus(401)
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    const accessToken = generateAccessToken({ name: user.name })
    res.json({ accessToken: accessToken })
  })
})






router.delete('/logout', (req, res) => {

  const { token } = req.body;

  refreshTokens = refreshTokens.filter(t => t !== token);

  res.send("Logout successful");
  console.log("Logout successful! ✨ ⚛️")

})






router.post('/login', (req, res) => {

  // Authenticate User  
  return NewUser.findOne({
    username: req.body.username,
    password: req.body.password
  }, (err, user) => {

    if (err) throw err;
 
    if (!user ) {
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      
      const username = req.body.username
      const password = req.body.password

      const user = { name: username, password: password }

      const accessToken = generateAccessToken(user)
      const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
      refreshTokens.push(refreshToken)
      res.json({ accessToken: accessToken, refreshToken: refreshToken })

      console.log("logged in successfully ✨ ⚛️")

    }
  });
})


function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
}

module.exports = router
