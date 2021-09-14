const express = require('express');
const leadController = require('../controllersV2/leadsController');
const authController = require('../controllers/adminController');

const router = express.Router();

router
	.route('/get-all')
	.post(authController.protect, leadController.getAllLeads);
router.route('/:id').patch(authController.protect, leadController.updateLead);
router.route('/').post(authController.protect, leadController.addLead);

module.exports = router;
