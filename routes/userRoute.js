const express = require('express');
// const userController = require('./../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router
	.route('/profile-picture/:id')
	.post(authController.addProfilePicture)
	.patch(authController.updateProfilePicture);
router.post('/googleLogin', authController.googleLogIn);
router.patch('/resetPassword/:id', authController.resetPassword);
router.get('/sendOtp/:number', authController.sendOtp);
router.get(
	'/validateOtpAndLogIn/number/:number/otp/:otp',
	authController.validateOtp
);
// router.post('/forgotPassword', authController.forgotPassword);

module.exports = router;
