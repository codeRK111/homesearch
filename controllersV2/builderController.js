const Builder = require('./../models/builderModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Admin = require('../models/adminModel');
const mongoose = require('mongoose');

const fs = require('fs');
const path = require('path');

exports.addBuilder = catchAsync(async (req, res, next) => {
	const removeFieldArray = [
		'logo',
		'image1',
		'image2',
		'image3',
		'image4',
		'image5',
		'image6',
		'slug',
	];

	const admin = await Admin.findById(req.admin.id);
	if (
		!admin.builderActions.includes('create') &&
		admin.type !== 'super-admin'
	) {
		return next(new AppError('You are not authorized', 401));
	}

	let clone = { ...req.body };
	removeFieldArray.forEach((c) => {
		if (clone[c] !== null || clone[c] !== undefined) {
			delete clone[c];
		}
	});
	clone.adminId = admin.id;
	if (req.files['logo']) {
		clone.logo = req.files['logo'][0].filename;
	}
	if (req.files['photos']) {
		clone.photos = req.files['photos'].map((c) => ({ image: c.filename }));
	}
	const builder = await Builder.create(clone);

	res.status(200).json({
		status: 'success',
		data: {
			builder,
		},
	});
});
exports.updateBuilder = catchAsync(async (req, res, next) => {
	const removeFieldArray = ['logo', 'photos', 'slug'];

	let clone = { ...req.body };
	removeFieldArray.forEach((c) => {
		if (clone[c] !== null || clone[c] !== undefined) {
			delete clone[c];
		}
	});

	const builder = await Builder.findByIdAndUpdate(req.params.id, clone, {
		new: true,
		runValidators: true,
	});

	res.status(200).json({
		status: 'success',
		data: {
			builder,
		},
	});
});

exports.getBuilderDetails = catchAsync(async (req, res, next) => {
	const builder = await Builder.findById(req.params.id);

	res.status(200).json({
		status: 'success',
		data: {
			builder,
		},
	});
});
exports.handleImages = catchAsync(async (req, res, next) => {
	const builder = await Builder.findById(req.params.id);
	if (!builder) {
		return next(new AppError('Builder not found', 404));
	}

	const updateData = {};

	if (req.files && req.files['logo']) {
		if (builder.logo) {
			fs.unlink(
				path.join(__dirname, '../', 'images', 'builder_images/') +
					builder.logo,
				function (err) {}
			);
		}
		updateData.logo = req.files['logo'][0].filename;
	}

	if (req.files && req.files['photos'] && req.files['photos'].length > 0) {
		if (builder.photos.length > 0) {
			const images = req.files['photos'].map((c, i) => ({
				image: c.filename,
			}));
			updateData['$push'] = { photos: { $each: images } };
		} else {
			updateData.photos = req.files['photos'].map((c, i) => ({
				image: c.filename,
			}));
		}
	}

	const doc = await Builder.findByIdAndUpdate(req.params.id, updateData, {
		new: true,
		runValidators: true,
	});

	res.status(200).json({
		status: 'success',
		data: {
			builder: doc,
		},
	});
});

exports.removePhoto = catchAsync(async (req, res, next) => {
	const existingBuilder = await Builder.findOne({
		// id: mongoose.Types.ObjectId(req.params.id),
		_id: req.params.id,
		'photos._id': req.body._id,
		'photos.image': req.body.image,
	});

	if (!existingBuilder) {
		return next(new AppError('Builder not found', 404));
	}

	fs.unlink(
		path.join(__dirname, '../', 'images', 'builder_images/') +
			req.body.image,
		function (err) {}
	);

	const builder = await Builder.findByIdAndUpdate(
		req.params.id,
		{
			$pull: {
				photos: {
					_id: req.body._id,
				},
			},
		},
		{
			new: true,
			runValidators: true,
		}
	);
	res.status(200).json({
		status: 'success',
		data: {
			builder,
		},
	});
});
