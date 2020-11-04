const Furnish = require('./../models/furnishingModel');
const Amenity = require('./../models/amenityModel');
const User = require('./../models/userModel');
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
				// 'width',
				'carpetArea',
				'rent',
				'securityDeposit',
				'noOfFloors',
				'furnished',
				'externalAmenities',
				'distanceSchool',
				'distanceRailwayStation',
				'distanceAirport',
				'distanceBusStop',
				'distanceHospital',
				'availableFor',
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
				externalAmenities: req.body.externalAmenities,
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
				'availableFor',
				'securityDeposit',
				'noticePeriod',
				'furnished',
				'fooding',
				'foodSchedule',
				'otherAmenties',
				'externalAmenities',
				'distanceSchool',
				'distanceRailwayStation',
				'distanceAirport',
				'distanceBusStop',
				'distanceHospital',
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
				adminId: req.user.id,
				createdBy: 'admin',
				userId: req.body.userId,
				salePriceOver: req.body.salePriceOver,
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
				adminId: req.user.id,
				createdBy: 'admin',
				userId: req.body.userId,
				salePriceOver: req.body.salePriceOver,
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
				adminId: req.user.id,
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
	res.status(200).json({
		status: 'success',
		data: {
			property,
		},
	});
});

exports.searchProperties = catchAsync(async (req, res, next) => {
	const filter = {};
	if (req.body.for) {
		filter['for'] = req.body.for;
	}
	if (req.body.locations) {
		filter['location'] = { $in: req.body.locations };
	}
	if (req.body.city) {
		filter['city'] = req.body.city;
	}
	if (req.body.rent) {
		filter['rent'] = { $lte: req.body.rent };
	}
	if (req.body.type) {
		filter['type'] = { $in: req.body.type };
	}
	filter.status = 'active';
	const totalDocs = await Property.countDocuments(filter)
	const page = req.body.page * 1 || 1;
		const limit = req.body.limit * 1 || 10;
		const skip = (page - 1) * limit;

	console.log(filter);
	const properties = await Property.find(filter).skip(skip).limit(limit);
	res.status(200).json({
		status: 'success',
		count: totalDocs,
		data: { properties },
	});
});
