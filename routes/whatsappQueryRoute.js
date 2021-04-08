const express = require('express');
const queryController = require('../controllers/whatsappQueryController');
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');
const router = express.Router();
// Client
router.route('/').post(queryController.addQueryAndSendOTP);

router.route('/validate-query').post(queryController.validateQuery);


// admin
router.use(adminController.protect)
router.route('/admin').get(queryController.getQueries);
module.exports = router;
