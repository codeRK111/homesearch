const LikedProperty = require('./../models/likedPropertyModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const mongoose = require('mongoose');

exports.likeProperty = catchAsync(async (req, res, next) => {
	const likedProperty = await LikedProperty.create({
		user: req.user.id,
		property: req.body.property,
	});

	res.status(201).json({
		status: 'success',
		data: {
			property: likedProperty,
		},
	});
});

exports.getMyLikedProperties = catchAsync(async (req, res, next) => {
	const page = req.body.page * 1 || 1;
	const limit = req.body.limit * 1 || 100;
	const skip = (page - 1) * limit;

	const filter = {
		user: mongoose.Types.ObjectId(req.user.id),
	};

	const properties = await LikedProperty.find(filter)
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
exports.getLikesOfAProperty = catchAsync(async (req, res, next) => {
	let count = 0;
	const propertyCount = await LikedProperty.count({
		property: mongoose.Types.ObjectId(req.body.property),
	});

	if (req.body.user) {
		count = await LikedProperty.count({
			user: mongoose.Types.ObjectId(req.body.user),
			property: mongoose.Types.ObjectId(req.body.property),
		});
	}

	res.status(200).json({
		status: 'success',
		data: {
			likes: propertyCount,
			isLiked: !!count,
			count,
		},
	});
});
