const Contact = require('./../models/userContactModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const sendOtpMessage = require('../utils/sendOtp');

const sendAndSetOTP = async (user, req, res, next) => {
	try {
		if (!user) {
			return next(new AppError('user not found'));
		}
		let randomNumber = `${Math.floor(1000 + Math.random() * 9000)}`;
		await sendOtpMessage(req.body.phoneNumber, randomNumber);
		user.otp = randomNumber;
		user.verified = false;
		const newUser = await user.save();
		return newUser;
	} catch (error) {
		return next(new AppError(error.message));
	}
};

exports.createContact = catchAsync(async (req, res, next) => {
	const requiedFields = ['name', 'email', 'phoneNumber', 'message'];
	const data = {};

	for (const key in req.body) {
		if (Object.hasOwnProperty.call(req.body, key)) {
			if (requiedFields.includes(key)) {
				data[key] = req.body[key];
			}
		}
	}
	const contact = await Contact.create(data);
	const newContact = await sendAndSetOTP(contact, req, res, next);
	res.status(201).json({
		status: 'success',
		data: { contact: newContact },
	});
});

exports.validateOTP = catchAsync(async (req, res, next) => {
	const contact = await Contact.findById(req.params.id).select('+otp');
	if (!contact) {
		return next(new AppError('Invalid request', 404));
	}

	if (!contact.correctOtp(req.params.otp)) {
		return next(new AppError('Please enter correct OTP', 401));
	}
	contact.verified = true;
	contact.otp = null;
	await contact.save();
	res.status(201).json({
		status: 'success',
		data: { contact },
	});
});

exports.getContacts = catchAsync(async (req, res, next) => {
	const filter = {};
	const page = req.query.page * 1 || 1;
	const limit = req.query.limit * 1 || 10;
	const skip = (page - 1) * limit;
	const totalDocs = await Contact.countDocuments(filter);
	const contacts = await Contact.find(filter)
		.sort('-createdAt')
		.skip(skip)
		.limit(limit);
	res.status(200).json({
		status: 'success',
		data: { contacts, totalDocs },
	});
});
