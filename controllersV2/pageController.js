const LikedProperty = require('./../models/likedPropertyModel');
const SavedProperty = require('./../models/savedPropertyModel');
const Property = require('./../models/propertyModel');
const Builder = require('./../models/builderModel');
const Admin = require('./../models/adminModel');
const Project = require('./../models/projectModule');
const Amenity = require('./../models/amenityModel');
const Furnish = require('./../models/furnishingModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const mongoose = require('mongoose');
const Leads = require('./../models/leadsModel');

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
exports.getAddPropertyPageInfo = catchAsync(async (req, res, next) => {
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
			amenities,
			furnishes,
			legalClearancesForLand,
			legalClearances,
		},
	});
});

exports.addAgent = catchAsync(async (req, res, next) => {
	const admins = await Admin.find({
		status: 'active',
		type: 'clientSupport',
	});
	const projects = await Project.find({ status: 'active' });
	res.status(200).json({
		status: 'success',
		data: {
			admins,
			projects,
		},
	});
});

exports.workspaceDashboard = catchAsync(async (req, res, next) => {
	if (req.admin.type === 'gm') {
		const totalLeads = await Leads.countDocuments({
			status: 'active',
		});
		const newLeads = await Leads.countDocuments({
			status: 'active',
			stage: 0,
		});
		const activeLeads = await Leads.countDocuments({
			status: 'active',
			stage: { $ne: 0 },
		});
		const clientSupportLeads = await Leads.countDocuments({
			status: 'active',
			stage: { $in: [1, 2] },
		});
		const bdmLeads = await Leads.countDocuments({
			status: 'active',
			stage: 3,
		});
		const holdLeads = await Leads.countDocuments({
			status: 'active',
			stage: 2,
		});

		res.status(200).json({
			status: 'success',
			data: {
				totalLeads,
				newLeads,
				activeLeads,
				clientSupportLeads,
				bdmLeads,
				holdLeads,
			},
		});
	} else if (req.admin.type === 'clientSupport') {
		const totalLeads = await Leads.countDocuments({
			status: 'active',
			clientSupport: req.admin.id,
		});

		const activeLeads = await Leads.countDocuments({
			status: 'active',
			clientSupport: req.admin.id,
			stage: { $in: [1, 2] },
		});
		const holdLeads = await Leads.countDocuments({
			status: 'active',
			clientSupport: req.admin.id,
			stage: 2,
		});
		const forwardedLeads = await Leads.countDocuments({
			status: 'active',
			clientSupport: req.admin.id,
			stage: 3,
		});

		res.status(200).json({
			status: 'success',
			data: {
				totalLeads,
				activeLeads,
				holdLeads,
				forwardedLeads,
			},
		});
	} else if (req.admin.type === 'bdm') {
		const totalLeads = await Leads.countDocuments({
			status: 'active',
			bdm: req.admin.id,
		});

		res.status(200).json({
			status: 'success',
			data: {
				totalLeads,
			},
		});
	} else {
		return next(new AppError('Invalid user'));
	}
});
