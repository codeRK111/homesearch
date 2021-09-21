const express = require('express');
const blogController = require('../controllersV2/blogController');
const uploadController = require('../controllersV2/fileUploadController');
const authController = require('../controllers/adminController');

const router = express.Router();

router
	.route('/')
	.post(
		authController.protect,
		uploadController.uploadBlogImage,
		blogController.addBlog
	);

module.exports = router;
