const Utility = require('./../models/utilityModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const { validationResult } = require('express-validator');

exports.addBuilderPackages = catchAsync(async (req, res, next) => {
	try {
		const nameExists = await Utility.findOne({
			'builderPackages.name': req.body.name,
		});
		if (nameExists) {
			return next(
				new AppError('Package with same name already exists', 400)
			);
		}
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res
				.status(422)
				.json({ status: 'fail', errors: errors.array() });
		}
		const packages = await Utility.findOneAndUpdate(
			{},
			{ $push: { builderPackages: req.body } },
			{ upsert: true, new: true, setDefaultsOnInsert: true }
		);
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

exports.updateBuilderPackages = catchAsync(async (req, res, next) => {
	try {
		const nameExists = await Utility.findOne({
			'builderPackages.name': req.body.name,
		});
		if (nameExists) {
			return next(
				new AppError('Package with same name already exists', 400)
			);
		}
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res
				.status(422)
				.json({ status: 'fail', errors: errors.array() });
		}
		const packages = await Utility.findOneAndUpdate(
			{},
			{ $push: { builderPackages: req.body } },
			{ setDefaultsOnInsert: true }
		);
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
