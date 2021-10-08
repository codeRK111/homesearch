const AppError = require('./../utils/appError');
const Leads = require('./../models/leadsModel');
const catchAsync = require('./../utils/catchAsync');
const fs = require('fs');
const path = require('path');
const moment = require('moment');

function deleteFiles(files, callback) {
	var i = files.length;
	files.forEach(function (filepath) {
		fs.unlink(filepath, function (err) {
			i--;
			if (err) {
				callback(err);
				return;
			} else if (i <= 0) {
				callback(null);
			}
		});
	});
}

exports.addLead = catchAsync(async (req, res, next) => {
	const requiredFields = ['number'];
	requiredFields.every((c) => {
		if (!req.body[c]) {
			if (req.files) {
				deleteFiles(
					req.files.map((c) => c.filename),
					function (err) {}
				);
			}
			next(new AppError(`${c} missing`));
			return false;
		}
		return true;
	});

	const isExisting = await Leads.findOne({
		number: req.body.number,
		status: 'active',
	});

	if (isExisting) {
		if (req.files) {
			deleteFiles(
				req.files.map((c) => c.filename),
				function (err) {}
			);
		}
		return next(new AppError('Already Exists'));
	}

	const excludeFields = ['status', 'feedback', 'attended'];
	excludeFields.forEach((c) => {
		if (req.body[c] !== null && req.body[c] !== undefined) {
			delete req.body[c];
		}
	});
	req.body.createdBy = req.admin.id;
	if (req.files) {
		req.body.images = req.files.map((c) => c.filename);
	}
	if (req.body.message) {
		req.body.comments = [
			{
				from: req.admin.id,
				message: req.body.message,
				date: Date.now(),
			},
		];
	}
	const lead = await Leads.create(req.body);

	res.status(200).json({
		status: 'success',
		data: lead,
	});
});

exports.getAllLeads = catchAsync(async (req, res, next) => {
	const filter = {};
	const page = req.body.page * 1 || 1;
	const limit = req.body.limit * 1 || 10;
	const skip = (page - 1) * limit;

	if (req.body.status) {
		filter.status = req.body.status;
	}
	if (req.body.attended !== null && req.body.attended !== undefined) {
		filter.attended = req.body.attended;
	}

	// console.log(filter);
	const totalDocs = await Leads.countDocuments(filter);

	const leads = await Leads.find(filter)
		.sort('-createdAt')
		.skip(skip)
		.limit(limit);
	res.status(200).json({
		status: 'success',
		data: { leads, totalDocs },
	});
});

exports.getMyLeads = catchAsync(async (req, res, next) => {
	const filter = {};
	const page = req.body.page * 1 || 1;
	const limit = req.body.limit * 1 || 10;
	const skip = (page - 1) * limit;

	filter.status = 'active';
	if (req.admin.type === 'gm') {
		if (req.body.status) {
			filter.status = req.admin.status;
		} else {
			delete filter.status;
		}
	}
	if (req.admin.type === 'clientSupport') {
		filter.clientSupport = req.admin.id;
		filter.stage = 1;
	}
	if (
		req.admin.type === 'bdm' ||
		req.admin.type === 'assistantSalesManager'
	) {
		filter.bdm = req.admin.id;
		filter.stage = 3;
	}
	if (req.body.stage !== null && req.body.stage !== undefined) {
		filter.stage = req.body.stage;
	}
	if (req.body.userCategory) {
		filter.userCategory = req.body.userCategory;
	}
	if (req.body.timeInterval) {
		switch (req.body.timeInterval) {
			case 'today':
				var start = moment().startOf('day'); // set to 12:00 am today
				var end = moment().endOf('day');
				filter.createdAt = {
					$gte: start,
					$lt: end,
				};
				break;
			case 'yesterday':
				var start = moment().add(-1, 'days'); // set to 12:00 am yesterday
				var end = moment().startOf('day');
				filter.createdAt = {
					$gte: start,
					$lt: end,
				};
				break;
			case 'lastWeek':
				var start = moment().startOf('week'); // set to 12:00 am yesterday

				filter.createdAt = {
					$gte: start,
				};
				break;
			case 'lastMonth':
				var start = moment().startOf('month'); // set to 12:00 am yesterday

				filter.createdAt = {
					$gte: start,
				};
				break;

			default:
				break;
		}
	}
	if (req.body.leadStatus) {
		if (req.body.leadStatus === 'active') {
			filter.stage = { $ne: 0 };
		} else {
			filter.updatedAt = {
				$lt: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
			};
		}
	}

	// console.log(req.admin);
	// console.log(filter);
	const totalDocs = await Leads.countDocuments(filter);

	const leads = await Leads.find(filter)
		.sort('-createdAt')
		.skip(skip)
		.limit(limit);
	res.status(200).json({
		status: 'success',
		data: { leads, totalDocs },
	});
});
exports.getPostedLeads = catchAsync(async (req, res, next) => {
	const filter = {};
	const page = req.body.page * 1 || 1;
	const limit = req.body.limit * 1 || 10;
	const skip = (page - 1) * limit;

	filter.status = 'active';
	filter.createdBy = req.admin.id;

	if (req.body.userCategory) {
		filter.userCategory = req.body.userCategory;
	}
	if (req.body.preferedLocation) {
		filter.preferedLocation = {
			$regex: req.body.preferedLocation,
			$options: 'i',
		};
	}
	if (req.body.timeInterval) {
		switch (req.body.timeInterval) {
			case 'today':
				var start = moment().startOf('day'); // set to 12:00 am today
				var end = moment().endOf('day');
				filter.createdAt = {
					$gte: start,
					$lt: end,
				};
				break;
			case 'yesterday':
				var start = moment().add(-1, 'days'); // set to 12:00 am yesterday
				var end = moment().startOf('day');
				filter.createdAt = {
					$gte: start,
					$lt: end,
				};
				break;
			case 'lastWeek':
				var start = moment().startOf('week'); // set to 12:00 am yesterday

				filter.createdAt = {
					$gte: start,
				};
				break;
			case 'lastMonth':
				var start = moment().startOf('month'); // set to 12:00 am yesterday

				filter.createdAt = {
					$gte: start,
				};
				break;

			default:
				break;
		}
	}

	// console.log(req.admin);
	// console.log(filter);
	const totalDocs = await Leads.countDocuments(filter);

	const leads = await Leads.find(filter)
		.sort('-createdAt')
		.skip(skip)
		.limit(limit);
	res.status(200).json({
		status: 'success',
		data: { leads, totalDocs },
	});
});

