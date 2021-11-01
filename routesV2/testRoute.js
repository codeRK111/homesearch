const express = require('express');
const testController = require('../controllersV2/testController');

const router = express.Router();

// Get All Admins
router
	.route('/create-number-validation/:number')
	.get(testController.createValidation);
router
	.route('/check-number-validation/:number/:otp')
	.get(testController.checkValidation);
router.route('/send-otp-on-mail/:otp').get(testController.sendOTPOnMail);

// User
// router
// 	.route('/')
// 	.post(authController.protect, queryController.addQuery)
// 	.get(authController.protect, queryController.getUserQueries);

module.exports = router;
