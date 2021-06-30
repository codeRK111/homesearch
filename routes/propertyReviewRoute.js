const express = require('express');
const reviewController = require('../controllers/propertyReviewController');
const authController = require('../controllers/authController');

const router = express.Router();
router
	.route('/add-review')
	.post(authController.protect, reviewController.addReview);
router.route('/get-reviews/:id').get(reviewController.getReviews);

module.exports = router;
