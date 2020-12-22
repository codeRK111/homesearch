const RequestPhoto = require('./../models/requestPhotoModel');
const catchAsync = require('./../utils/catchAsync');
const sendOtp = require('../utils/sendOtp');
const AppError = require('./../utils/appError');

const validateBody = (fields, body, next) => {
	fields.forEach((c) => {
		if (!body[c.name]) {
			return next(new AppError(`${c.label} required`, 400));
		}
	});
};

exports.addRequestPhoto = catchAsync(async (req, res, next) => {
	const body = req.body;
	const requiredFields = [
		{
			name: 'userName',
			label: 'Name',
		},
		{
			name: 'phoneNumber',
			label: 'Phone number',
		},
		{
			name: 'email',
			label: 'Email',
		},
		{
			name: 'userName',
			label: 'Name',
		},
		{
			name: 'propertyType',
			label: 'Type of property',
		},
	];
	switch (body.propertyType) {
		case 'property':
			requiredFields.push({ name: 'property', label: 'Property' });
			break;
		case 'project':
			requiredFields.push({ name: 'project', label: 'Project' });
			break;
		case 'projectproperty':
			requiredFields.push({
				name: 'projectProperty',
				label: 'Property of the project',
			});
			break;

		default:
			break;
	}
	validateBody(requiredFields, body, next);
	const randomNumber = `${Math.floor(1000 + Math.random() * 9000)}`;
	try {
		await sendOtp(body.phoneNumber, randomNumber);
		body.otp = randomNumber;
		const request = await RequestPhoto.create(body);
		res.status(200).json({
			status: 'success',
			data: {
				request,
			},
		});
	} catch (error) {
		return next(new AppError('Something goes wrong', 500));
	}
});

exports.validateRequest = catchAsync(async (req, res, next) => {
	const body = req.body;
	const requiredFields = [
		{
			name: 'id',
			label: 'Request id',
		},
		{
			name: 'otp',
			label: 'OTP',
		},
	];
	validateBody(requiredFields, body, next);
	const request = await RequestPhoto.findById(body.id).select('+otp');
	if (!request) {
		return next(new AppError('Request not found', 404));
	}
	const validation = request.correctOtp(body.otp);
	if (validation) {
		request.verified = true;
		await request.save();
		res.status(200).json({
			status: 'success',
			data: {
				request,
			},
		});
	} else {
		return next(new AppError('OTP not matched'));
	}
});

exports.getRequests = catchAsync(async (req, res, next) => {
	const filter = req.body;
	const excludeFields = ['page', 'limit'];
	excludeFields.forEach((c) => {
		if (filter[c]) delete filter[c];
	});
	const page = req.body.page * 1 || 1;
	const limit = req.body.limit * 1 || 10;
	const skip = (page - 1) * limit;
	const requests = await RequestPhoto.find(filter).skip(skip).limit(limit);
	const counts = await RequestPhoto.countDocuments(filter);
	res.status(200).json({
		status: 'success',
		data: {
			requests,
			counts,
		},
	});
});

exports.updateFeedback = catchAsync(async (req, res, next) => {
	const feedback = await RequestPhoto.findByIdAndUpdate(
		req.params.id,
		req.body,
		{
			new: true,
			runValidators: true,
		}
	);
	res.status(200).json({
		status: 'success',
		data: {
			feedback,
		},
	});
});

exports.deleteFeedback = catchAsync(async (req, res, next) => {
	const feedback = await RequestPhoto.findByIdAndRemove(req.params.id);

	res.status(200).json({
		status: 'success',
		data: {
			feedback,
		},
	});
});
