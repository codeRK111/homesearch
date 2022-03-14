const express = require('express');
const cpController = require('../controllersV2/cpController');
const authController = require('../controllers/authController');
const router = express.Router();

router.route('/').post(authController.protect, cpController.createCP);

module.exports = router;
