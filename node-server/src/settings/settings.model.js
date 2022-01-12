const mongoose = require('mongoose')

const settingSchema = new mongoose.Schema({
  site_name: {
    type: String,
    // required: true
  },
  site_desc: {
    type: String,
    // required: true
  },
  site_logo: {
      data: Buffer,
      contentType: String
  }
})

module.exports = mongoose.model('Setting', settingSchema)