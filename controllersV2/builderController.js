const Builder = require('./../models/builderModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.uploadImages = catchAsync(async (req, res, next) => {
	res.status(200).json({
		status: 'success',
		data: req.files,
	});
});
