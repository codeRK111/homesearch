const jwt = require('jsonwebtoken');
const Admin = require('./../models/adminModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const sendOtpMessage = require('../utils/sendOtp');
const ApiFeatures = require('../utils/apiFeatures');
const path = require('path');
var fs = require('fs');

exports.addAdmin = catchAsync(async (req, res, next) => {
	const lastDoc = await Admin.find().sort({ _id: -1 }).limit(1);
	const lastDocSerialNumber =
		lastDoc.length === 0 ? 0 : lastDoc[0].serialNumber;

	const newAdmin = await Admin.create({
		name: req.body.name,
		username: req.body.username,
		email: req.body.email,
		serialNumber: lastDocSerialNumber + 1,
		password: req.body.password,
		cities: req.body.city,
		gender: req.body.gender,
		role: req.body.role,
		status: req.body.status,
		ableToSee: req.body.ableToSee,
		type: req.body.type,
	});

	res.status(201).json({
		status: 'success',
		data: {
			admin: newAdmin,
		},
	});
});

exports.getAllAdmins = catchAsync(async (req, res, next) => {
	const features = new ApiFeatures(Admin.find(), req.query)
		.filter()
		.sort()
		.limit()
		.pagination();
	// const doc = await features.query.explain();
	const doc = await features.queryForDocument;
	res.status(200).json({
		status: 'success',
		data: {
			admins: doc,
		},
	});
});

exports.addProfilePicture = catchAsync(async (req, res, next) => {
	if (!req.files) {
		return next(new AppError('No image found', 400));
	} else {
		//Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
		let image = req.files.image;
		// console.log('-----', path.join(__dirname, images, profile_images));

		//Use the mv() method to place the file in upload directory (i.e. "uploads")
		let imageName =
			Math.floor(10000000 + Math.random() * 90000000) + '-' + image.name;

		let admin = await Admin.findById(req.params.id);
		if (!admin) {
			return next(new AppError('Admin not found', 404));
		}

		if (admin.photo) {
			fs.unlinkSync(
				path.join(__dirname, '../', 'images', 'profile_images/') +
					admin.photo
			);
		}

		await image.mv(
			path.join(__dirname, '../', 'images', 'profile_images/') + imageName
		);

		admin.photo = imageName;
		admin.photoStatus = 'uploaded';
		const updatedAdmin = await admin.save();
		if (!updatedAdmin) {
			fs.unlinkSync(
				path.join(__dirname, '../', 'images', 'profile_images/') +
					imageName
			);
			return next(new AppError('Unable set image  '), 500);
		}

		//send response
		res.send({
			status: true,
			message: 'File is uploaded',
			data: {
				name: image.name,
				mimetype: image.mimetype,
				size: image.size,
				user: updatedAdmin,
			},
		});
	}
});

exports.updateAdmin = catchAsync(async (req, res, next) => {
	const doc = await Admin.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});

	if (!doc) {
		return next(new AppError('No document found with that ID', 404));
	}

	res.status(200).json({
		status: 'success',
		data: {
			admin: doc,
		},
	});
});
