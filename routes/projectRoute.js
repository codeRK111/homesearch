const express = require('express');
const projectController = require('../controllers/projectController');

const router = express.Router();

router.route('/flat').post(projectController.addProjectFlat);

router.route('/').get(projectController.getAllProjects);

// router
// 	.route('/:id')
// 	.get(builderController.builderDetails)
// 	.patch(builderController.updateBuilder);

module.exports = router;
