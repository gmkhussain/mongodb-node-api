const express = require('express')
const multer = require("multer")
const app = express()

var fileStorage = multer.diskStorage({
        destination: ( req, file, cb) => {
            cb(null, "./uploads");
        },
        filename: ( req, file, cb ) => {
            cb( null, Date.now() + "-" + file.originalname );
        }
    });

var upload = multer( { storage: fileStorage } );

app.post("/single", upload.single("image"), (req, res) => {
    console.log( req.file )
    res.send("File uploaded!");
});



app.listen(5000, () => console.log('Server Started -> http://localhost:5000'))