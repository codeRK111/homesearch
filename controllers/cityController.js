// const crypto = require('crypto');
// const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const City = require('./../models/cityModel');
const Location = require('./../models/locationModel');
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
	const cities = await City.find({ state: req.params.name });
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

exports.addLocation = catchAsync(async (req, res, next) => {
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

exports.getLocations = catchAsync(async (req, res, next) => {
	const locations = await Location.find({
		city: req.params.cityId,
	});

	res.status(201).json({
		status: 'success',
		data: {
			locations,
		},
	});
});
