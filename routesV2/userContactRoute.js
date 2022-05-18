const express = require('express');
const contactController = require('../controllersV2/userContactController');
const adminController = require('../controllers/adminController');
const router = express.Router();

router.route('/validate-otp/:id/:otp').get(contactController.validateOTP);
router
	.route('/')
	.get(adminController.protect, contactController.getContacts)
	.post(contactController.createContact);

module.exports = router;
