const express = require('express');
const router = express.Router();
const path = require('path');
const validateToken = require('../middleware/validateJwt');
const { uploadVideo } = require('../controller/videoController');

router.get('/index', validateToken, (req, res) => {
  res.render('user_index');
});

router.get('/redirect-to-video', validateToken, (req, res) => {
  res.render('video'); 
});

router.post('/uploadVideo', validateToken, uploadVideo )

module.exports = router;
