const BuilderPackage = require('./../models/builderPackageModel');
const PropertyPackage = require('./../models/propertyPackageModel');
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
		const packages = await PropertyPackage.find();
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
