const Admin = require('./../models/adminModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const signToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
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
			admin: user,
		},
	});
};

exports.staffLogin = catchAsync(async (req, res, next) => {
	const { username, password } = req.body;

	// 1) Check if email and password exist
	if (!username || !password) {
		return next(new AppError('Please provide username and password', 400));
	}

	// 2) Check if user exists && password is correct
	const admin = await Admin.findOne({ username }).select('+password +status');
	console.log(admin);

	if (!admin || !(await admin.correctPassword(password, admin.password))) {
		return next(new AppError('Incorrect username or password', 401));
	}

	if (admin.status !== 'active') {
		return next(new AppError('Your account has been disabled', 401));
	}

	const validTypes = [
		'staff',
		'clientSupport',
		'digitalMarketing',
		'bdm',
		'gm',
		'leadStrategist',
	];

	if (!validTypes.includes(admin.type)) {
		return next(new AppError('Please go to /admin route'));
	}

	// 3) If everything ok, send token to client
	createSendToken(admin, 200, res);
});

exports.getAdmins = catchAsync(async (req, res) => {
	const filter = {};
	const page = req.body.page * 1 || 1;
	const limit = req.body.limit * 1 || 10;
	const skip = (page - 1) * limit;

	if (req.body.id) {
		const id = req.body.id;
		if (!id.startsWith('HSI')) {
			return next(new AppError('Invalid ID'));
		}
		const docNumber = id.split('HSI')[1];
		if (Number(docNumber)) {
			filter.docNumber = Number(docNumber);
		}
	}

	if (req.body.name) {
		filter.name = { $regex: req.body.name, $options: 'i' };
	}
	if (req.body.username) {
		filter.username = { $regex: req.body.username, $options: 'i' };
	}

	if (req.body.email) {
		filter.email = { $regex: req.body.email, $options: 'i' };
	}
	if (req.body.number) {
		filter.number = { $regex: req.body.number, $options: 'i' };
	}
	if (req.body.type) {
		filter.type = { $in: req.body.type };
	}
	if (req.body.status) {
		filter.status = req.body.status;
	}

	const totalDocs = await Admin.countDocuments(filter);

	const admins = await Admin.find(filter)
		.sort('-createdAt')
		.skip(skip)
		.limit(limit);

	res.status(200).json({
		status: 'success',
		data: {
			admins,
			totalDocs,
		},
	});
});

exports.updateAdmin = catchAsync(async (req, res, next) => {
	const existingAdmin = await Admin.findById(req.params.id);
	if (!existingAdmin) {
		return next(new AppError('Admin not found', 404));
	}
	const data = req.body;

	const admin = await Admin.findByIdAndUpdate(req.params.id, data, {
		new: true,
		runValidators: true,
	});

	res.status(200).json({
		status: 'success',
		data: {
			admin,
		},
	});
});

exports.logout = catchAsync(async (req, res, next) => {
	if (req.admin) {
		req.admin = undefined;
		console.log('object');
	}

	res.status(200).json({
		status: 'success',
		data: null,
	});
});
