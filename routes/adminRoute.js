const express = require('express');
// const userController = require('./../controllers/userController');
const authController = require('../controllers/adminController');

const router = express.Router();

router.get(
	'/getAdminInfo',
	authController.protect,
	authController.getAdminInfo
);

router.post(
	'/get-queries',
	authController.protect,
	authController.getQueries
);

router.get(
	'/delete-query/:id',
	authController.protect,
	authController.deleteQuery
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
