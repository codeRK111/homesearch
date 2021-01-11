const Admin = require('./../models/adminModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Lead = require('./../models/projectAdvertisementLeadsModel');
const mongoose = require('mongoose');

// Create KRA

exports.addLeads = catchAsync(async (req, res, next) => {
	// if (req.admin.type === 'staff') {
	// 	return next(new AppError('You are not authorized.', 401));
	// }

	const body = { ...req.body };
	body.staff = req.admin.id;

	const lead = await Lead.create(body);

	res.status(201).json({
		status: 'success',
		data: {
			lead,
		},
	});
});

exports.getAllLeads = catchAsync(async (req, res, next) => {
	const filter = {};

	filter.staff = req.admin.id;
	filter.projectAdvertisement = req.query.id;
	const page = req.params.page || 1;
	const limit = req.params.limit || 10;
	const skip = (page - 1) * limit;

	const totalDocs = await Lead.countDocuments(filter);

	const leads = await Lead.find(filter)
		.sort({ scheduleCall: -1, createdAt: -1 })
		.skip(skip)
		.limit(limit);

	res.status(200).json({
		status: 'success',
		count: totalDocs,
		data: {
			leads,
		},
	});
});
