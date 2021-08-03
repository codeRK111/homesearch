const LikedProperty = require('./../models/likedPropertyModel');
const SavedProperty = require('./../models/savedPropertyModel');
const Property = require('./../models/propertyModel');
const Builder = require('./../models/builderModel');
const Amenity = require('./../models/amenityModel');
const Furnish = require('./../models/furnishingModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const mongoose = require('mongoose');

exports.getPageInfo = catchAsync(async (req, res, next) => {
	const postPropertyCount = await Property.count({
		userId: mongoose.Types.ObjectId(req.user._id),
	});
	const postPropertyActiveCount = await Property.count({
		userId: mongoose.Types.ObjectId(req.user._id),
		status: 'active',
	});
	const postPropertyUnderScreeningCount = await Property.count({
		userId: mongoose.Types.ObjectId(req.user._id),
		status: 'underScreening',
	});
	const postPropertyExpiredCount = await Property.count({
		userId: mongoose.Types.ObjectId(req.user._id),
		status: 'expired',
	});
	const savedPropertyCount = await SavedProperty.count({
		user: mongoose.Types.ObjectId(req.user._id),
	});
	const likedPropertyCount = await LikedProperty.count({
		user: mongoose.Types.ObjectId(req.user._id),
	});

	res.status(200).json({
		status: 'success',
		data: {
			postPropertyCount,
			postPropertyActiveCount,
			postPropertyUnderScreeningCount,
			postPropertyExpiredCount,
			savedPropertyCount,
			likedPropertyCount,
		},
	});
});

// Admin
exports.getAddProjectPageInfo = catchAsync(async (req, res, next) => {
	const builders = await Builder.find({ status: 'active' });
	const amenities = await Amenity.find();
	const furnishes = await Furnish.find();
	const legalClearances = [
		{
			name: 'approvalOfBuilding',
			value: false,
			label: 'Approval of building',
		},
		{
			name: 'nocFromFireDepts',
			value: false,
			label: 'NOC from Fire depts',
		},
		{
			name: 'electricityConnUse',
			value: false,
			label: 'Electricity Connection use',
		},
		{
			name: 'StructuralStatbilityCertificate',
			value: false,
			label: 'Structural stability certificate',
		},
		{
			name: 'nocFromPollutionDepts',
			value: false,
			label: 'NOC from Pollution deptt',
		},
		{
			name: 'functionalCertificate',
			value: false,
			label: 'Occupation / functional certificate',
		},
		{
			name: 'holdingTax',
			value: false,
			label: 'Municipal /Holding Tax',
		},
		{
			name: 'completionCertificate',
			value: false,
			label: 'Completion Certificate',
		},
		{
			name: 'reraapproved',
			value: false,
			label: 'RERA Approved',
		},
	];
	const legalClearancesForLand = [
		{
			name: 'numberOfOwner',
			value: false,
			label: 'Number of owner',
		},
		{
			name: 'withinBlockArea',
			value: false,
			label: 'Within Block Area',
		},
		{
			name: 'approvedByDevelopmentAutority',
			value: false,
			label: 'Approved by Development Authority',
		},
		{
			name: 'withinAreaOfDevelopmentAuthrity',
			value: false,
			label: 'Within Area of Development Authority',
		},
	];

	res.status(200).json({
		status: 'success',
		data: {
			builders,
			amenities,
			furnishes,
			legalClearancesForLand,
			legalClearances,
		},
	});
});
