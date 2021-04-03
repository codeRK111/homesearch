const AppError = require('./../utils/appError');
const Contact = require('./../models/contactModel');
const catchAsync = require('./../utils/catchAsync');
const sendOtpMessage = require('../utils/sendOtp');
const Admin = require('../models/adminModel');
const mongoose = require('mongoose');

exports.getContacts = catchAsync(async (req, res, next) => {
	const admin = await Admin.findById(req.admin.id);
	if (
		!admin.expertQueryActions.includes('view') &&
		admin.type !== 'super-admin'
	) {
		return next(new AppError('You are not authorized', 401));
	}

	const filter = {};
	if (admin.type !== 'super-admin') {
		const or = [];
		if (admin.expertQueryAccess.includes('self-expert-queries')) {
			or.push({
				adminId: mongoose.Types.ObjectId(admin.id),
			});
		}
		if (admin.expertQueryAccess.includes('other-staff-expert-queries')) {
			or.push({
				adminId: { $ne: null },
			});
		}

		if (or.length === 0) {
			return next(
				new AppError('You are not authorized to see any queries', 401)
			);
		} else {
			filter['$or'] = or;
		}
	}
	const page = req.body.page * 1 || 1;
	const limit = req.body.limit * 1 || 10;
	const skip = (page - 1) * limit;
	const totalDocs = await Contact.countDocuments(filter);
	const queries = await Contact.find(filter).skip(skip).limit(limit);

	res.status(200).json({
		status: 'success',
		count: totalDocs,
		data: {
			queries,
		},
	});
});

exports.addContact = catchAsync(async (req, res, next) => {
	const { phoneNumber, sendOTP } = req.body;

	if (!phoneNumber) {
		return next(new AppError('Please provide Phone Number!', 400));
	}

	const count = await Contact.countDocuments({
		phoneNumber: phoneNumber,
	});
	if (count > 0) {
		return next(
			new AppError(
				'You have already requested callback.For more help contact our support team: 9090-91-7676'
			)
		);
	}
	const body = { ...req.body };
	if (sendOTP) {
		let randomNumber = `${Math.floor(1000 + Math.random() * 9000)}`;
		body.otp = randomNumber;
		await sendOtpMessage(body.phoneNumber, randomNumber);
		body.otp = randomNumber;
	} else {
		body.verified = true;
	}
	let contact = await Contact.create(body);
	res.status(200).json({
		status: 'success',
		data: {
			contact,
		},
	});
});

exports.addContactByAdmin = catchAsync(async (req, res, next) => {
	const admin = await Admin.findById(req.admin.id);
	if (
		!admin.expertQueryActions.includes('create') &&
		admin.type !== 'super-admin'
	) {
		return next(new AppError('You are not authorized', 401));
	}

	const body = { ...req.body };

	body.adminId = admin.id;
	let contact = await Contact.create(body);
	res.status(200).json({
		status: 'success',
		data: {
			contact,
		},
	});
});

exports.validateNumber = catchAsync(async (req, res, next) => {
	const contact = await Contact.findOne({
		phoneNumber: req.params.number,
	}).select('+otp');
	if (!contact.correctOtp(req.params.otp)) {
		return next(new AppError('otp not matched', 401));
	}
	contact.verified = true;
	await contact.save();
	res.status(200).json({
		status: 'success',
		data: {
			contact,
		},
	});
});

exports.deleteQuery = catchAsync(async (req, res, next) => {
	const queries = await Contact.findByIdAndRemove(req.params.id);

	res.status(200).json({
		status: 'success',
		data: {
			queries,
		},
	});
});
exports.getQueryDetails = catchAsync(async (req, res, next) => {
	const query = await Contact.findById(req.params.id);

	res.status(200).json({
		status: 'success',
		data: {
			query,
		},
	});
});
exports.updateQuery = catchAsync(async (req, res, next) => {
	const query = await Contact.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});

	res.status(200).json({
		status: 'success',
		data: {
			query,
		},
	});
});

// Check Query Exists
exports.checkExists = catchAsync(async (req, res, next) => {
	const count = await Contact.countDocuments({
		phoneNumber: req.params.number,
	});
	if (count > 0) {
		return next(
			new AppError(
				'You have already requested callback.For more help contact our support team: 9090-91-7676'
			)
		);
	} else {
		res.status(200).json({
			status: 'success',
			data: false,
		});
	}
});
