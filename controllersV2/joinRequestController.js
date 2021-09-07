const Request = require('./../models/joinRequest');
const sendOtpMessage = require('../utils/sendOtp');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const moment = require('moment');

exports.addRequest = catchAsync(async (req, res, next) => {
	const requiredFields = ['name', 'email', 'type', 'phoneNumber'];
	requiredFields.every((c) => {
		if (!req.body[c]) {
			next(new AppError(`${c} missing`));
			return false;
		}
	});

	const isExisting = await Request.findOne({
		phoneNumber: req.body.phoneNumber,
	}).select('+otp +otpExpiresAt');

	const randomNumber = `${Math.floor(1000 + Math.random() * 9000)}`;
	if (isExisting) {
		if (isExisting.verified) {
			return next(new AppError('You already made a request'));
		} else {
			isExisting.name = req.body.name;
			isExisting.email = req.body.email;
			isExisting.phoneNumber = req.body.phoneNumber;
			isExisting.type = req.body.type;
			isExisting.otp = randomNumber;
			isExisting.otpExpiresAt = moment().add(2, 'm');
			await isExisting.save();
			return res.status(200).json({
				status: 'success',
				data: {
					request: isExisting.id,
				},
			});
		}
	}
	try {
		await sendOtpMessage(req.body.phoneNumber, randomNumber);
		const request = await Request.create({
			otpExpiresAt: moment().add(2, 'm'),
			name: req.body.name,
			phoneNumber: req.body.phoneNumber,
			email: req.body.email,
			type: req.body.type,
			otp: randomNumber,
		});
		return res.status(200).json({
			status: 'success',
			data: { request: request.id },
		});
	} catch (error) {
		return next(new AppError(error.message));
	}
});

exports.verifyRequest = catchAsync(async (req, res, next) => {
	const requiredFields = ['id', 'otp'];
	requiredFields.every((c) => {
		if (!req.params[c]) {
			next(new AppError(`${c} missing`));
			return false;
		}
	});

	const request = await Request.findById(req.params.id).select(
		'+otp +otpExpiresAt'
	);

	if (!request) {
		return next(new AppError('Invalid request'));
	}
	if (!request.correctOtp(req.params.otp)) {
		return next(new AppError('Please enter correct OTP', 401));
	}
	if (request.otpExpired()) {
		return next(new AppError('Your OTP has been expired', 401));
	}
	try {
		request.verified = true;
		request.otp = null;
		request.otpExpiresAt = null;
		await request.save();
		res.status(200).json({
			status: 'success',
			data: {
				request,
			},
		});
	} catch (error) {
		return next(new AppError(error.message));
	}
});

exports.getRequests = catchAsync(async (req, res, next) => {
	const filter = {};
	const page = req.query.page * 1 || 1;
	const limit = req.query.limit * 1 || 10;
	const skip = (page - 1) * limit;

	// Search By name
	if (req.query.name) {
		filter.name = {
			$regex: req.query.name,
			$options: 'i',
		};
	}

	// Search By email
	if (req.query.email) {
		filter.email = {
			$regex: req.query.email,
			$options: 'i',
		};
	}

	// Search By phone number
	if (req.query.phoneNumber) {
		filter.phoneNumber = {
			$regex: req.query.email,
			$options: 'i',
		};
	}

	if (req.query.type) {
		filter.type = req.query.type;
	}

	if (
		req.query.verified === true ||
		req.query.verified === 'true' ||
		req.query.verified === 1
	) {
		filter.verified = true;
	} else if (
		req.query.verified === false ||
		req.query.verified === 'false' ||
		req.query.verified === 0
	) {
		filter.verified = false;
	} else {
		if (filter.verified) {
			delete filter.verified;
		}
	}

	const totalDocs = await Request.countDocuments(filter);
	const requests = await Request.find(filter)
		.sort('-createdAt')
		.skip(skip)
		.limit(limit);
	res.status(200).json({
		status: 'success',
		data: {
			totalDocs,
			requests,
		},
	});
});

exports.updateRequest = catchAsync(async (req, res, next) => {
	const data = {};
	if (req.body.remark) {
		data.remark = req.body.remark;
	}
	data.remarkBy = req.admin.id;

	const request = await Request.findByIdAndUpdate(req.params.id, data, {
		new: true,
		runValidators: true,
	});
	res.status(200).json({
		status: 'success',
		data: {
			request,
		},
	});
});
