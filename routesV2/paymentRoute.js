const express = require('express');
const paymentController = require('../controllersV2/paymentController');
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');

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
	adminController.protect,
	paymentController.getSubscriptions
);
router.post(
	'/create-payment-link',
	adminController.protect,
	paymentController.createPaymentLink
);

module.exports = router;
