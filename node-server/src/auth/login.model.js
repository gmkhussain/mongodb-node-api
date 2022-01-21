const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  email_verfiy: {
    type: String,
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
  image: {
    type: String,
  },
  created_at: {
    type: String
  },
  updated_at: {
    type: String
  },
  status: {
    type: String
  }
})

module.exports = mongoose.models['Users'] || mongoose.model('User', userSchema)