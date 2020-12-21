const AppError = require('./../utils/appError');
const PropertyQuery = require('./../models/propertyQueryModel');
const catchAsync = require('./../utils/catchAsync');
const sendOtpMessage = require('../utils/sendOtp');
const sms = require('./../utils/sms');

exports.addQuery = catchAsync(async (req, res, next) => {
	const body = req.body;
	let randomNumber = `${Math.floor(1000 + Math.random() * 9000)}`;
	body.otp = randomNumber;
	const otpResponse = await sendOtpMessage(body.number, randomNumber);
	let query = await PropertyQuery.create(body);

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
