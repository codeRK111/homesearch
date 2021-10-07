const express = require('express');
const adminController = require('../controllersV2/adminController');
const adminControllerV1 = require('../controllers/adminController');

const router = express.Router();

// Get All Admins
router.route('/logout').get(adminControllerV1.protect, adminController.logout);
router
	.route('/targets')
	.get(adminControllerV1.protect, adminController.getMyTargets);
router
	.route('/:id')
	.patch(adminControllerV1.protect, adminController.updateAdmin);
router.route('/').post(adminControllerV1.protect, adminController.getAdmins);

// User
// router
// 	.route('/')
// 	.post(authController.protect, queryController.addQuery)
// 	.get(authController.protect, queryController.getUserQueries);

module.exports = router;
