const express = require('express');
const queryController = require('../controllersV2/queryController');
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');

const router = express.Router();

// Admin
router.post(
	'/user/add-query',
	authController.protect,
	queryController.addQueryV2
);
router.post(
	'/get-all-queries',
	adminController.protect,
	queryController.getQueries
);
router.post(
	'/get-all-user-queries',
	adminController.protect,
	queryController.getUserQueries
);
router.patch(
	'/update-user-query/:id',
	adminController.protect,
	queryController.updateUserQuery
);
router.get(
	'/details/:id',
	adminController.protect,
	queryController.getQueryDetails
);

// User
router
	.route('/agent')
	.post(authController.protect, queryController.addAgentQuery)
	.get(adminController.protect, queryController.getAgentQueries);
router.route('/user').post(queryController.addUserQuery);
router
	.route('/validate-user-query/:id/:otp')
	.get(queryController.verifyUserQuery);
router
	.route('/get-agent-queries')
	.post(adminController.protect, queryController.getAgentQueries);
router
	.route('/agent-response/:queryId')
	.post(adminController.protect, queryController.addAgentMessage);
router
	.route('/')
	.post(authController.protect, queryController.addQuery)
	.get(authController.protect, queryController.getUserPropertyQueries);

module.exports = router;
