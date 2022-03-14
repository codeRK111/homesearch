const CPModel = require('./../models/chanelPartnerModel');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');

exports.createCP = catchAsync(async (req, res, next) => {
	const cp = await CPModel.create(req.body);
	res.status(201).json({
		status: 'active',
		data: { cp },
	});
});
