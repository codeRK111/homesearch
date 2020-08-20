const express = require('express');
const propertyController = require('../controllers/propertyController');

const router = express.Router();

router.route('/').post(propertyController.addProperty);

router
	.route('/furnishes')
	.get(propertyController.getFurnishes)
	.post(propertyController.addFurnish);

router
	.route('/amenities')
	.get(propertyController.getAmenities)
	.post(propertyController.addAmenity);

module.exports = router;
