const AppError = require('./../utils/appError');
const PropertyQuery = require('./../models/propertyQueryModel');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const sendOtpMessage = require('../utils/sendOtp');
const { sendOtpMessageTest } = require('../utils/test');
const validateBody = require('../utils/validation');
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

exports.addProjectQuery = catchAsync(async (req, res, next) => {
	try {
		// const fields = [
		// 	{
		// 		name: 'type',
		// 		label: 'Property type',
		// 	},
		// ];
		// switch (req.body.type) {
		// 	case 'project':
		// 		fields.push({
		// 			name: 'project',
		// 			label: 'Project',
		// 		});
		// 		break;
		// 	case 'projectproperty':
		// 		fields.push({
		// 			name: 'projectproperty',
		// 			label: 'Project property',
		// 		});
		// 		break;

		// 	default:
		// 		break;
		// }
		// console.log(validateBody(fields, req.body, next));
		const body = req.body;
		if (req.body.sendOTP) {
			let randomNumber = `${Math.floor(1000 + Math.random() * 9000)}`;
			await sendOtpMessageTest(body.phoneNumber, randomNumber);
			body.otp = randomNumber;
		}
		let query = await PropertyQuery.create(body);
		res.status(200).json({
			status: 'success',
			data: {
				query,
			},
		});
	} catch (error) {
		console.log('error--->', error);
		return next(new AppError(error.message));
	}
});
exports.sendTest = catchAsync(async (req, res, next) => {
	try {
		const resp = await sendOtpMessageTest();
		console.log(resp.data);
		res.status(200).json({
			status: 'success',
			data: {
				resp,
			},
		});
	} catch (error) {
		console.log('error--->', error);
		return next(new AppError(error.message));
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
