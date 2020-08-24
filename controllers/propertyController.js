const Furnish = require('./../models/furnishingModel');
const Amenity = require('./../models/amenityModel');
const Property = require('./../models/propertyModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
var fs = require('fs');
const path = require('path');

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
		case 'guesthouse':
			const requiredFields = [
				'city',
				'location',
				'title',
				'numberOfBedRooms',
				'toiletTypes',
				'numberOfBalconies',
				'superBuiltupArea',
				'carpetArea',
				'rent',
				'securityDeposit',
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
				if (req.body[f] == null || req.body[f] == undefined) {
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
				title: req.body.title,
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
				adminId: req.user.id,
				createdBy: 'admin',
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

		case 'hostel':
		case 'pg':
			const requiredHostelFields = [
				'city',
				'location',
				'title',
				'numberOfRoomMates',
				'typeOfToilets',
				'toiletTypes',
				'rent',
				'securityDeposit',
				'noticePeriod',
				'furnished',
				'fooding',
				'foodSchedule',
				'otherAmenties',
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
			const missingHostelFields = [];
			requiredHostelFields.forEach((f) => {
				if (!req.body[f]) {
					missingHostelFields.push(f);
				}
			});
			if (missingHostelFields.length > 0) {
				return next(
					new AppError(
						`Missing parameter <${missingHostelFields.join(',')}>`,
						400
					)
				);
			}
			let hostelProperty = {
				for: req.body.for,
				type: req.body.type,
				title: req.body.title,
				city: req.body.city,
				location: req.body.location,
				numberOfRoomMates: req.body.numberOfRoomMates,
				typeOfToilets: req.body.typeOfToilets,
				toiletTypes: req.body.toiletTypes,
				rent: req.body.rent,
				securityDeposit: req.body.securityDeposit,
				noticePeriod: req.body.noticePeriod,
				furnished: req.body.furnished,
				fooding: req.body.fooding,
				foodSchedule: req.body.foodSchedule,
				otherAmenties: req.body.otherAmenties,
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
				adminId: req.user,
				restrictions: req.body.restrictions,
				createdBy: 'admin',
			};
			if (req.body.furnished !== 'unfurnished') {
				if (!req.body.furnishes) {
					return next(
						new AppError('parameter <furnishes> is missing', 400)
					);
				}
				hostelProperty['furnishes'] = req.body.furnishes;
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
				hostelProperty['availableDate'] = req.body.availableDate;
			}

			let hostelAndPg = await Property.create(hostelProperty);
			res.status(201).json({
				status: 'success',
				data: {
					property: hostelAndPg,
				},
			});
			break;

		case 'serviceapartment':
			const requiredSApartmentsFields = [
				'city',
				'location',
				'title',
				'area',
				'numberOfOccupants',
				'typeOfToilets',
				'toiletTypes',
				'isBalcony',
				'kitchen',
				'rent',
				'furnished',
				'fooding',
				'foodSchedule',
				'otherAmenties',
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
			const missingSApartmentFields = [];
			requiredSApartmentsFields.forEach((f) => {
				if (!req.body[f]) {
					missingSApartmentFields.push(f);
				}
			});
			if (missingSApartmentFields.length > 0) {
				return next(
					new AppError(
						`Missing parameter <${missingSApartmentFields.join(
							','
						)}>`,
						400
					)
				);
			}
			let sApartmentProperty = {
				for: req.body.for,
				type: req.body.type,
				title: req.body.title,
				city: req.body.city,
				location: req.body.location,
				area: req.body.area,
				numberOfOccupants: req.body.numberOfOccupants,
				typeOfToilets: req.body.typeOfToilets,
				toiletTypes: req.body.toiletTypes,
				isBalcony: req.body.isBalcony,
				kitchen: req.body.kitchen,
				rent: req.body.rent,
				furnished: req.body.furnished,
				fooding: req.body.fooding,
				foodSchedule: req.body.foodSchedule,
				otherAmenties: req.body.otherAmenties,
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
				adminId: req.user,
				restrictions: req.body.restrictions,
				createdBy: 'admin',
				userId: req.body.userId,
			};
			if (req.body.furnished !== 'unfurnished') {
				if (!req.body.furnishes) {
					return next(
						new AppError('parameter <furnishes> is missing', 400)
					);
				}
				sApartmentProperty['furnishes'] = req.body.furnishes;
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
				sApartmentProperty['availableDate'] = req.body.availableDate;
			}

			let sApartment = await Property.create(sApartmentProperty);
			res.status(201).json({
				status: 'success',
				data: {
					property: sApartment,
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

exports.getProperties = catchAsync(async (req, res, next) => {
	const properties = await Property.find({ status: 'active' });
	res.status(200).json({
		status: 'success',
		count: properties.length,
		data: {
			properties,
		},
	});
});

exports.addPropertyImage = catchAsync(async (req, res, next) => {
	if (!req.files) {
		return next(new AppError('No image found', 400));
	} else {
		let image = req.files['image[]'];
		console.log('----->', image);
		let property = await Property.findById(req.params.id);
		const photos = [];
		if (!property) {
			return next(new AppError('Admin not found', 404));
		}
		for (let i = 0; i < image.length; i++) {
			let imageName = property.id + '-' + image[i].name;
			image[i].mv(
				path.join(__dirname, '../', 'images', 'property_images/') +
					imageName,
				function (err) {
					if (err) {
						res.send(err);
					}
				}
			);
			photos.push(imageName);
		}
		property.photos = photos;
		const updatedProperty = await property.save();
		res.status(200).json({
			status: 'success',
			data: {
				id: req.params.id,
				photos: updatedProperty.photos,
			},
		});
	}
});

exports.updateProperty = catchAsync(async (req, res, next) => {
	const property = await Property.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});

	res.status(200).json({
		status: 'success',
		data: {
			property,
		},
	});
});

exports.getPropertyResources = catchAsync(async (req, res, next) => {
	const furnishes = await Furnish.find();
	const amenities = await Amenity.find();

	res.status(200).json({
		status: 'success',
		data: {
			furnishes,
			amenities,
		},
	});
});
