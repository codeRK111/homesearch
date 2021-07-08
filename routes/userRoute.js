const express = require('express');
// const userController = require('./../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();
router.post('/signup', authController.signup);
router.post('/user-signup', authController.signupByUser);
router.post('/signIn', authController.signIn);
router.post('/exists/:resource', authController.checkExists);
router.post('/send-reset-password-otp', authController.sendResetPasswordOtp);
router.post('/reset-my-password', authController.resetMyPassword);
router.post('/login', authController.login);
router
	.route('/profile-picture/:id')
	.post(authController.addProfilePicture)
	.patch(authController.updateProfilePicture);
router.post('/googleLogin', authController.googleLogIn);
router.patch('/resetPassword/:id', authController.resetPassword);
router.get('/sendOtp/:number', authController.sendOtpNew);
router.get(
	'/validateOtpAndLogIn/number/:number/otp/:otp',
	authController.validateOtp
);

router
	.route('/reset-my-password')
	.patch(authController.protect, authController.updateMyPassword);
router
	.route('/reset-my-number-otp')
	.post(authController.protect, authController.sendUpdateNumberOTP);
router
	.route('/forgot-my-password-otp')
	.post(authController.sendUpdatePasswordOTP);
router.route('/change-password').post(authController.resetMyPassword);
router
	.route('/update-my-number')
	.post(authController.protect, authController.updateMyNumber);
router
	.route('/update-my-password')
	.post(authController.protect, authController.updateMyPassword);
router
	.route('/handle-profile-image')
	.patch(authController.protect, authController.handleProfileImage);
router
	.route('/')
	.get(authController.protect, authController.getUserInfo)
	.patch(authController.protect, authController.updateMe);
// router.post('/forgotPassword', authController.forgotPassword);

module.exports = router;
