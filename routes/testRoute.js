const express = require('express');
const testController = require('../controllers/testController');

const router = express.Router();
router.get('/otp-test', testController.otpTest);

module.exports = router;
