const mongoose = require('mongoose');
const ProjectProperty = require('./projectPropertyModule');
const PropertyModel = require('./propertyModel');
const slugify = require('slugify');

const { Schema, model } = mongoose;
const projectSchema = new Schema(
	{
		title: {
			type: String,
			required: [true, 'Missing parameter title'],
		},
		slug: {
			type: String,
			unique: [true, 'slug already exists'],
		},
		description: {
			type: String,
			required: [true, 'Missing parameter description'],
		},
		projectType: {
			type: String,
			enum: {
				values: ['flat', 'independenthouse', 'land'],
				message: 'Invalid projectType',
			},
			required: true,
		},
		amenities: {
			type: [
				{
					type: mongoose.Schema.ObjectId,
					ref: 'Amenity',
				},
			],
		},
		legalClearance: [
			{
				name: {
					type: String,
					enum: {
						values: [
							'approvalOfBuilding',
							'nocFromFireDepts',
							'electricityConnUse',
							'StructuralStatbilityCertificate',
							'nocFromPollutionDepts',
							'functionalCertificate',
							'holdingTax',
							'completionCertificate',
							'reraapproved',
							'numberOfOwner',
							'withinBlockArea',
							'approvedByDevelopmentAutority',
							'withinAreaOfDevelopmentAuthrity',
						],
						message:
							'type must be between <approvalOfBuilding> | <nocFromFireDepts> | <electricityConnUse> |<StructuralStatbilityCertificate> |<nocFromPollutionDepts> |<functionalCertificate> | <holdingTax> | <completionCertificate> | <reraapproved> <numberOfOwner> | <withinBlockArea> | <approvedByDevelopmentAutority> | <withinAreaOfDevelopmentAuthrity>',
					},
				},
				label: String,
				details: {
					type: String,
					default: null,
				},
				value: {
					type: Boolean,
				},
			},
		],
		builder: {
			type: mongoose.Schema.ObjectId,
			ref: 'Builder',
			required: [true, 'Missing parameter builder'],
		},
		createdAt: {
			type: Date,
			default: Date.now(),
		},
		city: {
			type: mongoose.Schema.ObjectId,
			ref: 'City',
			required: [true, 'Missing parameter city'],
		},
		location: {
			type: mongoose.Schema.ObjectId,
			ref: 'Location',
			required: [true, 'Missing paramter location'],
		},
		distanceSchool: {
			type: Number,
		},

		distanceRailwayStation: {
			type: Number,
		},
		distanceAirport: {
			type: Number,
		},

		distanceBusStop: {
			type: Number,
		},
		distanceHospital: {
			type: Number,
		},
		image1: {
			type: String,
			default: null,
		},
		image2: {
			type: String,
			default: null,
		},
		image3: {
			type: String,
			default: null,
		},
		image4: {
			type: String,
			default: null,
		},
		photos: [
			{
				image: {
					type: String,
				},
			},
		],
		status: {
			type: String,
			enum: {
				values: ['active', 'inactive'],
			},
			default: 'active',
		},
		complitionStatus: {
			type: String,
			enum: {
				values: ['upcoming', 'ongoing', 'completed'],
				message: 'Invalid complitionStatus',
			},
			required: true,
		},
	},
	{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

projectSchema.pre(/^find/, function (next) {
	this.populate({
		path: 'city',
		select: 'id name',
	})
		.populate({
			path: 'location',
			select: 'id name ',
		})
		.populate({
			path: 'builder',
			select: 'id developerName phoneNumber slug',
		});

	next();
});

projectSchema.pre('save', async function (next) {
	this.slug = slugify(this.title, {
		replacement: '-',
		lower: true,
	});
	next();
});
const ProjectModel = model('Project', projectSchema);
module.exports = ProjectModel;
