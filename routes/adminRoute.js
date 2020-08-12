const express = require('express');
// const userController = require('./../controllers/userController');
const authController = require('../controllers/adminController');

const router = express.Router();

router.post('/admin-profile-photo/:id', authController.addProfilePicture);

router
	.route('/')
	.get(authController.getAllAdmins)
	.post(authController.addAdmin);
router.route('/:id').patch(authController.updateAdmin);

// router
//   .route('/:id')
//   .get(userController.getUser)
//   .patch(userController.updateUser)
//   .delete(userController.deleteUser);

module.exports = router;
