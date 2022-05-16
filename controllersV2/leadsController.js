const AppError = require('./../utils/appError');
const Leads = require('./../models/leadsModel');
const PropertyLead = require('./../models/propertyLeadModel');
const catchAsync = require('./../utils/catchAsync');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const mongoose = require('mongoose');

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
	if (req.body.commentStatus) {
		req.body.leadStatus = [
			{
				from: req.admin.id,
				date: Date.now(),
				value: req.body.commentStatus,
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

exports.checkNumber = catchAsync(async (req, res, next) => {
	// console.log(filter);
	const totalDocs = await Leads.countDocuments({ number: req.params.number });

	res.status(200).json({
		status: 'success',
		data: { exists: !!totalDocs },
	});
});

exports.getMyLeads = catchAsync(async (req, res, next) => {
	const filter = {};
	const page = req.body.page * 1 || 1;
	const limit = req.body.limit * 1 || 10;
	const skip = (page - 1) * limit;

	filter.status = 'active';

	switch (req.admin.type) {
		case 'gm':
			if (req.body.status) {
				filter.status = req.admin.status;
			} else {
				delete filter.status;
			}
			if (req.body.stage !== null && req.body.stage !== undefined) {
				filter.stage = req.body.stage;
			} else {
				filter.stage = { $ne: 10 };
			}
			break;
		case 'clientSupport':
			filter.status = 'active';
			// filter.clientSupport = req.admin.id;
			// filter.stage = 1;

			if (req.body.stage) {
				filter.stage = req.body.stage;
			}
			break;
		case 'bdm':
		case 'assistantSalesManager':
			filter.status = 'active';
			filter.assigns = {
				$elemMatch: {
					to: mongoose.Types.ObjectId(req.admin.id),
				},
			};
			break;
		case 'salesExecutive':
			filter.status = 'active';
			filter.executive = req.admin.id;
			filter.stage = 4;
			break;

		default:
			break;
	}

	if (req.body.userCategory) {
		filter.userCategory = req.body.userCategory;
	}
	if (req.body.tags && req.body.tags.length > 0) {
		const regexTags = req.body.tags.map((c) => new RegExp(c, 'i'));
		filter.tags = { $all: regexTags };
	}
	if (req.body.number) {
		filter.number = {
			$regex: req.body.number,
			$options: 'i',
		};
	}
	if (req.body.city) {
		filter.city = req.body.city;
	}
	if (req.body.postedBy) {
		filter.createdBy = req.body.postedBy;
	}
	if (req.body.commentStatus) {
		filter.leadStatus = {
			$elemMatch: {
				value: {
					$eq: req.body.commentStatus,
				},
			},
		};
	}
	if (req.body.reschedule) {
		if (req.body.reschedule !== 'off') {
			var start = moment().startOf('day'); // set to 12:00 am today
			var end = moment().add(Number(req.body.reschedule), 'days');
			filter.comments = {
				$elemMatch: {
					reschedule: {
						$gte: start,
						$lt: end,
					},
				},
			};
		}
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
				var start = moment().subtract(1, 'days').startOf('day'); // set to 12:00 am yesterday
				var end = moment().subtract(1, 'days').endOf('day');
				filter.createdAt = {
					$gte: start,
					$lt: end,
				};
				break;
			case 'lastWeek':
				var start = moment().add(-7, 'days'); // set to 12:00 am yesterday

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
	console.log({ filter });
	const totalDocs = await Leads.countDocuments(filter);

	const leads = await Leads.find(filter)
		.sort({
			createdAt: -1,
		})
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
	if (req.body.city) {
		filter.city = req.body.city;
	}
	if (req.body.preferedLocation) {
		filter.preferedLocation = {
			$regex: req.body.preferedLocation,
			$options: 'i',
		};
	}
	if (req.body.number) {
		filter.number = {
			$regex: req.body.number,
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
exports.closeDeal = catchAsync(async (req, res, next) => {
	if (!req.body.revenue) {
		return next(new AppError('Revenue Required'));
	}
	if (!req.body.revenue) {
		return next(new AppError('Feedback Required'));
	}
	const existingLeads = await Leads.findById(req.params.id);
	if (!existingLeads) {
		return next(new AppError('Invalid leads'));
	}

	if (existingLeads.status === 'inactive') {
		return next(new AppError('This lead is currently inactive'));
	}
	if (existingLeads.stage === 10) {
		return next(new AppError('Already closed'));
	}
	existingLeads.revenue = req.body.revenue;
	existingLeads.stage = 10;
	existingLeads.revenueFeedback = req.body.revenueFeedback;
	existingLeads.closedBy = req.admin.id;
	// if (existingLeads.comments.length > 0) {
	// 	existingLeads.comments.push({
	// 		from: req.admin.id,
	// 		message: req.body.revenueFeedback,
	// 		closeFeedback: true,
	// 	});
	// } else {
	// 	existingLeads.comments = [
	// 		{
	// 			from: req.admin.id,
	// 			message: req.body.revenueFeedback,
	// 			closeFeedback: true,
	// 		},
	// 	];
	// }

	await existingLeads.save();
	res.status(200).json({
		status: 'success',
		data: existingLeads,
	});
});

exports.updateBySupport = catchAsync(async (req, res, next) => {
	const data = {};
	if (req.body.tags) {
		data.tags = req.body.tags;
	}
	if (req.body.name) {
		data.name = req.body.name;
	}
	if (req.body.preferedLocation) {
		data.preferedLocation = req.body.preferedLocation;
	}
	if (req.body.email) {
		data.email = req.body.email;
	}
	if (req.body.number) {
		data.number = req.body.number;
	}
	if (req.body.city) {
		data.city = req.body.city;
	}
	if (req.body.userCategory) {
		data.userCategory = req.body.userCategory;
	}
	if (req.body.propertyRequirements) {
		data.propertyRequirements = req.body.propertyRequirements;
	}
	if (req.body.message) {
		data['$push'] = {
			comments: {
				$each: [
					{
						from: req.admin.id,
						message: req.body.message,
						date: Date.now(),
						reschedule: req.body.reschedule
							? req.body.reschedule
							: undefined,
						status: req.body.commentStatus,
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

	if (req.body.minPrice !== null && req.body.minPrice !== undefined) {
		data.minPrice = req.body.minPrice;
	}
	if (req.body.maxPrice !== null && req.body.maxPrice !== undefined) {
		data.maxPrice = req.body.maxPrice;
	}
	if (
		req.body.hold !== null &&
		req.body.hold !== undefined &&
		req.body.hold !== false
	) {
		data.hold = req.body.hold;
		if (req.body.hold === true && !req.body.holdDate)
			return next(new AppError('Hold date not found'));
		data.holdDate = req.body.holdDate;
		data.stage = 2;
		data.bdm = undefined;
		data.executive = undefined;
	}

	const saleTypes = ['bdm', 'assistantSalesManager'];
	if (req.body.staffType === 'salesExecutive') {
		data.executive = req.body.staffId;
		data.stage = 4;
		data.saleExecutiveAssignedAt = Date.now();
		data.notInterested = false;
		data.holdDate = null;
	} else if (saleTypes.includes(req.body.staffType)) {
		data.saleStaffType = req.body.staffType;
		data.bdm = req.body.staffId;
		data.stage = 3;
		data.saleAssignedAt = Date.now();
		data.notInterested = false;
		data.holdDate = null;
	}

	if (req.body.notInterested) {
		data.notInterested = req.body.notInterested;
		data.stage = 0;
	}
	if (req.body.postProperty) {
		data.stage = 9;
		data.notInterested = false;
	}

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
exports.manageReschedule = catchAsync(async (req, res, next) => {
	const data = {};

	if (req.body.reschedule) {
		data['$push'] = {
			reschedules: {
				$each: [
					{
						from: req.admin.id,
						date: Date.now(),
						reschedule: req.body.reschedule
							? req.body.reschedule
							: undefined,
					},
				],
				$sort: { reschedule: -1 },
			},
		};
	}

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

exports.manageStatus = catchAsync(async (req, res, next) => {
	const data = {};

	if (req.body.status) {
		data['$push'] = {
			leadStatus: {
				$each: [
					{
						from: req.admin.id,
						date: Date.now(),
						value: req.body.status ? req.body.status : undefined,
					},
				],
				$sort: { date: -1 },
			},
		};
	}

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
exports.manageAssignment = catchAsync(async (req, res, next) => {
	const data = {};

	if (req.body.staff) {
		data['$push'] = {
			assigns: {
				$each: [
					{
						from: req.admin.id,
						date: Date.now(),
						to: req.body.staff ? req.body.staff : undefined,
					},
				],
				$sort: { date: -1 },
			},
		};
	}

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

exports.assignSupport = catchAsync(async (req, res, next) => {
	if (!req.body.staffType) {
		return next(new AppError('Staff role required'));
	}
	const saleTypes = ['bdm', 'assistantSalesManager'];
	const dataToUpdate = {
		attended: true,
	};

	if (req.body.staffType === 'clientSupport') {
		dataToUpdate.clientSupport = req.body.id;
		dataToUpdate.stage = 1;
		dataToUpdate.assignedAt = Date.now();
	} else if (req.body.staffType === 'salesExecutive') {
		dataToUpdate.executive = req.body.id;
		dataToUpdate.stage = 4;
		dataToUpdate.saleExecutiveAssignedAt = Date.now();
	} else if (saleTypes.includes(req.body.staffType)) {
		dataToUpdate.saleStaffType = req.body.staffType;
		dataToUpdate.bdm = req.body.id;
		dataToUpdate.stage = 3;
		dataToUpdate.saleAssignedAt = Date.now();
	} else {
		return next(new AppError('Invalid user type'));
	}

	console.log(dataToUpdate);
	const lead = await Leads.updateMany(
		{
			_id: { $in: req.body.leads },
		},
		dataToUpdate
	);
	res.status(200).json({
		status: 'success',
		data: {
			lead,
		},
	});
});
exports.countLeads = catchAsync(async (req, res, next) => {
	const filterByRole = {};
	const types = ['super-admin', 'gm'];
	if (!types.includes(req.admin.type)) {
		if (req.admin.type === 'assistantSalesManager') {
			filterByRole.bdm = mongoose.Types.ObjectId(req.admin.id);
			filterByRole.stage = 3;
			filterByRole.saleStaffType = 'assistantSalesManager';
		} else if (req.admin.type === 'salesExecutive') {
			filterByRole.executive = mongoose.Types.ObjectId(req.admin.id);
			filterByRole.stage = 4;
		}
	}

	const counts = await Leads.aggregate([
		{
			$facet: {
				Tenant: [
					{ $match: { userCategory: 'tenant', ...filterByRole } },
					{ $count: 'Tenant' },
				],
				Associate: [
					{ $match: { userCategory: 'associate', ...filterByRole } },
					{ $count: 'Associate' },
				],
				Buyer: [
					{ $match: { userCategory: 'buyer', ...filterByRole } },
					{ $count: 'Buyer' },
				],
				Owner: [
					{ $match: { userCategory: 'owner', ...filterByRole } },
					{ $count: 'Owner' },
				],
				Realtor: [
					{ $match: { userCategory: 'realtor', ...filterByRole } },
					{ $count: 'Realtor' },
				],
				Builder: [
					{ $match: { userCategory: 'builder', ...filterByRole } },
					{ $count: 'Builder' },
				],
				Unknown: [
					{ $match: { userCategory: 'unknown', ...filterByRole } },
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
				Associate: { $arrayElemAt: ['$Associate.Associate', 0] },
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

exports.deleteLead = catchAsync(async (req, res, next) => {
	const lead = await Leads.findByIdAndDelete(req.params.id);

	res.status(200).json({
		status: 'success',
		data: lead,
	});
});

exports.browseLeads = catchAsync(async (req, res, next) => {
	const filter = {};
	const page = req.body.page * 1 || 1;
	const limit = req.body.limit * 1 || 10;
	const skip = (page - 1) * limit;

	filter.status = 'active';
	filter.userCategory = { $in: ['owner', 'builder', 'realtor'] };

	if (req.body.userCategory) {
		filter.userCategory = req.body.userCategory;
	}
	if (req.body.location) {
		filter.preferedLocation = {
			$regex: req.body.location,
			$options: 'i',
		};
	}

	if (req.body.city) {
		filter.city = req.body.city;
	}
	if (
		req.body.propertyRequirements &&
		req.body.propertyRequirements.length > 0
	) {
		filter.propertyRequirements = {
			$all: req.body.propertyRequirements,
		};
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

exports.searchAll = catchAsync(async (req, res, next) => {
	// Demo Input Data
	// {
	// 	"leadsPage": 1,
	// 	"leadsLimit": 10,
	// 	"salesPage": 1,
	// 	"salesLimit": 10,
	// 	"city": "5f2cf831ab6d0b12da114161",
	// 	"location": "5f4667f2f1998651d7854d08",
	// 	"locationName": "Patia",
	// 	"for": "rent",
	// 	"facing": "north",
	// 	"propertyRequirements": [
	// 		"Flat",
	// 		"Duplex",
	// 		"1BHK"
	// 	],
	// 	"availableFor": [
	// 		"Bachelors (Men)",
	// 		"Bachelors (Women)"
	// 	]
	// }

	// Leads Pagination
	const leadsPage = req.body.leadsPage * 1 || 1;
	const leadsLimit = req.body.leadsLimit * 1 || 10;
	const leadsSkip = (leadsPage - 1) * leadsLimit;

	// Sales Pagination
	const salesPage = req.body.salesPage * 1 || 1;
	const salesLimit = req.body.salesLimit * 1 || 10;
	const salesSkip = (salesPage - 1) * salesLimit;

	const leadsFilter = {};
	const salesFilter = {};

	if (req.body.city) {
		leadsFilter.city = req.body.city;
		salesFilter.city = req.body.city;
	}
	if (req.body.liveData) {
		salesFilter.isPosted = true;
	}
	if (req.body.number) {
		leadsFilter.number = {
			$regex: req.body.number,
			$options: 'i',
		};
		salesFilter.number = {
			$regex: req.body.number,
			$options: 'i',
		};
	}
	if (req.body.createdBy) {
		salesFilter.createdBy = req.body.createdBy;
		leadsFilter.createdBy = req.body.createdBy;
	}
	if (req.body.myData) {
		leadsFilter.createdBy = req.admin.id;
		salesFilter.createdBy = req.admin.id;
	}
	if (
		req.body.propertyRequirements &&
		req.body.propertyRequirements.length > 0
	) {
		leadsFilter.propertyRequirements = {
			$all: req.body.propertyRequirements,
		};
		salesFilter.propertyRequirements = {
			$all: req.body.propertyRequirements,
		};
	}
	if (req.body.availableFor && req.body.availableFor.length > 0) {
		salesFilter.availableFor = {
			$all: req.body.availableFor,
		};
	}
	if (req.body.for) {
		salesFilter.for = req.body.for;
	}
	if (req.body.facing) {
		salesFilter.facing = req.body.facing;
	}
	if (req.body.location) {
		salesFilter.location = req.body.location;
		if (req.body.locationName) {
			leadsFilter.preferedLocation = {
				$regex: req.body.locationName,
				$options: 'i',
			};
		}
	}

	const totalLeadDocs = await Leads.countDocuments(leadsFilter);
	const leads = await Leads.find(leadsFilter)
		.sort('-createdAt')
		.skip(leadsSkip)
		.limit(leadsLimit);
	const totalSalesDocs = await PropertyLead.countDocuments(salesFilter);
	const sales = await PropertyLead.find(salesFilter)
		.sort('-createdAt')
		.skip(salesSkip)
		.limit(salesLimit);
	res.status(200).json({
		status: 'success',
		data: { leads, sales, totalLeadDocs, totalSalesDocs },
	});
});

exports.propertyLeadDetails = catchAsync(async (req, res, next) => {
	const propertyLead = await PropertyLead.findById(req.params.id);
	res.status(200).json({
		status: 'success',
		data: { propertyLead },
	});
});
exports.propertyLeadUpdate = catchAsync(async (req, res, next) => {
	const options = {};
	if (req.body.isPossessed !== null && req.body.isPossessed !== undefined) {
		options.isPossessed = req.body.isPossessed;
	}
	const propertyLead = await PropertyLead.findByIdAndUpdate(
		req.params.id,
		options,
		{
			new: true,
			runValidators: true,
		}
	);
	res.status(200).json({
		status: 'success',
		data: { propertyLead },
	});
});
