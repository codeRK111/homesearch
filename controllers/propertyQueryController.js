const AppError = require('./../utils/appError');
const PropertyQuery = require('./../models/propertyQueryModel');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const sendOtpMessage = require('../utils/sendOtp');
// const sendQueryMessage = require('../utils/sendQueryMessage');
const sms = require('./../utils/sms');

exports.addQuery = catchAsync(async (req, res, next) => {
	const body = req.body;
	let randomNumber = `${Math.floor(1000 + Math.random() * 9000)}`;
	body.otp = randomNumber;
	const otpResponse = await sendOtpMessage(body.phoneNumber, randomNumber);
	let query = await PropertyQuery.create(body);
	console.log(otpResponse);

	res.status(200).json({
		status: 'success',
		data: {
			query,
		},
	});
});

exports.sendTest = catchAsync(async (req, res, next) => {
	try {
		const resp = await sms.sendQueryToOwner(
			{
				name: 'Rakesh Chandra Dash',
				number: '9853325956',
				property: 'Test Property',
				price: '45000',
				city: 'Bhubaneswar',
			},
			'8458059528'
		);
		console.log(resp.data);
	} catch (error) {
		console.log(error);
	}
});
exports.validateOTP = catchAsync(async (req, res, next) => {
	// const otpResponse = await sendQueryMessage(9853325956, {
	// 	userName: 'Rakesh',
	// 	userNumber: '98533',
	// 	propertyName: 'Test Prop',
	// 	propertyPrice: '45556123',
	// 	propertyCity: 'bbsr',
	// });
	// return;
	const resp = await PropertyQuery.findById(req.body.id).select('+otp');
	if (!resp) {
		return next(new AppError('Query does not exists', 404));
	}
	if (resp.correctOtp(req.body.otp)) {
		const updatedData = await PropertyQuery.findByIdAndUpdate(
			req.body.id,
			{ verified: true },
			{
				new: true,
				runValidators: true,
			}
		);

		const user = await User.findById(updatedData.owner.id);
		const info = {
			name: user ? user.name : 'Not specified',
			email: user ? user.email : 'Not specified',
			phoneNumber: user ? user.number : 'Not specified',
		};

		res.status(200).json({
			status: 'success',
			data: {
				...info,
			},
		});
	} else {
		return next(new AppError('OTP Not matched', 404));
	}
});

exports.getQueries = catchAsync(async (req, res, next) => {
	const filter = {};
	const page = req.body.page * 1 || 1;
	const limit = req.body.limit * 1 || 10;
	const skip = (page - 1) * limit;

	if (req.body.owner) {
		filter['owner'] = req.body.owner;
	}

	if (req.body.user) {
		filter['user'] = req.body.user;
	}

	console.log(filter);

	const queries = await PropertyQuery.find(filter).skip(skip).limit(limit);

	res.status(200).json({
		status: 'success',
		data: {
			queries,
		},
	});
});
