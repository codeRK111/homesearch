const mongoose = require('mongoose');
const slugify = require('slugify');

const { Schema, model } = mongoose;

// const towerSchema = new Schema({
// 	name: {
// 		type: String,
// 		default: '1'
// 	}
// })

const towerSchema = new Schema({
	name: {
		type: String,
	},
});
const projectSchema = new Schema(
	{
		title: {
			type: String,
			required: [true, 'Missing parameter title'],
		},
		usp: {
			type: String,
			required: [true, 'Missing parameter usp'],
		},
		bookingAmount: {
			type: Number,
			required: [true, 'Missing parameter bookingAmount'],
		},
		emi: {
			type: Number,
			required: [true, 'Missing parameter emi'],
		},
		totalLandArea: {
			type: Number,
			required: [true, 'Missing parameter totalLandArea'],
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
		towers: {
			type: Number,
			default: 1,
		},
		towerNames: {
			type: [towerSchema],
			default: [
				{
					name: '1',
				},
			],
		},

		photos: [
			{
				image: {
					type: String,
				},
				default: {
					type: Boolean,
					default: false,
				},
			},
		],
		thumbnailImage: {
			type: String,
			default: null,
		},
		masterFloorPlan: {
			type: String,
			default: null,
		},
		geogrophicalImage: {
			type: String,
			default: null,
		},
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
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
		timestamps: true,
	}
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
			select: 'id developerName phoneNumber slug logo',
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
