const mongoose = require('mongoose')

const settingSchema = new mongoose.Schema({
  site_name: { type: String },
  site_desc: { type: String },
  site_logo: {
      data: Buffer,
      contentType: String
  },
  site_logo_url: { type: String },
  site_logo_inactive_url: { type: String },
  favicon_url: { type: String },

  site_logo_svg: { type: String },
  site_logo_inactive_svg: { type: String },

  intro_shape_svg_1: { type: String },
  intro_shape_svg_2: { type: String },

  cursor_icon_url: { type: String },
  cursor_icon_svg: { type: String },
  cursor_circle_size: { type: String },
  cursor_circle_color: { type: String },
  cursor_circle_text: { type: String },
  cursor_blend_mode: { type: Boolean },
  
  background_color: { type: String },
  background_image_url: { type: String },
  
  headings_font: { type: String },
  headings_weight: { type: String },
  headings_color: { type: String },
  
  body_font: { type: String },
  body_weight: { type: String },
  body_color: { type: String },

  links_font: { type: String },
  links_weight: { type: String },
  links_color: { type: String },
  
})

module.exports = mongoose.model('Setting', settingSchema)