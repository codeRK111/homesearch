const express = require('express');
const savedPropertyController = require('../controllersV2/savedPropertyController');
const authController = require('../controllers/authController');

const router = express.Router();

router
	.route('/')
	.get(authController.protect, savedPropertyController.getMyViewedProperties)
	.post(authController.protect, savedPropertyController.saveProperty);

module.exports = router;
