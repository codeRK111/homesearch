// const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const sendOtpMessage = require('../utils/sendOtp');
const ApiFeatures = require('../utils/apiFeatures');
const sendEmail = require('../utils/mail');
const path = require('path');
var fs = require('fs');
const Admin = require('../models/adminModel');
const mongoose = require('mongoose');
const moment = require('moment');
const sendEmailOTP = require('../utils/sendMailOTP');
const ObjectId = mongoose.Types.ObjectId;
// const sendEmail = require('./../utils/email');

const getUserEssentials = (user) => ({
	id: user._id,
	name: user.name,
	email: user.email,
	numberVerified: user.numberVerified,
	number: user.number,
	address: user.address ? user.address : '',
	description: user.description ? user.description : '',
	companyName: user.companyName ? user.companyName : '',
	cities: user.cities ? user.cities : [],
});

const signToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

const createSendToken = (user, statusCode, res) => {
	const token = signToken(user.id);
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
	const lastDoc = await User.find().sort({ createdAt: -1 }).limit(1);
	const lastDocSerialNumber =
		lastDoc.length === 0 ? 0 : lastDoc[0].serialNumber;
	console.log(lastDocSerialNumber);
	const newUser = await User.create({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		city: req.body.city,
		gender: 'male',
		number: req.body.number,
		role: req.body.role,
		registerThrough: 'site login',
		registerVia: 'Web',
		mobileStatus: req.body.mobileStatus
			? req.body.mobileStatus
			: 'semi-private',
		paymentStatus: 'unpaid',
		status: 'active',
		serialNumber: lastDocSerialNumber + 1,
	});

	createSendToken(getUserEssentials(newUser), 201, res);
});

exports.signIn = catchAsync(async (req, res, next) => {
	const user = await User.findOne({ number: req.body.number }).select(
		'+otp +status'
	);
	if (!user) {
		return next(
			new AppError('You are not registered with us, please sign up', 401)
		);
	}
	let randomNumber = `${Math.floor(1000 + Math.random() * 9000)}`;
	if (user.status !== 'active') {
		return next(
			new AppError(
				'Your account has been dactivated.Please contact support team : 9090-91-7676',
				401
			)
		);
	}
	const updatedUser = await User.findByIdAndUpdate(
		user.id,
		{ otp: randomNumber, otpExpiresAt: moment().add(2, 'm') },
		{
			new: true,
			runValidators: true,
		}
	);

	const otpResponse = await sendOtpMessage(req.body.number, randomNumber);
	if (user.email) {
		const resp = await sendEmailOTP(
			user.email,
			'OTP for homesearch',
			randomNumber
		);
		console.log(resp);
	}
	if (otpResponse.data.startsWith('OK')) {
		res.status(200).json({
			status: 'success',
			data: {
				userId: updatedUser._id,
			},
		});
	} else {
		return next(new AppError('Unable to send otp', 500));
	}
});

exports.signupByUser = catchAsync(async (req, res, next) => {
	const numberExists = await User.findOne(
		{ number: req.body.number },
		{ _id: 1 }
	);
	if (numberExists) {
		return next(
			new AppError(
				'This phone number used by someone else,please use another one',
				400
			)
		);
	}
	const emailExists = await User.findOne(
		{ email: req.body.email },
		{ _id: 1 }
	);
	if (emailExists) {
		return next(
			new AppError(
				'This email used by someone else,please use another one',
				400
			)
		);
	}
	let randomNumber = `${Math.floor(1000 + Math.random() * 9000)}`;
	const newUser = await User.create({
		number: req.body.number,
		name: req.body.name,
		role: req.body.role,
		email: req.body.email,
		registerThrough: 'site login',
		registerVia: req.body.registerVia,
		mobileStatus: 'semi-private',
		paymentStatus: 'unpaid',
		status: 'active',
		otp: randomNumber,
		otpExpiresAt: moment().add(2, 'm'),
	});
	const test = await sendOtpMessage(req.body.number, randomNumber);
	console.log(test);
	res.status(200).json({
		status: 'success',
		data: {
			userId: newUser._id,
		},
	});
});

