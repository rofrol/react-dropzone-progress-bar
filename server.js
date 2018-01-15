const express = require('express');
const multer = require('multer');
const crypto = require('crypto');
//const path = require('path');
const mime = require('mime');

const upload_simple = multer({
  dest: 'uploads/' // this saves your file into a directory called "uploads"
});

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
    });
    //cb(null, file.fieldname + '-' + Date.now() + '.' + path.extname(file.originalname));
  }
});

// use to this if you need control of file name
const upload = multer({ storage });

const app = express();

// Add headers
app.use(function (req, res, next) {

      // Website you wish to allow to connect
      res.setHeader('Access-Control-Allow-Origin', '*');

      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

      // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader('Access-Control-Allow-Credentials', true);

      // Pass to next layer of middleware
      next();
  });

// `app.get('/', handler)` needed for CORS
app.get('/', (req, res) => {
  res.sendStatus(200);
});

// It's very crucial that the file name matches the name attribute in your html
app.post('/', upload.single('files[]'), (req, res) => {
  res.status(200).send(req.file);
});

app.listen(3001);
