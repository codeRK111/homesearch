const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const oId = mongoose.Types.ObjectId;

const handleUserPhoto = (req, data, existingUser) => {
	if (req.file) {
		if (existingUser.photo) {
			fs.unlink(
				path.join(__dirname, '../', 'images', 'profile_images/') +
					existingUser.photo,
				function (err) {}
			);
		}

		data.photo = req.file.filename;
	}
};

exports.getUsers = catchAsync(async (req, res) => {
	const filter = {};
	const page = req.body.page * 1 || 1;
	const limit = req.body.limit * 1 || 10;
	const skip = (page - 1) * limit;

	if (req.body.name) {
		filter.name = { $regex: req.body.name, $options: 'i' };
	}
	if (req.body.email) {
		filter.email = { $regex: req.body.email, $options: 'i' };
	}
	if (req.body.number) {
		filter.number = { $regex: req.body.number, $options: 'i' };
	}
	if (req.body.role) {
		filter.role = { $in: req.body.role };
	}
	if (req.body.status) {
		filter.status = req.body.status;
	}

	const totalDocs = await User.countDocuments(filter);

	const users = await User.find(filter)
		.sort('-createdAt')
		.skip(skip)
		.limit(limit);

	res.status(200).json({
		status: 'success',
		data: {
			users,
			totalDocs,
		},
	});
});
exports.getRealtors = catchAsync(async (req, res) => {
	const filter = { status: 'active', role: 'agent' };
	const page = req.body.page * 1 || 1;
	const limit = req.body.limit * 1 || 10;
	const skip = (page - 1) * limit;

	if (req.body.city) {
		filter.cities = req.body.city;
	}

	const totalDocs = await User.countDocuments(filter);

	const users = await User.find(filter)
		.sort('-createdAt')
		.skip(skip)
		.limit(limit);

	res.status(200).json({
		status: 'success',
		data: {
			realtors: users,
			totalDocs,
		},
	});
});
exports.getRealtorsNew = catchAsync(async (req, res) => {
	const page = req.body.page * 1 || 1;
	const limit = req.body.limit * 1 || 10;
	const skip = (page - 1) * limit;
	const filter = {
		status: 'active',
		role: 'agent',
	};
	const cityFilter = {};
	if (req.body.city) {
		cityFilter['has'] = true;
	}
	const users = await User.aggregate([
		{
			$match: filter,
		},
		{
			$project: {
				name: 1,
				number: 1,
				email: 1,
				city: 1,
				hsID: 1,
				cities: { $ifNull: ['$cities', []] },
				photo: 1,
				companyName: 1,
				address: 1,
			},
		},
		{
			$addFields: {
				has: { $in: [oId(req.body.city), '$cities'] },
			},
		},
		{
			$match: cityFilter,
		},

		{
			$lookup: {
				from: 'cities',
				localField: 'cities',
				foreignField: '_id',
				as: 'cities',
			},
		},
		{
			$lookup: {
				from: 'properties',
				let: { user_id: '$_id' },
				as: 'properties',
				pipeline: [
					{
						$match: {
							$expr: {
								$and: [
									{ $eq: ['$userId', '$$user_id'] },
									{ $eq: ['$status', 'active'] },
								],
							},
						},
					},
				],
			},
		},
		{
			$project: {
				name: 1,
				number: 1,
				email: 1,
				city: 1,
				hsID: 1,
				cities: 1,
				photo: 1,
				companyName: 1,
				address: 1,
				has: 1,
				propertyCount: { $size: '$properties' },
			},
		},
		{
			$skip: skip,
		},
		{
			$limit: limit,
		},
	]);

	res.status(200).json({
		status: 'success',
		data: {
			realtors: users,
		},
	});
	console.log('Do this stuff');
});
exports.getRealtorDetails = catchAsync(async (req, res) => {
	const filter = { status: 'active', role: 'agent', _id: req.params.id };

	const realtor = await User.findOne(filter);
	if (!realtor) {
		return next(new AppError('Realtor not found', 404));
	}

	res.status(200).json({
		status: 'success',
		data: realtor,
	});
});
exports.updateUser = catchAsync(async (req, res, next) => {
	const existingUser = await User.findById(req.params.id);
	if (!existingUser) {
		return next(new AppError('User not found', 404));
	}
	const data = req.body;
	handleUserPhoto(req, data, existingUser);

	const user = await User.findByIdAndUpdate(req.params.id, data, {
		new: true,
		runValidators: true,
	});

	res.status(200).json({
		status: 'success',
		data: {
			user,
		},
	});
});
exports.updateMyProfile = catchAsync(async (req, res, next) => {
	const existingUser = await User.findById(req.params.id);
	if (!existingUser) {
		return next(new AppError('User not found', 404));
	}
	const data = req.body;
	const excludeFields = [
		'hsID',
		'number',
		'city',
		'otp',
		'otpExpiresAt',
		'createdAt',
		'status',
		'registerThrough',
		'adminId',
		'createdBy',
		'registerVia',
		'paymentStatus',
		'numberVerified',
	];
	excludeFields.forEach((c) => {
		if (data[c]) {
			delete data[c];
		}
	});
	handleUserPhoto(req, data, existingUser);

	const user = await User.findByIdAndUpdate(req.params.id, data, {
		new: true,
		runValidators: true,
	});

	res.status(200).json({
		status: 'success',
		data: {
			user,
		},
	});
});

exports.addUser = catchAsync(async (req, res) => {
	const data = {
		...req.body,
		registerVia: req.body.registerVia ? req.body.registerVia : 'web',
		registerThrough: 'admin',
		mobileStatus: 'semi-private',
		adminId: req.admin._id,
	};
	// console.log(data);
	if (req.file) {
		data.photo = req.file.filename;
	}
	const user = await User.create(data);

	res.status(200).json({
		status: 'success',
		data: {
			user,
		},
	});
});
