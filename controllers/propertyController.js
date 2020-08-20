const Furnish = require('./../models/furnishingModel');
const Amenity = require('./../models/amenityModel');
const Property = require('./../models/propertyModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
var fs = require('fs');

// Furnishes
exports.addFurnish = catchAsync(async (req, res, next) => {
	let furnish = await Furnish.create({
		name: req.body.name,
		type: req.body.type,
	});

	res.status(200).json({
		status: 'success',
		data: {
			furnish,
		},
	});
});

exports.getFurnishes = catchAsync(async (req, res, next) => {
	let furnishes = await Furnish.find();

	res.status(200).json({
		status: 'success',
		count: furnishes.length,
		data: {
			furnishes,
		},
	});
});

// Amenities
exports.addAmenity = catchAsync(async (req, res, next) => {
	let amenity = await Amenity.create({
		name: req.body.name,
		type: req.body.type,
	});

	res.status(200).json({
		status: 'success',
		data: {
			amenity,
		},
	});
});

exports.getAmenities = catchAsync(async (req, res, next) => {
	let amenities = await Amenity.find();

	res.status(200).json({
		status: 'success',
		count: amenities.length,
		data: {
			amenities,
		},
	});
});

// Flats

exports.addProperty = catchAsync(async (req, res, next) => {
	if (!req.body.for) {
		return next(new AppError('parameter <for> is missing', 400));
	}
	if (!req.body.type) {
		return next(new AppError('parameter <type> is missing', 400));
	}
	if (!req.body.userId) {
		return next(new AppError('parameter <userId> is missing', 400));
	}

	let type = req.body.type;

	switch (type) {
		case 'flat':
		case 'independenthouse':
			const requiredFields = [
				'city',
				'location',
				'numberOfBedRooms',
				'toiletTypes',
				'numberOfBalconies',
				'superBuiltupArea',
				'carpetArea',
				'rent',
				'securityDeposit',
				'floor',
				'noOfFloors',
				'furnished',
				'externalAmenities',
				'distanceSchool',
				'distanceCollege',
				'distanceRailwayStation',
				'distanceAirport',
				'distanceMetroStation',
				'distanceBusStop',
				'distanceHospital',
				'distanceShoppingMall',
				'distanceBank',
				'availability',
			];
			const missingFields = [];
			requiredFields.forEach((f) => {
				if (!req.body[f]) {
					missingFields.push(f);
				}
			});
			if (missingFields.length > 0) {
				return next(
					new AppError(
						`Missing parameter <${missingFields.join(',')}>`,
						400
					)
				);
			}
			if (type == 'independenthouse' || type == 'guesthouse') {
				const floorPossibleValues = [
					'Entire Building',
					'Ground floor',
					'1st floor',
					'2nd floor',
					'3rd floor',
				];
				if (!floorPossibleValues.includes(req.body.floor)) {
					return next(
						new AppError(
							`floor should be one of these values <${floorPossibleValues.join(
								','
							)}>`,
							400
						)
					);
				}
			}
			let propertyValue = {
				for: req.body.for,
				type: req.body.type,
				city: req.body.city,
				location: req.body.location,
				numberOfBedRooms: req.body.numberOfBedRooms,
				toiletTypes: req.body.toiletTypes,
				numberOfBalconies: req.body.numberOfBalconies,
				superBuiltupArea: req.body.superBuiltupArea,
				carpetArea: req.body.carpetArea,
				rent: req.body.rent,
				securityDeposit: req.body.securityDeposit,
				floor: req.body.floor,
				noOfFloors: req.body.noOfFloors,
				furnished: req.body.furnished,
				externalAmenities: req.body.externalAmenities,
				distanceSchool: req.body.distanceSchool,
				distanceCollege: req.body.distanceCollege,
				distanceRailwayStation: req.body.distanceRailwayStation,
				distanceAirport: req.body.distanceAirport,
				distanceMetroStation: req.body.distanceMetroStation,
				distanceBusStop: req.body.distanceBusStop,
				distanceHospital: req.body.distanceHospital,
				distanceShoppingMall: req.body.distanceShoppingMall,
				distanceBank: req.body.distanceBank,
				availability: req.body.availability,
				description: req.body.description,
				userId: req.body.userId,
			};

			if (req.body.furnished !== 'unfurnished') {
				if (!req.body.furnishes) {
					return next(
						new AppError('parameter <furnishes> is missing', 400)
					);
				}
				propertyValue['furnishes'] = req.body.furnishes;
			}

			if (req.body.availability === 'specificdate') {
				if (!req.body.availableDate) {
					return next(
						new AppError(
							'parameter <availableDate> is missing',
							400
						)
					);
				}
				propertyValue['availableDate'] = req.body.availableDate;
			}
			let property = await Property.create(propertyValue);
			res.status(201).json({
				status: 'success',
				data: {
					property,
				},
			});
			break;

		default:
			res.status(400).json({
				status: 'fail',
				message: 'Not ready yet',
			});
			break;
	}
});
