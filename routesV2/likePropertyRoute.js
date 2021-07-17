const express = require('express');
const likedPropertyController = require('../controllersV2/likedPropertyController');
const authController = require('../controllers/authController');

const router = express.Router();

router
	.route('/get-property-likes')
	.post(likedPropertyController.getLikesOfAProperty);

router
	.route('/')
	.get(authController.protect, likedPropertyController.getMyLikedProperties)
	.post(authController.protect, likedPropertyController.likeProperty);

module.exports = router;
