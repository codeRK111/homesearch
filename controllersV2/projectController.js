const AppError = require('./../utils/appError');
const ProjectSpeciality = require('./../models/projectSpeciality');
const ProjectProperty = require('./../models/projectPropertyModule');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

exports.properties = catchAsync(async (req, res, next) => {
	const match = {
		status: 'active',
		project: ObjectId(req.body.project),
	};
	if (req.body.type === 'type') {
		match.speciality = { $ne: null };
	}
	const aggregationArray = [
		{
			$match: match,
		},
		{
			$unwind: {
				path: '$floorPlans',
				preserveNullAndEmptyArrays: true,
			},
		},
	];

	if (req.body.type === 'unit') {
		aggregationArray.push({
			$sort: { numberOfUnits: -1 },
		});
	}
	if (req.body.type === 'bhk') {
		aggregationArray.push({
			$sort: { numberOfBedrooms: -1 },
		});
	}

	console.log(aggregationArray);

	ProjectProperty.aggregate(aggregationArray).exec(function (err, projectes) {
		if (err) {
			return next(new AppError('Unable to fetch', 55));
		}
		ProjectSpeciality.populate(
			projectes,
			{ path: 'speciality' },
			function (err, sps) {
				if (err) {
					return next(new AppError('Unable to fetch', 55));
				}
				res.status(200).json({
					status: 'success',
					data: {
						properties: sps,
					},
				});
			}
		);
	});
});
