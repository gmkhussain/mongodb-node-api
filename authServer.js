
const jwt = require('jsonwebtoken')

require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

const User = require('./src/users/users.model')


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())





let refreshTokens = []

app.post('/token', (req, res) => {
  const refreshToken = req.body.token
  if (refreshToken == null) return res.sendStatus(401)
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    const accessToken = generateAccessToken({ name: user.name })
    res.json({ accessToken: accessToken })
  })
})

app.delete('/logout', (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.sendStatus(204)
})


app.post('/login', (req, res) => {

  // Authenticate User
  // return User.findOne({}, { username: req.body.username }, function(err, result) {
    
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     res.json(result.username);
  //   }
  // });
  





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


    

  // return res.json({"dd": "dd" });



})

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
}

app.listen(4000)