const City = require('./../models/cityModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const fs = require('fs');
const path = require('path');

const removePhoto = (req, file = null) => {
	if (file) {
		fs.unlink(
			path.join(__dirname, '../', 'images', 'city_images/') + file,
			function (err) {}
		);
	} else {
		if (req.file) {
			fs.unlink(
				path.join(__dirname, '../', 'images', 'city_images/') + file
					? file
					: req.file.filename,
				function (err) {}
			);
		}
	}
};

const addPhoto = (req) => {
	if (req.file) {
		req.body.image = req.file.filename;
	}
};

exports.addCity = catchAsync(async (req, res, next) => {
	if (!req.body.name || !req.body.state) {
		removePhoto(req);
		return next(new AppError('Please provide name and state'));
	}
	const existingDoc = await City.findOne({
		name: req.body.name.trim(),
		state: req.body.state.trim(),
	});
	if (existingDoc) {
		removePhoto(req);
		return next(new AppError('Already exists'));
	}
	addPhoto(req);
	const city = await City.create(req.body);

	res.status(200).json({
		status: 'success',
		data: {
			city,
		},
	});
});

exports.updateCity = catchAsync(async (req, res, next) => {
	if (!req.body.name && !req.body.state && !req.file) {
		removePhoto(req);
		return next(new AppError('Request body is empty'));
	}
	const existingDoc = await City.findById(req.params.id);
	if (!existingDoc) {
		return next(new AppError('City not found'));
	}
	if (req.file) {
		if (existingDoc.image) {
			removePhoto(req, existingDoc.image);
		}
	}
	addPhoto(req);
	const city = await City.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});

	res.status(200).json({
		status: 'success',
		data: {
			city,
		},
	});
});
