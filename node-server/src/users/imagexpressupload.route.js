const express = require('express')
const router = express.Router()

const fileUpload = require('express-fileupload');
// default options
router.use(fileUpload());


router.post('/', function(req, res) {

    // res.send('File uploaded!');
    
    
    console.log("DDDDDXD")
    let sample_file = req.files['uploads[]'];
    sample_file.mv();
 
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
 
  sample_file = req.files.sample_file;
  uploadPath = __dirname + './uploads/';

  // Use the mv() method to place the file somewhere on your server
  sample_file.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
});

module.exports = router