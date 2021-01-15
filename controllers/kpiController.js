const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const ProjectAdvertisement = require('../models/projectAdvertisementModel');
const Leads = require('../models/projectAdvertisementLeadsModel');
const mongoose = require('mongoose');

exports.getAllLeads = catchAsync(async (req, res, next) => {
	const leads = await Leads.find();
	const staffs = await Leads.aggregate([
		{
			$group: { _id: '$staff' },
		},

		{
			$lookup: {
				from: 'admins',
				localField: '_id',
				foreignField: '_id',
				as: 'info',
			},
		},
		{
			$unwind: {
				path: '$info',
			},
		},
	]);
	res.status(200).json({
		status: 'success',
		data: {
			leads,
			staffs,
		},
	});
});
