// const crypto = require('crypto');
// const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const City = require('./../models/cityModel');
const Property = require('../models/propertyModel');
const Location = require('./../models/locationModel');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const sendOtpMessage = require('../utils/sendOtp');
const ApiFeatures = require('../utils/apiFeatures');
// const sendEmail = require('./../utils/email');

exports.getAllCities = catchAsync(async (req, res, next) => {
	const features = new ApiFeatures(City.find(), req.query)
		.filter()
		.sort()
		.limit()
		.pagination();
	// const doc = await features.query.explain();
	const doc = await features.queryForDocument;
	res.status(200).json({
		status: 'success',
		data: {
			users: doc,
		},
	});
});

exports.getAllStates = catchAsync(async (req, res, next) => {
	const states = await City.distinct('state');
	res.status(200).json({
		status: 'success',
		data: {
			states,
		},
	});
});

exports.getCitiesOfAState = catchAsync(async (req, res, next) => {
	const cities = await City.find({ state: req.params.name }).sort('name');
	res.status(200).json({
		status: 'success',
		count: cities.length,
		data: {
			cities,
		},
	});
});

exports.addCity = catchAsync(async (req, res, next) => {
	const existingCity = await City.findOne({
		state: req.body.state,
		name: req.body.name,
	});
	if (existingCity) {
		return next(
			new AppError(
				`City ${req.body.name} of state ${req.body.state} already exists`,
				400
			)
		);
	}
	const newCity = await City.create({
		name: req.body.name,
		state: req.body.state,
	});

	res.status(201).json(newCity);
});

exports.getCity = catchAsync(async (req, res, next) => {
	const city = await City.findById(req.params.id);

	res.status(200).json({
		status: 'success',
		data: { city },
	});
});

exports.searchCity = catchAsync(async (req, res, next) => {
	if (!req.body.name)
		return next(new AppError('Parameter name not found', 400));
	const cities = await City.find({
		name: { $regex: req.body.name, $options: 'i' },
	});

	res.status(200).json({
		status: 'success',
		data: { cities },
	});
});

exports.searchLocation = catchAsync(async (req, res, next) => {
	if (req.body.name === null || req.body.name === undefined)
		return next(new AppError('Parameter name not found', 400));
	const locations = await Location.find({
		name: { $regex: req.body.name, $options: 'i' },
		city: req.body.city,
	});

	res.status(200).json({
		status: 'success',
		data: { locations },
	});
});

exports.updateCity = catchAsync(async (req, res, next) => {
	if (!req.body.name || !req.body.state) {
		return next(new AppError('name and state required'), 400);
	}

	const cityExist = await City.findOne({
		name: req.body.name,
		state: req.body.state,
	});
	if (cityExist) {
		return next(new AppError('City already exists'), 400);
	}

	const city = await City.findByIdAndUpdate(
		req.params.id,
		{
			name: req.body.name,
			state: req.body.state,
		},
		{
			runValidators: true,
			new: true,
		}
	);
	if (!city) return next(new AppError('city not found', 404));
	res.status(200).json({
		status: 'success',
		data: {
			city,
		},
	});
});

exports.deleteCity = catchAsync(async (req, res, next) => {
	const property = await Property.findOne({ city: req.params.id });
	if (property) {
		return next(
			new AppError('Cannot delete as it is used in some properties'),
			400
		);
	}

	const locationIsExist = await Location.findOne({ city: req.params.id });
	if (locationIsExist) {
		return next(
			new AppError('Cannot delete as it is used in some locations'),
			400
		);
	}

	const city = await City.findByIdAndDelete(req.params.id);
	res.status(202).json({
		status: 'success',
		data: {
			city,
		},
	});
});

exports.cityDependencies = catchAsync(async (req, res, next) => {
	const propertiesCount = await Property.count({ city: req.params.id });

	const locationsCount = await Location.count({ city: req.params.id });

	const usersCount = await User.count({ city: req.params.id });

	res.status(202).json({
		status: 'success',
		data: {
			propertiesCount,
			locationsCount,
			usersCount,
			secureDelete: !propertiesCount && !locationsCount && !usersCount,
		},
	});
});

exports.addLocation = catchAsync(async (req, res, next) => {
	const existingLocation = await Location.findOne({
		name: req.body.name,
		city: req.body.city,
	});

	if (existingLocation) {
		return next(new AppError('Already exists'), 400);
	}

	const location = await Location.create({
		name: req.body.name,
		city: req.body.city,
	});

	res.status(201).json({
		status: 'success',
		data: {
			location,
		},
	});
});

exports.getLocation = catchAsync(async (req, res, next) => {
	const location = await Location.findById(req.params.id);
	if (!location) return next(new AppError('Location not found', 404));

	res.status(200).json({
		status: 'success',
		data: { location },
	});
});

exports.getLocations = catchAsync(async (req, res, next) => {
	const locations = await Location.find({
		city: req.params.cityId,
	}).sort('name');

	res.status(201).json({
		status: 'success',
		data: {
			locations,
		},
	});
});

exports.locationDependencies = catchAsync(async (req, res, next) => {
	const propertiesCount = await Property.count({ location: req.params.id });

	res.status(202).json({
		status: 'success',
		data: {
			propertiesCount,
			secureDelete: !propertiesCount,
		},
	});
});

exports.updateLocation = catchAsync(async (req, res, next) => {
	if (!req.body.name || !req.body.city) {
		return next(new AppError('name and city required'), 400);
	}
	const locationIsExist = await Location.findOne({
		name: req.body.name,
		city: req.body.city,
	});
	if (locationIsExist) {
		return next(new AppError('Location already exists'), 400);
	}

	const location = await Location.findByIdAndUpdate(
		req.params.id,
		{
			name: req.body.name,
			city: req.body.city,
		},
		{
			runValidators: true,
			new: true,
		}
	);

	if (!location) return next(new AppError('location not found', 404));
	res.status(200).json({
		status: 'success',
		data: {
			location,
		},
	});
});

exports.deleteLocation = catchAsync(async (req, res, next) => {
	const property = await Property.find({ location: req.params.id });
	if (property.length > 0) {
		return next(
			new AppError('Cannot delete as it is used in some properties'),
			400
		);
	}

	const location = await Location.findByIdAndDelete(req.params.id);
	res.status(202).json({
		status: 'success',
		data: {
			location,
		},
	});
});
