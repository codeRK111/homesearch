const express = require('express');
// const userController = require('./../controllers/userController');
const UtilityController = require('../controllersV2/packageController');
const UtilityValidator = require('../validators/packageValidator');
const uploadController = require('../controllersV2/fileUploadController');

const router = express.Router();

console.log(UtilityValidator.validate('createBuilderPackages'));

router
	.route('/builder-package')
	.post(
		uploadController.uploadBuilderPackagePhoto,
		UtilityValidator.validate('createBuilderPackages'),
		UtilityController.addBuilderPackages
	)
	.get(UtilityController.getBuilderPackages);

module.exports = router;
