const Property = require('./../models/propertyModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const mongoose = require('mongoose');

exports.addPropertyByUserForSale = catchAsync(async (req, res, next) => {
	const type = req.body.sale_type;
	if (!type) return next(new AppError('Parameter sale_type required'));
	switch (type) {
		case 'flat':
		case 'independenthouse':
			const propertyFlat = {
				for: req.body.for,
				title: req.body.title,
				usp: req.body.usp,
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
				negotiable: req.body.negotiable ? req.body.negotiable : false,
				salePrice: req.body.salePrice,
				// salePriceOver: req.body.salePriceOver,
				description: req.body.description,
				city: req.body.city,
				location: req.body.location,
				sale_type: req.body.sale_type,
				amenities: req.body.amenities,
				furnishes: req.body.furnishes,
				pricePerSqFt: req.body.pricePerSqFt,
				legalClearance: req.body.legalClearance,
				transactionType: req.body.transactionType,
			};
			console.log(Object.keys(propertyFlat));
			for (let i = 0; i < Object.keys(propertyFlat).length; i++) {
				const element = Object.keys(propertyFlat)[i];
				if (req.body[element] === undefined) {
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
				usp: req.body.usp,
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
				salePrice: req.body.salePrice,
				description: req.body.description,
				city: req.body.city,
				location: req.body.location,
				sale_type: req.body.sale_type,
				legalClearance: req.body.legalClearance,
				negotiable: req.body.negotiable ? req.body.negotiable : false,
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

exports.addPropertyByUserForRent = catchAsync(async (req, res, next) => {
	const type = req.body.type;
	if (!type) return next(new AppError('Parameter type required'));
	switch (type) {
		case 'flat':
		case 'independenthouse':
			const propertyFlat = {
				for: req.body.for,
				title: req.body.title,
				usp: req.body.usp,
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
				negotiable: req.body.negotiable ? req.body.negotiable : false,
			};
			console.log(Object.keys(propertyFlat));
			for (let i = 0; i < Object.keys(propertyFlat).length; i++) {
				const element = Object.keys(propertyFlat)[i];
				if (req.body[element] === undefined) {
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
			if (req.body.maintainanceFee) {
				propertyFlat['maintainanceFee'] = req.body.maintainanceFee;
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
				usp: req.body.usp,
				toiletIndian: req.body.toiletIndian,
				toiletWestern: req.body.toiletWestern,
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
				negotiable: req.body.negotiable ? req.body.negotiable : false,
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

exports.getMyProperties = catchAsync(async (req, res, next) => {
	const page = req.body.page * 1 || 1;
	const limit = req.body.limit * 1 || 100;
	const skip = (page - 1) * limit;

	const filter = {
		userId: mongoose.Types.ObjectId(req.user.id),
	};
	if (req.params.type === 'rent') {
		filter['type'] = req.params.type;
	} else if (req.params.type === 'sale') {
		filter['sale_type'] = req.params.type;
	}

	const properties = await Property.find(filter)
		.sort('-createdAt')
		.skip(skip)
		.limit(limit);

	res.status(200).json({
		status: 'success',
		data: {
			properties,
		},
	});
});

exports.searchByName = catchAsync(async (req, res, next) => {
	const properties = await Property.find({
		title: { $regex: req.body.title, $options: 'i' },
	});
	res.status(200).json({
		status: 'success',
		data: {
			properties,
		},
	});
});
exports.searchProperty = catchAsync(async (req, res, next) => {
	const filter = {
		status: 'active',
	};
	const page = req.query.page * 1 || 1;
	const limit = req.query.limit * 1 || 10;
	const skip = (page - 1) * limit;

	if (req.query['for']) {
		filter['for'] = req.query['for'];
	}

	if (req.query.city) {
		filter.city = req.query.city;
	}
	const totalDocs = await Property.countDocuments(filter);
	const properties = await Property.find(filter)
		.sort('-createdAt')
		.skip(skip)
		.limit(limit);
	res.status(200).json({
		status: 'success',
		data: {
			totalDocs,
			properties,
		},
	});
});
