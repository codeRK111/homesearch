const express = require('express');
const adminController = require('../controllersV2/adminController');
const adminControllerV1 = require('../controllers/adminController');

const router = express.Router();

// Get All Admins
router.route('/').post(adminControllerV1.protect, adminController.getAdmins);
router
	.route('/:id')
	.patch(adminControllerV1.protect, adminController.updateAdmin);

// User
// router
// 	.route('/')
// 	.post(authController.protect, queryController.addQuery)
// 	.get(authController.protect, queryController.getUserQueries);

module.exports = router;
