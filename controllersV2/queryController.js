const AppError = require('./../utils/appError');
const PropertyQuery = require('./../models/propertyQueryModel');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
exports.addQuery = catchAsync(async (req, res, next) => {
	const body = req.body;
	let query = await PropertyQuery.create(body);

	res.status(200).json({
		status: 'success',
		data: {
			query,
		},
	});
});

exports.getQueries = catchAsync(async (req, res, next) => {
	const filter = {};
	const page = req.body.page * 1 || 1;
	const limit = req.body.limit * 1 || 10;
	const skip = (page - 1) * limit;

	filter['owner'] = ObjectId(req.user.id);

	const queries = await PropertyQuery.find(filter)
		.sort('-createdAt')
		.skip(skip)
		.limit(limit);

	res.status(200).json({
		status: 'success',
		data: {
			queries,
		},
	});
});
