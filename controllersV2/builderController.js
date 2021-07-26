const Builder = require('./../models/builderModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Admin = require('../models/adminModel');

exports.addBuilder = catchAsync(async (req, res, next) => {
	const removeFieldArray = [
		'logo',
		'image1',
		'image2',
		'image3',
		'image4',
		'image5',
		'image6',
		'slug',
	];

	const admin = await Admin.findById(req.admin.id);
	if (
		!admin.builderActions.includes('create') &&
		admin.type !== 'super-admin'
	) {
		return next(new AppError('You are not authorized', 401));
	}

	let clone = { ...req.body };
	removeFieldArray.forEach((c) => {
		if (clone[c] !== null || clone[c] !== undefined) {
			delete clone[c];
		}
	});
	clone.adminId = admin.id;
	if (req.files['logo']) {
		clone.logo = req.files['logo'][0].filename;
	}
	if (req.files['photos']) {
		clone.photos = req.files['photos'].map((c) => ({ image: c.filename }));
	}
	const builder = await Builder.create(clone);

	res.status(200).json({
		status: 'success',
		data: {
			builder,
		},
	});
});
