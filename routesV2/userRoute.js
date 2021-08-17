const express = require('express');
const userController = require('../controllersV2/userController');
const adminController = require('../controllers/adminController');
const authController = require('../controllers/authController');
const uploadController = require('../controllersV2/fileUploadController');

const router = express.Router();

// Admin
router
	.route('/by-admin/create')
	.post(
		adminController.protect,
		uploadController.uploadProfile,
		userController.addUser
	);
router
	.route('/by-admin/:id')
	.patch(
		adminController.protect,
		uploadController.uploadProfile,
		userController.updateUser
	);
router
	.route('/by-user/:id')
	.patch(
		authController.protect,
		uploadController.uploadProfile,
		userController.updateMyProfile
	);
router
	.route('/by-admin')
	.post(adminController.protect, userController.getUsers);

// User
// router
// 	.route('/')
// 	.post(authController.protect, queryController.addQuery)
// 	.get(authController.protect, queryController.getUserQueries);

module.exports = router;
