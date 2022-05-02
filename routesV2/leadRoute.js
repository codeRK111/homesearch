const express = require('express');
const leadController = require('../controllersV2/leadsController');
const uploadController = require('../controllersV2/fileUploadController');
const authController = require('../controllers/adminController');
const authControllerV2 = require('../controllersV2/adminController');

const router = express.Router();

router
	.route('/assign-support')
	.post(authController.protect, leadController.assignSupport);
router
	.route('/check-number/:number')
	.get(authController.protect, leadController.checkNumber);
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
	.route('/get-posted-leads')
	.post(authController.protect, leadController.getPostedLeads);
router
	.route('/browse-leads')
	.post(authController.protect, leadController.browseLeads);
router
	.route('/search-all')
	.post(authController.protect, leadController.searchAll);
router
	.route('/get-all')
	.post(authController.protect, leadController.getAllLeads);
router
	.route('/close-deal/:id')
	.patch(authController.protect, leadController.closeDeal);
router
	.route('/property-lead/:id')
	.get(authController.protect, leadController.propertyLeadDetails)
	.patch(authController.protect, leadController.propertyLeadUpdate);

router
	.route('/:id')
	.get(authController.protect, leadController.getLeadDetails)
	.patch(authController.protect, leadController.updateLead)
	.delete(
		authController.protect,
		authControllerV2.restrictAdminTo('gm'),
		leadController.deleteLead
	);
router
	.route('/')
	.post(
		authController.protect,
		uploadController.uploadLeadPhotos,
		leadController.addLead
	);

module.exports = router;
