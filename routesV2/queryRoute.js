const express = require('express');
const queryController = require('../controllersV2/queryController');
const authController = require('../controllers/authController');

const router = express.Router();

router
	.route('/')
	.get(authController.protect, queryController.getQueries)
	.post(authController.protect, queryController.addQuery);

module.exports = router;
