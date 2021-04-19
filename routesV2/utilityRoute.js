const express = require('express');
// const userController = require('./../controllers/userController');
const UtilityController = require('../controllersV2/utilityController');
const UtilityValidator = require('../validators/utilityValidator');
const uploadController = require('../controllersV2/fileUploadController');

const router = express.Router();

console.log(UtilityValidator.validate('createBuilderPackages'));

router
	.route('/builder-package')
	.post(
		UtilityValidator.validate('createBuilderPackages'),
		UtilityController.addBuilderPackages
	);

module.exports = router;
