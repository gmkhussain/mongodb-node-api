const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  password: {
    type: String,
  },
  contact_number: {
    type: String,
  },
  location: {
    type: String,
  },
  updated_at: {
    type: String
  }
})

module.exports = mongoose.model('User', userSchema)