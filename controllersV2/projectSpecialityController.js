const AppError = require('./../utils/appError');
const ProjectSpeciality = require('./../models/projectSpeciality');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

exports.addSpeciality = catchAsync(async (req, res, next) => {
	const body = req.body;
	let speciality = await ProjectSpeciality.create(body);

	res.status(200).json({
		status: 'success',
		data: {
			speciality,
		},
	});
});

exports.getSpecialities = catchAsync(async (req, res, next) => {
	const page = req.query.page * 1 || 1;
	const limit = req.query.limit * 1 || 10;
	const skip = (page - 1) * limit;
	let filter = req.query;
	const excludeFields = ['page', 'limit'];
	excludeFields.forEach((c) => {
		if (filter[c]) {
			delete filter[c];
		}
	});

	console.log(filter);

	const totalDocs = await ProjectSpeciality.countDocuments(filter);

	const specialities = await ProjectSpeciality.find(filter)
		.sort('-createdAt')
		.skip(skip)
		.limit(limit);

	res.status(200).json({
		status: 'success',
		data: {
			specialities,
			totalDocs,
		},
	});
});
exports.getSpecialityDetails = catchAsync(async (req, res, next) => {
	const speciality = await ProjectSpeciality.findById(req.query.id);

	res.status(200).json({
		status: 'success',
		data: {
			speciality,
		},
	});
});

exports.updateSpeciality = catchAsync(async (req, res, next) => {
	const speciality = await ProjectSpeciality.findByIdAndUpdate(
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
			speciality,
		},
	});
});
