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

	if (req.body.queryFor) {
		filter.queryType = req.body.queryFor;
	}
	if (req.body.propertyFor) {
		filter.pFor = req.body.propertyFor;
	}
	if (req.body.propertyType) {
		filter.pType = req.body.propertyType;
	}
	if (req.body.via) {
		filter.via = req.body.via;
	}
	const totalDocs = await PropertyQuery.countDocuments(filter);

	const queries = await PropertyQuery.find(filter)
		.sort('-createdAt')
		.skip(skip)
		.limit(limit);

	res.status(200).json({
		status: 'success',
		data: {
			queries,
			totalDocs,
		},
	});
});
exports.getUserQueries = catchAsync(async (req, res, next) => {
	const page = req.query.page * 1 || 1;
	const limit = req.query.limit * 1 || 10;
	const skip = (page - 1) * limit;
	const filter = {
		owner: ObjectId(req.user.id),
	};

	const totalDocs = await PropertyQuery.countDocuments(filter);

	const queries = await PropertyQuery.find(filter)
		.sort('-createdAt')
		.skip(skip)
		.limit(limit);

	res.status(200).json({
		status: 'success',
		data: {
			queries,
			totalDocs,
		},
	});
});
exports.getQueryDetails = catchAsync(async (req, res, next) => {
	const query = await PropertyQuery.findById(req.params.id);

	res.status(200).json({
		status: 'success',
		data: {
			query,
		},
	});
});
