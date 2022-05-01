const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const GSTModel = require('./../models/gstModel');

exports.getGSTs = catchAsync(async (req, res, next) => {
	const filter = {};
	const page = req.query.page * 1 || 1;
	const limit = req.query.limit * 1 || 10;
	const skip = (page - 1) * limit;

	if (req.query.status) {
		filter.status = req.query.status;
	}

	const totalDocs = await GSTModel.countDocuments(filter);

	const gsts = await GSTModel.find(filter)
		.sort('-createdAt')
		.skip(skip)
		.limit(limit);
	res.status(200).json({
		status: 'success',
		data: { gsts, totalDocs },
	});
});

exports.createGST = catchAsync(async (req, res, next) => {
	const inputData = req.body;
	inputData.createdBy = req.admin.id;
	const gst = await GSTModel.create(inputData);
	res.status(200).json({
		status: 'success',
		data: { gst },
	});
});
exports.updateGST = catchAsync(async (req, res, next) => {
	const gst = await GSTModel.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});
	res.status(200).json({
		status: 'success',
		data: { gst },
	});
});
