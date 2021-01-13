const express = require('express');
// const userController = require('./../controllers/userController');
const adminController = require('../controllers/adminController');
const kraController = require('../controllers/kraController');
const lead = require('../controllers/projectAdvertisementLeadsController');
const router = express.Router();

router
	.route('/my-tasks')
	.get(adminController.protect, kraController.fetchMyTasks);
router
	.route('/project-advertisements')
	.get(adminController.protect, kraController.getAllProjectAdvertisements)
	.post(adminController.protect, kraController.addProjectAdvertisement);
router
	.route('/project-advertisements/leads')
	.get(adminController.protect, lead.getAllLeads)
	.post(adminController.protect, lead.addLeads);
router
	.route('/project-advertisements/leads/schedule')
	.get(adminController.protect, lead.fetchSchedule);
router
	.route('/project-advertisements/leads/:id')
	.get(adminController.protect, lead.getLeadDetails)
	.patch(adminController.protect, lead.updateLeadDetails)
	.delete(adminController.protect, lead.deleteLead);
router
	.route('/project-advertisements/:id')
	.get(adminController.protect, kraController.getProjectAdvertisementDetails)
	.patch(
		adminController.protect,
		kraController.updateProjectAdvertisementDetails
	)
	.delete(
		adminController.protect,
		kraController.deleteProjectAdvertisementDetails
	);

module.exports = router;
