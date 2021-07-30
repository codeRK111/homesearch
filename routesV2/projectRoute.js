const express = require('express');
const specialityController = require('../controllersV2/projectSpecialityController');
const adminController = require('../controllers/adminController');

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

module.exports = router;
