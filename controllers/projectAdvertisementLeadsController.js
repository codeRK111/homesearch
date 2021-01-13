const Admin = require('./../models/adminModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Lead = require('./../models/projectAdvertisementLeadsModel');
const mongoose = require('mongoose');
const moment = require('moment');

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
	const page = req.query.page || 1;
	const limit = req.query.limit || 10;
	const skip = (page - 1) * limit;

	if (req.query.scheduleCall) {
		filter.scheduleCall = true;
	}
	if (req.query.status) {
		const arr = req.query.status.split(',');
		filter.status = { $in: arr };
	}
	console.log(filter);
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
exports.getLeadDetails = catchAsync(async (req, res, next) => {
	const lead = await Lead.findById(req.params.id);

	res.status(200).json({
		status: 'success',
		data: {
			lead,
		},
	});
});
exports.updateLeadDetails = catchAsync(async (req, res, next) => {
	if (req.admin.type === 'staff') {
		const lead = await Lead.findById(req.params.id);
		if (lead.staff.id.toString() !== req.admin.id) {
			return next(new AppError('Not authorized', 401));
		}
	}
	const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});

	res.status(200).json({
		status: 'success',
		data: {
			lead,
		},
	});
});
exports.deleteLead = catchAsync(async (req, res, next) => {
	if (req.admin.type === 'staff') {
		const lead = await Lead.findById(req.params.id);
		if (lead.staff.id.toString() !== req.admin.id) {
			return next(new AppError('Not authorized', 401));
		}
	}
	const lead = await Lead.findByIdAndDelete(req.params.id);

	res.status(200).json({
		status: 'success',
		data: {
			lead,
		},
	});
});

exports.fetchSchedule = catchAsync(async (req, res, next) => {
	const m = moment();
	const today = m.startOf('day').toDate();
	const tommorow = m.add(1, 'day').endOf('day').toDate();
	const filter = {};

	filter.staff = req.admin.id;
	filter.projectAdvertisement = req.query.id;
	filter.scheduleTime = { $gte: today, $lte: tommorow };

	const leads = await Lead.find(filter).sort({ createdAt: 1 });

	res.status(200).json({
		status: 'success',
		data: {
			leads,
		},
	});
});
