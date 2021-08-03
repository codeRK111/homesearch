const express = require('express');
const pageController = require('../controllersV2/pageController');
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');

const router = express.Router();

router
	.route('/user/profile')
	.get(authController.protect, pageController.getPageInfo);
router.get(
	'/project/add-project',
	adminController.protect,
	pageController.getAddProjectPageInfo
);

module.exports = router;