exports.login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;

	// 1) Check if email and password exist
	if (!email || !password) {
		return next(new AppError('Please provide email and password!', 400));
	}
	// 2) Check if user exists && password is correct
	const user = await User.findOne({ email }).select('+password ');
	if (user.status !== 'active') {
		return next(
			new AppError(
				'Your account has been dactivated.Please contact support team : 9090-91-7676',
				401
			)
		);
	}

	if (!user || !(await user.correctPassword(password, user.password))) {
		return next(new AppError('Incorrect email or password', 401));
	}

	// 3) If everything ok, send token to client
	createSendToken(user, 200, res);
});

exports.checkExists = catchAsync(async (req, res, next) => {
	const dataCount = await User.countDocuments({
		[req.params.resource]: req.body.data,
	});
	res.status(200).json({
		status: 'success',
		data: !!dataCount,
	});
});

exports.sendUpdateNumberOTP = catchAsync(async (req, res, next) => {
	const dataCount = await User.countDocuments({
		number: req.body.number,
		_id: { $ne: ObjectId(req.user.id) },
	});
	if (dataCount > 0) {
		return next(
			new AppError(
				'This number is already registered with us,Please use another one',
				400
			)
		);
	}
	let randomNumber = `${Math.floor(1000 + Math.random() * 9000)}`;
	const updatedUser = await User.findByIdAndUpdate(
		req.user.id,
		{ otp: randomNumber, otpExpiresAt: moment().add(1, 'm') },
		{
			new: true,
			runValidators: true,
		}
	);

	const otpResponse = await sendOtpMessage(req.body.number, randomNumber);
	if (otpResponse.data.startsWith('OK')) {
		res.status(200).json({
			status: 'success',
			data: {
				userId: updatedUser._id,
			},
		});
	} else {
		return next(new AppError('Unable to send otp', 500));
	}
});

exports.sendUpdatePasswordOTP = catchAsync(async (req, res, next) => {
	const user = await User.findOne({ number: req.body.number });
	if (!user) {
		return next(
			new AppError('You are not registered with us.Please sign up', 404)
		);
	}
	let randomNumber = `${Math.floor(1000 + Math.random() * 9000)}`;
	const updatedUser = await User.findByIdAndUpdate(
		user.id,
		{ otp: randomNumber, otpExpiresAt: moment().add(1, 'm') },
		{
			new: true,
			runValidators: true,
		}
	);

	const otpResponse = await sendOtpMessage(req.body.number, randomNumber);
	if (otpResponse.data.startsWith('OK')) {
		res.status(200).json({
			status: 'success',
			data: {
				userId: updatedUser._id,
			},
		});
	} else {
		return next(new AppError('Unable to send otp', 500));
	}
});

exports.sendResetPasswordOtp = catchAsync(async (req, res, next) => {
	const { email } = req.body;
	if (!email) return next(new AppError('Please give your email', 400));
	const user = await User.findOne({ email, registerThrough: 'site login' });
	if (!user) {
		return next(new AppError('No user found', 401));
	}

	try {
		let randomNumber = `${Math.floor(1000 + Math.random() * 9000)}`;
		if (user.number) {
			await sendOtpMessage(user.number, randomNumber);
		}
		// const test = await sendEmail(
		// 	email,
		// 	'Reset password',
		// 	`Your homesearch18 reset password otp is ${randomNumber}`
		// );
		// console.log(test);
		const updatedUser = await User.findByIdAndUpdate(
			user.id,
			{ otp: randomNumber },
			{
				new: true,
				runValidators: true,
				useFindAndModify: false,
			}
		);
		console.log(updatedUser);
		res.status(200).json({
			status: 'success',
			data: updatedUser,
		});
	} catch (error) {
		res.status(200).json({
			status: 'fail',
			error: error.message,
		});
	}
});

