const AppError = require('./../utils/appError');
const WhatsappQuery = require('./../models/whatsappQueryModel');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const sendOtpMessage = require('../utils/sendOtp');
const moment = require('moment');
const { sendOtpMessageTest } = require('../utils/test');


// Query By User
exports.addQueryAndSendOTP = catchAsync(async (req, res, next) => {
	try {
		const body = req.body;
		if (req.body.sendOTP) {
			let randomNumber = `${Math.floor(1000 + Math.random() * 9000)}`;
			const otpResponse = await sendOtpMessage(
				body.phoneNumber,
				randomNumber
			);
			if (!otpResponse.data.startsWith('OK')) {
				return next(new AppError('Unable to send otp', 500));
			}
			body.otp = randomNumber;
			body.otpExpiresAt = moment().add(1, 'minutes');
		} else {
			body.verified = true;
		}
		let query = await WhatsappQuery.create(body);

		res.status(200).json({
			status: 'success',
			data: {
				query,
			},
		});
	} catch (error) {
		return next(new AppError(error.message));
	}
});

exports.validateQuery = catchAsync(async (req, res, next) => {
	const resp = await WhatsappQuery.findById(req.body.id).select(
		'+otp +otpExpiresAt'
	);
	if (!resp) {
		return next(new AppError('Query does not exists', 404));
	}
	if (resp.correctOtp(req.body.otp)) {
		if (!resp.otpExpired()) {
			const updatedData = await WhatsappQuery.findByIdAndUpdate(
				req.body.id,
				{ verified: true },
				{
					new: true,
					runValidators: true,
				}
			);
			res.status(200).json({
				status: 'success',
				data: {
					query: updatedData,
				},
			});
		} else {
			return next(new AppError('OTP Expired', 404));
		}
	} else {
		return next(new AppError('OTP Not matched', 404));
	}
});

exports.getQueries = catchAsync(async (req, res, next) => {
	try {
		const queries = await WhatsappQuery.find();
		res.status(200).json({
				status: 'success',
				data: {
					queries,
				},
			});
	} catch(error) {
        return next(new AppError(error.message));
	}
});

// exports.addQueryNew = catchAsync(async (req, res, next) => {
// 	try {
// 		const body = req.body;
// 		if (req.body.sendOTP) {
// 			let randomNumber = `${Math.floor(1000 + Math.random() * 9000)}`;
// 			await sendOtpMessageTest(body.phoneNumber, randomNumber);
// 			body.otp = randomNumber;
// 			 body.otpExpiresAt = moment().add(1, 'minutes')
// 		} else {
// 			body.verified = true;
// 		}
// 		let query = await PropertyQuery.create(body);

// 		if(req.body.sendOTP){
// 				res.status(200).json({
// 					status: 'success',
// 					data: {
// 						query,
// 					},
// 				});
// 		} else {
// 			console.log(body.owner)
// 			const user = await User.findById(body.owner);
// 			console.log(user)
// 			const info = {
// 				name: user ? user.name : 'Not specified',
// 				email: user ? user.email : 'Not specified',
// 				phoneNumber: user ? user.number : 'Not specified',
// 			};
// 				res.status(200).json({
// 				status: 'success',
// 				data: {
// 					...info,
// 				},
// 			});
// 		}

// 	} catch (error) {
// 		console.log('error--->', error);
// 		return next(new AppError(error.message));
// 	}
// });

// exports.getTennantDetails = catchAsync(async (req, res, next) => {
// 	const resp = await PropertyQuery.findById(req.body.id).select('+otp');
// 	if (!resp) {
// 		return next(new AppError('Query does not exists', 404));
// 	}
// 	if (resp.correctOtp(req.body.otp)) {
// 		if(!resp.otpExpired()){
// 			const updatedData = await PropertyQuery.findByIdAndUpdate(
// 			req.body.id,
// 			{ verified: true },
// 			{
// 				new: true,
// 				runValidators: true,
// 			}
// 		);
// 		} else {
// 			return next(new AppError('OTP Expired', 404));
// 		}

// 		const user = await User.findById(updatedData.owner.id);
// 		const info = {
// 			name: user ? user.name : 'Not specified',
// 			email: user ? user.email : 'Not specified',
// 			phoneNumber: user ? user.number : 'Not specified',
// 		};

// 		res.status(200).json({
// 			status: 'success',
// 			data: {
// 				...info,
// 			},
// 		});
// 	} else {
// 		return next(new AppError('OTP Not matched', 404));
// 	}
// });
// exports.getTennantDetails = catchAsync(async (req, res, next) => {

// 	const resp = await PropertyQuery.findById(req.body.id).select('+otp');
// 	if (!resp) {
// 		return next(new AppError('Query does not exists', 404));
// 	}
// 	if (resp.correctOtp(req.body.otp)) {
// 		const updatedData = await PropertyQuery.findByIdAndUpdate(
// 			req.body.id,
// 			{ verified: true },
// 			{
// 				new: true,
// 				runValidators: true,
// 			}
// 		);

// 		const user = await User.findById(updatedData.owner.id);
// 		const info = {
// 			name: user ? user.name : 'Not specified',
// 			email: user ? user.email : 'Not specified',
// 			phoneNumber: user ? user.number : 'Not specified',
// 		};