exports.updateLead = catchAsync(async (req, res, next) => {
	const data = {};
	if (req.body.status) {
		data.status = req.body.status;
	}
	data.responseBy = req.admin.id;

	const lead = await Leads.findByIdAndUpdate(req.params.id, data, {
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

exports.updateBySupport = catchAsync(async (req, res, next) => {
	const data = {};
	if (req.body.name) {
		data.name = req.body.name;
	}
	if (req.body.email) {
		data.email = req.body.email;
	}
	if (req.body.number) {
		data.number = req.body.number;
	}
	if (req.body.message) {
		data['$push'] = {
			comments: {
				$each: [
					{
						from: req.admin.id,
						message: req.body.message,
						date: Date.now(),
					},
				],
				$sort: { date: -1 },
			},
		};
	}
	if (req.body.feedback) {
		data.feedback = req.body.feedback;
	}
	if (req.body.requirement) {
		data.requirement = req.body.requirement;
	}
	if (req.body.category) {
		data.category = req.body.category;
	}
	if (req.body.pType) {
		data.pType = req.body.pType;
	}
	if (req.body.minPrice !== null || req.body.minPrice !== undefined) {
		data.minPrice = req.body.minPrice;
	}
	if (req.body.maxPrice !== null || req.body.maxPrice !== undefined) {
		data.maxPrice = req.body.maxPrice;
	}
	if (req.body.hold !== null && req.body.hold !== undefined) {
		data.hold = req.body.hold;
		if (req.body.hold === true && !req.body.holdDate)
			return next(new AppError('Hold date not found'));
		data.holdDate = req.body.holdDate;
		data.stage = 2;
	}

	if (req.body.bdm) {
		if (data.holdDate) {
			data.holdDate = null;
		}

		data.bdm = req.body.bdm;
		data.stage = 3;
	}
	data.responseBy = req.admin.id;

	const lead = await Leads.findByIdAndUpdate(req.params.id, data, {
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

exports.getLeadDetails = catchAsync(async (req, res, next) => {
	const lead = await Leads.findById(req.params.id);
	res.status(200).json({
		status: 'success',
		data: {
			lead,
		},
	});
});

exports.assignClientSupport = catchAsync(async (req, res, next) => {
	const lead = await Leads.updateMany(
		{
			_id: { $in: req.body.leads },
		},
		{
			clientSupport: req.body.clientSupport,
			attended: true,
			assignedAt: Date.now(),
			stage: 1,
		}
	);
	res.status(200).json({
		status: 'success',
		data: {
			lead,
		},
	});
});
exports.countLeads = catchAsync(async (req, res, next) => {
	const counts = await Leads.aggregate([
		{
			$facet: {
				Tenant: [
					{ $match: { userCategory: 'tenant' } },
					{ $count: 'Tenant' },
				],
				Buyer: [
					{ $match: { userCategory: 'buyer' } },
					{ $count: 'Buyer' },
				],
				Owner: [
					{ $match: { userCategory: 'owner' } },
					{ $count: 'Owner' },
				],
				Realtor: [
					{ $match: { userCategory: 'realtor' } },
					{ $count: 'Realtor' },
				],
				Builder: [
					{ $match: { userCategory: 'builder' } },
					{ $count: 'Builder' },
				],
				Unknown: [
					{ $match: { userCategory: 'unknown' } },
					{ $count: 'Unknown' },
				],
				Active: [
					{
						$match: {
							stage: { $ne: 0 },
						},
					},
					{ $count: 'Active' },
				],
				Inactive: [
					{
						$match: {
							updatedAt: {
								$lt: new Date(
									new Date().getTime() -
										7 * 24 * 60 * 60 * 1000
								),
							},
						},
					},
					{ $count: 'Inactive' },
				],
			},
		},
		{
			$project: {
				Tenant: { $arrayElemAt: ['$Tenant.Tenant', 0] },
				Buyer: { $arrayElemAt: ['$Buyer.Buyer', 0] },
				Owner: { $arrayElemAt: ['$Owner.Owner', 0] },
				Realtor: { $arrayElemAt: ['$Realtor.Realtor', 0] },
				Builder: { $arrayElemAt: ['$Builder.Builder', 0] },
				Unknown: { $arrayElemAt: ['$Unknown.Unknown', 0] },
				Active: { $arrayElemAt: ['$Active.Active', 0] },
				Inactive: { $arrayElemAt: ['$Inactive.Inactive', 0] },
			},
		},
	]);
	res.status(200).json({
		status: 'success',
		data: counts,
	});
});
