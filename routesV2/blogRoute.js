const express = require('express');
const blogController = require('../controllersV2/blogController');
const uploadController = require('../controllersV2/fileUploadController');
const authController = require('../controllers/adminController');

const router = express.Router();

router.route('/user/:slug').get(blogController.getBlogDetailsBySlug);
router.route('/user').get(blogController.getBlogsByUser);
router
	.route('/:id')
	.patch(
		authController.protect,
		uploadController.uploadBlogImage,
		blogController.updateBlogDetails
	)
	.get(authController.protect, blogController.getBlogDetails);
router
	.route('/')
	.post(
		authController.protect,
		uploadController.uploadBlogImage,
		blogController.addBlog
	)
	.get(authController.protect, blogController.getBlogs);

module.exports = router;
