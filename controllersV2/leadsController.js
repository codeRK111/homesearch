const AppError = require('./../utils/appError');
const Leads = require('./../models/leadsModel');
const catchAsync = require('./../utils/catchAsync');

exports.addLead = catchAsync(async (req, res, next) => {
	const requiredFields = ['number'];
	requiredFields.every((c) => {
		if (!req.body[c]) {
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
		return next(new AppError('Already Exists'));
	}

	const excludeFields = ['status', 'feedback', 'attended'];
	excludeFields.forEach((c) => {
		if (req.body[c] !== null && req.body[c] !== undefined) {
			delete req.body[c];
		}
	});
	req.body.createdBy = req.admin.id;
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
	filter.clientSupport = req.admin.id;

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
	if (req.body.minPrice) {
		data.minPrice = req.body.minPrice;
	}
	if (req.body.maxPrice) {
		data.maxPrice = req.body.maxPrice;
	}
	if (req.body.hold !== null && req.body.hold !== undefined) {
		data.hold = req.body.hold;
		if (!req.body.holdDate)
			return next(new AppError('Hold date not found'));
		data.holdDate = req.body.holdDate;
	}

	if (req.body.bdm) {
		if (data.hold !== null && data.hold !== undefined) {
			delete data.hold;
		}
		if (data.holdDate) {
			delete data.holdDate;
		}

		data.bdm = req.body.bdm;
		data.stage = 2;
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
