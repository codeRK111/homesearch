const express = require('express');
const propertyController = require('../controllers/propertyController');
const adminController = require('../controllers/adminController');
const authController = require('../controllers/authController');

// File Upload
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, '../', 'images', 'test/'));
	},
	filename: (req, file, cb) => {
		console.log(file);
		cb(null, Date.now() + path.extname(file.originalname));
	},
});
const fileFilter = (req, file, cb) => {
	if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
		cb(null, true);
	} else {
		cb(null, false);
	}
};
const upload = multer({ storage: storage, fileFilter: fileFilter });

const router = express.Router();

router.post(
	'/test-multer',
	upload.array('images', 100),
	propertyController.testMulter
);
router.post('/searchProperties', propertyController.searchProperties);
router
	.route('/handle-property-image/:id')
	.patch(authController.protect, propertyController.handlePropertyImage);
router
	.route('/handle-property-image-by-admin/:id')
	.patch(adminController.protect, propertyController.handlePropertyImage);
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
	.route('/user/rent/:id')
	.patch(
		authController.protect,
		propertyController.updatePropertyByUserForRent
	);
router
	.route('/user/rent')
	.post(authController.protect, propertyController.addPropertyByUserForRent);
router
	.route('/user/my-properties')
	.get(authController.protect, propertyController.getMyProperties);

router
	.route('/')
	.get(adminController.protect, propertyController.getProperties)
	.post(adminController.protect, propertyController.addProperty);

router
	.route('/:id')
	.get(propertyController.getPropertyDetails)
	.patch(adminController.protect, propertyController.updateProperty);

module.exports = router;
