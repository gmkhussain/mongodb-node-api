const jwt = require('jsonwebtoken')

require('dotenv').config()

const express = require('express')
const router = express.Router()
const User = require('../users/users.model')



// Fetch All Users for testing...
router.get('/', async (req, res) => {
  try {
    const users = await User.find()
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
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.sendStatus(204)
})






router.post('/login', (req, res) => {

  // Authenticate User  
  return User.findOne({
    username: req.body.username
  }, (err, user) => {
    if (err) throw err;
 
    if (!user) {
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // res.json({ "na": "asd" })
      // check if password matches
      // user.comparePassword(req.body.password,  (err, isMatch) => {
      //   if (isMatch && !err) {
      //     // if user is found and password is right create a token
      //     var token = jwt.sign(user.toJSON(), config.secret,{ expiresIn: '30m' });
      //     // return the information including token as JSON
      //     res.json({success: true, token: 'JWT ' + token});
      //   } else {
      //     res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
      //   }
      // });
      
      const username = req.body.username
      const user = { name: username }

      const accessToken = generateAccessToken(user)
      const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
      refreshTokens.push(refreshToken)
      res.json({ accessToken: accessToken, refreshToken: refreshToken })

    }
  });
})


function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
}

module.exports = router
// router.listen(4000)