const express = require('express');
const queryController = require('../controllers/propertyQueryController');
const authController = require('../controllers/authController');

const router = express.Router();
router
	.route('/get-queries')
	.post(authController.protect, queryController.getQueries);
router.route('/').post(authController.protect, queryController.addQuery);

module.exports = router;
