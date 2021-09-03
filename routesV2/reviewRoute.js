const express = require('express');
const adminController = require('../controllers/adminController');
const userController = require('../controllers/authController');
const reviewController = require('../controllersV2/reviewController');

const router = express.Router();

// User
router.route('/user/property/:id').get(reviewController.getReviewsOfAProperty);
router
	.route('/user')
	.get(userController.protect, reviewController.getReviews)
	.post(userController.protect, reviewController.addReview);

// Admin
router
	.route('/admin/:id')
	.patch(adminController.protect, reviewController.updateReview);
router
	.route('/admin')
	.get(adminController.protect, reviewController.getReviews)
	.post(adminController.protect, reviewController.addReview);

module.exports = router;
