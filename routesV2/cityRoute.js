const express = require('express');
const adminController = require('../controllers/adminController');
const cityController = require('../controllersV2/cityController');
const uploadController = require('../controllersV2/fileUploadController');

const router = express.Router();

router
	.route('/:id')
	.patch(
		adminController.protect,
		uploadController.uploadCity,
		cityController.updateCity
	);
router
	.route('/')
	.post(
		adminController.protect,
		uploadController.uploadCity,
		cityController.addCity
	);

module.exports = router;