// 		res.status(200).json({
// 			status: 'success',
// 			data: {
// 				...info,
// 			},
// 		});
// 	} else {
// 		return next(new AppError('OTP Not matched', 404));
// 	}
// });
// exports.updateQueryConversation = catchAsync(async (req, res, next) => {
// 	try {
// 		if (!req.body.message) {
// 			return next(new AppError('Message Required'));
// 		}
// 		const query = await PropertyQuery.findOneAndUpdate(
// 			{ _id: req.params.id },
// 			{ $push: { conversation: { message: req.body.message } } }
// 		);
// 		res.status(200).json({
// 			status: 'success',
// 			data: {
// 				conversation: query.conversation,
// 			},
// 		});
// 	} catch (error) {
// 		return next(new AppError(error.message));
// 	}
// });
// exports.getQueryConversation = catchAsync(async (req, res, next) => {
// 	try {
// 		const query = await PropertyQuery.findById(req.params.id).select(
// 			'+conversation'
// 		);
// 		res.status(200).json({
// 			status: 'success',
// 			data: {
// 				conversations: query.conversation,
// 			},
// 		});
// 	} catch (error) {
// 		return next(new AppError(error.message));
// 	}
// });

// exports.addProjectQuery = catchAsync(async (req, res, next) => {
// 	try {
// 		const body = req.body;
// 		if (req.body.sendOTP) {
// 			let randomNumber = `${Math.floor(1000 + Math.random() * 9000)}`;
// 			await sendOtpMessageTest(body.phoneNumber, randomNumber);
// 			body.otp = randomNumber;
// 		} else {
// 			body.verified = true;
// 		}
// 		let query = await PropertyQuery.create(body);
// 		res.status(200).json({
// 			status: 'success',
// 			data: {
// 				query,
// 			},
// 		});
// 	} catch (error) {
// 		console.log('error--->', error);
// 		return next(new AppError(error.message));
// 	}
// });
// exports.sendTest = catchAsync(async (req, res, next) => {
// 	try {
// 		const resp = await sendEmail(
// 			'rakeshchandrra@gmail.com',
// 			'Test sms',
// 			'This is for test'
// 		);
// 		console.log(resp.data);
// 		res.status(200).json({
// 			status: 'success',
// 			data: {
// 				resp,
// 			},
// 		});
// 	} catch (error) {
// 		console.log('error--->', error);
// 		return next(new AppError(error.message));
// 	}
// });
// exports.validateOTP = catchAsync(async (req, res, next) => {
// 	// const otpResponse = await sendQueryMessage(9853325956, {
// 	// 	userName: 'Rakesh',
// 	// 	userNumber: '98533',
// 	// 	propertyName: 'Test Prop',
// 	// 	propertyPrice: '45556123',
// 	// 	propertyCity: 'bbsr',
// 	// });
// 	// return;
// 	const resp = await PropertyQuery.findById(req.body.id).select('+otp');
// 	if (!resp) {
// 		return next(new AppError('Query does not exists', 404));
// 	}
// 	if (resp.correctOtp(req.body.otp)) {
// 		const updatedData = await PropertyQuery.findByIdAndUpdate(
// 			req.body.id,
// 			{ verified: true },
// 			{
// 				new: true,
// 				runValidators: true,
// 			}
// 		);

// 		const user = await User.findById(updatedData.owner.id);
// 		const info = {
// 			name: user ? user.name : 'Not specified',
// 			email: user ? user.email : 'Not specified',
// 			phoneNumber: user ? user.number : 'Not specified',
// 		};

// 		res.status(200).json({
// 			status: 'success',
// 			data: {
// 				...info,
// 			},
// 		});
// 	} else {
// 		return next(new AppError('OTP Not matched', 404));
// 	}
// });
// exports.validateProjectOTP = catchAsync(async (req, res, next) => {
// 	const resp = await PropertyQuery.findById(req.body.id).select('+otp');
// 	if (!resp) {
// 		return next(new AppError('Query does not exists', 404));
// 	}
// 	if (resp.correctOtp(req.body.otp)) {
// 		const updatedData = await PropertyQuery.findByIdAndUpdate(
// 			req.body.id,
// 			{ verified: true },
// 			{
// 				new: true,
// 				runValidators: true,
// 			}
// 		);

// 		res.status(200).json({
// 			status: 'success',
// 			data: {
// 				query: updatedData,
// 			},
// 		});
// 	} else {
// 		return next(new AppError('OTP Not matched', 404));
// 	}
// });

// exports.getQueries = catchAsync(async (req, res, next) => {
// 	const filter = {};
// 	const page = req.body.page * 1 || 1;
// 	const limit = req.body.limit * 1 || 10;
// 	const skip = (page - 1) * limit;

// 	if (req.body.owner) {
// 		filter['owner'] = req.body.owner;
// 	}

// 	if (req.body.user) {
// 		filter['user'] = req.body.user;
// 	}

// 	console.log(filter);

// 	const queries = await PropertyQuery.find(filter).skip(skip).limit(limit);

// 	res.status(200).json({
// 		status: 'success',
// 		data: {
// 			queries,
// 		},
// 	});
// });
