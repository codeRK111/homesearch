const CPModel = require('./../models/chanelPartnerModel');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const jwt = require('jsonwebtoken');

const signToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_STAFF_EXPIRES_IN,
	});
};

const createSendToken = (user, statusCode, res) => {
	const token = signToken(user._id);

	// Remove password from output
	user.password = undefined;

	res.status(statusCode).json({
		status: 'success',
		token,
		data: {
			cp: user,
		},
	});
};

exports.cpLogin = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;

	// 1) Check if email and password exist
	if (!email || !password) {
		return next(new AppError('Please provide email and password', 400));
	}

	// 2) Check if user exists && password is correct
	const cp = await CPModel.findOne({ email }).select('+password +status');

	if (!cp || !(await cp.correctPassword(password, cp.password))) {
		return next(new AppError('Incorrect email or password', 401));
	}

	if (cp.status !== 'active') {
		return next(new AppError('Your account has been disabled', 401));
	}

	await cp.save();
	// 3) If everything ok, send token to client
	createSendToken(cp, 200, res);
});

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
