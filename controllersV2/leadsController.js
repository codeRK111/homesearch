const AppError = require('./../utils/appError');
const Leads = require('./../models/leadsModel');
const catchAsync = require('./../utils/catchAsync');
const fs = require('fs');
const path = require('path');

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

	// console.log(filter);
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
