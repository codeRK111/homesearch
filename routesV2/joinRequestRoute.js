const express = require('express');
const adminController = require('../controllers/adminController');
const requestController = require('../controllersV2/joinRequestController');

const router = express.Router();

// User
router.route('/user/verify/:id/:otp').get(requestController.verifyRequest);
router.route('/user').post(requestController.addRequest);

// Admin
router
	.route('/admin/:id')
	.patch(adminController.protect, requestController.updateRequest);
router
	.route('/admin')
	.get(adminController.protect, requestController.getRequests);

module.exports = router;
