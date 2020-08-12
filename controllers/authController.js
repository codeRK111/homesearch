// const crypto = require('crypto');
// const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const sendOtpMessage = require('../utils/sendOtp');
const ApiFeatures = require('../utils/apiFeatures');
const path = require('path');
var fs = require('fs');
// const sendEmail = require('./../utils/email');

const getUserEssentials = (user) => ({
	id: user._id,
	name: user.name,
	email: user.email,
	number_verified: user.number_verified,
});

const signToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

const createSendToken = (user, statusCode, res) => {
	const token = signToken(user._id);
	const cookieOptions = {
		expires: new Date(
			Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
		),
		httpOnly: true,
	};
	if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

	res.cookie('jwt', token, cookieOptions);

	// Remove password from output
	user.password = undefined;

	res.status(statusCode).json({
		status: 'success',
		token,
		data: {
			user,
		},
	});
};

exports.signup = catchAsync(async (req, res, next) => {
	const newUser = await User.create({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		city: req.body.city,
		gender: req.body.gender,
	});

	createSendToken(getUserEssentials(newUser), 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;

	// 1) Check if email and password exist
	if (!email || !password) {
		return next(new AppError('Please provide email and password!', 400));
	}
	// 2) Check if user exists && password is correct
	const user = await User.findOne({ email }).select('+password');

	if (!user || !(await user.correctPassword(password, user.password))) {
		return next(new AppError('Incorrect email or password', 401));
	}

	// 3) If everything ok, send token to client
	createSendToken(getUserEssentials(user), 200, res);
});

exports.googleLogIn = catchAsync(async (req, res, next) => {
	let inputError = false;
	['name', 'email', 'googleId'].forEach((v) => {
		if (!req.body[v]) {
			inputError = true;
			next(new AppError(`Missing parameter: ${v}`, 400));
		}
	});
	if (inputError) return;
	const user = await User.findOne({ email: req.body.email });
	if (user) {
		createSendToken(getUserEssentials(user), 200, res);
	} else {
		const newUser = await User.create({
			name: req.body.name,
			email: req.body.email,
			googleId: req.body.googleId,
		});

		createSendToken(getUserEssentials(newUser), 201, res);
	}
});

exports.protect = catchAsync(async (req, res, next) => {
	// 1) Getting token and check of it's there
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		token = req.headers.authorization.split(' ')[1];
	}

	if (!token) {
		return next(
			new AppError(
				'You are not logged in! Please log in to get access.',
				401
			)
		);
	}

	// 2) Verification token
	const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

	// 3) Check if user still exists
	const currentUser = await User.findById(decoded.id);
	if (!currentUser) {
		return next(
			new AppError(
				'The user belonging to this token does no longer exist.',
				401
			)
		);
	}

	// 4) Check if user changed password after the token was issued
	if (currentUser.changedPasswordAfter(decoded.iat)) {
		return next(
			new AppError(
				'User recently changed password! Please log in again.',
				401
			)
		);
	}

	// GRANT ACCESS TO PROTECTED ROUTE
	req.user = currentUser;
	next();
});

exports.restrictTo = (...roles) => {
	return (req, res, next) => {
		// roles ['admin', 'lead-guide']. role='user'
		if (!roles.includes(req.user.role)) {
			return next(
				new AppError(
					'You do not have permission to perform this action',
					403
				)
			);
		}

		next();
	};
};

exports.resetPassword = catchAsync(async (req, res, next) => {
	// 1) Get user based on the id
	const user = await User.findById(req.params.id);

	// 2) If token has not expired, and there is user, set the new password
	if (!user) {
		return next(new AppError('User not found', 404));
	}
	if (user.googleId) {
		return next(new AppError('You are logged in via google', 400));
	}
	if (!user.number_verified) {
		return next(new AppError('Please verify your number', 400));
	}
	if (!req.body.password) {
		return next(new AppError('Missing parameter password', 400));
	}
	user.password = req.body.password;
	await user.save();

	// 4) Log the user in, send JWT
	createSendToken(getUserEssentials(user), 200, res);
});

