const express = require('express');
const adminController = require('../controllersV2/adminController');
const adminControllerV1 = require('../controllers/adminController');

const router = express.Router();

// Get All Admins
router.route('/login').post(adminController.staffLogin);

// User
// router
// 	.route('/')
// 	.post(authController.protect, queryController.addQuery)
// 	.get(authController.protect, queryController.getUserQueries);

module.exports = router;
