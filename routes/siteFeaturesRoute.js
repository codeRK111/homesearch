const express = require('express');
// const userController = require('./../controllers/userController');
const featureController = require('../controllers/featureController');

const router = express.Router();

router.get('/send-otp', featureController.setAndSendOtp);

router.route('/auth-number').get(featureController.getAuthNumber);
router
	.route('/set-auth-number/:number')
	.get(featureController.setAuthenticationNumber);

// router
//   .route('/:id')
//   .get(userController.getUser)
//   .patch(userController.updateUser)
//   .delete(userController.deleteUser);

module.exports = router;
