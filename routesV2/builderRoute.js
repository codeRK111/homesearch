const express = require('express');
// const userController = require('./../controllers/userController');
const builderController = require('../controllersV2/builderController');
const uploadController = require('../controllersV2/fileUploadController');
const adminController = require('../controllers/adminController');

const router = express.Router();

router
	.route('/')
	/**
	 * @api {post} / Create builder
	 * @apiName Create new builder
	 * @apiPermission all
	 *
	 * @apiParam  {String} [developerName]
	 * @apiParam  {String} [description]
	 * @apiParam  {String} [officeAddress]
	 * @apiParam  {String} [phoneNumber]
	 * @apiParam  {String} [email]
	 * @apiParam  {Date}   [operatingSince]
	 * @apiParam  {Date}   [createdAt]
	 * @apiParam  {Array} [cities]
	 * @apiParam  {Array} [promoters]
	 * @apiParam  {Number} [totalProjects]
	 * @apiParam  {Number} [underConstructionProjects]
	 * @apiParam  {Number} [completedProjects]
	 *
	 * @apiSuccess (200) {Object} mixed `User` object
	 */
	.post(
		adminController.protect,
		uploadController.uploadBuilderPhoto,
		builderController.addBuilder
	);

// router
// 	.route('/upload')
// 	/**
// 	 * @api {patch} / Upload Images
// 	 * @apiName Upload builder images
// 	 * @apiPermission all
// 	 *
// 	 * @apiParam  {File} [logo] logo of the builder
// 	 * @apiParam  {Array<File>} [images] builder images
// 	 * @apiParam  {String} [id] builder id

// 	 *
// 	 * @apiSuccess (200) {Object}
// 	 */
// 	.patch(
// 		uploadController.uploadBuilderPhoto,
// 		uploadController.resizeTourImages,
// 		builderController.uploadImages
// 	);

module.exports = router;
