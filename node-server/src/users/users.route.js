const express = require('express')
const router = express.Router()
const User = require('./users.model')




// Getting all
router.get('/', async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})




// Search Route
router.post('/find', async (req, res) => {
  User.find({}, { username: req.body.username }, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
})




// Getting One
router.get('/:id', getUser, (req, res) => {
  res.json(res.user)
})





// Creating one
router.post('/', async (req, res) => {
  
  const users = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })

  // return res.status.json(users);
  try {
    const newUser = await users.save()
    res.status(201).json(newUser)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})






// Updating One
router.patch('users/:id', getUser, async (req, res) => {
  if (req.body.name != null) {
    res.user.name = req.body.name
  }
  if (req.body.email != null) {
    res.user.email = req.body.email
  }
  try {
    const updatedUser = await res.user.save()
    res.json(updatedUser)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})






// Deleting One
router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.remove()
    res.json({ message: 'Deleted user' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getUser(req, res, next) {
  let user
  try {
    user = await User.findById(req.params.id)
    if (user == null) {
      return res.status(404).json({ message: 'Cannot find user' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message + "~" })
  }

  res.user = user
  next()
}




module.exports = router