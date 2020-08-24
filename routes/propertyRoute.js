const express = require('express');
const propertyController = require('../controllers/propertyController');
const adminController = require('../controllers/adminController');

const router = express.Router();

router
	.route('/')
	.get(propertyController.getProperties)
	.post(adminController.protect, propertyController.addProperty);

router.route('/:id').patch(propertyController.updateProperty);

router
	.route('/furnishes')
	.get(propertyController.getFurnishes)
	.post(propertyController.addFurnish);

router
	.route('/amenities')
	.get(propertyController.getAmenities)
	.post(propertyController.addAmenity);

router.patch('/upload-images/:id', propertyController.addPropertyImage);
router.get('/get-property-resources', propertyController.getPropertyResources);

module.exports = router;
