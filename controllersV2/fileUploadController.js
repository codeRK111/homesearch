const Builder = require('./../models/builderModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const multer = require('multer');
const path = require('path');
const sharp = require('sharp');

// Image Filter
const multerFilter = (req, file, cb) => {
	if (file.mimetype.startsWith('image')) {
		cb(null, true);
	} else {
		cb(new AppError('Not an image! Please upload an image.', 400), false);
	}
};

// Handle Builder Images
const builderStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, '../', 'images', 'builder_images/'));
	},
	filename: (req, file, cb) => {
		const ext = file.mimetype.split('/')[1];
		cb(null, `${Date.now()}.${ext}`);
	},
});

const builderPackageStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(
			null,
			path.join(__dirname, '../', 'images', 'builder_images', 'packages/')
		);
	},
	filename: (req, file, cb) => {
		const ext = file.mimetype.split('/')[1];
		cb(null, `${Date.now()}.${ext}`);
	},
});
const builder = multer({
	fileFilter: multerFilter,
	storage: builderStorage,
});

const builderPackages = multer({
	fileFilter: multerFilter,
	storage: builderPackageStorage,
});

// Handle Profile Images
const profileStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, '../', 'images', 'profile_images/'));
	},
	filename: (req, file, cb) => {
		const ext = file.mimetype.split('/')[1];
		cb(null, `${Date.now()}.${ext}`);
	},
});
const profile = multer({
	fileFilter: multerFilter,
	storage: profileStorage,
});

// Handle Property Images
const propertyStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, '../', 'images', 'property_images/'));
	},
	filename: (req, file, cb) => {
		const ext = file.mimetype.split('/')[1];
		cb(null, `${Date.now()}.${ext}`);
	},
});
const properties = multer({
	fileFilter: multerFilter,
	storage: propertyStorage,
});

// Handle Project Images
const projectStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, '../', 'images', 'project_images/'));
	},
	filename: (req, file, cb) => {
		const ext = file.mimetype.split('/')[1];
		cb(null, `${Date.now()}.${ext}`);
	},
});
const floorPlanStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, '../', 'images', 'project_images/'));
	},
	filename: (req, file, cb) => {
		const ext = file.mimetype.split('/')[1];
		cb(null, `${Date.now()}.${ext}`);
	},
});
const projects = multer({
	fileFilter: multerFilter,
	storage: projectStorage,
});
const floorPlans = multer({
	fileFilter: multerFilter,
	storage: floorPlanStorage,
});

exports.resizeTourImages = catchAsync(async (req, res, next) => {
	if (!req.files.logo || !req.files.images) {
		return next();
	}

	// Cover image
	req.body.imageCover = `${Date.now()}-cover.jpeg`;
	await sharp(req.files.logo[0].buffer)
		.resize(200, 133)
		.toFormat('jpeg')
		.jpeg({ quality: 50 })
		.toFile(
			path.join(__dirname, '../', 'images', 'test/', req.body.imageCover)
		);

	// Images
	req.body.images = [];
	await Promise.all(
		req.files.images.map(async (file, i) => {
			const filename = `${Date.now()}-${i + 1}.jpeg`;

			await sharp(file.buffer)
				.resize(2000, 1333)
				.toFormat('jpeg')
				.jpeg({ quality: 90 })
				.toFile(
					path.join(__dirname, '../', 'images', 'test/', filename)
				);

			req.body.images.push(filename);
		})
	);

	next();
});

exports.uploadBuilderPhoto = builder.fields([
	{ name: 'logo', maxCount: 1 },
	{ name: 'photos', maxCount: 30 },
]);
exports.uploadPropertiesPhoto = properties.array('images');
exports.uploadProjectPhotosV2 = projects.fields([
	{ name: 'thumbnailImage', maxCount: 1 },
	{ name: 'masterFloorPlan', maxCount: 1 },
	{ name: 'geogrophicalImage', maxCount: 1 },
	{ name: 'photos', maxCount: 7 },
]);
exports.uploadProjectPhotos = projects.array('images');
exports.uploadFloorplans = floorPlans.array('images');
exports.uploadFloorplan = floorPlans.single('floorPlan');
exports.uploadBuilderPackagePhoto = builderPackages.single('photo');
exports.uploadProfile = profile.single('photo');
