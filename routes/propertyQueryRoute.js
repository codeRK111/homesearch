const express = require('express');
const queryController = require('../controllers/propertyQueryController');
const authController = require('../controllers/authController');

const router = express.Router();
router.route('/test-sms').get(queryController.sendTest);
router
	.route('/get-queries')
	.post(authController.protect, queryController.getQueries);
router.route('/validate-otp').post(queryController.validateOTP);
router.route('/').post(queryController.addQuery);

module.exports = router;
