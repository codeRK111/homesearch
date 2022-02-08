const express = require('express');
const leadController = require('../controllersV2/testimonialController');
const uploadController = require('../controllersV2/fileUploadController');
const authController = require('../controllers/adminController');

const router = express.Router();

router
	.route('/:id')
	.patch(
		authController.protect,
		uploadController.uploadTestimonial,
		leadController.updateTestimonial
	)
	.delete(authController.protect, leadController.deleteTestimonial);
router
	.route('/')
	.get(leadController.getTestimonials)
	.post(
		authController.protect,
		uploadController.uploadTestimonial,
		leadController.addTestimonial
	);

module.exports = router;
