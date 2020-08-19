const jwt = require('jsonwebtoken');
const Furnish = require('./../models/furnishingModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const sendOtpMessage = require('../utils/sendOtp');
const ApiFeatures = require('../utils/apiFeatures');
const path = require('path');
var fs = require('fs');

exports.addFurnish = catchAsync(async (req, res, next) => {
	let furnish = await Furnish.create({
		name: req.body.name,
	});

	res.status(200).json({
		status: 'success',
		data: {
			furnish,
		},
	});
});
