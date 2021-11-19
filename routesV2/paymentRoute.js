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
	'/verify-payment/:paymentId',
	adminController.protect,
	paymentController.verifyPayment
);
router.get(
	'/get-revenue',
	adminController.protect,
	paymentController.getRevenue
);
router.post(
	'/subscription',
	adminController.protect,
	paymentController.createSubscription
);
router.get(
	'/subscription/:id',
	authController.protect,
	paymentController.getSubscriptionDetails
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
router.get(
	'/send-feedback-mail/:id',
	adminController.protect,
	paymentController.sendFeedback
);
router.post(
	'/submit-feedback/:id',
	authController.protect,
	paymentController.submitFeedback
);

module.exports = router;
