const AppError = require('./../utils/appError');
const ProjectSpeciality = require('./../models/projectSpeciality');
const ProjectAgent = require('./../models/projectAgent');
const Project = require('./../models/projectModule');
const ProjectProperty = require('./../models/projectPropertyModule');
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
	const aggregationArray = [];

	aggregationArray.push({ $match: match });

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

exports.addProject = catchAsync(async (req, res) => {
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

	// noinspection TypeScriptValidateTypes
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
exports.addProjectProperty = catchAsync(async (req, res) => {
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
exports.updateProject = catchAsync(async (req, res) => {
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
exports.updateTowerNumbers = catchAsync(async (req, res) => {
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
exports.manageFloorPlan = catchAsync(async (req, res) => {
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
exports.manageTowerStatus = catchAsync(async (req, res) => {
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
exports.updateTowerName = catchAsync(async (req, res) => {
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

	if (project) {
		await ProjectProperty.updateMany(
			{
				'tower._id': req.params.towerId,
			},
			{
				'tower.name': req.body.name,
			}
		);
	}

	res.status(200).json({
		status: 'success',
		data: {
			project,
		},
	});
});
exports.getProject = catchAsync(async (req, res) => {
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

exports.removeTower = catchAsync(async (req, res) => {
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
exports.removePhase = catchAsync(async (req, res) => {
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
exports.addPhase = catchAsync(async (req, res) => {
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

exports.addTower = catchAsync(async (req, res) => {
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

exports.copyTower = catchAsync(async (req, res, next) => {
	try {
		const project = await Project.findOne({
			_id: req.params.projectId,
			'towerNames._id': req.params.towerId,
		}).select('towerNames');

		if (project) {
			const tower = project.towerNames.find(
				(c) => String(c._id) === String(req.params.towerId)
			);
			const copyTower = project.towerNames.find(
				(c) => String(c._id) === String(req.params.copyId)
			);
			if (copyTower.floorPlan) {
				console.log('Yes');
				const imgArray = copyTower.floorPlan.split('.');
				const oldImagePath =
					path.join(__dirname, '../', 'images', 'project_images/') +
					copyTower.floorPlan;
				const newImage = `${Date.now()}.${imgArray[1]}`;
				console.log(newImage);
				const newImagePath =
					path.join(__dirname, '../', 'images', 'project_images/') +
					newImage;
				fs.copyFile(oldImagePath, newImagePath, async (err) => {
					if (err) {
						console.log(err);
						return next(new AppError('Cannot copy image', 500));
					} else {
						await Project.findOneAndUpdate(
							{
								_id: req.params.projectId,
								'towerNames._id': req.params.towerId,
							},
							{
								$set: {
									'towerNames.$.floorPlan': newImage,
								},
							},
							{
								new: true,
								runValidators: true,
							}
						);

						// Get properties associate with the given tower
						const propertiesDocs = await ProjectProperty.find({
							'tower._id': req.params.copyId,
						}).select('-_id -id -__v');

						const properties = propertiesDocs.map((c) => {
							const data = {
								...c._doc,
							};
							if (data.speciality) {
								data.speciality = data.speciality._id;
							}
							delete data.id;
							data.tower = tower;
							return data;
						});

						const newProperties = await ProjectProperty.insertMany(
							properties
						);
						res.status(200).json({
							status: 'success',
							data: {
								properties: newProperties,
								tower,
							},
						});
					}
				});
			} else {
				console.log('No');
				// Get properties associate with the given tower
				const propertiesDocs = await ProjectProperty.find({
					'tower._id': req.params.copyId,
				}).select('-_id -id -__v');

				const properties = propertiesDocs.map((c) => {
					const data = {
						...c._doc,
					};
					if (data.speciality) {
						data.speciality = data.speciality._id;
					}
					delete data.id;
					data.tower = tower;
					return data;
				});

				const newProperties = await ProjectProperty.insertMany(
					properties
				);
				res.status(200).json({
					status: 'success',
					data: {
						properties: newProperties,
						tower,
					},
				});
			}
		} else {
			return next(new AppError('Project not found', 404));
		}
	} catch (e) {
		res.status(500).json({
			status: 'fail',
			error: {
				e,
			},
		});
	}
});

exports.searchByCity = catchAsync(async (req, res, next) => {
	const projects = await Project.find({
		city: req.body.city,
	});
	res.status(200).json({
		status: 'success',
		data: {
			projects,
		},
	});
});
exports.addProjectAgent = catchAsync(async (req, res, next) => {
	const isPresent = await ProjectAgent.findOne({
		project: mongoose.Types.ObjectId(req.body.project),
	});
	if (isPresent) {
		isPresent.agents = req.body.agents;
		await isPresent.save();
		return res.status(200).json({
			status: 'success',
			data: {
				projectAgent: isPresent,
			},
		});
	}
	const projectAgent = await ProjectAgent.create(req.body);
	res.status(200).json({
		status: 'success',
		data: {
			projectAgent,
		},
	});
});
exports.getAgents = catchAsync(async (req, res, next) => {
	const isPresent = await ProjectAgent.findOne({
		project: mongoose.Types.ObjectId(req.params.projectId),
	});

	res.status(200).json({
		status: 'success',
		data: {
			projectAgents: isPresent,
		},
	});
});
