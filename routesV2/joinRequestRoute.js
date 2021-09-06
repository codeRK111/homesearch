const express = require('express');
const adminController = require('../controllers/adminController');
const requestController = require('../controllersV2/joinRequestController');

const router = express.Router();

// User
router.route('/user/verify/:id/:otp').get(requestController.verifyRequest);
router.route('/user').post(requestController.addRequest);

// Admin
// router
// 	.route('/admin/:id')
// 	.patch(adminController.protect, reviewController.updateReview);
// router
// 	.route('/admin')
// 	.get(adminController.protect, reviewController.getReviews)
// 	.post(adminController.protect, reviewController.addReview);

module.exports = router;
