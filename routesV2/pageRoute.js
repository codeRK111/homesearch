const express = require('express');
const pageController = require('../controllersV2/pageController');
const authController = require('../controllers/authController');

const router = express.Router();

router
	.route('/user/profile')
	.get(authController.protect, pageController.getPageInfo);

module.exports = router;
