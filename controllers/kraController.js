const Admin = require('./../models/adminModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const ProjectAdvertisement = require('./../models/projectAdvertisementModel');
const mongoose = require('mongoose');

// Create KRA

exports.addProjectAdvertisement = catchAsync(async (req, res, next) => {
	if (req.admin.type === 'staff') {
		return next(new AppError('You are not authorized.', 401));
	}

	const body = { ...req.body };
	body.admin = req.admin.id;

	const projectAdvertisement = await ProjectAdvertisement.create(body);

	res.status(201).json({
		status: 'success',
		data: {
			projectAdvertisement,
		},
	});
});
exports.getAllProjectAdvertisements = catchAsync(async (req, res, next) => {
	const filter = {};
	if (req.admin.type === 'staff') {
		filter.staff = req.admin.id;
	}

	if (req.admin.type === 'admin') {
		filter.admin = req.admin.id;
	}
	const page = req.params.page || 1;
	const limit = req.params.limit || 10;
	const skip = (page - 1) * limit;

	const totalDocs = await ProjectAdvertisement.countDocuments(filter);

	const projectAdvertisements = await ProjectAdvertisement.find(filter)
		.skip(skip)
		.limit(limit);

	res.status(200).json({
		status: 'success',
		count: totalDocs,
		data: {
			projectAdvertisements,
		},
	});
});
exports.getProjectAdvertisementDetails = catchAsync(async (req, res, next) => {
	if (req.admin.type === 'staff') {
		return next(new AppError('You are not authorized.', 401));
	}

	const filter = {
		_id: mongoose.Types.ObjectId(req.params.id),
	};

	if (req.admin.type === 'admin') {
		filter.admin = req.admin.id;
	}

	const projectAdvertisement = await ProjectAdvertisement.find(filter);

	res.status(200).json({
		status: 'success',
		data: {
			projectAdvertisement,
		},
	});
});
exports.updateProjectAdvertisementDetails = catchAsync(
	async (req, res, next) => {
		if (req.admin.type === 'staff') {
			return next(new AppError('You are not authorized.', 401));
		}

		const filter = {
			_id: mongoose.Types.ObjectId(req.params.id),
		};

		if (req.admin.type === 'admin') {
			filter.admin = req.admin.id;
		}

		const projectAdvertisement = await ProjectAdvertisement.findOneAndUpdate(
			filter,
			req.body,
			{ new: true }
		);

		res.status(200).json({
			status: 'success',
			data: {
				projectAdvertisement,
			},
		});
	}
);
exports.deleteProjectAdvertisementDetails = catchAsync(
	async (req, res, next) => {
		if (req.admin.type === 'staff') {
			return next(new AppError('You are not authorized.', 401));
		}

		const filter = {
			_id: mongoose.Types.ObjectId(req.params.id),
		};

		if (req.admin.type === 'admin') {
			filter.admin = req.admin.id;
		}

		const projectAdvertisement = await ProjectAdvertisement.findOneAndDelete(
			filter
		);
		console.log(projectAdvertisement);

		res.status(200).json({
			status: 'success',
			data: {
				projectAdvertisement,
			},
		});
	}
);

exports.fetchMyTasks = catchAsync(async (req, res, next) => {
	const projectAdvertisement = await ProjectAdvertisement.find({
		staff: req.admin.id,
	});
	res.status(200).json({
		status: 'success',
		data: {
			projectAdvertisement,
		},
	});
});
