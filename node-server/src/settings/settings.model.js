const mongoose = require('mongoose')

const settingSchema = new mongoose.Schema({
  site_name: {
    type: String,
    // required: true
  }
})

module.exports = mongoose.model('Setting', settingSchema)