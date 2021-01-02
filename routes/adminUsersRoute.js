const express = require('express');
// const userController = require('./../controllers/userController');
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');

const router = express.Router();

router.post('/filter-user', authController.filterUsers);

// router.post('/forgotPassword', authController.forgotPassword);

// router.patch(
//   '/updateMyPassword',
//   authController.protect,
//   authController.updatePassword
// );

// router.patch('/updateMe', authController.protect, userController.updateMe);
// router.delete('/deleteMe', authController.protect, userController.deleteMe);

router
	.route('/')
	.get(adminController.protect, authController.getAllUsers)
	.post(adminController.protect, authController.addUser);
router
	.route('/:id')
	.get(authController.getUser)
	.patch(adminController.protect, authController.updateUser)
	.delete(authController.deleteUser);

// router
//   .route('/:id')
//   .get(userController.getUser)
//   .patch(userController.updateUser)
//   .delete(userController.deleteUser);

module.exports = router;
