const BuilderPackage = require('./../models/builderPackageModel');
const PropertyPackage = require('./../models/propertyPackageModel');
const Subscription = require('./../models/subscriptionModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');

exports.addBuilderPackages = catchAsync(async (req, res, next) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			if (req.file) {
				fs.unlinkSync(
					path.join(
						__dirname,
						'../',
						'images',
						'builder_images',
						'packages',
						req.file.filename
					)
				);
			}
			return res
				.status(422)
				.json({ status: 'fail', errors: errors.array() });
		}

		const data = {
			name: req.body.name,
			price: req.body.price,
			packageDetails: JSON.parse(req.body.packageDetails),
		};
		if (req.file) data.photo = req.file.filename;
		const package = await BuilderPackage.create(data);
		res.status(200).json({
			status: 'success',
			data: {
				package,
			},
		});
	} catch (error) {
		if (req.file) {
			fs.unlinkSync(
				path.join(
					__dirname,
					'../',
					'images',
					'builder_images',
					'packages',
					req.file.filename
				)
			);
		}
		if (error.code === 11000) {
			const value = error.message.match(/(["'])(\\?.)*?\1/)[0];

			const message = `${value} already there!`;
			return next(new AppError(message, 400));
		} else {
			return next(new AppError(error.message, 500));
		}
	}
});
exports.addPropertyPackages = catchAsync(async (req, res, next) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res
				.status(422)
				.json({ status: 'fail', errors: errors.array() });
		}

		const data = {
			name: req.body.name,
			price: req.body.price,
			expiresAt: req.body.expiresAt,
			packageDetails: req.body.packageDetails,
		};
		const package = await PropertyPackage.create(data);
		res.status(200).json({
			status: 'success',
			data: {
				package,
			},
		});
	} catch (error) {
		if (error.code === 11000) {
			const value = error.message.match(/(["'])(\\?.)*?\1/)[0];
			const message = `${value} already there!`;
			return next(new AppError(message, 400));
		} else {
			return next(new AppError(error.message, 500));
		}
	}
});

exports.getBuilderPackages = catchAsync(async (req, res, next) => {
	try {
		const packages = await BuilderPackage.find();
		res.status(200).json({
			status: 'success',
			data: {
				packages,
			},
		});
	} catch (error) {
		return next(new AppError(error.message, 500));
	}
});
exports.getPropertyPackages = catchAsync(async (req, res, next) => {
	try {
		const packages = await PropertyPackage.find().select('+expiresAt');
		res.status(200).json({
			status: 'success',
			data: {
				packages,
			},
		});
	} catch (error) {
		return next(new AppError(error.message, 500));
	}
});
exports.updatePropertyPackage = catchAsync(async (req, res, next) => {
	try {
		const package = await PropertyPackage.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
				select: 'expiresAt',
			}
		);
		res.status(200).json({
			status: 'success',
			data: {
				package,
			},
		});
	} catch (error) {
		return next(new AppError(error.message, 500));
	}
});

exports.createPackage = catchAsync(async (req, res, next) => {
	try {
		const package = await PropertyPackage.create(req.body);
		res.status(201).json({
			status: 'success',
			data: {
				package,
			},
		});
	} catch (error) {
		return next(new AppError(error.message, 500));
	}
});
exports.getPackages = catchAsync(async (req, res, next) => {
	try {
		const packages = await PropertyPackage.find();
		res.status(201).json({
			status: 'success',
			data: {
				packages,
			},
		});
	} catch (error) {
		return next(new AppError(error.message, 500));
	}
});
exports.getActivePackages = catchAsync(async (req, res, next) => {
	try {
		const packages = await PropertyPackage.find({ status: 'active' });
		res.status(200).json({
			status: 'success',
			data: {
				packages,
			},
		});
	} catch (error) {
		return next(new AppError(error.message, 500));
	}
});

exports.getPackageDetails = catchAsync(async (req, res, next) => {
	try {
		const package = await PropertyPackage.findById(req.params.id);
		res.status(201).json({
			status: 'success',
			data: {
				package,
			},
		});
	} catch (error) {
		return next(new AppError(error.message, 500));
	}
});
exports.getActivePackageDetails = catchAsync(async (req, res, next) => {
	try {
		const package = await PropertyPackage.findOne({
			_id: req.params.id,
			status: 'active',
		});
		res.status(201).json({
			status: 'success',
			data: {
				package,
			},
		});
	} catch (error) {
		return next(new AppError(error.message, 500));
	}
});

exports.updatePackageDetails = catchAsync(async (req, res, next) => {
	try {
		const package = await PropertyPackage.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ runValidators: true, new: true }
		);
		res.status(201).json({
			status: 'success',
			data: {
				package,
			},
		});
	} catch (error) {
		return next(new AppError(error.message, 500));
	}
});
exports.setMostPopularPackage = catchAsync(async (req, res, next) => {
	try {
		const package = await PropertyPackage.findByIdAndUpdate(
			req.params.id,
			{ mostPopular: req.body.mostPopular },
			{ runValidators: true, new: true }
		);
		await PropertyPackage.updateMany(
			{
				_id: { $ne: req.params.id },
			},
			{ mostPopular: false }
		);
		res.status(201).json({
			status: 'success',
			data: package,
		});
	} catch (error) {
		return next(new AppError(error.message, 500));
	}
});

exports.getMySubscriptions = catchAsync(async (req, res, next) => {
	const myPackages = await Subscription.find({ user: req.user.id });
	res.json({
		status: 'success',
		data: {
			packages: myPackages,
		},
	});
});
