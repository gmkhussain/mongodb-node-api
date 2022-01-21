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




router.post("/site_logo", upload.single("site_logo"), (req, res) => {


    try {
      if (req.file) {

        console.log("HHHHHHHHHHH")
     
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
router.patch('/:id', upload.single("site_logo"), getSetting, async (req, res) => {

  if (req.file) {
    console.log("🌈 Image Uploaded")
    // console.log(req)
    res.setting.site_logo_url = req.file.path // save file location
  }
  

  if (req.body.site_name != null) {
    res.setting.site_name = req.body.site_name
  }
  if( req.body.site_desc ) {
    res.setting.site_desc = req.body.site_desc
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