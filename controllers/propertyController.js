const Furnish = require('./../models/furnishingModel');
const Amenity = require('./../models/amenityModel');
const User = require('./../models/userModel');
const Property = require('./../models/propertyModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const ProjectProperty = require('./../models/projectPropertyModule');
const Project = require('./../models/projectModule');
const Admin = require('./../models/adminModel');
const mongoose = require('mongoose');

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
	const user = await User.findById(req.body.userId);
	let type = req.body.type;
	console.log(user.role);

	switch (type) {
		case 'flat':
		case 'independenthouse':
		case 'guesthouse':
			const requiredFields = [
				'city',
				'location',
				'title',
				'usp',
				'numberOfBedRooms',
				'toiletTypes',
				'numberOfBalconies',
				// 'width',
				'carpetArea',
				'rent',
				'securityDeposit',
				'noOfFloors',
				'furnished',
				'amenities',
				'distanceSchool',
				'distanceRailwayStation',
				'distanceAirport',
				'distanceBusStop',
				'distanceHospital',
				'availableFor',
				'availability',
				'carParking',
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
			// if (type == 'independenthouse' || type == 'guesthouse') {
			// 	const floorPossibleValues = [
			// 		'Entire Building',
			// 		'Ground floor',
			// 		'1st floor',
			// 		'2nd floor',
			// 		'3rd floor',
			// 	];
			// 	if (!floorPossibleValues.includes(req.body.floor)) {
			// 		return next(
			// 			new AppError(
			// 				`floor should be one of these values <${floorPossibleValues.join(
			// 					','
			// 				)}>`,
			// 				400
			// 			)
			// 		);
			// 	}
			// }
			console.log(req.body);
			let propertyValue = {
				for: req.body.for,
				type: req.body.type,
				city: req.body.city,
				title: req.body.title,
				usp: req.body.usp,
				location: req.body.location,
				numberOfBedRooms: req.body.numberOfBedRooms,
				toiletTypes: req.body.toiletTypes,
				typeOfToilets: req.body.typeOfToilets,
				numberOfBalconies: req.body.numberOfBalconies,
				superBuiltupArea: req.body.superBuiltupArea,
				carpetArea: req.body.carpetArea,
				rent: req.body.rent,
				securityDeposit: req.body.securityDeposit,
				floor: req.body.floor,
				noOfFloors: req.body.noOfFloors,
				furnished: req.body.furnished,
				amenities: req.body.amenities,
				distanceSchool: req.body.distanceSchool,
				distanceRailwayStation: req.body.distanceRailwayStation,
				distanceAirport: req.body.distanceAirport,
				distanceBusStop: req.body.distanceBusStop,
				distanceHospital: req.body.distanceHospital,
				availability: req.body.availability,
				description: req.body.description,
				adminId: req.admin.id,
				createdBy: 'admin',
				userId: req.body.userId,
				availableFor: req.body.availableFor,
				noticePeriod: req.body.noticePeriod,
				restrictions: req.body.restrictions,
				postedBy: user.role,
				carParking: req.body.carParking,
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
				'usp',
				'numberOfRoomMates',
				'typeOfToilets',
				'toiletTypes',
				'rent',
				'availableFor',
				'securityDeposit',
				'noticePeriod',
				'furnished',
				'fooding',
				'foodSchedule',
				'amenities',
				'distanceSchool',
				'distanceRailwayStation',
				'distanceAirport',
				'distanceBusStop',
				'distanceHospital',
				'availability',
				'roomType',
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
				usp: req.body.usp,
				city: req.body.city,
				availableFor: req.body.availableFor,
				floor: req.body.floor,
				noOfFloors: req.body.noOfFloors,
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
				distanceSchool: req.body.distanceSchool,
				distanceRailwayStation: req.body.distanceRailwayStation,
				distanceAirport: req.body.distanceAirport,
				distanceBusStop: req.body.distanceBusStop,
				distanceHospital: req.body.distanceHospital,
				availability: req.body.availability,
				description: req.body.description,
				adminId: req.admin.id,
				restrictions: req.body.restrictions,
				createdBy: 'admin',
				userId: req.body.userId,
				postedBy: user.role,
				amenities: req.body.amenities,
				roomType: req.body.roomType,
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
				distanceRailwayStation: req.body.distanceRailwayStation,
				distanceAirport: req.body.distanceAirport,
				distanceBusStop: req.body.distanceBusStop,
				distanceHospital: req.body.distanceHospital,
				availability: req.body.availability,
				description: req.body.description,
				adminId: req.admin.id,
				restrictions: req.body.restrictions,
				createdBy: 'admin',
				userId: req.body.userId,
				postedBy: user.role,
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

exports.addPropertyForSale = catchAsync(async (req, res, next) => {
	if (!req.body.for) {
		return next(new AppError('parameter <for> is missing', 400));
	}
	if (!req.body.sale_type) {
		return next(new AppError('parameter <sale_type> is missing', 400));
	}

	if (!req.body.userId) {
		return next(new AppError('parameter <userId> is missing', 400));
	}

	const user = await User.findById(req.body.userId);

	if (!user) {
		return next(new AppError('Invalid user', 400));
	}

	let sale_type = req.body.sale_type;

	switch (sale_type) {
		case 'flat':
			const requiredFields = [
				'city',
				'propertyOwnerShip',
				'location',
				'title',
				'usp',
				'pricePerSqFt',
				'numberOfBedRooms',
				'description',
				'toiletTypes',
				'superBuildUpArea',
				'carpetArea',
				'numberOfFloors',
				'floor',
				'verified',
				'transactionType',
				'salePrice',
				'furnished',
				'amenities',
				'legalClearance',
				'distanceSchool',
				'distanceRailwayStation',
				'distanceAirport',
				'distanceBusStop',
				'distanceHospital',
				'availability',
				'salePriceOver',
				'carParking',
				'landArea',
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

			let pFlat = {
				for: req.body.for,
				sale_type: req.body.sale_type,
				pricePerSqFt: req.body.pricePerSqFt,
				carParking: req.body.carParking,
				propertyOwnerShip: req.body.propertyOwnerShip,
				city: req.body.city,
				title: req.body.title,
				usp: req.body.usp,
				description: req.body.description,
				location: req.body.location,
				toiletTypes: req.body.toiletTypes,
				superBuiltupArea: req.body.superBuildUpArea,
				carpetArea: req.body.carpetArea,
				floor: req.body.floor,
				noOfFloors: req.body.numberOfFloors,
				numberOfBedRooms: req.body.numberOfBedRooms,
				furnished: req.body.furnished,
				verified: req.body.verified,
				postedBy: user.role,
				transactionType: req.body.transactionType,
				salePrice: req.body.salePrice,
				amenities: req.body.amenities,
				legalClearance: req.body.legalClearance,
				distanceSchool: req.body.distanceSchool,
				distanceRailwayStation: req.body.distanceRailwayStation,
				distanceAirport: req.body.distanceAirport,
				distanceBusStop: req.body.distanceBusStop,
				distanceHospital: req.body.distanceHospital,
				availability: req.body.availability,
				adminId: req.admin.id,
				createdBy: 'admin',
				userId: req.body.userId,
				salePriceOver: req.body.salePriceOver,
				landArea: req.body.landArea,
			};

			if (req.body.furnished !== 'unfurnished') {
				if (!req.body.furnishes) {
					return next(
						new AppError('parameter <furnishes> is missing', 400)
					);
				}
				pFlat['furnishes'] = req.body.furnishes;
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
				pFlat['availableDate'] = req.body.availableDate;
			}

			let flat = await Property.create(pFlat);
			res.status(201).json({
				status: 'success',
				data: {
					property: flat,
				},
			});
			break;

		case 'independenthouse':
			const requiredIndependentHouseFields = [
				'city',
				'propertyOwnerShip',
				'location',
				'title',
				'usp',
				'pricePerSqFt',
				'description',
				'toiletTypes',
				'superBuildUpArea',
				'carpetArea',
				'verified',
				'transactionType',
				'salePrice',
				'furnished',
				'amenities',
				'legalClearance',
				'distanceSchool',
				'distanceRailwayStation',
				'distanceAirport',
				'distanceBusStop',
				'distanceHospital',
				'availability',
				'salePriceOver',
				'carParking',
				'landArea',
				'floor',
				'noOfFloors',
				'numberOfBedRooms',
			];
			const missingIndependentHouseFields = [];
			requiredIndependentHouseFields.forEach((f) => {
				if (req.body[f] == null || req.body[f] == undefined) {
					missingIndependentHouseFields.push(f);
				}
			});
			if (missingIndependentHouseFields.length > 0) {
				return next(
					new AppError(
						`Missing parameter <${missingIndependentHouseFields.join(
							','
						)}>`,
						400
					)
				);
			}

			let pIndependenyHouse = {
				for: req.body.for,
				sale_type: req.body.sale_type,
				pricePerSqFt: req.body.pricePerSqFt,
				carParking: req.body.carParking,
				propertyOwnerShip: req.body.propertyOwnerShip,
				city: req.body.city,
				title: req.body.title,
				usp: req.body.usp,
				description: req.body.description,
				location: req.body.location,
				toiletTypes: req.body.toiletTypes,
				superBuiltupArea: req.body.superBuildUpArea,
				carpetArea: req.body.carpetArea,
				furnished: req.body.furnished,
				verified: req.body.verified,
				postedBy: user.role,
				transactionType: req.body.transactionType,
				salePrice: req.body.salePrice,
				amenities: req.body.amenities,
				legalClearance: req.body.legalClearance,
				distanceSchool: req.body.distanceSchool,
				distanceRailwayStation: req.body.distanceRailwayStation,
				distanceAirport: req.body.distanceAirport,
				distanceBusStop: req.body.distanceBusStop,
				distanceHospital: req.body.distanceHospital,
				availability: req.body.availability,
				adminId: req.admin.id,
				createdBy: 'admin',
				userId: req.body.userId,
				salePriceOver: req.body.salePriceOver,
				landArea: req.body.landArea,
				floor: req.body.floor,
				noOfFloors: req.body.noOfFloors,
				numberOfBedRooms: req.body.numberOfBedRooms,
			};

			if (req.body.furnished !== 'unfurnished') {
				if (!req.body.furnishes) {
					return next(
						new AppError('parameter <furnishes> is missing', 400)
					);
				}
				pIndependenyHouse['furnishes'] = req.body.furnishes;
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
				pIndependenyHouse['availableDate'] = req.body.availableDate;
			}

			let independentHouse = await Property.create(pIndependenyHouse);
			res.status(201).json({
				status: 'success',
				data: {
					property: independentHouse,
				},
			});
			break;

		case 'land':
			const requiredFieldsForLand = [
				'city',
				'location',
				'title',
				'usp',
				'description',
				'length',
				'width',
				'plotFrontage',
				'plotArea',
				'widthOfRoad',
				'facing',
				'constructionDone',
				'boundaryWallMade',
				'gatedCommunity',
				'landUsingZoning',
				'govermentValuation',
				'pricePerSqFt',
				'verified',
				'transactionType',
				'salePrice',
				'legalClearance',
				'distanceSchool',
				'distanceRailwayStation',
				'distanceAirport',
				'distanceBusStop',
				'distanceHospital',
			];
			const missingFieldsForLand = [];
			requiredFieldsForLand.forEach((f) => {
				if (req.body[f] == null || req.body[f] == undefined) {
					missingFieldsForLand.push(f);
				}
			});
			if (missingFieldsForLand.length > 0) {
				return next(
					new AppError(
						`Missing parameter <${missingFieldsForLand.join(',')}>`,
						400
					)
				);
			}

			let pLand = {
				for: req.body.for,
				sale_type: req.body.sale_type,
				city: req.body.city,
				title: req.body.title,
				usp: req.body.usp,
				description: req.body.description,
				location: req.body.location,
				length: req.body.length,
				width: req.body.width,
				plotFrontage: req.body.plotFrontage,
				plotArea: req.body.plotArea,
				widthOfRoad: req.body.widthOfRoad,
				facing: req.body.facing,
				constructionDone: req.body.constructionDone,
				boundaryWallMade: req.body.boundaryWallMade,
				gatedCommunity: req.body.gatedCommunity,
				landUsingZoning: req.body.landUsingZoning,
				govermentValuation: req.body.govermentValuation,
				pricePerSqFt: req.body.pricePerSqFt,
				verified: req.body.verified,
				postedBy: user.role,
				transactionType: req.body.transactionType,
				salePrice: req.body.salePrice,
				legalClearance: req.body.legalClearance,
				distanceSchool: req.body.distanceSchool,
				distanceRailwayStation: req.body.distanceRailwayStation,
				distanceAirport: req.body.distanceAirport,
				distanceBusStop: req.body.distanceBusStop,
				distanceHospital: req.body.distanceHospital,
				adminId: req.admin.id,
				createdBy: 'admin',
				userId: req.body.userId,
			};

			let land = await Property.create(pLand);
			res.status(201).json({
				status: 'success',
				data: {
					property: land,
				},
			});
			break;

		default:
			res.status(400).json({
				status: 'fail',
				message: 'Not ready yet',
			});
			break;
			break;
	}
});

exports.getProperties = catchAsync(async (req, res, next) => {
	let query = { ...req.query };
	console.log(req.admin.id);
	const admin = await Admin.findById(req.admin.id);
	console.log(admin);
	const cities = admin.propertyAccessCities.map((c) =>
		mongoose.Types.ObjectId(c.id)
	);
	if (admin.type !== 'super-admin') {
		query['city'] = { $in: cities };
		query['for'] = { $in: admin.propertyAccess };
	}

	console.log(query);
	const page = query.page * 1 || 1;
	const limit = query.limit * 1 || 100;
	const excludeFields = ['page', 'limit'];
	excludeFields.forEach((field) => delete query[field]);
	const skip = (page - 1) * limit;
	const count = await Property.countDocuments(query);
	const properties = await Property.find(query)
		.sort('-createdAt')
		.skip(skip)
		.limit(limit);
	res.status(200).json({
		status: 'success',
		count,
		data: {
			properties,
		},
	});
});

exports.addPropertyImage = catchAsync(async (req, res, next) => {
	console.log(req.files);
	if (!req.files) {
		return next(new AppError('No image found', 400));
	} else {
		let image = req.files['image'];
		let property = await Property.findById(req.params.id);
		const photos = [];
		if (!property) {
			return next(new AppError('property not found', 404));
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
	const admin = await Admin.findById(req.admin.id);

	if (
		admin.type !== 'super-admin' &&
		!admin.propertyActions.includes('update')
	) {
		return next(new AppError('You have no permissions', 401));
	}
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

exports.getPropertyDetails = catchAsync(async (req, res, next) => {
	const property = await Property.findById(req.params.id);

	if (!property) return next(new AppError('property not found', 404));
	const allAmenities = await Amenity.find();
	const allFurnishes = await Furnish.find();
	property['_doc']['allAmenities'] = allAmenities;
	property['_doc']['allFurnishes'] = allFurnishes;
	res.status(200).json({
		status: 'success',
		data: {
			property,
		},
	});
});

exports.searchProperties = catchAsync(async (req, res, next) => {
	const filter = {};
	const page = req.body.page * 1 || 1;
	const limit = req.body.limit * 1 || 10;
	const skip = (page - 1) * limit;
	if (req.body.for === 'project') {
		const propertyFilter = {};
		if (req.body.price) {
			propertyFilter['maxPrice'] = { $lte: req.body.price };
		}
		if (req.body.availability) {
			propertyFilter['availability'] = req.body.availability;
		}
		if (req.body.numberOfBedRooms) {
			propertyFilter['numberOfBedRooms'] = req.body.numberOfBedRooms;
		}

		if (req.body.budgetList) {
			const arr = [];

			req.body.budgetList.forEach((c) => {
				console.log(typeof c.max);
				const obj = {};
				if (c.max) {
					obj['$lte'] = Number(c.max);
				}
				if (c.min) {
					obj['$gte'] = Number(c.min);
				}
				arr.push({
					maxPrice: obj,
				});
			});
			propertyFilter['$or'] = arr;
		}

		console.log(JSON.stringify(propertyFilter));
		const propertyItems = await ProjectProperty.find(propertyFilter);
		filter['_id'] = { $in: propertyItems.map((c) => c.project) };
		if (req.body.locations) {
			filter['location'] = { $in: req.body.locations };
		}
		if (req.body.city) {
			filter['city'] = req.body.city;
		}
		if (req.body.type) {
			filter['projectType'] = { $in: req.body.type };
		}
		filter.status = 'active';
		const totalDocs = await Project.countDocuments(filter);

		const properties = await Project.find(filter)
			.sort('-createdAt')
			.skip(skip)
			.limit(limit);
		res.status(200).json({
			status: 'success',
			count: totalDocs,
			data: { propertyItems, properties },
		});
	} else {
		if (req.body.for) {
			filter['for'] = req.body.for;
		}
		if (req.body.locations) {
			filter['location'] = { $in: req.body.locations };
		}
		if (req.body.city) {
			filter['city'] = req.body.city;
		}
		if (req.body.availability) {
			filter['availability'] = req.body.availability;
		}
		if (req.body.numberOfBedRooms) {
			filter['numberOfBedRooms'] = req.body.numberOfBedRooms;
		}
		if (req.body.price) {
			if (req.body.for === 'sale') {
				filter['salePrice'] = { $lte: req.body.price };
			} else {
				filter['rent'] = { $lte: req.body.price };
			}
		}
		if (req.body.type) {
			if (req.body.for === 'sale') {
				filter['sale_type'] = { $in: req.body.type };
			} else {
				filter['type'] = { $in: req.body.type };
			}
		}
		if (req.body.exclude) {
			filter['_id'] = { $ne: req.body.exclude };
		}
		if (req.body.budgetList) {
			const arr = [];

			if (req.body.for === 'sale') {
				req.body.budgetList.forEach((c) => {
					arr.push({
						salePrice: { $lte: c.max, $gte: c.min },
					});
				});
				// filter['salePrice'] = { $lte: req.body.price };
			} else {
				req.body.budgetList.forEach((c) => {
					console.log(typeof c.max);
					const obj = {};
					if (c.max) {
						obj['$lte'] = Number(c.max);
					}
					if (c.min) {
						obj['$gte'] = Number(c.min);
					}
					arr.push({
						rent: obj,
					});
				});
			}
			filter['$or'] = arr;
		}
		filter.status = 'active';
		const totalDocs = await Property.countDocuments(filter);

		console.log(JSON.stringify(filter));
		const properties = await Property.find(filter)
			.sort('-createdAt')
			.skip(skip)
			.limit(limit);
		res.status(200).json({
			status: 'success',
			count: totalDocs,
			data: { properties },
		});
	}
});

exports.addPropertyByUserForSale = catchAsync(async (req, res, next) => {
	const type = req.body.sale_type;
	if (!type) return next(new AppError('Parameter sale_type required'));
	switch (type) {
		case 'flat':
		case 'independenthouse':
			const propertyFlat = {
				for: req.body.for,
				title: req.body.title,
				numberOfBedRooms: req.body.numberOfBedRooms,
				superBuiltupArea: req.body.superBuiltupArea,
				carpetArea: req.body.carpetArea,
				availability: req.body.availability,
				carParking: req.body.carParking,
				furnished: req.body.furnished,
				toiletIndian: req.body.toiletIndian,
				toiletWestern: req.body.toiletWestern,
				propertyOwnerShip: req.body.propertyOwnerShip,
				noOfFloors: req.body.noOfFloors,
				floor: req.body.floor,
				distanceSchool: req.body.distanceSchool,
				distanceRailwayStation: req.body.distanceRailwayStation,
				distanceAirport: req.body.distanceAirport,
				distanceBusStop: req.body.distanceBusStop,
				distanceHospital: req.body.distanceHospital,
				salePrice: req.body.salePrice,
				salePriceOver: req.body.salePriceOver,
				description: req.body.description,
				city: req.body.city,
				location: req.body.location,
				sale_type: req.body.sale_type,
				amenities: req.body.amenities,
				furnishes: req.body.furnishes,
				pricePerSqFt: req.body.pricePerSqFt,
				legalClearance: req.body.legalClearance,
				transactionType: req.body.transactionType,
				landArea: req.body.landArea,
			};
			console.log(Object.keys(propertyFlat));
			for (let i = 0; i < Object.keys(propertyFlat).length; i++) {
				const element = Object.keys(propertyFlat)[i];
				if (!req.body[element]) {
					return next(new AppError(`Parameter ${element} required`));
				}
			}

			// Check for availability
			if (req.body.availability === 'specificdate') {
				if (!req.body.availableDate)
					return next(
						new AppError('Parameter availableDate required')
					);
				propertyFlat['availableDate'] = req.body.availableDate;
			}

			//manage toilets
			propertyFlat['toiletTypes'] = [
				{ toiletType: 'indian', number: req.body.toiletIndian },
				{ toiletType: 'western', number: req.body.toiletWestern },
			];
			delete propertyFlat['toiletIndian'];
			delete propertyFlat['toiletWestern'];

			// manage furnished
			if (req.body.furnished === 'unfurnished') {
				propertyFlat['furnishes'] = [];
			}

			propertyFlat['createdBy'] = 'user';
			propertyFlat['status'] = 'underScreening';
			propertyFlat['userId'] = req.user.id;
			propertyFlat['postedBy'] = req.user.role;
			propertyFlat['otherAmenties'] = req.body.otherAmenties
				? req.body.otherAmenties
				: [];
			propertyFlat['externalAmenities'] = req.body.externalAmenities
				? req.body.externalAmenities
				: [];

			console.log(propertyFlat);

			const docFlat = await Property.create(propertyFlat);
			res.status(201).json({
				status: 'success',
				data: {
					property: docFlat,
				},
			});
			break;

		case 'land':
			const propertyLand = {
				for: req.body.for,
				title: req.body.title,
				length: req.body['length'],
				width: req.body.width,
				plotFrontage: req.body.plotFrontage,
				plotArea: req.body.plotArea,
				widthOfRoad: req.body.widthOfRoad,
				facing: req.body.facing,
				constructionDone: req.body.constructionDone,
				boundaryWallMade: req.body.boundaryWallMade,
				gatedCommunity: req.body.gatedCommunity,
				landUsingZoning: req.body.landUsingZoning,
				govermentValuation: req.body.govermentValuation,
				distanceSchool: req.body.distanceSchool,
				distanceRailwayStation: req.body.distanceRailwayStation,
				distanceAirport: req.body.distanceAirport,
				distanceBusStop: req.body.distanceBusStop,
				distanceHospital: req.body.distanceHospital,
				salePrice: req.body.salePrice,
				description: req.body.description,
				city: req.body.city,
				location: req.body.location,
				sale_type: req.body.sale_type,
				pricePerSqFt: req.body.pricePerSqFt,
				legalClearance: req.body.legalClearance,
			};
			console.log(Object.keys(propertyLand));
			for (let i = 0; i < Object.keys(propertyLand).length; i++) {
				const element = Object.keys(propertyLand)[i];
				if (
					req.body[element] === null ||
					req.body[element] === undefined
				) {
					return next(new AppError(`Parameter ${element} required`));
				}
			}

			propertyLand['createdBy'] = 'user';
			propertyLand['status'] = 'underScreening';
			propertyLand['userId'] = req.user.id;
			propertyLand['postedBy'] = req.user.role;

			console.log(propertyLand);

			const docLand = await Property.create(propertyLand);
			res.status(201).json({
				status: 'success',
				data: {
					property: docLand,
				},
			});
			break;

		default:
			break;
	}
});

exports.updatePropertyByUserForSale = catchAsync(async (req, res, next) => {
	const type = req.body.sale_type;
	if (!type) return next(new AppError('Parameter sale_type required'));
	const property = await Property.findById(req.params.id);
	console.log('user', req.user.id);
	console.log('property', property.userId);
	if (!property) return next(new AppError('Property not found', 404));
	if (!property.userId.equals(req.user.id))
		return next(
			new AppError('You are unauthorized to change this property', 401)
		);
	switch (type) {
		case 'flat':
		case 'independenthouse':
			const propertyFlat = {
				...req.body,
			};

			// Check for availability
			if (req.body.availability === 'specificdate') {
				if (!req.body.availableDate)
					return next(
						new AppError('Parameter availableDate required')
					);
				propertyFlat['availableDate'] = req.body.availableDate;
			}

			//manage toilets
			const existingIndianToilet = property.toiletTypes.find(
				(c) => c.toiletType === 'indian'
			)['numbers'];
			const existingWesternToilet = property.toiletTypes.find(
				(c) => c.toiletType === 'western'
			)['numbers'];
			propertyFlat['toiletTypes'] = [
				{
					toiletType: 'indian',
					numbers: req.body.toiletIndian
						? req.body.toiletIndian
						: existingIndianToilet,
				},
				{
					toiletType: 'western',
					numbers: req.body.toiletWestern
						? req.body.toiletWestern
						: existingWesternToilet,
				},
			];
			delete propertyFlat['toiletIndian'];
			delete propertyFlat['toiletWestern'];

			// manage furnished
			if (req.body.furnished === 'unfurnished') {
				propertyFlat['furnishes'] = [];
			}

			const excludeFields = [
				'createdBy',
				'userId',
				'postedBy',
				'status',
				'adminId',
				'expiresAt',
				'verified',
				'image1',
				'image2',
				'image3',
				'image4',
			];
			excludeFields.forEach((c) => {
				if (propertyFlat[c]) {
					delete propertyFlat[c];
				}
			});

			console.log(propertyFlat);

			const docFlat = await Property.findByIdAndUpdate(
				req.params.id,
				propertyFlat,
				{
					new: true,
					runValidators: true,
				}
			);
			res.status(201).json({
				status: 'success',
				data: {
					property: docFlat,
				},
			});
			break;

		case 'land':
			const propertyLand = {
				...req.body,
			};
			const excludeFieldsForLand = [
				'createdBy',
				'userId',
				'postedBy',
				'status',
				'adminId',
				'expiresAt',
				'verified',
				'amenities',
				'availableFor',
				'numberOfBedRooms',
				'numberOfOccupants',
				'numberOfRoomMates',
				'typeOfToilets',
				'toiletTypes',
				'numberOfBalconies',
				'superBuiltupArea',
				'carpetArea',
				'image1',
				'image2',
				'image3',
				'image4',
			];
			excludeFieldsForLand.forEach((c) => {
				if (propertyLand[c]) {
					delete propertyLand[c];
				}
			});
			console.log(propertyLand);

			const docLand = await Property.findByIdAndUpdate(
				req.params.id,
				propertyLand,
				{
					new: true,
					runValidators: true,
				}
			);
			res.status(201).json({
				status: 'success',
				data: {
					property: docLand,
				},
			});
			break;

		default:
			break;
	}
});

exports.updatePropertyByUserForRent = catchAsync(async (req, res, next) => {
	const type = req.body.type;
	if (!type) return next(new AppError('Parameter type required'));
	const property = await Property.findById(req.params.id);
	console.log('user', req.user.id);
	console.log('property', property.userId);
	if (!property) return next(new AppError('Property not found', 404));
	if (!property.userId.equals(req.user.id))
		return next(
			new AppError('You are unauthorized to change this property', 401)
		);
	switch (type) {
		case 'flat':
		case 'independenthouse':
			const propertyFlat = {
				...req.body,
			};

			// Check for availability
			if (req.body.availability === 'specificdate') {
				if (!req.body.availableDate)
					return next(
						new AppError('Parameter availableDate required')
					);
				propertyFlat['availableDate'] = req.body.availableDate;
			}

			//manage toilets
			const existingIndianToilet = property.toiletTypes.find(
				(c) => c.toiletType === 'indian'
			)['numbers'];
			const existingWesternToilet = property.toiletTypes.find(
				(c) => c.toiletType === 'western'
			)['numbers'];
			propertyFlat['toiletTypes'] = [
				{
					toiletType: 'indian',
					numbers: req.body.toiletIndian
						? req.body.toiletIndian
						: existingIndianToilet,
				},
				{
					toiletType: 'western',
					numbers: req.body.toiletWestern
						? req.body.toiletWestern
						: existingWesternToilet,
				},
			];
			delete propertyFlat['toiletIndian'];
			delete propertyFlat['toiletWestern'];

			// manage furnished
			if (req.body.furnished === 'unfurnished') {
				propertyFlat['furnishes'] = [];
			}

			const excludeFields = [
				'createdBy',
				'userId',
				'postedBy',
				'status',
				'adminId',
				'expiresAt',
				'verified',
				'image1',
				'image2',
				'image3',
				'image4',
			];
			excludeFields.forEach((c) => {
				if (propertyFlat[c]) {
					delete propertyFlat[c];
				}
			});

			console.log(propertyFlat);
			propertyFlat['status'] = 'underScreening';

			const docFlat = await Property.findByIdAndUpdate(
				req.params.id,
				propertyFlat,
				{
					new: true,
					runValidators: true,
				}
			);
			res.status(201).json({
				status: 'success',
				data: {
					property: docFlat,
				},
			});
			break;

		case 'hostel':
		case 'pg':
			const propertyLand = {
				...req.body,
			};
			const excludeFieldsForLand = [
				'createdBy',
				'userId',
				'postedBy',
				'status',
				'adminId',
				'expiresAt',
				'verified',
				'image1',
				'image2',
				'image3',
				'image4',
			];
			excludeFieldsForLand.forEach((c) => {
				if (propertyLand[c]) {
					delete propertyLand[c];
				}
			});
			// Check for availability
			if (req.body.availability === 'specificdate') {
				if (!req.body.availableDate)
					return next(
						new AppError('Parameter availableDate required')
					);
				propertyLand['availableDate'] = req.body.availableDate;
			}

			//manage toilets
			const existingIndianToiletForHostel = property.toiletTypes.find(
				(c) => c.toiletType === 'indian'
			)['numbers'];
			const existingWesternToiletForHostel = property.toiletTypes.find(
				(c) => c.toiletType === 'western'
			)['numbers'];
			propertyLand['toiletTypes'] = [
				{
					toiletType: 'indian',
					numbers: req.body.toiletIndian
						? req.body.toiletIndian
						: existingIndianToiletForHostel,
				},
				{
					toiletType: 'western',
					numbers: req.body.toiletWestern
						? req.body.toiletWestern
						: existingWesternToiletForHostel,
				},
			];
			delete propertyLand['toiletIndian'];
			delete propertyLand['toiletWestern'];

			// manage furnished
			if (req.body.furnished === 'unfurnished') {
				propertyLand['furnishes'] = [];
			}

			// Check for room type
			if (req.body.roomType === 'shared') {
				if (!req.body.numberOfRoomMates)
					return next(
						new AppError('Parameter numberOfRoomMates required')
					);
				propertyLand['numberOfRoomMates'] = req.body.numberOfRoomMates;
			}
			propertyLand['status'] = 'underScreening';

			const docLand = await Property.findByIdAndUpdate(
				req.params.id,
				propertyLand,
				{
					new: true,
					runValidators: true,
				}
			);
			res.status(201).json({
				status: 'success',
				data: {
					property: docLand,
				},
			});
			break;

		default:
			break;
	}
});

exports.addPropertyByUserForRent = catchAsync(async (req, res, next) => {
	const type = req.body.type;
	if (!type) return next(new AppError('Parameter type required'));
	switch (type) {
		case 'flat':
		case 'independenthouse':
			const propertyFlat = {
				for: req.body.for,
				title: req.body.title,
				numberOfBedRooms: req.body.numberOfBedRooms,
				superBuiltupArea: req.body.superBuiltupArea,
				carpetArea: req.body.carpetArea,
				availability: req.body.availability,
				carParking: req.body.carParking,
				furnished: req.body.furnished,
				toiletIndian: req.body.toiletIndian,
				toiletWestern: req.body.toiletWestern,
				noOfFloors: req.body.noOfFloors,
				floor: req.body.floor,
				distanceSchool: req.body.distanceSchool,
				distanceRailwayStation: req.body.distanceRailwayStation,
				distanceAirport: req.body.distanceAirport,
				distanceBusStop: req.body.distanceBusStop,
				distanceHospital: req.body.distanceHospital,
				description: req.body.description,
				city: req.body.city,
				location: req.body.location,
				type: req.body.type,
				amenities: req.body.amenities,
				furnishes: req.body.furnishes,
				availableFor: req.body.availableFor,
				numberOfBalconies: req.body.numberOfBalconies,
				rent: req.body.rent,
				securityDeposit: req.body.securityDeposit,
				noticePeriod: req.body.noticePeriod,
			};
			console.log(Object.keys(propertyFlat));
			for (let i = 0; i < Object.keys(propertyFlat).length; i++) {
				const element = Object.keys(propertyFlat)[i];
				if (!req.body[element]) {
					return next(new AppError(`Parameter ${element} required`));
				}
			}

			// Check for availability
			if (req.body.availability === 'specificdate') {
				if (!req.body.availableDate)
					return next(
						new AppError('Parameter availableDate required')
					);
				propertyFlat['availableDate'] = req.body.availableDate;
			}

			//manage toilets
			propertyFlat['toiletTypes'] = [
				{ toiletType: 'indian', number: req.body.toiletIndian },
				{ toiletType: 'western', number: req.body.toiletWestern },
			];
			delete propertyFlat['toiletIndian'];
			delete propertyFlat['toiletWestern'];

			// manage furnished
			if (req.body.furnished === 'unfurnished') {
				propertyFlat['furnishes'] = [];
			}

			propertyFlat['createdBy'] = 'user';
			propertyFlat['status'] = 'underScreening';
			propertyFlat['userId'] = req.user.id;
			propertyFlat['postedBy'] = req.user.role;
			propertyFlat['otherAmenties'] = req.body.otherAmenties
				? req.body.otherAmenties
				: [];
			propertyFlat['externalAmenities'] = req.body.externalAmenities
				? req.body.externalAmenities
				: [];
			propertyFlat['restrictions'] = req.body.restrictions
				? req.body.restrictions
				: '';

			console.log(propertyFlat);

			const docFlat = await Property.create(propertyFlat);
			res.status(201).json({
				status: 'success',
				data: {
					property: docFlat,
				},
			});
			break;

		case 'hostel':
		case 'pg':
			const propertyHostel = {
				for: req.body.for,
				title: req.body.title,
				toiletIndian: req.body.toiletIndian,
				toiletWestern: req.body.toiletWestern,
				distanceSchool: req.body.distanceSchool,
				distanceRailwayStation: req.body.distanceRailwayStation,
				distanceAirport: req.body.distanceAirport,
				distanceBusStop: req.body.distanceBusStop,
				distanceHospital: req.body.distanceHospital,
				description: req.body.description,
				city: req.body.city,
				location: req.body.location,
				type: req.body.type,
				amenities: req.body.amenities,
				furnishes: req.body.furnishes,
				rent: req.body.rent,
				securityDeposit: req.body.securityDeposit,
				noticePeriod: req.body.noticePeriod,
				availableFor: req.body.availableFor,
				fooding: req.body.fooding,
				foodSchedule: req.body.foodSchedule,
				furnished: req.body.furnished,
				availability: req.body.availability,
				roomType: req.body.roomType,
				typeOfToilets: req.body.typeOfToilets,
			};
			console.log(Object.keys(propertyHostel));
			for (let i = 0; i < Object.keys(propertyHostel).length; i++) {
				const element = Object.keys(propertyHostel)[i];
				if (
					req.body[element] === null ||
					req.body[element] === undefined
				) {
					return next(new AppError(`Parameter ${element} required`));
				}
			}

			// Check for availability
			if (req.body.availability === 'specificdate') {
				if (!req.body.availableDate)
					return next(
						new AppError('Parameter availableDate required')
					);
				propertyHostel['availableDate'] = req.body.availableDate;
			}

			// Check for room type
			if (req.body.roomType === 'shared') {
				if (!req.body.numberOfRoomMates)
					return next(
						new AppError('Parameter numberOfRoomMates required')
					);
				propertyHostel['numberOfRoomMates'] =
					req.body.numberOfRoomMates;
			}

			//manage toilets
			propertyHostel['toiletTypes'] = [
				{ toiletType: 'indian', number: req.body.toiletIndian },
				{ toiletType: 'western', number: req.body.toiletWestern },
			];
			delete propertyHostel['toiletIndian'];
			delete propertyHostel['toiletWestern'];

			// manage furnished
			if (req.body.furnished === 'unfurnished') {
				propertyHostel['furnishes'] = [];
			}

			propertyHostel['createdBy'] = 'user';
			propertyHostel['status'] = 'underScreening';
			propertyHostel['userId'] = req.user.id;
			propertyHostel['postedBy'] = req.user.role;
			propertyHostel['restrictions'] = req.body.restrictions
				? req.body.restrictions
				: '';

			console.log(propertyHostel);

			const docLand = await Property.create(propertyHostel);
			res.status(201).json({
				status: 'success',
				data: {
					property: docLand,
				},
			});
			break;

		default:
			break;
	}
});

exports.handlePropertyImage = catchAsync(async (req, res, next) => {
	console.log(req.files);
	let images = req.files.map((c) => ({ image: c.filename }));
	if (req.body.default) {
		images = images.map((c, i) => {
			if (Number(req.body.default) === i) {
				c.default = true;
			}
			return c;
		});
	}
	const property = await Property.findByIdAndUpdate(
		req.params.id,
		{ $push: { photos: { $each: images } } },
		{
			new: true,
			runValidators: true,
		}
	);
	res.json({
		property,
	});
});

exports.getMyProperties = catchAsync(async (req, res, next) => {
	const properties = await Property.find({ userId: req.user.id }).sort(
		'-createdAt'
	);
	//send response
	res.send({
		status: 'success',
		count: properties.length,
		data: {
			properties,
		},
	});
});
exports.testMulter = catchAsync(async (req, res, next) => {
	console.log(req.files);
	console.log(req.body);
	res.send({
		status: 'success',
	});
});
