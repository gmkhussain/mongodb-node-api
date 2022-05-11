const express = require('express')
const router = express.Router()
const Setting = require('./settings.model')

const path = require('path')
var FormData = require('form-data');

const Agent = require('agentkeepalive');
const agent = new Agent();

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
    cb(null, "./uploads");
  },
  filename: ( req, file, cb ) => {
    //cb( null, Date.now() +"-"+ file.fieldname + "." + path.extname(file.originalname) );
    cb( null, Date.now() +"-"+ file.originalname );
  }
});

var upload = multer( { storage: fileStorage } );

// upload.fields([
//   { name:"site_logo_url", maxCount: 1 },
//   { name:"site_logo_inactive_url", maxCount: 1 }
// ] ),

// Not in use
// router.post("/site_logo", upload.single("site_logo_url"), (req, res) => {

//     try {
//       if (req.file) {

//         console.log("Upload from setting")
     
//         res.send({
//           status: true,
//           message: "File Uploaded!",
//         });
//       } else {
//         res.status(400).send({
//           status: false,
//           data: "File Not Found :(",
//         });
//       }
//     } catch (err) {
//       res.status(500).send(err);
//     }

// });





//upload.single("site_logo_url")

// upload.fields([
//   { name:"site_logo_url", maxCount: 1 },
//   { name:"site_logo_inactive_url", maxCount: 1 }
// ] )

// Updating One
// router.post -> to -> router.patch 
router.post('/:id',

  upload.fields([
    { name:"site_logo_inactive_url" },
    { name:"site_logo_url"},
    { name:"favicon_url"},
    { name:"cursor_icon_url"},
    { name:"intro_shape_url_1"},
    { name:"intro_shape_url_2"},
    { name:"video_url_1"},
    { name:"background_image_url"},
  ] )

  , getSetting,  async (req, res) => {

    req.setTimeout(0) // no timeout
    // const form = new FormData();
          // form.append('image2.png', fs.readFileSync('./public/image2.png'));
          // console.clear()
          // res.setHeader('Content-Type', 'multipart/form-data');
          // res.setHeader('X-Custom-Header', '123'); // Set header here
      
          // form.pipe(res);

          // console.log("-----", res.setHeader('Content-Type', 'multipart/form-data; boundary=' + form.getBoundary()) )
          // console.log( req.files )
     

          // setTimeout( ()=> {


  if(req.files.site_logo_url) {
    console.log("🌈 Logo 1 Uploaded");
    res.setting.site_logo_url = req.files.site_logo_url[0].path.replaceAll("\\", "/") // save file location
  }

  if(req.files.site_logo_inactive_url) {
    console.log("🌈 Logo 2 Uploaded");
    res.setting.site_logo_inactive_url = req.files.site_logo_inactive_url[0].path.replaceAll("\\", "/") // save file location
  }

  if(req.files.favicon_url) {
    console.log("🌈 favicon Uploaded");
    res.setting.favicon_url = req.files.favicon_url[0].path.replaceAll("\\", "/") // save file location
  }

  if(req.files.cursor_icon_url) {
    console.log("🌈 Cursor Icon Uploaded");
    res.setting.cursor_icon_url = req.files.cursor_icon_url[0].path.replaceAll("\\", "/") // save file location
  }


  if(req.files.intro_shape_url_1) {
    console.log("🌈 intro Shape 1 Uploaded");
    res.setting.intro_shape_url_1 = req.files.intro_shape_url_1[0].path.replaceAll("\\", "/") // save file location
  }

  if(req.files.intro_shape_url_2) {
    console.log("🌈 intro Shape 2 Uploaded");
    res.setting.intro_shape_url_2 = req.files.intro_shape_url_2[0].path.replaceAll("\\", "/") // save file location
  }
  
  if(req.files.video_url_1) {
    console.log("🌈 Video 1 Uploaded");
    res.setting.video_url_1 = req.files.video_url_1[0].path.replaceAll("\\", "/") // save file location
  }

  if(req.files.background_image_url) {
    console.log("🌈 Background Uploaded");
    res.setting.background_image_url = req.files.background_image_url[0].path.replaceAll("\\", "/") // save file location
  }

  

  // Site Info
  if (req.body.site_name != null) {
    res.setting.site_name = req.body.site_name
  }
  if( req.body.site_desc != null ) {
    res.setting.site_desc = req.body.site_desc
  }
  
  // Logos
  if (req.body.site_logo_svg != null) {
    res.setting.site_logo_svg = req.body.site_logo_svg
  }
  if (req.body.site_logo_inactive_svg != null) {
    res.setting.site_logo_inactive_svg = req.body.site_logo_inactive_svg
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

  // if( req.body.background_image_url != null ) {
  //   res.setting.background_image_url = req.body.background_image_url
  // }



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
    const updatedSetting = await res.setting.save();
    
    return res.status(200).send(updatedSetting); // empty
    
    //res.json(updatedSetting)

  } catch (err) {
    
    return res.status(500).send("Error 500"); // empty
    // return res.status(400).json({ message: "Error --> "+err.message })

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
