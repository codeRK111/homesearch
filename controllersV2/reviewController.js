const Review = require('../models/propertyReviewModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const mongoose = require('mongoose');

exports.addReview = catchAsync(async (req, res, next) => {
	if (!req.body.propertyType) {
		return next(new AppError('propertyType missing'));
	}
	if (!req.body.message) {
		return next(new AppError('message missing'));
	}

	if (req.body.propertyType === 'project') {
		if (!req.body.project) {
			return next(new AppError('project missing'));
		}
	} else if (req.body.propertyType === 'property') {
		if (!req.body.property) {
			return next(new AppError('property missing'));
		}
	} else {
		return next(new AppError('Inavlid propertyType'));
	}

	if (req.body.status) {
		if (req.user.id) {
			delete req.body.status;
		}
	}

	req.body.user = req.user.id;

	const review = await Review.create(req.body);
	res.status(200).json({
		status: 'success',
		data: {
			review,
		},
	});
});

exports.getReviews = catchAsync(async (req, res, next) => {
	const filter = {};
	const page = req.query.page * 1 || 1;
	const limit = req.query.limit * 1 || 10;
	const skip = (page - 1) * limit;

	if (req.user) {
		filter.user = req.user.id;
	}

	if (req.admin.id) {
		if (req.query.status) {
			filter.status = req.query.status;
		}
		if (req.query.pFor) {
			filter.pFor = req.query.pFor;
		}
		if (req.query.project) {
			filter.project = req.query.project;
		}
		if (req.query.property) {
			filter.property = req.query.property;
		}
		if (req.query.propertyItemType) {
			filter.propertyItemType = req.query.propertyItemType;
		}
		if (
			req.query.top === true ||
			req.query.top === 'true' ||
			req.query.top === 1
		) {
			filter.top = true;
		} else if (
			req.query.top === false ||
			req.query.top === 'false' ||
			req.query.top === 0
		) {
			if (filter.top) {
				delete filter.top;
			}
		} else {
			if (filter.top) {
				delete filter.top;
			}
		}
	} else {
		filter.status = 'active';
	}

	console.log(filter);

	const totalDocs = await Review.countDocuments(filter);
	const reviews = await Review.find(filter)
		.sort('-createdAt')
		.skip(skip)
		.limit(limit);
	res.status(200).json({
		status: 'success',
		data: {
			totalDocs,
			reviews,
		},
	});
});
exports.getReviewsOfAProperty = catchAsync(async (req, res, next) => {
	// console.log(query: req.query);
	const filter = {
		status: 'active',
	};
	const page = req.query.page * 1 || 1;
	const limit = req.query.limit * 1 || 10;
	const skip = (page - 1) * limit;

	if (req.query.propertyType === 'project') {
		filter.project = req.params.id;
	} else if (req.query.propertyType === 'property') {
		filter.property = req.params.id;
	} else {
		return next(new AppError('Inavlid propertyType'));
	}

	const totalDocs = await Review.countDocuments(filter);
	const reviews = await Review.find(filter)
		.sort({ top: -1, updatedAt: -1 })
		.skip(skip)
		.limit(limit);
	res.status(200).json({
		status: 'success',
		data: {
			totalDocs,
			reviews,
		},
	});
});

exports.updateReview = catchAsync(async (req, res, next) => {
	const data = {};
	if (req.body.status) {
		data.status = req.body.status;
	}
	if (req.body.top !== null && req.body.top !== undefined) {
		data.top = req.body.top;
	}

	const review = await Review.findByIdAndUpdate(req.params.id, data, {
		new: true,
		runValidators: true,
	});
	res.status(200).json({
		status: 'success',
		data: {
			review,
		},
	});
});
