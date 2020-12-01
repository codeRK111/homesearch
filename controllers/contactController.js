const AppError = require('./../utils/appError');
const Contact = require('./../models/contactModel');
const catchAsync = require('./../utils/catchAsync');
const sendOtpMessage = require('../utils/sendOtp');

exports.addContact = catchAsync(async (req, res, next) => {
	const { phoneNumber } = req.body;

	if (!phoneNumber) {
		return next(new AppError('Please provide Phone Number!', 400));
	}
	const body = {...req.body}
	let randomNumber = `${Math.floor(1000 + Math.random() * 9000)}`;
	body.otp = randomNumber;
	const otpResponse = await sendOtpMessage(body.phoneNumber, randomNumber);
	console.log(otpResponse)
	if (otpResponse.data.startsWith('OK')) {
		let contact = await Contact.create(body);
		res.status(200).json({
			status: 'success',
			data: {
				contact
			},
		});
	} else {
		return next(new AppError('Unable to send otp', 500));
	}
});


exports.validateNumber = catchAsync(async (req,res,next)=>{
	const contact = await Contact.findOne({ phoneNumber: req.params.number }).select(
		'+otp'
	);
	if (!contact.correctOtp(req.params.otp)) {
		return next(new AppError('otp not matched', 401));
	}
	contact.verified = true;
	await contact.save();
	res.status(200).json({
			status: 'success',
			data: {
				contact
			},
		});
})


