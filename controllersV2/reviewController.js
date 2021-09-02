const Review = require('../models/propertyReviewModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

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

	if (req.user.id) {
		filter.user = req.user.id;
	}

	if (req.admin.id) {
		if (req.query.status) {
			filter.status = req.query.status;
		}
		if (req.query.pFor) {
			filter.pFor = req.query.pFor;
		}
		if (req.query.propertyItemType) {
			filter.propertyItemType = req.query.propertyItemType;
		}
	} else {
		filter.status = 'active';
	}

	const reviews = await Review.find(filter)
		.sort('-createdAt')
		.skip(skip)
		.limit(limit);
	res.status(200).json({
		status: 'success',
		data: {
			reviews,
		},
	});
});

exports.updateReview = catchAsync(async (req, res, next) => {
	if (!req.body.status) {
		return next(new AppError('status missing'));
	}
	const review = await Review.findByIdAndUpdate(
		req.params.id,
		{
			status: req.body.status,
		},
		{
			new: true,
			runValidators: true,
		}
	);
	res.status(200).json({
		status: 'success',
		data: {
			review,
		},
	});
});
