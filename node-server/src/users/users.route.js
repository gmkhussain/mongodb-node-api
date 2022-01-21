const express = require('express')
const router = express.Router()
const User = require('./users.model')

const currentDateTime = require('../util/_date')





// User List API with Pagination
async function getUserWithPagination(pageSize=1, page=1) {

  const users = await User.find({}).limit(pageSize).skip(pageSize * page);;
  // console.log('Users:::', users);
  return users;
}

// Getting all
router.get('/', async (req, res) => {

  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

    
  res.setHeader('total', (await User.find()).length );
  res.setHeader('total-pages', Math.ceil( 
                                  ( (await User.find()).length ) / pageSize )
                                );


  try {
    const usersList = await getUserWithPagination(pageSize, page);
    res.json( usersList )
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})




// Search Route
router.post('/find', async (req, res) => {
  User.find({}, {
          username: req.body.username 
        }, function(err, result) {
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





// Creating one / Sign Up
router.post('/signup', async (req, res) => {
  
  const users = new User({
    username: req.body.username,
    email: req.body.email,
    email_verfiy: '',
    password: req.body.password,
    contact_number: req.body.contact_number,
    location: req.body.location,
    image: req.body.image,
    created_at: currentDateTime,
    updated_at: currentDateTime,
    status: '1'
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
router.patch('/:id', getUser, async (req, res) => {

  if (req.body.contact_number != null) {
    res.user.contact_number = req.body.contact_number
  }

  if (req.body.location != null) {
    res.user.location = req.body.location    
  }

  // Date / Time / Now
  res.user.updated_at = currentDateTime;

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
    res.json({ message: 'Deleted user', info: res.user  })
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