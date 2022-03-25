const AppError = require('./../utils/appError');
const PropertyQuery = require('./../models/propertyQueryModel');
const Query = require('./../models/queryModel');
const AgentQuery = require('./../models/agentQueryModel');
const UserQuery = require('./../models/userQueryModel');
const Project = require('./../models/projectModule');
const Property = require('./../models/propertyModel');
const User = require('./../models/userModel');
const ProjectProperty = require('./../models/projectPropertyModule');
const catchAsync = require('./../utils/catchAsync');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const sendOtpMessage = require('../utils/sendOtp');
const moment = require('moment');
const sendQuerySms = require('./../utils/sendQueryMessage');

exports.addQuery = catchAsync(async (req, res, next) => {
	const body = req.body;
	let query = await AgentQuery.create(body);

	res.status(200).json({
		status: 'success',
		data: {
			query,
		},
	});
});
exports.addUserQuery = catchAsync(async (req, res, next) => {
	const user = await User.findOne({
		number: req.body.number,
		numberVerified: true,
	});
	let query = null;
	if (user) {
		req.body.verified = true;
		query = await UserQuery.create(req.body);
		return res.status(200).json({
			status: 'success',
			data: {
				query,
				validate: false,
			},
		});
	} else {
		const randomNumber = `${Math.floor(1000 + Math.random() * 9000)}`;
		await sendOtpMessage(req.body.number, randomNumber);
		req.body.otp = randomNumber;
		req.body.otpExpiresAt = moment().add(2, 'm');
		query = await UserQuery.create(req.body);
		return res.status(200).json({
			status: 'success',
			data: {
				query,
				validate: true,
			},
		});
	}
});

