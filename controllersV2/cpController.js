const CPModel = require('./../models/chanelPartnerModel');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');

exports.createCPUser = catchAsync(async (req, res, next) => {
	const excludeFields = ['status', 'createdAt', 'updatedAt'];
	excludeFields.forEach((c) => {
		if (req.body[c]) {
			req.body[c] = undefined;
		}
	});
	const cp = await CPModel.create(req.body);
	res.status(201).json({
		status: 'active',
		data: { cp },
	});
});
exports.createCP = catchAsync(async (req, res, next) => {
	const cp = await CPModel.create(req.body);
	res.status(201).json({
		status: 'active',
		data: { cp },
	});
});

// Get Chanel Partners
exports.getCPs = catchAsync(async (req, res, next) => {
	const filter = {};
	const page = req.query.page * 1 || 1;
	const limit = req.query.limit * 1 || 10;
	const skip = (page - 1) * limit;

	if (req.query.name) {
		filter.name = { $regex: req.query.name, $options: 'i' };
	}
	if (req.query.email) {
		filter.email = { $regex: req.query.email, $options: 'i' };
	}
	if (req.query.number) {
		filter.number = { $regex: req.query.number, $options: 'i' };
	}

	const totalDocs = await CPModel.countDocuments(filter);

	const chanelPartners = await CPModel.find(filter)
		.sort('-createdAt')
		.skip(skip)
		.limit(limit);

	res.status(200).json({
		status: 'success',
		data: {
			chanelPartners,
			totalDocs,
		},
	});
});

// Update CP Details
exports.updateCpDetails = catchAsync(async (req, res, next) => {
	const chanelPartner = await CPModel.findByIdAndUpdate(
		req.params.id,
		req.body,
		{
			runValidators: true,
			new: true,
		}
	);
	res.status(200).json({
		status: 'success',
		data: chanelPartner,
	});
});

// Get CP Details
exports.getCpDetails = catchAsync(async (req, res, next) => {
	const chanelPartner = await CPModel.findById(req.params.id);
	res.status(200).json({
		status: 'success',
		data: chanelPartner,
	});
});
