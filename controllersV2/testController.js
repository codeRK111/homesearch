const NumberValidation = require('./../models/numberValidation');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const sendEmailOTP = require('../utils/sendMailOTP');

exports.createValidation = catchAsync(async (req, res) => {
	let nv = await NumberValidation.findOne({ number: req.params.number });
	if (nv) {
		await nv.save();
	} else {
		nv = await NumberValidation.create({ number: req.params.number });
	}

	res.status(200).json({
		status: 'success',
		data: {
			nv,
		},
	});
});
exports.checkValidation = catchAsync(async (req, res, next) => {
	const nv = await NumberValidation.findOne({ number: req.params.number });
	if (!nv) {
		return next(new AppError('invalid number or OTP'));
	}
	if (nv.isExpired()) {
		return next(new AppError('OTP expires'));
	}
	if (!nv.isCorrect(req.params.otp)) {
		return next(new AppError('Invalid OTP'));
	}

	res.status(200).json({
		status: 'success',
		data: {
			nv,
		},
	});
});

exports.sendOTPOnMail = catchAsync(async (req, res, next) => {
	try {
		const resp = await sendEmailOTP(
			'rakeshchandrra@gmail.com',
			'OTP for homesearch',
			req.params.otp
		);
		return res.status(200).json({
			status: 'success',
			resp,
		});
	} catch (error) {
		return next(new AppError(error.message));
	}
});
