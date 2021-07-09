const express = require('express');
const testController = require('../controllersV2/paymentController');

const router = express.Router();
router.post('/payment-test', testController.createOrder);
router.post('/success', testController.success);

module.exports = router;
