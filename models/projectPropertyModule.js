const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const projectPropertySchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},

		description: {
			type: String,
		},
		priceOver: {
			type: String,
			enum: {
				values: ['superBuiltUpArea', 'carpetArea'],
				message:
					'type must be between <superBuiltUpArea> | <carpetArea>',
			},
		},
		project: {
			type: mongoose.Schema.ObjectId,
			ref: 'Project',
			required: [true, 'property must have a projectId'],
		},
		numberOfBedrooms: {
			type: Number,
		},
		bhk: {
			type: Number,
		},
		numberOflivingAreas: {
			type: Number,
		},
		numberOfUnits: {
			type: Number,
		},
		type: {
			type: String,
			enum: {
				values: [
					'flat',
					'independenthouse',
					'hostel',
					'pg',
					'guesthouse',
					'serviceapartment',
				],
				message:
					'type must be between <flat> | <independenthouse> | <hostel> |<pg> |<guesthouse> |<serviceapartment>',
			},
		},

		numberOfBedRooms: {
			type: Number,
		},

		toiletTypes: [
			{
				toiletType: {
					type: String,
					enum: {
						values: ['indian', 'western'],
						message:
							'Toilet type must be between <indian> | <western> ',
					},
				},
				numbers: {
					type: Number,
					default: 1,
				},
			},
		],

		superBuiltupArea: {
			type: Number,
		},
		carpetArea: {
			type: Number,
		},
		securityDeposit: {
			type: Number,
		},
		price: {
			type: Number,
			required: true,
		},
		furnished: {
			type: String,
			enum: {
				values: ['unfurnished', 'furnished', 'semifurnished'],
				message:
					'furnished must be between <unfurnished> | <furnished> | <semifurnished> ',
			},
		},
		furnishes: [
			{
				type: mongoose.Schema.ObjectId,
				ref: 'Furnish',
			},
		],

		availability: {
			type: String,
			enum: {
				values: ['immediately', 'specificdate'],
				message:
					'availability must be between <immediately> | <specificdate>  ',
			},
		},
		availableDate: {
			type: Date,
		},
		createdAt: {
			type: Date,
			default: Date.now(),
		},
		status: {
			type: String,
			enum: {
				values: ['active', 'expired', 'underScreening'],
			},
			default: 'active',
		},
	},
	{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

projectPropertySchema.index({
	status: 1,
	city: 1,
	type: 1,
});

const projectPropertyModel = model('ProjectProperty', projectPropertySchema);
module.exports = projectPropertyModel;
