const express = require('express');
const leadController = require('../controllersV2/leadStrategyController');
const uploadController = require('../controllersV2/fileUploadController');
const authController = require('../controllers/adminController');

const router = express.Router();

router
	.route('/')
	.get(authController.protect, leadController.getMyStrategies)
	.post(
		authController.protect,
		uploadController.uploadLeadStrategy,
		leadController.addLeadStrategy
	);

module.exports = router;