exports.sendOtp = catchAsync(async (req, res, next) => {
	// 1) Get user based on the id
	const user = await User.findOne({ number: req.params.number }).select(
		'+otp'
	);

	// 2) If token has not expired, and there is user, set the new password
	if (!user) {
		return next(new AppError('User not found', 404));
	}
	let randomNumber = `${Math.floor(1000 + Math.random() * 9000)}`;
	user.otp = randomNumber;
	await user.save();
	const otpResponse = await sendOtpMessage(req.params.number, randomNumber);
	if (otpResponse.data.startsWith('OK')) {
		res.status(200).json({
			status: 'success',
			data: {
				userId: user._id,
			},
		});
	} else {
		return next(new AppError('Unable to send otp', 500));
	}
	console.log();
});

exports.validateOtp = catchAsync(async (req, res, next) => {
	// 1) Get user based on the id
	const user = await User.findOne({ number: req.params.number }).select(
		'+otp'
	);

	if (!user.correctOtp(req.params.otp)) {
		return next(new AppError('otp not matched', 401));
	}
	user.number_verified = true;
	await user.save();
	createSendToken(getUserEssentials(user), 200, res);
});

exports.addProfilePicture = catchAsync(async (req, res, next) => {
	if (!req.files) {
		return next(new AppError('No image found', 400));
	} else {
		//Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
		let image = req.files.image;
		// console.log('-----', path.join(__dirname, images, profile_images));

		//Use the mv() method to place the file in upload directory (i.e. "uploads")
		let imageName =
			Math.floor(10000000 + Math.random() * 90000000) + '-' + image.name;

		let user = await User.findById(req.params.id);
		if (!user) {
			return next(new AppError('User not found', 404));
		}

		await image.mv(
			path.join(__dirname, '../', 'images', 'profile_images/') + imageName
		);

		user.photo = imageName;
		user.photoStatus = 'uploaded';
		const updatedUser = await user.save();
		if (!updatedUser) {
			fs.unlinkSync(
				path.join(__dirname, '../', 'images', 'profile_images/') +
					imageName
			);
			return next(new AppError('Unable set image  '), 500);
		}

		//send response
		res.send({
			status: true,
			message: 'File is uploaded',
			data: {
				name: image.name,
				mimetype: image.mimetype,
				size: image.size,
				user: updatedUser,
			},
		});
	}
});

exports.updateProfilePicture = catchAsync(async (req, res, next) => {
	if (!req.files) {
		return next(new AppError('No image found', 400));
	} else {
		let user = await User.findById(req.params.id);
		if (!user) {
			return next(new AppError('User not found', 404));
		}

		let image = req.files.image;

		//Use the mv() method to place the file in upload directory (i.e. "uploads")
		let imageName =
			Math.floor(10000000 + Math.random() * 90000000) + '-' + image.name;
		await image.mv(
			path.join(__dirname, '../', 'images', 'profile_images/') + imageName
		);
		if (image.photo) {
			fs.unlinkSync(
				path.join(__dirname, '../', 'images', 'profile_images/') +
					user.photo
			);
		}
		user.photo = imageName;
		user.photoStatus = 'uploaded';
		const updatedUser = await user.save();
		if (!updatedUser) {
			fs.unlinkSync(
				path.join(__dirname, '../', 'images', 'profile_images/') +
					imageName
			);
			return next(new AppError('Unable set image  '), 500);
		}

		//send response
		res.send({
			status: true,
			message: 'File is uploaded',
			data: {
				name: image.name,
				mimetype: image.mimetype,
				size: image.size,
				user: updatedUser,
			},
		});
	}
});

// -------------------------------------------Admin------------------------------------------------

exports.getAllUsers = catchAsync(async (req, res, next) => {
	const features = new ApiFeatures(User.find(), req.query)
		.filter()
		.sort()
		.limit()
		.pagination();
	// const doc = await features.query.explain();
	const doc = await features.queryForDocument;
	res.status(200).json({
		status: 'success',
		data: {
			users: doc,
		},
	});
});

