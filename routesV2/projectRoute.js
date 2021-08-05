const express = require('express');
const specialityController = require('../controllersV2/projectSpecialityController');
const projectController = require('../controllersV2/projectController');
const fileController = require('../controllersV2/fileUploadController');
const adminController = require('../controllers/adminController');
const validator = require('../validators/projectValidator');
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
router
	.route('/upload-photos/:id')
	.patch(
		adminController.protect,
		fileController.uploadProjectPhotosV2,
		projectController.uploadPhotos
	);
router
	.route('/:id')
	.get(adminController.protect, projectController.getProject)
	.patch(adminController.protect, projectController.updateProject);
router
	.route('/')
	.post(
		adminController.protect,
		validator.validate('createProject'),
		projectController.addProject
	);

module.exports = router;
