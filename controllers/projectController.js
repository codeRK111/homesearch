const Builder = require('./../models/builderModel');
const Project = require('./../models/projectModule');
const ProjectProperty = require('./../models/projectPropertyModule');

const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const ApiFeatures = require('../utils/apiFeatures');
const path = require('path');
const fs = require('fs');

exports.addProjectFlat = catchAsync(async (req, res, next) => {
	const removeFieldArray = [
		'logo',
		'image1',
		'image2',
		'image3',
		'image4',
		'image5',
		'image6',
		'bhk1',
		'bhk2',
		'bhk3',
	];

	const properties = [];

	let clone = { ...req.body };
	removeFieldArray.forEach((c) => {
		if (clone[c] !== null || clone[c] !== undefined) {
			delete clone[c];
		}
	});

	const project = await Project.create(clone);
	if (!project) {
		return next(new AppError('Unable to add project', 500));
	}

	if (req.body.bhk1) {
		properties.push({
			...req.body.bhk1,
			type: clone.projectType,
			project: project.id,
		});
	}
	if (req.body.bhk2) {
		properties.push({
			...req.body.bhk2,
			type: clone.projectType,
			project: project.id,
		});
	}
	if (req.body.bhk3) {
		properties.push({
			...req.body.bhk3,
			type: clone.projectType,
			project: project.id,
		});
	}

	console.log(properties);

	const pr = await ProjectProperty.insertMany(properties);

	res.status(201).json({
		status: 'success',
		data: {
			project,
			properties: pr,
		},
	});
});

exports.addProjectIndependentHouse = catchAsync(async (req, res, next) => {
	const removeFieldArray = [
		'logo',
		'image1',
		'image2',
		'image3',
		'image4',
		'image5',
		'image6',
		'independenthouse',
	];

	let clone = { ...req.body };
	removeFieldArray.forEach((c) => {
		if (clone[c] !== null || clone[c] !== undefined) {
			delete clone[c];
		}
	});

	const project = await Project.create(clone);
	if (!project) {
		return next(new AppError('Unable to add project', 500));
	}

	// console.log(clone.projectType);

	const pr = await ProjectProperty.create({
		...req.body.independenthouse,
		type: clone.projectType,
		project: project.id,
	});

	res.status(201).json({
		status: 'success',
		data: {
			project,
			properties: pr,
		},
	});
});

exports.addProjectLand = catchAsync(async (req, res, next) => {
	const removeFieldArray = [
		'logo',
		'image1',
		'image2',
		'image3',
		'image4',
		'image5',
		'image6',
		'land',
	];

	let clone = { ...req.body };
	removeFieldArray.forEach((c) => {
		if (clone[c] !== null || clone[c] !== undefined) {
			delete clone[c];
		}
	});

	const project = await Project.create(clone);
	if (!project) {
		return next(new AppError('Unable to add project', 500));
	}

	const pr = await ProjectProperty.create({
		...req.body.land,
		type: clone.projectType,
		project: project.id,
	});

	res.status(201).json({
		status: 'success',
		data: {
			project,
			properties: pr,
		},
	});
});

exports.getAllProjects = catchAsync(async (req, res, next) => {
	let query = { ...req.query };
	const page = query.page * 1 || 1;
	const limit = query.limit * 1 || 100;
	const excludeFields = ['page', 'limit'];
	excludeFields.forEach((field) => delete query[field]);
	const skip = (page - 1) * limit;
	const count = await Project.countDocuments(query);
	const projects = await Project.find(query)
		.sort('-createdAt')
		.skip(skip)
		.limit(limit);

	res.status(200).json({
		status: 'success',
		count,
		data: {
			projects,
		},
	});
});

exports.handleImage = catchAsync(async (req, res, next) => {
	if (!req.files) {
		return next(new AppError('No image found', 400));
	} else {
		const project = await Project.findById(req.params.id);
		if (!project) return next(new AppError('project not found', 404));

		if (req.files.image1) {
			if (project.image1) {
				fs.unlinkSync(
					path.join(__dirname, '../', 'images', 'project_images/') +
						project.image1
				);
			}
			let image1 =
				Math.floor(10000000 + Math.random() * 90000000) +
				'-' +
				req.files.image1.name;
			await req.files.image1.mv(
				path.join(__dirname, '../', 'images', 'project_images/') +
					image1
			);
			project.image1 = image1;
		}

		if (req.files.image2) {
			if (project.image2) {
				fs.unlinkSync(
					path.join(__dirname, '../', 'images', 'project_images/') +
						project.image2
				);
			}
			let image2 =
				Math.floor(10000000 + Math.random() * 90000000) +
				'-' +
				req.files.image2.name;
			await req.files.image2.mv(
				path.join(__dirname, '../', 'images', 'project_images/') +
					image2
			);
			project.image2 = image2;
		}

		if (req.files.image3) {
			if (project.image3) {
				fs.unlinkSync(
					path.join(__dirname, '../', 'images', 'project_images/') +
						project.image3
				);
			}
			let image3 =
				Math.floor(10000000 + Math.random() * 90000000) +
				'-' +
				req.files.image3.name;
			await req.files.image3.mv(
				path.join(__dirname, '../', 'images', 'project_images/') +
					image3
			);
			project.image3 = image3;
		}

		if (req.files.image4) {
			if (project.image4) {
				fs.unlinkSync(
					path.join(__dirname, '../', 'images', 'project_images/') +
						project.image4
				);
			}
			let image4 =
				Math.floor(10000000 + Math.random() * 90000000) +
				'-' +
				req.files.image4.name;
			await req.files.image4.mv(
				path.join(__dirname, '../', 'images', 'project_images/') +
					image4
			);
			project.image4 = image4;
		}

		const projectUpdated = await project.save();

		//send response
		res.send({
			status: 'success',
			message: 'File is uploaded',
			data: {
				project: projectUpdated,
			},
		});
	}
});

exports.getProjectDetails = catchAsync(async (req, res, next) => {
	const project = await Project.findById(req.params.id);
	if (!project) return next(new AppError('project not found', 404));
	const properties = await ProjectProperty.find({ project: project.id });
	res.status(200).json({
		status: 'success',
		data: { project, properties },
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

exports.updateProjectProperty = catchAsync(async (req, res, next) => {
	const property = await ProjectProperty.findByIdAndUpdate(
		req.params.id,
		req.body,
		{
			new: true,
			runValidators: true,
		}
	);

	res.status(200).json({
		status: 'success',
		data: {
			property,
		},
	});
});
