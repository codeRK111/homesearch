const Builder = require('./../models/builderModel');
const Project = require('./../models/projectModule');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Admin = require('../models/adminModel');
const mongoose = require('mongoose');

const fs = require('fs');
const path = require('path');

const getName = (source, index) => {
	if (typeof source === 'object') {
		return source[index];
	} else {
		return index == 0 ? source : '';
	}
};

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
	if (req.files['teamPhoto']) {
		clone.teamPhoto = req.files['teamPhoto'][0].filename;
	}
	if (req.files['photos']) {
		clone.photos = req.files['photos'].map((c, i) => ({
			image: c.filename,
			primary: i == req.body.thumbnailIndex ? true : false,
		}));
	}
	if (req.files['directors']) {
		clone.directors = req.files['directors'].map((c, i) => ({
			image: c.filename,
			name: getName(req.body.directorNames, i),
		}));
	}

	console.log(clone);
	const builder = await Builder.create(clone);

	res.status(200).json({
		status: 'success',
		data: {
			builder,
		},
	});
});
exports.getProjects = catchAsync(async (req, res, next) => {
	const projects = await Project.find({ builder: req.params.id });
	res.status(200).json({
		status: 'success',
		data: {
			projects,
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
exports.getBuilderDetailsBySlug = catchAsync(async (req, res, next) => {
	const builder = await Builder.findOne({
		slug: req.params.slug,
		status: 'active',
	});
	if (!builder) {
		return next(new AppError('Builder not found', 404));
	}

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
	if (req.files && req.files['teamPhoto']) {
		if (builder.teamPhoto) {
			fs.unlink(
				path.join(__dirname, '../', 'images', 'builder_images/') +
					builder.teamPhoto,
				function (err) {}
			);
		}
		updateData.teamPhoto = req.files['teamPhoto'][0].filename;
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

exports.addDirector = catchAsync(async (req, res, next) => {
	const data = {
		image: req.file ? req.file.filename : '',
		name: req.body.name,
	};

	const builder = await Builder.findByIdAndUpdate(
		req.params.id,
		{
			$push: {
				directors: data,
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
exports.updateDirector = catchAsync(async (req, res, next) => {
	if (!req.body.id) {
		return next(new AppError('Director not found', 404));
	}
	const data = {};

	if (req.file) {
		data['directors.$.image'] = req.file.filename;
	}
	if (req.body.name) {
		data['directors.$.name'] = req.body.name;
	}

	const builder = await Builder.findOneAndUpdate(
		{ _id: req.params.id, 'directors._id': req.body.id },
		{
			$set: data,
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
exports.removeDirector = catchAsync(async (req, res, next) => {
	const builder = await Builder.findOneAndUpdate(
		{ _id: req.params.builderId },
		{
			$pull: {
				directors: { _id: req.params.directorId },
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
exports.managePrimary = catchAsync(async (req, res, next) => {
	const builder = await Builder.findById(req.params.id);
	if (!builder) {
		return next(new AppError('Builder Not Found', 404));
	}

	console.log(builder.photos);

	if (!builder.photos.find((c) => c._id != req.body._id)) {
		return next(new AppError('Photo Not Found', 404));
	}

	const originalPhotos = builder.photos;
	const newPhotos = originalPhotos.map((c) => {
		if (c._id == req.body._id) {
			c.primary = req.body.checked;
		} else {
			c.primary = false;
		}

		return c;
	});

	console.log(newPhotos);

	const newBuilder = await Builder.findOneAndUpdate(
		{ _id: req.params.id },
		{
			photos: newPhotos,
		},
		{
			new: true,
			runValidators: true,
		}
	);

	res.status(200).json({
		status: 'success',
		data: {
			builder: newBuilder,
		},
	});
});

exports.getBuilders = catchAsync(async (req, res) => {
	const filter = {};
	const page = req.body.page * 1 || 1;
	const limit = req.body.limit * 1 || 10;
	const skip = (page - 1) * limit;

	if (req.body.developerName) {
		filter.developerName = {
			$regex: req.body.developerName,
			$options: 'i',
		};
	}

	if (req.body.email) {
		filter.email = { $regex: req.body.email, $options: 'i' };
	}
	if (req.body.phoneNumber) {
		filter.phoneNumber = { $regex: req.body.phoneNumber, $options: 'i' };
	}

	if (req.body.city) {
		filter.city = req.body.city;
	}
	if (req.body.status) {
		filter.status = req.body.status;
	}

	const totalDocs = await Builder.countDocuments(filter);

	const builders = await Builder.find(filter)
		.sort('-createdAt')
		.skip(skip)
		.limit(limit);

	res.status(200).json({
		status: 'success',
		data: {
			builders,
			totalDocs,
		},
	});
});

exports.searchBuilder = catchAsync(async (req, res, next) => {
	const filter = {
		status: 'active',
	};
	const page = req.query.page * 1 || 1;
	const limit = req.query.limit * 1 || 10;
	const skip = (page - 1) * limit;

	if (req.query.city) {
		filter.cities = mongoose.Types.ObjectId(req.query.city);
	}
	const totalDocs = await Builder.countDocuments(filter);
	const builders = await Builder.find(filter)
		.sort('-createdAt')
		.skip(skip)
		.limit(limit);
	res.status(200).json({
		status: 'success',
		data: {
			totalDocs,
			builders,
		},
	});
});
