const express = require('express');
// const userController = require('./../controllers/userController');
const builderController = require('../controllers/builderController');
const adminController = require('../controllers/adminController');

const router = express.Router();

router.patch('/handle-image/:id', builderController.handleImage);

router
	.route('/')
	.get(adminController.protect, builderController.getAllBuilder)
	.post(adminController.protect, builderController.addBuilder);

router
	.route('/:id')
	.get(builderController.builderDetails)
	.patch(builderController.updateBuilder);

module.exports = router;
