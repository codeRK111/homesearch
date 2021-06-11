const Builder = require('./../models/builderModel');
const City = require('./../models/cityModel');
const Property = require('../models/propertyModel');
const Project = require('./../models/projectModule');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const User = require('./../models/userModel');
const ApiFeatures = require('../utils/apiFeatures');
const path = require('path');
const fs = require('fs');
const Admin = require('../models/adminModel');
const mongoose = require('mongoose');

exports.getHomePage = catchAsync(async (req, res, next) => {
	const cities = await City.aggregate([
		{
			$limit: 10,
		},
	]);
	const rentProperties = await Property.find({ for: 'rent' })
		.sort('-createdAt')
		.limit(3);
	const saleProperties = await Property.find({ for: 'sale' })
		.sort('-createdAt')
		.limit(3);
	const builders = await Builder.find().sort('-createdAt').limit(3);
	const userCounts = await User.countDocuments();
	const propertyCounts = await Property.countDocuments();
	const citiesCounts = await City.countDocuments();

	res.status(200).json({
		status: 'success',
		data: {
			cities,
			rentProperties,
			saleProperties,
			builders,
			counts: {
				userCounts,
				propertyCounts,
				citiesCounts,
			},
		},
	});
});
