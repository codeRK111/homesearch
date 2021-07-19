const LikedProperty = require('./../models/likedPropertyModel');
const SavedProperty = require('./../models/savedPropertyModel');
const Property = require('./../models/propertyModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const mongoose = require('mongoose');

exports.getPageInfo = catchAsync(async (req, res, next) => {
	const postPropertyCount = await Property.count({
		userId: mongoose.Types.ObjectId(req.user._id),
	});
	const postPropertyActiveCount = await Property.count({
		userId: mongoose.Types.ObjectId(req.user._id),
		status: 'active',
	});
	const postPropertyUnderScreeningCount = await Property.count({
		userId: mongoose.Types.ObjectId(req.user._id),
		status: 'underScreening',
	});
	const postPropertyExpiredCount = await Property.count({
		userId: mongoose.Types.ObjectId(req.user._id),
		status: 'expired',
	});
	const savedPropertyCount = await SavedProperty.count({
		user: mongoose.Types.ObjectId(req.user._id),
	});
	const likedPropertyCount = await LikedProperty.count({
		user: mongoose.Types.ObjectId(req.user._id),
	});

	res.status(200).json({
		status: 'success',
		data: {
			postPropertyCount,
			postPropertyActiveCount,
			postPropertyUnderScreeningCount,
			postPropertyExpiredCount,
			savedPropertyCount,
			likedPropertyCount,
		},
	});
});
