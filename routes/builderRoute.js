const express = require('express');
// const userController = require('./../controllers/userController');
const builderController = require('../controllers/builderController');

const router = express.Router();

router.patch('/handle-image/:id', builderController.handleImage);

router
	.route('/')
	.get(builderController.getAllBuilder)
	.post(builderController.addBuilder);

router
	.route('/:id')
	.get(builderController.builderDetails)
	.patch(builderController.updateBuilder);

module.exports = router;
