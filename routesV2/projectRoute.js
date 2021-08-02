const express = require('express');
const specialityController = require('../controllersV2/projectSpecialityController');
const projectController = require('../controllersV2/projectController');
const adminController = require('../controllers/adminController');
// const authController = require('../controllers/authController');

const router = express.Router();

// Admin

router
	.route('/speciality')
	.get(adminController.protect, specialityController.getSpecialities)
	.post(adminController.protect, specialityController.addSpeciality);
router
	.route('/speciality/:id')
	.get(adminController.protect, specialityController.getSpecialityDetails)
	.patch(adminController.protect, specialityController.updateSpeciality);

// User
router.route('/property').post(projectController.properties);

module.exports = router;
