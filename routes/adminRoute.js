const express = require('express');
// const userController = require('./../controllers/userController');
const authController = require('../controllers/adminController');
const contactController = require('../controllers/contactController');
const feedbackController = require('../controllers/searchFeedbackController');
const requestController = require('../controllers/requestPhotoController');
const router = express.Router();

// requests
router.post(
	'/get-requests',
	authController.protect,
	requestController.getRequests
);

// feedbacks
router.post(
	'/get-feedbacks',
	authController.protect,
	feedbackController.getFeedbacks
);
router
	.route('/feedbacks')
	.post(authController.protect, feedbackController.addSearchFeedback);
router
	.route('/feedbacks/:id')
	.patch(authController.protect, feedbackController.updateFeedback)
	.delete(authController.protect, feedbackController.deleteFeedback);

router.get(
	'/getAdminInfo',
	authController.protect,
	authController.getAdminInfo
);
router.get(
	'/get-my-staffs',
	authController.protect,
	authController.getMyStaffs
);
router.post(
	'/get-expert-queries',
	authController.protect,
	contactController.getContacts
);
router.post('/get-queries', authController.protect, authController.getQueries);
router.get(
	'/get-expert-query-details/:id',
	authController.protect,
	contactController.getQueryDetails
);
router.patch(
	'/update-expert-query-details/:id',
	authController.protect,
	contactController.updateQuery
);
router.post(
	'/add-contact',
	authController.protect,
	contactController.addContactByAdmin
);

router.get(
	'/delete-query/:id',
	authController.protect,
	authController.deleteQuery
);
router.get(
	'/delete-expert-query/:id',
	authController.protect,
	contactController.deleteQuery
);

router.post('/login', authController.login);
router.post('/admin-profile-photo/:id', authController.addProfilePicture);

router
	.route('/')
	.get(authController.getAllAdmins)
	.post(authController.addAdmin);
router
	.route('/:id')
	.get(authController.getAdmin)
	.patch(authController.updateAdmin)
	.delete(authController.deleteAdmin);

// router
//   .route('/:id')
//   .get(userController.getUser)
//   .patch(userController.updateUser)
//   .delete(userController.deleteUser);

module.exports = router;
