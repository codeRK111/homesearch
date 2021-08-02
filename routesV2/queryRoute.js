const express = require('express');
const queryController = require('../controllersV2/queryController');
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');

const router = express.Router();

// Admin
router.post(
	'/get-all-queries',
	adminController.protect,
	queryController.getQueries
);
router.get(
	'/details/:id',
	adminController.protect,
	queryController.getQueryDetails
);

// User
router
	.route('/')
	.post(authController.protect, queryController.addQuery)
	.get(authController.protect, queryController.getUserQueries);

module.exports = router;
