const express = require('express');
const propertyController = require('../controllersV2/propertyController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post(
	'/user/post-property-sale',
	authController.protect,
	propertyController.addPropertyByUserForSale
);
router.post(
	'/user/post-property-rent',
	authController.protect,
	propertyController.addPropertyByUserForRent
);
router.get(
	'/user/my-properties/:type',
	authController.protect,
	propertyController.getMyProperties
);

module.exports = router;
