const express = require('express')
const router = express.Router()
const Setting = require('./settings.model')




// Getting all
router.get('/', async (req, res) => {
  try {
    const settings = await Setting.find()
    res.json(settings)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})






// Updating One
// router.patch('/', async (req, res) => {
  
//   if (req.body.site_name != null) {
//     res.setting.site_name = req.body.site_name
//   }

//   try {
//     // const settings = {
//     //   site_name: req.body.site_name
//     // }

//     const updatedSetting = await setting.save()
//     res.json(updatedSetting)
    
//   } catch (err) {
//     res.status(500).json({ message: err.message })
//   } 

// })







async function getSetting(req, res, next) {
  let setting
  try {
    setting = await Setting.findById(req)
    if (setting == null) {
      return res.status(404).json({ message: 'Cannot find setting' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message + "~" })
  }

  res.setting = setting
  next()
}




module.exports = router