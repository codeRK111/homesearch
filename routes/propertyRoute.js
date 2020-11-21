const express = require('express');
const propertyController = require('../controllers/propertyController');
const adminController = require('../controllers/adminController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/searchProperties', propertyController.searchProperties);
router
	.route('/handle-property-image/:id')
	.patch(authController.protect, propertyController.handlePropertyImage);
router
	.route('/furnishes')
	.get(propertyController.getFurnishes)
	.post(propertyController.addFurnish);

router
	.route('/amenities')
	.get(propertyController.getAmenities)
	.post(propertyController.addAmenity);

router.post('/upload-images/:id', propertyController.addPropertyImage);
router.post(
	'/add-property/sale',
	adminController.protect,
	propertyController.addPropertyForSale
);
router.get(
	'/resources/get-property-resources',
	propertyController.getPropertyResources
);

router
	.route('/user/sale')
	.post(authController.protect, propertyController.addPropertyByUserForSale);
router
	.route('/user/sale/:id')
	.patch(
		authController.protect,
		propertyController.updatePropertyByUserForSale
	);
router
	.route('/user/rent')
	.post(authController.protect, propertyController.addPropertyByUserForRent);
router
	.route('/user/my-properties')
	.get(authController.protect, propertyController.getMyProperties);

router
	.route('/')
	.get(propertyController.getProperties)
	.post(adminController.protect, propertyController.addProperty);

router
	.route('/:id')
	.get(propertyController.getPropertyDetails)
	.patch(propertyController.updateProperty);

module.exports = router;
