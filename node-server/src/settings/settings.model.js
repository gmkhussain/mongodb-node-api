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
  },
  site_logo_url: {
    type: String
  },
  headings_color: {
    type: String
  },
  headings_font: {
    type: String
  }
})

module.exports = mongoose.model('Setting', settingSchema)