const mongoose = require('mongoose')

const pageSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  content: {
    type: String,
  },
  status: {
    type: String
  }
})

module.exports = mongoose.model('Pages', pageSchema)