exports.updateUser = catchAsync(async (req, res, next) => {
	const user = [
		'name',
		'email',
		'city',
		'gender',
		'number',
		'numberVerified',
		'role',
		'status',
		'mobileStatus',
		'registerThrough',
		'registerVia',
		'paymentStatus',
		'numberVerified',
	];
	const doc = await User.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
		select: user.join(' '),
	});

	if (!doc) {
		return next(new AppError('No document found with that ID', 404));
	}

	res.status(200).json({
		status: 'success',
		data: {
			user: doc,
		},
	});
});

exports.adminLogin = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;

	// 1) Check if email and password exist
	if (!email || !password) {
		return next(new AppError('Please provide email and password!', 400));
	}
	// 2) Check if user exists && password is correct
	const user = await User.findOne({ email }).select('+password');

	if (!user || !(await user.correctPassword(password, user.password))) {
		return next(new AppError('Incorrect email or password', 401));
	}

	if (user.role !== 'admin') {
		return next(new AppError('You have no permission to login', 403));
	}

	// 3) If everything ok, send token to client
	createSendToken(getUserEssentials(user), 200, res);
});

exports.addUser = catchAsync(async (req, res, next) => {
	const lastDoc = await User.find().sort({ _id: -1 }).limit(1);
	console.log(lastDoc);
	const lastDocSerialNumber =
		lastDoc.length === 0 ? 0 : lastDoc[0].serialNumber;

	const newUser = await User.create({
		name: req.body.name,
		email: req.body.email,
		serialNumber: lastDocSerialNumber + 1,
		password: req.body.password,
		city: req.body.city,
		gender: req.body.gender,
		number: req.body.number,
		number_verified: req.body.number_verified,
		role: req.body.role,
		status: req.body.status,
		mobileStatus: req.body.mobileStatus,
		registerThrough: req.body.registerThrough,
		registerVia: req.body.registerVia,
		paymentStatus: req.body.paymentStatus,
		numberVerified: req.body.numberVerified,
	});

	res.status(201).json({
		status: 'success',
		data: {
			user: getUserEssentials(newUser),
		},
	});
});

exports.getUser = catchAsync(async (req, res, next) => {
	const user = await User.findById(req.params.id).select(
		'number googleId photoStatus createdAt status paymentStatus numberVerified name email serialNumber gender role mobileStatus registerThrough registerVia photo password'
	);

	res.status(201).json({
		status: 'success',
		data: {
			user,
		},
	});
});

exports.filterUsers = catchAsync(async (req, res, next) => {
	let filterObj = {};
	if (req.body.name) {
		filterObj['name'] = { $regex: new RegExp(req.body.name, 'i') };
	}
	if (req.body.email) {
		filterObj['email'] = { $regex: new RegExp(req.body.email, 'i') };
	}
	if (req.body.number) {
		filterObj['number'] = { $regex: new RegExp(req.body.number, 'i') };
	}
	if (req.body.city) {
		filterObj['city'] = req.body.city;
	}
	if (req.body.paymentStatus) {
		filterObj['paymentStatus'] = req.body.paymentStatus;
	}
	if (req.body.paymentStatus) {
		filterObj['paymentStatus'] = req.body.paymentStatus;
	}
	if (req.body.registerThrough) {
		filterObj['registerThrough'] = req.body.registerThrough;
	}
	if (req.body.registerVia) {
		filterObj['registerVia'] = req.body.registerVia;
	}
	const users = await User.find(filterObj).select(
		'number googleId photoStatus createdAt status paymentStatus numberVerified name email serialNumber gender role mobileStatus registerThrough registerVia photo password'
	);

	res.status(201).json({
		status: 'success',
		count: users.length,
		data: {
			users,
		},
	});
});

exports.deleteUser = catchAsync(async (req, res, next) => {
	const deleteUser = await User.deleteOne({ _id: req.params.id });
	res.status(202).json({
		status: 'success',
		data: {
			user: getUserEssentials(deleteUser),
		},
	});
});
