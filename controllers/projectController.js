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

	const pr = await ProjectProperty.create({
		...req.body.independenthouse,
		type: req.body.independenthouse.projectType,
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

exports.updateBuilder = catchAsync(async (req, res, next) => {
	const builder = await Builder.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});

	res.status(200).json({
		status: 'success',
		data: {
			builder,
		},
	});
});

exports.builderDetails = catchAsync(async (req, res, next) => {
	const builder = await Builder.findById(req.params.id);

	res.status(200).json({
		status: 'success',
		data: {
			builder,
		},
	});
});

exports.handleImage = catchAsync(async (req, res, next) => {
	if (!req.files) {
		return next(new AppError('No image found', 400));
	} else {
		const builder = await Builder.findById(req.params.id);
		if (!builder) return next(new AppError('builder not found', 404));
		if (req.files.logo) {
			if (builder.logo) {
				fs.unlinkSync(
					path.join(__dirname, '../', 'images', 'builder_images/') +
						builder.logo
				);
			}
			let logo =
				Math.floor(10000000 + Math.random() * 90000000) +
				'-' +
				req.files.logo.name;
			await req.files.logo.mv(
				path.join(__dirname, '../', 'images', 'builder_images/') + logo
			);
			builder.logo = logo;
		}

		if (req.files.image1) {
			if (builder.image1) {
				fs.unlinkSync(
					path.join(__dirname, '../', 'images', 'builder_images/') +
						builder.image1
				);
			}
			let image1 =
				Math.floor(10000000 + Math.random() * 90000000) +
				'-' +
				req.files.image1.name;
			await req.files.image1.mv(
				path.join(__dirname, '../', 'images', 'builder_images/') +
					image1
			);
			builder.image1 = image1;
		}

		if (req.files.image2) {
			if (builder.image2) {
				fs.unlinkSync(
					path.join(__dirname, '../', 'images', 'builder_images/') +
						builder.image2
				);
			}
			let image2 =
				Math.floor(10000000 + Math.random() * 90000000) +
				'-' +
				req.files.image2.name;
			await req.files.image2.mv(
				path.join(__dirname, '../', 'images', 'builder_images/') +
					image2
			);
			builder.image2 = image2;
		}

		if (req.files.image3) {
			if (builder.image3) {
				fs.unlinkSync(
					path.join(__dirname, '../', 'images', 'builder_images/') +
						builder.image3
				);
			}
			let image3 =
				Math.floor(10000000 + Math.random() * 90000000) +
				'-' +
				req.files.image3.name;
			await req.files.image3.mv(
				path.join(__dirname, '../', 'images', 'builder_images/') +
					image3
			);
			builder.image3 = image3;
		}

		if (req.files.image4) {
			if (builder.image4) {
				fs.unlinkSync(
					path.join(__dirname, '../', 'images', 'builder_images/') +
						builder.image4
				);
			}
			let image4 =
				Math.floor(10000000 + Math.random() * 90000000) +
				'-' +
				req.files.image4.name;
			await req.files.image4.mv(
				path.join(__dirname, '../', 'images', 'builder_images/') +
					image4
			);
			builder.image4 = image4;
		}

		if (req.files.image5) {
			if (builder.image5) {
				fs.unlinkSync(
					path.join(__dirname, '../', 'images', 'builder_images/') +
						builder.image5
				);
			}
			let image5 =
				Math.floor(10000000 + Math.random() * 90000000) +
				'-' +
				req.files.image5.name;
			await req.files.image5.mv(
				path.join(__dirname, '../', 'images', 'builder_images/') +
					image5
			);
			builder.image5 = image5;
		}

		if (req.files.image6) {
			if (builder.image6) {
				fs.unlinkSync(
					path.join(__dirname, '../', 'images', 'builder_images/') +
						builder.image6
				);
			}
			let image6 =
				Math.floor(10000000 + Math.random() * 90000000) +
				'-' +
				req.files.image6.name;
			await req.files.image6.mv(
				path.join(__dirname, '../', 'images', 'builder_images/') +
					image6
			);
			builder.image6 = image6;
		}

		const builderUpdated = await builder.save();

		//send response
		res.send({
			status: 'success',
			message: 'File is uploaded',
			data: {
				builder: builderUpdated,
			},
		});
	}
});
