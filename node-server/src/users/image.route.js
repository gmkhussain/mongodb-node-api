const express = require('express')
const router = express.Router()

const multer = require("multer")


var fileStorage = multer.diskStorage({
        destination: ( req, file, cb) => {
            cb(null, "./uploads/");
        },
        filename: ( req, file, cb ) => {
            
            cb( null, Date.now() +"-"+ file.originalname );
        }
    });

var upload = multer( { storage: fileStorage } );


router.post("/", upload.single("image"), (req, res) => {

   // 10 minutes timeout just for POST to myroute
   req.setTimeout(10 * 60 * 1000);
    
    res.send("File uploaded");
    try {    
      if (req.file) {
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


module.exports = router