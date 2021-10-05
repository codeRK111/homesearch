const AppError = require('./../utils/appError');
const Leads = require('./../models/leadStrategyModel');
const catchAsync = require('./../utils/catchAsync');
const fs = require('fs');
const path = require('path');

function deleteFile(file, callback) {
	const imagePath =
		path.join(__dirname, '../', 'images', 'lead_strategy_images/') + file;
	fs.unlink(imagePath, callback);
}

exports.addLeadStrategy = catchAsync(async (req, res, next) => {
	const requiredFields = ['url', 'description'];
	requiredFields.every((c) => {
		if (!req.body[c]) {
			if (req.file) {
				deleteFile(req.file.filename, function (err) {});
			}
			next(new AppError(`${c} missing`));
			return false;
		}
		return true;
	});

	const excludeFields = ['status', 'createdAt', 'updatedAt', 'docNumber'];
	excludeFields.forEach((c) => {
		if (req.body[c] !== null && req.body[c] !== undefined) {
			delete req.body[c];
		}
	});
	req.body.staff = req.admin.id;
	if (req.file) {
		req.body.photo = req.file.filename;
	}
	const lead = await Leads.create(req.body);

	res.status(200).json({
		status: 'success',
		data: lead,
	});
});

exports.getMyStrategies = catchAsync(async (req, res, next) => {
	const filter = {};
	const page = req.query.page * 1 || 1;
	const limit = req.query.limit * 1 || 10;
	const skip = (page - 1) * limit;

	const allowedFields = ['gm', 'super-admin'];
	if (!allowedFields.includes(req.admin.type)) {
		filter.staff = req.admin.id;
	}

	if (req.query.status) {
		filter.status = req.body.status;
	}

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