exports.resetMyPassword = catchAsync(async (req, res, next) => {
	const { email, password, otp } = req.body;
	if (!email) return next(new AppError('Please give your email', 400));
	if (!otp) return next(new AppError('Please give  otp', 400));
	if (!password) return next(new AppError('Please give your password', 400));
	const user = await await User.findOne({
		email,
		registerThrough: 'site login',
	}).select('+password +otp');
	if (!user) {
		return next(new AppError('No user found', 401));
	}

	if (!user.correctOtp(otp)) {
		return next(new AppError('otp not matched', 401));
	}
	user.numberVerified = true;
	user.password = password;
	const newUser = await user.save();

	// 3) If everything ok, send token to client
	createSendToken(newUser, 200, res);
});

exports.updateMyPassword = catchAsync(async (req, res, next) => {
	const { oldPassword, newPassword } = req.body;

	// 1) Check if email and password exist
	if (!oldPassword || !newPassword) {
		return next(
			new AppError('Please provide oldPassword and newPassword!', 400)
		);
	}
	// 2) Check if user exists && password is correct
	const user = await User.findById(req.user.id).select('+password');

	if (!user || !(await user.correctPassword(oldPassword, user.password))) {
		return next(new AppError('Incorrect current password', 401));
	}
	user.password = newPassword;
	const newUser = await user.save();

	// 3) If everything ok, send token to client
	createSendToken(newUser, 200, res);
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
	console.log(decoded.id);
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

	// GRANT ACCESS TO PROTECTED ROUTE
	req.user = currentUser;
	next();
});

exports.getUserInfo = catchAsync(async (req, res, next) => {
	res.status(200).json({
		status: 'success',
		data: { user: req.user },
	});
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

// Legacy
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
	const updatedUser = await User.findByIdAndUpdate(
		user.id,
		{ otp: randomNumber },
		{
			new: true,
			runValidators: true,
		}
	);

	console.log(updatedUser);
	const otpResponse = await sendOtpMessage(req.params.number, randomNumber);
	if (otpResponse.data.startsWith('OK')) {
		res.status(200).json({
			status: 'success',
			data: {
				userId: updatedUser._id,
			},
		});
	} else {
		return next(new AppError('Unable to send otp', 500));
	}
	console.log();
});

exports.sendOtpNew = catchAsync(async (req, res, next) => {
	if (!req.params.number) {
		return next(new AppError('Phone number required', 400));
	}

	// 1) Get user based on the id
	const user = await User.findOne({ number: req.params.number }).select(
		'+otp +status'
	);

	// 2) If token has not expired, and there is user, set the new password
	if (!user) {
		return next(
			new AppError('You are not registered with us.Please sign up', 404)
		);
	}
	if (user.status !== 'active') {
		return next(
			new AppError(
				'Your account has been dactivated.Please contact support team : 9090-91-7676',
				401
			)
		);
	}
	let randomNumber = `${Math.floor(1000 + Math.random() * 9000)}`;
	const updatedUser = await User.findByIdAndUpdate(
		user.id,
		{ otp: randomNumber, otpExpiresAt: moment().add(2, 'm') },
		{
			new: true,
			runValidators: true,
		}
	);

	const otpResponse = await sendOtpMessage(req.params.number, randomNumber);
	if (otpResponse.data.startsWith('OK')) {
		res.status(200).json({
			status: 'success',
			data: {
				userId: updatedUser._id,
			},
		});
	} else {
		return next(new AppError('Unable to send otp', 500));
	}
});

exports.sendOtpWithoutVerfication = catchAsync(async (req, res, next) => {
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
		'+otp +otpExpiresAt'
	);

	if (!user.correctOtp(req.params.otp)) {
		return next(new AppError('Please enter correct OTP', 401));
	}
	if (user.otpExpired()) {
		return next(new AppError('Your OTP has been expired', 401));
	}
	user.numberVerified = true;
	user.otp = null;
	user.otpExpiresAt = null;
	await user.save();
	createSendToken(user, 200, res);
});

