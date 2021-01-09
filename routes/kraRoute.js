const express = require('express');
// const userController = require('./../controllers/userController');
const adminController = require('../controllers/adminController');
const kraController = require('../controllers/kraController');
const router = express.Router();

router
	.route('/project-magements')
	.get(adminController.protect, kraController.getAllProjectAdvertisements)
	.post(adminController.protect, kraController.addProjectAdvertisement);
router
	.route('/project-magements/:id')
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
