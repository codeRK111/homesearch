const Builder = require('./../models/builderModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const ApiFeatures = require('../utils/apiFeatures');
const path = require('path');
const fs = require('fs');
const Admin = require('../models/adminModel');
const mongoose = require('mongoose');

exports.addBuilder = catchAsync(async (req, res, next) => {
	const removeFieldArray = [
		'logo',
		'image1',
		'image2',
		'image3',
		'image4',
		'image5',
		'image6',
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
	const builder = await Builder.create(clone);

	res.status(201).json({
		status: 'success',
		data: {
			builder,
		},
	});
});

exports.getAllBuilder = catchAsync(async (req, res, next) => {
	let query = { ...req.query };
	const admin = await Admin.findById(req.admin.id);
	console.log(admin);
	if (admin.type !== 'super-admin') {
		if (!admin.builderActions.includes('view')) {
			return next(new AppError('You are not authorized', 401));
		}
		const or = [];
		const cities = admin.builderAccessCities.map((c) => c.id);

		if (admin.builderAccess.includes('self-builders')) {
			or.push({
				adminId: mongoose.Types.ObjectId(admin.id),
			});
		}
		if (admin.builderAccess.includes('other-staff-builders')) {
			or.push({
				adminId: { $ne: null },
			});
		}

		if (or.length === 0) {
			return next(
				new AppError('You are not authorized to see any builders', 401)
			);
		} else {
			query['$or'] = or;
		}

		if (cities.length === 0) {
			return next(
				new AppError('You have no permissions for any cities', 401)
			);
		} else {
			query['cities'] = { $in: cities };
		}
	}
	const page = query.page * 1 || 1;
	const limit = query.limit * 1 || 100;
	const excludeFields = ['page', 'limit'];
	excludeFields.forEach((field) => delete query[field]);
	const skip = (page - 1) * limit;
	const count = await Builder.countDocuments(query);
	const builders = await Builder.find(query)
		.sort('-createdAt')
		.skip(skip)
		.limit(limit);

	res.status(200).json({
		status: 'success',
		count,
		data: {
			builders,
		},
	});
});

exports.updateBuilder = catchAsync(async (req, res, next) => {
	const builder = await Builder.findByIdAndUpdate(req.params.id, req.body, {
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

exports.builderDetails = catchAsync(async (req, res, next) => {
	const builder = await Builder.findById(req.params.id);

	res.status(200).json({
		status: 'success',
		data: {
			builder,
		},
	});
});

exports.handleImage = catchAsync(async (req, res, next) => {
	if (!req.files) {
		return next(new AppError('No image found', 400));
	} else {
		const builder = await Builder.findById(req.params.id);
		if (!builder) return next(new AppError('builder not found', 404));
		if (req.files.logo) {
			if (builder.logo) {
				fs.unlinkSync(
					path.join(__dirname, '../', 'images', 'builder_images/') +
						builder.logo
				);
			}
			let logo =
				Math.floor(10000000 + Math.random() * 90000000) +
				'-' +
				req.files.logo.name;
			await req.files.logo.mv(
				path.join(__dirname, '../', 'images', 'builder_images/') + logo
			);
			builder.logo = logo;
		}

		if (req.files.image1) {
			if (builder.image1) {
				fs.unlinkSync(
					path.join(__dirname, '../', 'images', 'builder_images/') +
						builder.image1
				);
			}
			let image1 =
				Math.floor(10000000 + Math.random() * 90000000) +
				'-' +
				req.files.image1.name;
			await req.files.image1.mv(
				path.join(__dirname, '../', 'images', 'builder_images/') +
					image1
			);
			builder.image1 = image1;
		}

		if (req.files.image2) {
			if (builder.image2) {
				fs.unlinkSync(
					path.join(__dirname, '../', 'images', 'builder_images/') +
						builder.image2
				);
			}
			let image2 =
				Math.floor(10000000 + Math.random() * 90000000) +
				'-' +
				req.files.image2.name;
			await req.files.image2.mv(
				path.join(__dirname, '../', 'images', 'builder_images/') +
					image2
			);
			builder.image2 = image2;
		}

		if (req.files.image3) {
			if (builder.image3) {
				fs.unlinkSync(
					path.join(__dirname, '../', 'images', 'builder_images/') +
						builder.image3
				);
			}
			let image3 =
				Math.floor(10000000 + Math.random() * 90000000) +
				'-' +
				req.files.image3.name;
			await req.files.image3.mv(
				path.join(__dirname, '../', 'images', 'builder_images/') +
					image3
			);
			builder.image3 = image3;
		}

		if (req.files.image4) {
			if (builder.image4) {
				fs.unlinkSync(
					path.join(__dirname, '../', 'images', 'builder_images/') +
						builder.image4
				);
			}
			let image4 =
				Math.floor(10000000 + Math.random() * 90000000) +
				'-' +
				req.files.image4.name;
			await req.files.image4.mv(
				path.join(__dirname, '../', 'images', 'builder_images/') +
					image4
			);
			builder.image4 = image4;
		}

		if (req.files.image5) {
			if (builder.image5) {
				fs.unlinkSync(
					path.join(__dirname, '../', 'images', 'builder_images/') +
						builder.image5
				);
			}
			let image5 =
				Math.floor(10000000 + Math.random() * 90000000) +
				'-' +
				req.files.image5.name;
			await req.files.image5.mv(
				path.join(__dirname, '../', 'images', 'builder_images/') +
					image5
			);
			builder.image5 = image5;
		}

		if (req.files.image6) {
			if (builder.image6) {
				fs.unlinkSync(
					path.join(__dirname, '../', 'images', 'builder_images/') +
						builder.image6
				);
			}
			let image6 =
				Math.floor(10000000 + Math.random() * 90000000) +
				'-' +
				req.files.image6.name;
			await req.files.image6.mv(
				path.join(__dirname, '../', 'images', 'builder_images/') +
					image6
			);
			builder.image6 = image6;
		}

		const builderUpdated = await builder.save();

		//send response
		res.send({
			status: 'success',
			message: 'File is uploaded',
			data: {
				builder: builderUpdated,
			},
		});
	}
});
