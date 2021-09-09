const AppError = require('./../utils/appError');
const ProjectSpeciality = require('./../models/projectSpeciality');
const ProjectAgent = require('./../models/projectAgent');
const Project = require('./../models/projectModule');
const Opinion = require('./../models/projectOpinionModel');
const ProjectProperty = require('./../models/projectPropertyModule');
const catchAsync = require('./../utils/catchAsync');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const { arrayUniq } = require('../utils/helper');

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
	// Project.counterReset('docNumber', function (err) {
	// 	console.log(err);
	// });
	const project = await Project.create(req.body);
	if (project) {
		project.setNext('doc_number', function (err, pr) {
			if (err) {
				return next(new AppError(err.msg));
			} else {
				return res.status(200).json({
					status: 'success',
					data: {
						project,
					},
				});
			}
		});
	}
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
			useFindAndModify: true,
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
			useFindAndModify: true,
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
			useFindAndModify: true,
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
								useFindAndModify: true,
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

exports.searchByName = catchAsync(async (req, res, next) => {
	const projects = await Project.find({
		title: { $regex: req.body.title, $options: 'i' },
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
		const existing = isPresent.agents.map((c) => c.id);
		const newAgents = [...existing, ...req.body.agents];
		console.log(arrayUniq(newAgents));
		isPresent.agents = arrayUniq(newAgents);
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

exports.removeAgent = catchAsync(async (req, res) => {
	const project = await ProjectAgent.findOneAndUpdate(
		{ project: req.params.projectId },
		{
			$pull: {
				agents: {
					$in: [req.params.agentId],
				},
			},
		},
		{
			new: true,
			runValidators: true,
			useFindAndModify: true,
		}
	);
	res.status(200).json({
		status: 'success',
		data: {
			project,
		},
	});
});

exports.getProjects = catchAsync(async (req, res, next) => {
	const filter = {};
	const page = req.body.page * 1 || 1;
	const limit = req.body.limit * 1 || 10;
	const skip = (page - 1) * limit;

	if (req.body.title) {
		filter.title = { $regex: req.body.title, $options: 'i' };
	}
	if (req.body.id) {
		const id = req.body.id;
		if (!id.startsWith('HSI')) {
			return next(new AppError('Invalid ID'));
		}
		const docNumber = id.split('HSI')[1];
		if (Number(docNumber)) {
			filter.docNumber = Number(docNumber);
		}
	}

	if (req.body.projectType) {
		filter.projectType = req.body.projectType;
	}
	if (req.body.builder) {
		filter.builder = req.body.builder;
	}

	if (req.body.city) {
		filter.city = req.body.city;
	}
	if (req.body.complitionStatus) {
		filter.complitionStatus = req.body.complitionStatus;
	}
	if (req.body.status) {
		filter.status = req.body.status;
	}

	// console.log(filter);
	const totalDocs = await Project.countDocuments(filter);

	const projects = await Project.find(filter)
		.sort('-createdAt')
		.skip(skip)
		.limit(limit);
	res.status(200).json({
		status: 'success',
		data: { projects, totalDocs },
	});
});

exports.removeProject = catchAsync(async (req, res) => {
	const project = await Project.deleteOne({ _id: req.params.id });
	res.status(200).json({
		status: 'success',
		data: {
			project,
		},
	});
});

exports.addOpinion = catchAsync(async (req, res) => {
	if (req.body.status) {
		delete req.body.status;
	}

	const existing = await Opinion.findOne({
		user: req.user.id,
		project: req.params.projectId,
	});

	if (existing) {
		if (
			req.body.parkingEasy !== null &&
			req.body.parkingEasy !== undefined &&
			typeof req.body.parkingEasy === 'boolean'
		) {
			existing.parkingEasy = req.body.parkingEasy;
		}
		if (
			req.body.walkableDistanceFromMarket !== null &&
			req.body.walkableDistanceFromMarket !== undefined &&
			typeof req.body.walkableDistanceFromMarket === 'boolean'
		) {
			existing.walkableDistanceFromMarket =
				req.body.walkableDistanceFromMarket;
		}
		if (
			req.body.studentArea !== null &&
			req.body.studentArea !== undefined &&
			typeof req.body.studentArea === 'boolean'
		) {
			existing.studentArea = req.body.studentArea;
		}
		if (
			req.body.dogFriendly !== null &&
			req.body.dogFriendly !== undefined &&
			typeof req.body.dogFriendly === 'boolean'
		) {
			existing.dogFriendly = req.body.dogFriendly;
		}
		if (
			req.body.familyArea !== null &&
			req.body.familyArea !== undefined &&
			typeof req.body.familyArea === 'boolean'
		) {
			existing.familyArea = req.body.familyArea;
		}
		if (
			req.body.safeArea !== null &&
			req.body.safeArea !== undefined &&
			typeof req.body.safeArea === 'boolean'
		) {
			existing.safeArea = req.body.safeArea;
		}
		await existing.save();

		return res.status(200).json({
			status: 'success',
			data: {
				opinion: existing,
			},
		});
	}

	req.body.user = req.user.id;
	req.body.project = req.params.projectId;

	const opinion = await Opinion.create(req.body);
	res.status(200).json({
		status: 'success',
		data: {
			opinion,
		},
	});
});
exports.getOpinion = catchAsync(async (req, res) => {
	const opinion = await Opinion.aggregate([
		{
			$match: {
				project: mongoose.Types.ObjectId(req.params.projectId),
				status: 'active',
			},
		},
		{
			$group: {
				_id: null,
				totalVotes: {
					$sum: 1,
				},
				parkingEasy: {
					$sum: {
						$cond: ['$parkingEasy', 1, 0],
					},
				},
				walkableDistanceFromMarket: {
					$sum: {
						$cond: ['$walkableDistanceFromMarket', 1, 0],
					},
				},
				studentArea: {
					$sum: {
						$cond: ['$studentArea', 1, 0],
					},
				},
				dogFriendly: {
					$sum: {
						$cond: ['$dogFriendly', 1, 0],
					},
				},
				familyArea: {
					$sum: {
						$cond: ['$familyArea', 1, 0],
					},
				},
				safeArea: {
					$sum: {
						$cond: ['$safeArea', 1, 0],
					},
				},
			},
		},
		{
			$project: {
				parkingEasy: {
					$round: [
						{
							$multiply: [
								{
									$divide: ['$parkingEasy', '$totalVotes'],
								},
								100,
							],
						},
						0,
					],
				},
				walkableDistanceFromMarket: {
					$round: [
						{
							$multiply: [
								{
									$divide: [
										'$walkableDistanceFromMarket',
										'$totalVotes',
									],
								},
								100,
							],
						},
						0,
					],
				},
				studentArea: {
					$round: [
						{
							$multiply: [
								{
									$divide: ['$studentArea', '$totalVotes'],
								},
								100,
							],
						},
						0,
					],
				},
				dogFriendly: {
					$round: [
						{
							$multiply: [
								{
									$divide: ['$dogFriendly', '$totalVotes'],
								},
								100,
							],
						},
						0,
					],
				},
				familyArea: {
					$round: [
						{
							$multiply: [
								{
									$divide: ['$familyArea', '$totalVotes'],
								},
								100,
							],
						},
						0,
					],
				},
				safeArea: {
					$round: [
						{
							$multiply: [
								{
									$divide: ['$safeArea', '$totalVotes'],
								},
								100,
							],
						},
						0,
					],
				},
			},
		},
	]);

	const myOpinion = await Opinion.findOne({
		user: req.params.userId ? req.params.userId : null,
		project: req.params.projectId,
	}).select('-user -status -project -_id -updatedAt -id -__v');
	res.status(200).json({
		status: 'success',
		data: {
			opinion:
				opinion.length > 0
					? opinion[0]
					: {
							parkingEasy: 0,
							walkableDistanceFromMarket: 0,
							studentArea: 0,
							dogFriendly: 0,
							familyArea: 0,
							safeArea: 0,
					  },
			myOpinion: myOpinion
				? myOpinion
				: {
						parkingEasy: false,
						walkableDistanceFromMarket: false,
						studentArea: false,
						dogFriendly: false,
						familyArea: false,
						safeArea: false,
				  },
		},
	});
});

exports.getAllOpinions = catchAsync(async (req, res, next) => {
	const filter = {};
	const page = req.query.page * 1 || 1;
	const limit = req.query.limit * 1 || 10;
	const skip = (page - 1) * limit;

	if (req.query.project) {
		filter.project = req.query.project;
	}
	if (req.query.user) {
		filter.user = req.query.user;
	}

	const totalDocs = await Opinion.countDocuments(filter);
	const opinions = await Opinion.find(filter)
		.sort({ top: -1, updatedAt: -1 })
		.skip(skip)
		.limit(limit);
	res.status(200).json({
		status: 'success',
		data: {
			totalDocs,
			opinions,
		},
	});
});

exports.updateOpinion = catchAsync(async (req, res, next) => {
	const opinion = await Opinion.findByIdAndUpdate(
		req.params.id,
		{ status: req.body.status },
		{
			new: true,
			runValidators: true,
		}
	);

	res.status(200).json({
		status: 'success',
		data: {
			opinion,
		},
	});
});
