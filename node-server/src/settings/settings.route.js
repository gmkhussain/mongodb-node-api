const express = require('express')
const router = express.Router()
const Setting = require('./settings.model')

 

// for site_logo
const multer = require("multer")





// Getting all
router.get('/', async (req, res) => {
  try {
    const settings = await Setting.find()
    res.json(settings)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})








// Getting One
router.get('/:id', getSetting, (req, res) => {
  res.json(res.setting)
})






// const siteLogoRouter = require('./src/settings/logo.route.js')
// app.use('/settings/update-logo', siteLogoRouter)













// Site Logo :: NOTE Upload manage from differnt file
var fileStorage = multer.diskStorage({
  destination: ( req, file, cb) => {
    cb(null, "./uploads/logos");
  },
  filename: ( req, file, cb ) => {
    cb( null, Date.now() +"-"+ file.originalname );
  }
});

var upload = multer( { storage: fileStorage } );




router.post("/site_logo", upload.single("site_logo_url"), (req, res) => {


    try {
      if (req.file) {

        console.log("Upload from setting")
     
        res.send({
          status: true,
          message: "File Uploaded!",
        });
      } else {
        res.status(400).send({
          status: false,
          data: "File Not Found :(",
        });
      }
    } catch (err) {
      res.status(500).send(err);
    }

});







// Updating One
router.patch('/:id', upload.single("site_logo_url"), getSetting, async (req, res) => {

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");

  console.clear()

  console.log( "<->", req.body.site_name )
  console.log( "<->", req.body.site_logo_url )
  if (req.file) {
    console.log("🌈 Image Uploaded")
    // console.log(req)
    res.setting.site_logo_url = req.file.path // save file location
  }

  // console.log(res.setting)

  // Site Info
  if (req.body.site_name != null) {
    res.setting.site_name = req.body.site_name
  }
  if( req.body.site_desc != null ) {
    res.setting.site_desc = req.body.site_desc
  }
  
  // Logos
  // if( req.body.site_logo_url != null ) {
  //   res.setting.site_logo_url = req.body.site_logo_url
  // }
  if( req.body.site_logo_inactive_url != null ) {
    res.setting.site_logo_inactive_url = req.body.site_logo_inactive_url
  }
  if( req.body.favicon_url != null ) {
    res.setting.favicon_url = req.body.favicon_url
  }

   
  // Intro
  if( req.body.intro_shape_svg_1 != null ) {
    res.setting.intro_shape_svg_1 = req.body.intro_shape_svg_1
  }
  if( req.body.intro_shape_svg_2 != null ) {
    res.setting.intro_shape_svg_2 = req.body.intro_shape_svg_2
  }


  // Cursor
  if( req.body.cursor_icon_svg != null ) {
    res.setting.cursor_icon_svg = req.body.cursor_icon_svg
  }

  if( req.body.cursor_circle_size != null ) {
    res.setting.cursor_circle_size = req.body.cursor_circle_size
  }

  if( req.body.cursor_circle_color != null ) {
    res.setting.cursor_circle_color = req.body.cursor_circle_color
  }

  if( req.body.cursor_circle_text != null ) {
    res.setting.cursor_circle_text = req.body.cursor_circle_text
  }

  if( req.body.cursor_blend_mode != null ) {
    res.setting.cursor_blend_mode = req.body.cursor_blend_mode
  }



  // Background
  if( req.body.background_color != null ) {
    res.setting.background_color = req.body.background_color
  }

  if( req.body.background_image_url != null ) {
    res.setting.background_image_url = req.body.background_image_url
  }



  // Heading
  if( req.body.headings_font != null ) {
    res.setting.headings_font = req.body.headings_font
  }

  if( req.body.headings_weight != null ) {
    res.setting.headings_weight = req.body.headings_weight
  }
  
  if( req.body.headings_color != null ) {
    res.setting.headings_color = req.body.headings_color
  }


  // Body
  if( req.body.body_font != null ) {
    res.setting.body_font = req.body.body_font
  }

  if( req.body.body_weight != null ) {
    res.setting.body_weight = req.body.body_weight
  }
  
  if( req.body.body_color != null ) {
    res.setting.body_color = req.body.body_color
  }



   // Links
   if( req.body.links_font != null ) {
    res.setting.links_font = req.body.links_font
  }

  if( req.body.links_weight != null ) {
    res.setting.links_weight = req.body.links_weight
  }
  
  if( req.body.links_color != null ) {
    res.setting.links_color = req.body.links_color
  }


  
  try {
    const updatedSetting = await res.setting.save()
    res.json(updatedSetting)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})





async function getSetting(req, res, next) {
  let setting
  try {
    setting = await Setting.findById(req.params.id)
    if (setting == null) {
      return res.status(404).json({ message: 'Cannot find setting' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message + "~ Setting" })
  }

  res.setting = setting
  next()
}




module.exports = router