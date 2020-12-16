const AppError = require('./../utils/appError');
const Contact = require('./../models/contactModel');
const catchAsync = require('./../utils/catchAsync');
const sendOtpMessage = require('../utils/sendOtp');

exports.getContacts = catchAsync(async (req, res, next) => {
	const filter = {};
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
	const { phoneNumber } = req.body;

	if (!phoneNumber) {
		return next(new AppError('Please provide Phone Number!', 400));
	}
	const body = { ...req.body };
	let randomNumber = `${Math.floor(1000 + Math.random() * 9000)}`;
	body.otp = randomNumber;
	const otpResponse = await sendOtpMessage(body.phoneNumber, randomNumber);
	console.log(otpResponse);
	if (otpResponse.data.startsWith('OK')) {
		let contact = await Contact.create(body);
		res.status(200).json({
			status: 'success',
			data: {
				contact,
			},
		});
	} else {
		return next(new AppError('Unable to send otp', 500));
	}
});

exports.addContactByAdmin = catchAsync(async (req, res, next) => {
	let contact = await Contact.create(req.body);
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
