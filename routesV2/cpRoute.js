const express = require('express');
const cpController = require('../controllersV2/cpController');
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');
const router = express.Router();

router.route('/user').post(authController.protect, cpController.createCPUser);
router.route('/login').post(cpController.cpLogin);

router.get('/getCpInfo', cpController.protect, cpController.getCPInfo);

router
	.route('/:id')
	.get(adminController.protect, cpController.getCpDetails)
	.patch(adminController.protect, cpController.updateCpDetails);
router
	.route('/')
	.get(adminController.protect, cpController.getCPs)
	.post(adminController.protect, cpController.createCP);

module.exports = router;
