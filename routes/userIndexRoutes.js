const express = require('express');
const router = express.Router();
const { uploadVideo, redirectToVideo } = require('../controller/videoController');
const multer = require('multer');
const validateToken = require('../middleware/validateJwt');
const path = require('path');

router.get('/index', (req, res) => {
	res.render('user_index');
});

router.get('/redirect-to-video', validateToken, redirectToVideo);

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/');
	},
	filename: (req, file, cb) => {
		const extension = path.extname(file.originalname);
		cb(null, `${Date.now()}${extension}`);
	}
});

const upload = multer({ storage: storage });
router.post('/uploadVideo', validateToken, upload.single('uploadFile'), uploadVideo);

module.exports = router;
