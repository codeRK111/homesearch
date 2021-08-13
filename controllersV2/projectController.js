const AppError = require('./../utils/appError');
const ProjectSpeciality = require('./../models/projectSpeciality');
const Project = require('./../models/projectModule');
const ProjectProperty = require('./../models/projectPropertyModule');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');

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
	const existingProject = await Project.findById(req.params.id);
	if (!existingProject) {
		return next(new AppError('Project not found'));
	}

	const data = {};

	if (
		req.files['thumbnailImage'] &&
		req.files['thumbnailImage'][0].filename
	) {
		data.thumbnailImage = req.files['thumbnailImage'][0].filename;
		if (existingProject.thumbnailImage) {
			fs.unlink(
				path.join(__dirname, '../', 'images', 'project_images/') +
					existingProject.thumbnailImage,
				function (err) {}
			);
		}
	}
	if (
		req.files['masterFloorPlan'] &&
		req.files['masterFloorPlan'][0].filename
	) {
		data.masterFloorPlan = req.files['masterFloorPlan'][0].filename;
		if (existingProject.masterFloorPlan) {
			fs.unlink(
				path.join(__dirname, '../', 'images', 'project_images/') +
					existingProject.masterFloorPlan,
				function (err) {}
			);
		}
	}
	if (
		req.files['geogrophicalImage'] &&
		req.files['geogrophicalImage'][0].filename
	) {
		data.geogrophicalImage = req.files['geogrophicalImage'][0].filename;
		if (existingProject.geogrophicalImage) {
			fs.unlink(
				path.join(__dirname, '../', 'images', 'project_images/') +
					existingProject.geogrophicalImage,
				function (err) {}
			);
		}
	}

	if (req.files['photos'] && req.files['photos'].length > 0) {
		if (existingProject.photos.length > 0) {
			const images = req.files['photos'].map((c, i) => ({
				image: c.filename,
			}));
			data['$push'] = { photos: { $each: images } };
		} else {
			data.photos = req.files['photos'].map((c, i) => ({
				image: c.filename,
			}));
		}
	}

	console.log(data);

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
exports.addProjectProperty = catchAsync(async (req, res, next) => {
	const data = {
		...req.body,
		floorPlan: req.file.filename,
		project: req.params.projectId,
		tower: JSON.parse(req.body.tower),
	};

	console.log(data);

	const property = await ProjectProperty.create(data);
	res.status(200).json({
		status: 'success',
		data: {
			property,
		},
	});
});

exports.updateProjectProperty = catchAsync(async (req, res, next) => {
	const existingProperty = await ProjectProperty.findById(req.params.id);
	if (!existingProperty) {
		return next(new AppError('Property not found'));
	}
	const data = {
		...req.body,
	};
	if (req.body.tower) {
		data.tower = JSON.parse(req.body.tower);
	}

	if (req.file && req.file.filename) {
		if (existingProperty.floorPlan) {
			fs.unlink(
				path.join(__dirname, '../', 'images', 'project_images/') +
					existingProperty.floorPlan,
				function (err) {}
			);
		}

		data.floorPlan = req.file.filename;
	}

	console.log(data);

	const property = await ProjectProperty.findByIdAndUpdate(
		req.params.id,
		data,
		{
			runValidators: true,
			new: true,
		}
	);
	res.status(200).json({
		status: 'success',
		data: {
			property,
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
exports.updateTowerNumbers = catchAsync(async (req, res, next) => {
	const project = await Project.findByIdAndUpdate(
		req.params.id,
		{
			$push: { towerNames: { $each: req.body.towerNames } },
		},
		{
			new: true,
			runValidators: true,
		}
	);
	res.status(200).json({
		status: 'success',
		data: {
			project,
		},
	});
});
exports.manageFloorPlan = catchAsync(async (req, res, next) => {
	const project = await Project.findOneAndUpdate(
		{
			_id: req.params.projectId,
			'towerNames._id': req.params.towerId,
		},
		{
			$set: {
				'towerNames.$.floorPlan': req.file.filename,
			},
		},
		{
			new: true,
			runValidators: true,
		}
	);
	res.status(200).json({
		status: 'success',
		data: {
			project,
		},
	});
});
exports.manageTowerStatus = catchAsync(async (req, res, next) => {
	const project = await Project.findOneAndUpdate(
		{
			_id: req.params.projectId,
			'towerNames._id': req.params.towerId,
		},
		{
			$set: {
				'towerNames.$.status': req.body.status,
			},
		},
		{
			new: true,
			runValidators: true,
		}
	);

	const properties = await ProjectProperty.updateMany(
		{
			'tower._id': req.params.towerId,
		},
		{
			status: req.body.status,
		}
	);
	res.status(200).json({
		status: 'success',
		data: {
			project,
			properties,
		},
	});
});
exports.updateTowerName = catchAsync(async (req, res, next) => {
	const project = await Project.findOneAndUpdate(
		{
			_id: req.params.id,
			'towerNames._id': req.params.towerId,
		},
		{
			$set: {
				'towerNames.$.name': req.body.name,
			},
		},
		{
			new: true,
			runValidators: true,
		}
	);
	res.status(200).json({
		status: 'success',
		data: {
			project,
		},
	});
});
exports.getProject = catchAsync(async (req, res, next) => {
	const project = await Project.findById(req.params.id);
	const properties = await ProjectProperty.find({
		project: req.params.id,
	});
	res.status(200).json({
		status: 'success',
		data: {
			project,
			properties,
		},
	});
});

exports.removeTower = catchAsync(async (req, res, next) => {
	const project = await Project.findByIdAndUpdate(
		req.params.projectId,
		{
			$pull: {
				towerNames: {
					_id: req.params.towerId,
				},
			},
		},
		{
			new: true,
			runValidators: true,
		}
	);
	res.status(200).json({
		status: 'success',
		data: {
			project,
		},
	});
});
exports.removePhase = catchAsync(async (req, res, next) => {
	const project = await Project.findByIdAndUpdate(
		req.params.projectId,
		{
			$pull: {
				phases: {
					_id: req.params.phaseId,
				},
			},
		},
		{
			new: true,
			runValidators: true,
		}
	);
	res.status(200).json({
		status: 'success',
		data: {
			project,
		},
	});
});
exports.addPhase = catchAsync(async (req, res, next) => {
	const project = await Project.findByIdAndUpdate(
		req.params.projectId,
		{
			$push: { phases: req.body },
		},
		{
			new: true,
			runValidators: true,
		}
	);
	res.status(200).json({
		status: 'success',
		data: {
			project,
		},
	});
});

exports.addTower = catchAsync(async (req, res, next) => {
	const project = await Project.findByIdAndUpdate(
		req.params.projectId,
		{
			$push: { towerNames: req.body },
		},
		{
			new: true,
			runValidators: true,
		}
	);
	res.status(200).json({
		status: 'success',
		data: {
			project,
		},
	});
});
