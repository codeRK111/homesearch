const Feature = require('./../models/featuresModel');
const Project = require('./../models/projectModule');
const Admin = require('./../models/adminModel');
const City = require('./../models/cityModel');
const Location = require('./../models/locationModel');
const Property = require('./../models/propertyModel');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const sendOtpMessage = require('../utils/sendOtp');

exports.setAuthenticationNumber = catchAsync(async (req, res, next) => {
	if (!req.params.number) {
		return next(new AppError('number not found', 400));
	}
	let docList = await Feature.find().sort({ _id: 1 }).limit(1);
	let lastDoc;
	if (docList.length > 0) {
		lastDoc = await Feature.findById(docList[0]._id);
		lastDoc.adminNumber = req.params.number;
		await lastDoc.save();
	} else {
		lastDoc = await Feature.create({
			adminNumber: req.params.number,
		});
	}

	res.status(201).json({
		status: 'success',
		data: {
			features: lastDoc,
		},
	});
});

exports.setAndSendOtp = catchAsync(async (req, res, next) => {
	let docList = await Feature.find().sort({ _id: 1 }).limit(1);

	if (docList.length == 0) {
		return next(new AppError('auth number not found', 400));
	}
	lastDoc = await Feature.findById(docList[0]._id);
	let randomNumber = `${Math.floor(1000 + Math.random() * 9000)}`;
	lastDoc.otp = randomNumber;
	await lastDoc.save();
	const otpResponse = await sendOtpMessage(lastDoc.adminNumber, randomNumber);
	if (otpResponse.data.startsWith('OK')) {
		res.status(200).json({
			status: 'success',
		});
	} else {
		return next(new AppError('Unable to send otp', 500));
	}
});

exports.getAuthNumber = catchAsync(async (req, res, next) => {
	let docList = await Feature.find().sort({ _id: 1 }).limit(1);

	if (docList.length == 0) {
		return next(new AppError('auth number not found', 400));
	}
	lastDoc = await Feature.findById(docList[0]._id);
	res.status(200).json({
		status: 'success',
		data: {
			authNumber: lastDoc.adminNumber,
		},
	});
});

exports.getCount = catchAsync(async (req, res, next) => {
	const admins = await Admin.countDocuments();
	const cities = await City.countDocuments();
	const locations = await Location.countDocuments();
	const activeProperties = await Property.countDocuments({
		status: 'active',
	});
	const underScreeningProperties = await Property.countDocuments({
		status: 'underScreening',
	});
	const expiredProperties = await Property.countDocuments({
		status: 'expired',
	});
	const users = await User.countDocuments();
	const projects = await Project.countDocuments();

	res.status(200).json({
		status: 'success',
		data: {
			admins,
			users,
			cities,
			locations,
			activeProperties,
			underScreeningProperties,
			expiredProperties,
			projects,
		},
	});
});
