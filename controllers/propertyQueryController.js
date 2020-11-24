const AppError = require('./../utils/appError');
const PropertyQuery = require('./../models/propertyQueryModel');
const catchAsync = require('./../utils/catchAsync');

exports.addQuery = catchAsync(async (req, res, next) => {
	let query = await PropertyQuery.create(req.body);

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

	if (req.body.owner) {
		filter['owner'] = req.body.owner;
	}

	if (req.body.user) {
		filter['user'] = req.body.user;
	}

	console.log(filter)

	const queries = await PropertyQuery.find(filter).skip(skip).limit(limit);

	res.status(200).json({
		status: 'success',
		data: {
			queries,
		},
	});
});