exports.verifyUserQuery = catchAsync(async (req, res, next) => {
	const requiredFields = ['id', 'otp'];
	requiredFields.every((c) => {
		if (!req.params[c]) {
			next(new AppError(`${c} missing`));
			return false;
		}
	});

	const query = await UserQuery.findById(req.params.id).select(
		'+otp +otpExpiresAt'
	);

	if (!query) {
		return next(new AppError('Invalid query'));
	}
	if (!query.correctOtp(req.params.otp)) {
		return next(new AppError('Please enter correct OTP', 401));
	}
	if (query.otpExpired()) {
		return next(new AppError('Your OTP has been expired', 401));
	}
	try {
		query.verified = true;
		query.otp = null;
		query.otpExpiresAt = null;
		await query.save();
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

exports.getQueries = catchAsync(async (req, res, next) => {
	const filter = {};
	const page = req.body.page * 1 || 1;
	const limit = req.body.limit * 1 || 10;
	const skip = (page - 1) * limit;

	if (req.body.queryFor) {
		filter.queryType = req.body.queryFor;
	}
	if (req.body.propertyFor) {
		filter.pFor = req.body.propertyFor;
	}
	if (req.body.propertyType) {
		filter.pType = req.body.propertyType;
	}
	if (req.body.via) {
		filter.via = req.body.via;
	}
	const totalDocs = await PropertyQuery.countDocuments(filter);

	const queries = await PropertyQuery.find(filter)
		.sort('-createdAt')
		.skip(skip)
		.limit(limit);

	res.status(200).json({
		status: 'success',
		data: {
			queries,
			totalDocs,
		},
	});
});
exports.getUserQueries = catchAsync(async (req, res, next) => {
	const filter = {};
	const page = req.body.page * 1 || 1;
	const limit = req.body.limit * 1 || 10;
	const skip = (page - 1) * limit;

	if (req.body.status) {
		filter.status = req.body.status;
	}
	if (req.body.verified !== null && req.body.verified !== undefined) {
		filter.verified = req.body.verified;
	}

	const totalDocs = await UserQuery.countDocuments(filter);

	const queries = await UserQuery.find(filter)
		.sort('-createdAt')
		.skip(skip)
		.limit(limit);

	res.status(200).json({
		status: 'success',
		data: {
			queries,
			totalDocs,
		},
	});
});
exports.getUserPropertyQueries = catchAsync(async (req, res, next) => {
	const page = req.query.page * 1 || 1;
	const limit = req.query.limit * 1 || 10;
	const skip = (page - 1) * limit;
	const filter = {
		owner: ObjectId(req.user.id),
	};

	const totalDocs = await PropertyQuery.countDocuments(filter);

	const queries = await PropertyQuery.find(filter)
		.sort('-createdAt')
		.skip(skip)
		.limit(limit);

	res.status(200).json({
		status: 'success',
		data: {
			queries,
			totalDocs,
		},
	});
});
exports.getQueryDetails = catchAsync(async (req, res, next) => {
	const query = await PropertyQuery.findById(req.params.id);

	res.status(200).json({
		status: 'success',
		data: {
			query,
		},
	});
});

exports.addAgentQuery = catchAsync(async (req, res, next) => {
	const data = {
		...req.body,
		user: req.user.id,
	};
	if (!data.agent) {
		return next(new AppError('agent is missing', 400));
	}
	if (!data.queryType) {
		return next(new AppError('queryType is missing', 400));
	}
	if (!['number', 'message', 'whatsapp'].includes(data.queryType)) {
		return next(new AppError('Invalid queryType value', 400));
	}
	if (!data.type) {
		return next(new AppError('type is missing', 400));
	} else {
		if (!['project', 'projectproperty'].includes(data.type)) {
			return next(new AppError('Invalid type value', 400));
		}
	}

	if (data.type === 'project') {
		if (!data.project) {
			return next(new AppError('project is missing', 400));
		}
		const project = await Project.findById(data.project);
		if (!project) {
			return next(new AppError('project not found', 404));
		}
		data.builder = project.builder.id;
		data.pType = project.projectType;
	} else {
		if (!data.projectProperty) {
			return next(new AppError('projectProperty is missing', 400));
		}
		const projectProperty = await ProjectProperty.findById(data.project);
		if (!projectProperty) {
			return next(new AppError('projectProperty not found', 404));
		}
		data.builder = projectProperty.project.builder.id;
		data.pType = projectProperty.project.projectType;
	}

	const agentQuery = await AgentQuery.create(data);

	res.status(200).json({
		status: 'success',
		data: agentQuery,
	});
});

exports.getAgentQueries = catchAsync(async (req, res, next) => {
	const filter = {};
	const page = req.body.page * 1 || 1;
	const limit = req.body.limit * 1 || 10;
	const skip = (page - 1) * limit;

	if (req.body.queryFor) {
		filter.queryType = req.body.queryFor;
	}

	if (req.body.propertyType) {
		filter.pType = req.body.propertyType;
	}
	if (req.body.queryOn) {
		filter.type = req.body.queryOn;
	}
	if (req.body.via) {
		filter.via = req.body.via;
	}
	if (req.admin.type === 'clientSupport') {
		filter.agent = mongoose.Types.ObjectId(req.admin.id);
	}

	// console.log(filter);
	const totalDocs = await AgentQuery.countDocuments(filter);

	const queries = await AgentQuery.find(filter)
		.sort('-createdAt')
		.skip(skip)
		.limit(limit);
	res.status(200).json({
		status: 'success',
		data: { queries, totalDocs },
	});
});

exports.addAgentMessage = catchAsync(async (req, res) => {
	const query = await AgentQuery.findByIdAndUpdate(
		req.params.queryId,
		{
			$push: { action: req.body },
		},
		{
			new: true,
			runValidators: true,
		}
	);
	res.status(200).json({
		status: 'success',
		data: {
			query,
		},
	});
});

exports.updateUserQuery = catchAsync(async (req, res, next) => {
	const data = {};
	if (req.body.response) {
		data.response = req.body.response;
	}
	data.responseBy = req.admin.id;

	const query = await UserQuery.findByIdAndUpdate(req.params.id, data, {
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

exports.addQueryV2 = catchAsync(async (req, res, next) => {
	const body = req.body;
	if (!body.queryFor) {
		return next(new AppError('Missing queryFor'));
	}
	if (!body.queryType) {
		return next(new AppError('Missing queryType'));
	}
	const requiredFields = ['queryFor', 'queryType'];

	if (body.queryFor === 'agent' || body.queryFor === 'owner') {
		requiredFields.push('queryForUser');
	}

	if (
		body.queryFor === 'owner' &&
		(body.queryType === 'number' ||
			body.queryType === 'message' ||
			body.queryType === 'whatsapp')
	) {
		requiredFields.push('queryOn');
		requiredFields.push('property');
		requiredFields.push('details');
	}
	if (
		body.queryFor === 'builder' &&
		(body.queryType === 'number' ||
			body.queryType === 'message' ||
			body.queryType === 'whatsapp')
	) {
		requiredFields.push('queryOn');
		requiredFields.push('queryForBuilder');
		requiredFields.push('project');
		requiredFields.push('details');
	}

	const keys = Object.keys(body);
	keys.forEach((c) => {
		if (!requiredFields.includes(c)) {
			delete body[c];
		}
	});
	body.queryByUser = req.user.id;

	if (
		body.queryFor === 'owner' &&
		body.queryType === 'message' &&
		body.property
	) {
		const property = await Property.findById(body.property);
		if (property) {
			const getTypeName = {
				flat: 'apartment',
				independenthouse: 'villa',
				land: 'land',
				hostel: 'hostel',
				pg: 'PG',
			};
			const res = await sendQuerySms(property.userId.number, {
				userName: req.user.name,
				userNumber: req.user.number,
				propertyId: property.propertyNumber,
				propertyPrice:
					property['for'] === 'rent'
						? property.rent
						: property.salePrice,
				propertyCity: property.city.name,
				propertyLocation: property.location.name,
				type:
					property['for'] === 'rent'
						? getTypeName[property.type]
						: getTypeName[property.sale_type],
			});
		}
	}

	const query = await Query.create(body);
	res.status(200).json({
		status: 'success',
		data: query,
	});
});

exports.getQueriesv2 = catchAsync(async (req, res, next) => {
	const body = req.body;

	const queries = await Query.find(body).sort('-createdAt');
	res.status(200).json({
		status: 'success',
		data: queries,
	});
});
