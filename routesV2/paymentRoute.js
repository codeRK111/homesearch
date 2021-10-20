const express = require('express');
const paymentController = require('../controllersV2/paymentController');
const authController = require('../controllers/authController');

const router = express.Router();
router.post(
	'/buy-tenant-package',
	authController.protect,
	paymentController.createOrderTenantPackage
);
router.post(
	'/buy-tenant-package-success',
	authController.protect,
	paymentController.success
);
router.get(
	'/subscription',
	authController.protect,
	paymentController.getSubscriptions
);

module.exports = router;
