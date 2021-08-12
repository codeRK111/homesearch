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
	.route('/handle-towers/:id')
	.patch(adminController.protect, projectController.updateTowerNumbers);
router.delete(
	'/tower/:projectId/:towerId',
	adminController.protect,
	projectController.removeTower
);
router
	.route('/handle-tower-name/:id/:towerId')
	.patch(adminController.protect, projectController.updateTowerName);
router
	.route('/:projectId/units')
	.post(
		adminController.protect,
		fileController.uploadFloorplan,
		projectController.addProjectProperty
	);
router
	.route('/units/:id')
	.patch(
		adminController.protect,
		fileController.uploadFloorplan,
		projectController.updateProjectProperty
	);

router
	.route('/:id')
	.get(adminController.protect, projectController.getProject)
	.patch(adminController.protect, projectController.updateProject);
router
	.route('/phases/:projectId')
	.patch(adminController.protect, projectController.addPhase);
router
	.route('/towers/:towerId/floorPlan/:projectId')
	.patch(
		adminController.protect,
		fileController.uploadFloorplan,
		projectController.manageFloorPlan
	);
router
	.route('/towers/:towerId/status/:projectId')
	.patch(adminController.protect, projectController.manageTowerStatus);
router
	.route('/towers/:projectId')
	.patch(adminController.protect, projectController.addTower);

router
	.route('/')
	.post(
		adminController.protect,
		validator.validate('createProject'),
		projectController.addProject
	);

module.exports = router;
