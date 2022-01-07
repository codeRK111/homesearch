const express = require('express');
// const userController = require('./../controllers/userController');
const UtilityController = require('../controllersV2/packageController');
const UtilityValidator = require('../validators/packageValidator');
const uploadController = require('../controllersV2/fileUploadController');
const authController = require('../controllers/adminController');

const router = express.Router();

router
	.route('/builder-package')
	.post(
		uploadController.uploadBuilderPackagePhoto,
		UtilityValidator.validate('createBuilderPackages'),
		UtilityController.addBuilderPackages
	)
	.get(UtilityController.getBuilderPackages);
router
	.route('/property-package/:id')
	.patch(authController.protect, UtilityController.updatePropertyPackage);
router
	.route('/property-package')
	.post(
		UtilityValidator.validate('createPropertyPackages'),
		UtilityController.addPropertyPackages
	)
	.get(UtilityController.getPropertyPackages);
router.route('/create-package').post(UtilityController.createPackage);
router.route('/get-packages').get(UtilityController.getPackages);
router
	.route('/get-package-details/:id')
	.get(UtilityController.getPackageDetails);
router
	.route('/update-package-details/:id')
	.patch(UtilityController.updatePackageDetails);

module.exports = router;