exports.updateMyNumber = catchAsync(async (req, res, next) => {
	// 1) Get user based on the id
	const user = await User.findById(req.user.id).select('+otp +otpExpiresAt');

	if (!user.correctOtp(req.body.otp)) {
		return next(new AppError('Please enter correct OTP', 401));
	}
	if (user.otpExpired()) {
		return next(new AppError('Your OTP has been expired', 401));
	}
	user.numberVerified = true;
	user.number = req.body.number;
	await user.save();
	createSendToken(user, 200, res);
});

exports.resetMyPassword = catchAsync(async (req, res, next) => {
	// 1) Get user based on the id
	const user = await User.findById(req.body.id).select('+otp +otpExpiresAt');

	if (!user.correctOtp(req.body.otp)) {
		return next(new AppError('Please enter correct OTP', 401));
	}
	if (user.otpExpired()) {
		return next(new AppError('Your OTP has been expired', 401));
	}
	user.password = req.body.password;
	await user.save();
	createSendToken(user, 200, res);
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

exports.handleProfileImage = catchAsync(async (req, res, next) => {
	const updatedUser = await User.findByIdAndUpdate(
		req.user.id,
		{ photo: req.file.filename, photoStatus: 'uploaded' },
		{
			new: true,
			runValidators: true,
		}
	);
	if (!updatedUser) {
		fs.unlinkSync(
			path.join(__dirname, '../', 'images', 'profile_images/') +
				req.file.filename
		);
		return next(new AppError('Unable set image  '), 500);
	}

	//send response
	res.send({
		status: true,
		message: 'File is uploaded',
	});
});

exports.updateMe = catchAsync(async (req, res, next) => {
	const body = {
		name: req.body.name ? req.body.name : 'Homesearch User',
		email: req.body.email,
		role: req.body.role,
	};
	if (req.body.city) {
		body.city = req.body.city;
	}
	if (req.body.role === 'agent') {
		const checkFields = [
			'address',
			'description',
			'companyName',
			'cities',
			'connection',
			'network',
			'deals',
			'managedPTypes',
		];
		checkFields.forEach((c) => {
			if (req.body[c]) {
				body[c] = req.body[c];
			}
		});
	}
	const doc = await User.findByIdAndUpdate(req.user.id, body, {
		new: true,
		runValidators: true,
	});

	if (!doc) {
		return next(new AppError('No user found with that ID', 404));
	}

	res.status(200).json({
		status: 'success',
		data: {
			user: doc,
		},
	});
});

// -------------------------------------------Admin------------------------------------------------

exports.getAllUsers = catchAsync(async (req, res, next) => {
	const query = {};
	const admin = await Admin.findById(req.admin.id);
	if (admin.type !== 'super-admin') {
		const cities = admin.userAccessCities.map((c) =>
			mongoose.Types.ObjectId(c.id)
		);

		const or = [];
		if (admin.userAccess.includes('self-users')) {
			or.push({ adminId: mongoose.Types.ObjectId(req.admin.id) });
		}
		if (admin.userAccess.includes('other-staff-users')) {
			or.push({
				registerThrough: { $in: ['staff', 'admin', 'super-admin'] },
			});
		}
		if (admin.userAccess.includes('site-users')) {
			or.push({ registerThrough: 'site login' });
		}
		if (admin.userAccess.includes('google-users')) {
			or.push({ googleId: { $ne: null } });
		}
		if (admin.userAccess.includes('facebook-users')) {
			or.push({ facebookId: { $ne: null } });
		}

		query['$or'] = or;
		query['city'] = { $in: cities };
	}

	console.log(query);

	const features = new ApiFeatures(User.find(query), req.query)
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
	const admin = await Admin.findById(req.admin.id);

	if (admin.type !== 'super-admin' && !admin.userActions.includes('update')) {
		return next(new AppError('You have no permissions', 401));
	}
	if (admin.type !== 'super-admin' && !admin.userActions.includes('status')) {
		delete req.body.status;
	}
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
		createdBy: req.body.createdBy,
		registerThrough: req.admin.type,
		registerVia: req.body.registerVia,
		paymentStatus: req.body.paymentStatus,
		numberVerified: req.body.numberVerified,
		adminId: req.admin.id,
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
	if (req.body.status) {
		filterObj['status'] = req.body.status;
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
