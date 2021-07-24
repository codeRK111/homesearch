const express = require('express');
const projectController = require('../controllers/projectController');
const uploadController = require('../controllersV2/fileUploadController');

const router = express.Router();

router
	.route('/add-project-image/:id')
	.post(
		uploadController.uploadProjectPhotos,
		projectController.handleProjectImage
	);
router
	.route('/add-floorplans/:id')
	.post(
		uploadController.uploadFloorplans,
		projectController.handleFloorPlans
	);
router
	.route('/add-project-property-photos/:id')
	.post(
		uploadController.uploadFloorplans,
		projectController.handleProjectPropertyPhotos
	);
router
	.route('/remove-project-property-photos/:propertyId/:imageId')
	.get(projectController.removePhoto);
router
	.route('/remove-project-photos/:propertyId/:imageId')
	.get(projectController.removeProjectPhoto);
router
	.route('/remove-floorplan-photos/:propertyId/:imageId')
	.get(projectController.removeFloorPlanPhoto);

router.route('/get-all-details/:id').get(projectController.getAllProjectInfo);
router
	.route('/get-project-property-details/:id')
	.get(projectController.getProjectPropertyDetails);
router.route('/flat').post(projectController.addProjectFlat);
router
	.route('/independenthouse')
	.post(projectController.addProjectIndependentHouse);
router.route('/land').post(projectController.addProjectLand);
router.route('/properties/:id').patch(projectController.updateProjectProperty);
router.route('/handle-image/remove-image/:image/:id');
router
	.route('/handle-image/property/remove-floorplan/:image/:id')
	.get(projectController.removePropertyImage);
router
	.route('/handle-image/property/floorplan/:id')
	.patch(projectController.handleFloorplan);
router
	.route('/handle-image/property/:id')
	.patch(projectController.handlePropertyImage);
router.route('/handle-image/:id').patch(projectController.handleImage);
router.route('/').get(projectController.getAllProjects);

router
	.route('/get-details-by-slug/:slug')
	.get(projectController.getProjectDetailsBySlug);

router
	.route('/:id')
	.get(projectController.getProjectDetails)
	.patch(projectController.updateProject);
// .patch(builderController.updateBuilder);

module.exports = router;
