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
router.get(
	'/pay-by-link/:id',
	authController.protect,
	paymentController.paymentLinkCreateOrder
);
router.post(
	'/buy-tenant-package-success',
	authController.protect,
	paymentController.success
);
router.post(
	'/payment-link-success',
	authController.protect,
	paymentController.paymentLinkSuccess
);
router.get('/payment-link/:id', paymentController.getPaymentLinkDetails);
router.get(
	'/subscription',
	adminController.protect,
	paymentController.getSubscriptions
);
router.get(
	'/payment-links',
	adminController.protect,
	paymentController.getAllLinks
);
router.post(
	'/create-payment-link',
	adminController.protect,
	paymentController.createPaymentLink
);

module.exports = router;
