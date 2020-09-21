const jwt = require('jsonwebtoken');
const Admin = require('./../models/adminModel');
const Feature = require('./../models/featuresModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const ApiFeatures = require('../utils/apiFeatures');
const path = require('path');
var fs = require('fs');
const { promisify } = require('util');

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

exports.login = catchAsync(async (req, res, next) => {
	const { username, password, otp } = req.body;

	// 1) Check if email and password exist
	if (!username || !password || !otp) {
		return next(
			new AppError('Please provide username,password and otp!', 400)
		);
	}
	let docList = await Feature.find().sort({ _id: 1 }).limit(1);
	if (docList.length == 0) {
		return next(new AppError('auth number not found', 400));
	}
	const lastDoc = await Feature.findById(docList[0]._id);
	if (!lastDoc.correctOtp(otp)) {
		return next(new AppError('otp not matched', 401));
	}
	// 2) Check if user exists && password is correct
	const admin = await Admin.findOne({ username }).select('+password');

	if (!admin || !(await admin.correctPassword(password, admin.password))) {
		return next(new AppError('Incorrect email or password', 401));
	}

	// 3) If everything ok, send token to client
	createSendToken(admin, 200, res);
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
	const currentUser = await Admin.findById(decoded.id);
	if (!currentUser) {
		return next(
			new AppError(
				'The user belonging to this token does no longer exist.',
				401
			)
		);
	}

	// 4) Check if user changed password after the token was issued
	if (currentUser.passwordChanged(decoded.iat)) {
		return next(
			new AppError(
				'User recently changed password! Please log in again.',
				401
			)
		);
	}

	// GRANT ACCESS TO PROTECTED ROUTE
	req.admin = currentUser;
	next();
});

exports.getAdminInfo = catchAsync(async (req, res, next) => {
	if (!req.admin) {
		return next(new AppError('admin not found', 401));
	}
	res.status(200).json({
		status: 'success',
		data: {
			admin: req.admin,
		},
	});
});

exports.addAdmin = catchAsync(async (req, res, next) => {
	const lastDoc = await Admin.find().sort({ _id: -1 }).limit(1);
	const lastDocSerialNumber =
		lastDoc.length === 0 ? 0 : lastDoc[0].serialNumber;

	// name username email serialNumber password cities gender  status ableToSee type
	const newAdmin = await Admin.create({
		name: req.body.name,
		username: req.body.username,
		email: req.body.email,
		serialNumber: lastDocSerialNumber + 1,
		password: req.body.password,
		cities: req.body.cities,
		gender: req.body.gender,
		role: req.body.role,
		status: req.body.status,
		ableToSee: req.body.ableToSee,
		type: req.body.type,
	});

	res.status(201).json({
		status: 'success',
		data: {
			admin: newAdmin,
		},
	});
});

exports.getAllAdmins = catchAsync(async (req, res, next) => {
	const features = new ApiFeatures(Admin.find(), req.query)
		.filter()
		.sort()
		.limit()
		.pagination();
	// const doc = await features.query.explain();
	const doc = await features.queryForDocument;
	res.status(200).json({
		status: 'success',
		count: doc.length,
		data: {
			admins: doc,
		},
	});
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

		let admin = await Admin.findById(req.params.id);
		if (!admin) {
			return next(new AppError('Admin not found', 404));
		}

		if (admin.photo) {
			fs.unlinkSync(
				path.join(__dirname, '../', 'images', 'profile_images/') +
					admin.photo
			);
		}

		await image.mv(
			path.join(__dirname, '../', 'images', 'profile_images/') + imageName
		);

		admin.photo = imageName;
		admin.photoStatus = 'uploaded';
		const updatedAdmin = await admin.save();
		if (!updatedAdmin) {
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
				user: updatedAdmin,
			},
		});
	}
});

exports.getAdmin = catchAsync(async (req, res, next) => {
	const admin = await Admin.findById(req.params.id).select(
		'name username email serialNumber password cities gender  status ableToSee type photo'
	);

	res.status(201).json({
		status: 'success',
		data: {
			admin,
		},
	});
});

exports.updateAdmin = catchAsync(async (req, res, next) => {
	const doc = await Admin.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});

	if (!doc) {
		return next(new AppError('No document found with that ID', 404));
	}

	res.status(200).json({
		status: 'success',
		data: {
			admin: doc,
		},
	});
});

exports.deleteAdmin = catchAsync(async (req, res, next) => {
	const deleteAdmin = await Admin.deleteOne({ _id: req.params.id });
	res.status(202).json({
		status: 'success',
		data: {
			user: deleteAdmin,
		},
	});
});
