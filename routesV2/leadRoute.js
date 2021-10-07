const express = require('express');
const leadController = require('../controllersV2/leadsController');
const uploadController = require('../controllersV2/fileUploadController');
const authController = require('../controllers/adminController');

const router = express.Router();

router
	.route('/assign-support')
	.post(authController.protect, leadController.assignClientSupport);
router
	.route('/gm-lead-count')
	.get(authController.protect, leadController.countLeads);
router
	.route('/support-update/:id')
	.patch(authController.protect, leadController.updateBySupport);
router
	.route('/get-assigned-leads')
	.post(authController.protect, leadController.getMyLeads);
router
	.route('/get-all')
	.post(authController.protect, leadController.getAllLeads);
router
	.route('/:id')
	.get(authController.protect, leadController.getLeadDetails)
	.patch(authController.protect, leadController.updateLead);
router
	.route('/')
	.post(
		authController.protect,
		uploadController.uploadLeadPhotos,
		leadController.addLead
	);

module.exports = router;
