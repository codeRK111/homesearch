const AppError = require('./../utils/appError');
const Testimonial = require('./../models/testimonilModel');
const catchAsync = require('./../utils/catchAsync');
const fs = require('fs');
const path = require('path');

function deleteFile(file, callback) {
	const imagePath =
		path.join(__dirname, '../', 'images', 'testimonial_images/') + file;
	fs.unlink(imagePath, callback);
}

exports.addTestimonial = catchAsync(async (req, res, next) => {
	const requiredFields = ['name', 'description'];
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

	const excludeFields = ['status', 'createdAt'];
	excludeFields.forEach((c) => {
		if (req.body[c] !== null && req.body[c] !== undefined) {
			delete req.body[c];
		}
	});
	if (req.file) {
		req.body.photo = req.file.filename;
	}
	const lead = await Testimonial.create(req.body);

	res.status(200).json({
		status: 'success',
		data: lead,
	});
});

exports.getTestimonials = catchAsync(async (req, res, next) => {
	const filter = {};
	const page = req.query.page * 1 || 1;
	const limit = req.query.limit * 1 || 10;
	const skip = (page - 1) * limit;

	if (req.query.status) {
		filter.status = req.query.status;
	}

	const totalDocs = await Testimonial.countDocuments(filter);

	const testimonials = await Testimonial.find(filter)
		.sort('-createdAt')
		.skip(skip)
		.limit(limit);
	res.status(200).json({
		status: 'success',
		data: { testimonials, totalDocs },
	});
});

exports.updateTestimonial = catchAsync(async (req, res, next) => {
	const strategy = await Testimonial.findById(req.params.id);
	if (!strategy) {
		if (req.file) {
			deleteFile(req.file.filename, function (err) {});
		}
		return next(new AppError('Testinomial not found'));
	}

	const requiredFields = ['name', 'description', 'status'];

	requiredFields.forEach((c) => {
		if (req.body[c]) {
			strategy[c] = req.body[c];
		}
	});
	if (req.file) {
		if (strategy.photo) {
			deleteFile(strategy.photo, function (err) {});
		}
		strategy.photo = req.file.filename;
	}

	await strategy.save();

	res.status(200).json({
		status: 'success',
		data: strategy,
	});
});
exports.deleteTestimonial = catchAsync(async (req, res, next) => {
	const strategy = await Testimonial.findById(req.params.id);
	if (!strategy) {
		return next(new AppError('Testimonial not found'));
	}

	await Testimonial.findByIdAndRemove(req.params.id);

	res.status(200).json({
		status: 'success',
		data: null,
	});
});
