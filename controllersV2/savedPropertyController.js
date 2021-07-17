const SavedProperty = require('./../models/savedPropertyModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const mongoose = require('mongoose');

exports.saveProperty = catchAsync(async (req, res, next) => {
	const savedProperty = await SavedProperty.create({
		user: req.user.id,
		property: req.body.property,
	});

	res.status(201).json({
		status: 'success',
		data: {
			property: savedProperty,
		},
	});
});

exports.getMyViewedProperties = catchAsync(async (req, res, next) => {
	const page = req.body.page * 1 || 1;
	const limit = req.body.limit * 1 || 100;
	const skip = (page - 1) * limit;

	const filter = {
		user: mongoose.Types.ObjectId(req.user.id),
	};

	const properties = await SavedProperty.find(filter)
		.sort('-createdAt')
		.skip(skip)
		.limit(limit);

	res.status(200).json({
		status: 'success',
		data: {
			properties,
		},
	});
});
