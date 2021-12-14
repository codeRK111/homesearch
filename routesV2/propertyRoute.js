const express = require('express');
const propertyController = require('../controllersV2/propertyController');
const fileUploadController = require('../controllersV2/fileUploadController');
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');

const router = express.Router();

router.post(
	'/user/post-property-sale',
	authController.protect,
	propertyController.addPropertyByUserForSale
);
router.post(
	'/homesearch/post-property-rent',
	adminController.protect,
	propertyController.addPropertyHomesearchForRent
);
router.get('/user/search-property', propertyController.searchProperty);
router.post(
	'/admin/search-by-name',
	adminController.protect,
	propertyController.searchByName
);
router.post(
	'/admin/post-from-lead',
	adminController.protect,
	propertyController.addPropertyFromLeadForRent
);
router.post(
	'/user/post-property-rent',
	authController.protect,
	propertyController.addPropertyByUserForRent
);
router.patch(
	'/property-lead/image/:id',
	adminController.protect,
	fileUploadController.uploadPropertyLeadPhoto,
	propertyController.uploadSingleLeadPhoto
);
router.post(
	'/property-lead',
	adminController.protect,
	propertyController.createPropertyLead
);
router.get(
	'/user/my-properties/:type',
	authController.protect,
	propertyController.getMyProperties
);
router.get('/user/properties/:id', propertyController.getPropertiesOfUser);

module.exports = router;
