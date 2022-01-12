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




// Getting One
router.get('/:id', getSetting, (req, res) => {
  res.json(res.setting)
})





// Updating One
router.patch('/:id', getSetting, async (req, res) => {
  if (req.body.site_name != null) {
    res.setting.site_name = req.body.site_name
  }
  if( req.body.site_desc ) {
    res.setting.site_desc = req.body.site_desc
  }
  if(req.body.site_logo) {
    res.setting.site_logo = req.body.site_logo
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