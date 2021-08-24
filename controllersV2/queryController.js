const AppError = require('./../utils/appError');
const PropertyQuery = require('./../models/propertyQueryModel');
const AgentQuery = require('./../models/agentQueryModel');
const Project = require('./../models/projectModule');
const ProjectProperty = require('./../models/projectPropertyModule');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
exports.addQuery = catchAsync(async (req, res, next) => {
	const body = req.body;
	let query = await PropertyQuery.create(body);

	res.status(200).json({
		status: 'success',
		data: {
			query,
		},
	});
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
