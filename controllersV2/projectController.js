const AppError = require('./../utils/appError');
const ProjectSpeciality = require('./../models/projectSpeciality');
const Project = require('./../models/projectModule');
const ProjectProperty = require('./../models/projectPropertyModule');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const { validationResult } = require('express-validator');

exports.properties = catchAsync(async (req, res, next) => {
	const match = {
		status: 'active',
		project: ObjectId(req.body.project),
	};
	if (req.body.type === 'type') {
		match.speciality = { $ne: null };
	}
	const aggregationArray = [
		{
			$match: match,
		},
		{
			$unwind: {
				path: '$floorPlans',
				preserveNullAndEmptyArrays: true,
			},
		},
	];

	if (req.body.type === 'unit') {
		aggregationArray.push({
			$sort: { numberOfUnits: -1 },
		});
	}
	if (req.body.type === 'bhk') {
		aggregationArray.push({
			$sort: { numberOfBedrooms: -1 },
		});
	}

	console.log(aggregationArray);

	ProjectProperty.aggregate(aggregationArray).exec(function (err, projectes) {
		if (err) {
			return next(new AppError('Unable to fetch', 55));
		}
		ProjectSpeciality.populate(
			projectes,
			{ path: 'speciality' },
			function (err, sps) {
				if (err) {
					return next(new AppError('Unable to fetch', 55));
				}
				res.status(200).json({
					status: 'success',
					data: {
						properties: sps,
					},
				});
			}
		);
	});
});

exports.addProject = catchAsync(async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			status: 'fail',
			validationError: true,
			errors: errors.array(),
		});
	}

	const project = await Project.create(req.body);
	res.status(200).json({
		status: 'success',
		data: {
			project,
		},
	});
});
exports.uploadPhotos = catchAsync(async (req, res, next) => {
	const data = {
		thumbnailImage: req.files['thumbnailImage'][0].filename,
		masterFloorPlan: req.files['masterFloorPlan'][0].filename,
		geogrophicalImage: req.files['geogrophicalImage'][0].filename,
		photos: req.files['photos'].map((c, i) => ({
			image: c.filename,
		})),
	};

	const project = await Project.findByIdAndUpdate(req.params.id, data, {
		new: true,
		runValidators: true,
	});
	res.status(200).json({
		status: 'success',
		data: {
			project,
		},
	});
});
exports.updateProject = catchAsync(async (req, res, next) => {
	const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});
	res.status(200).json({
		status: 'success',
		data: {
			project,
		},
	});
});
exports.getProject = catchAsync(async (req, res, next) => {
	const project = await Project.findById(req.params.id);
	res.status(200).json({
		status: 'success',
		data: {
			project,
		},
	});
});
