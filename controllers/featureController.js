const Feature = require('./../models/featuresModel');
const Project = require('./../models/projectModule');
const Admin = require('./../models/adminModel');
const City = require('./../models/cityModel');
const Location = require('./../models/locationModel');
const Property = require('./../models/propertyModel');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const sendOtpMessage = require('../utils/sendOtp');

exports.setAuthenticationNumber = catchAsync(async (req, res, next) => {
	if (!req.params.number) {
		return next(new AppError('number not found', 400));
	}
	let docList = await Feature.find().sort({ _id: 1 }).limit(1);
	let lastDoc;
	if (docList.length > 0) {
		lastDoc = await Feature.findById(docList[0]._id);
		lastDoc.adminNumber = req.params.number;
		await lastDoc.save();
	} else {
		lastDoc = await Feature.create({
			adminNumber: req.params.number,
		});
	}

	res.status(201).json({
		status: 'success',
		data: {
			features: lastDoc,
		},
	});
});

exports.setAndSendOtp = catchAsync(async (req, res, next) => {
	let docList = await Feature.find().sort({ _id: 1 }).limit(1);

	if (docList.length == 0) {
		return next(new AppError('auth number not found', 400));
	}
	lastDoc = await Feature.findById(docList[0]._id);
	let randomNumber = `${Math.floor(1000 + Math.random() * 9000)}`;
	lastDoc.otp = randomNumber;
	await lastDoc.save();
	const otpResponse = await sendOtpMessage(lastDoc.adminNumber, randomNumber);
	if (otpResponse.data.startsWith('OK')) {
		res.status(200).json({
			status: 'success',
		});
	} else {
		return next(new AppError('Unable to send otp', 500));
	}
});

exports.getAuthNumber = catchAsync(async (req, res, next) => {
	let docList = await Feature.find().sort({ _id: 1 }).limit(1);

	if (docList.length == 0) {
		return next(new AppError('auth number not found', 400));
	}
	lastDoc = await Feature.findById(docList[0]._id);
	res.status(200).json({
		status: 'success',
		data: {
			authNumber: lastDoc.adminNumber,
		},
	});
});

exports.getCount = catchAsync(async (req, res, next) => {
	const admins = await Admin.countDocuments();
	const cities = await City.countDocuments();
	const locations = await Location.countDocuments();
	const activeProperties = await Property.countDocuments({
		status: 'active',
	});
	const underScreeningProperties = await Property.countDocuments({
		status: 'underScreening',
	});
	const expiredProperties = await Property.countDocuments({
		status: 'expired',
	});
	const users = await User.countDocuments();
	const projects = await Project.countDocuments();

	res.status(200).json({
		status: 'success',
		data: {
			admins,
			users,
			cities,
			locations,
			activeProperties,
			underScreeningProperties,
			expiredProperties,
			projects,
		},
	});
});


exports.getPropertiesCount = catchAsync(async (req, res, next) => {
	const { city } = req.params;
	if(!city) return next(new AppError('City required',400))

	//Project
	const projApartment = await Project.countDocuments({status: 'active',projectType: 'flat',city})
    const projVilla =  await Project.countDocuments({status: 'active',projectType: 'independenthouse',city})
    const projLand =  await Project.countDocuments({status: 'active',projectType: 'land',city})

    //Property Sale
	const propApartment =  await Property.countDocuments({status: 'active',sale_type: 'flat',city})
    const propVilla =  await Property.countDocuments({status: 'active',sale_type: 'independenthouse',city})
    const propLand =  await Property.countDocuments({status: 'active',sale_type: 'land',city})

     //Property Rent
	const propApartmentRent =  await Property.countDocuments({status: 'active',type: 'flat',city})
    const propVillaRent =  await Property.countDocuments({status: 'active',type: 'independenthouse',city})
    const propHostel =  await Property.countDocuments({status: 'active',type: 'hostel',city})
    const propPG =  await Property.countDocuments({status: 'active',type: 'pg',city})




		
	

	res.status(200).json({
		status: 'success',
		data: {
			projectCount: {
				apartment: projApartment,
				villa: projVilla,
				land: projLand,
			},
			saleCount: {
				apartment: propApartment,
				villa: propVilla,
				land: propLand,
			},
			rentCount: {
				apartment: propApartmentRent,
				villa: propVillaRent,
				hostel: propHostel,
				PG: propPG,
			}
		},
	});
});
