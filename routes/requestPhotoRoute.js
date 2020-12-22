const express = require('express');
const requestPhotoController = require('../controllers/requestPhotoController');

const router = express.Router();

router.route('/photo').post(requestPhotoController.addRequestPhoto);
router
	.route('/validate-photo-request')
	.patch(requestPhotoController.validateRequest);

module.exports = router;
