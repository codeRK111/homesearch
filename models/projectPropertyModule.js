const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const projectPropertySchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		tower: {
			type: String,
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
		speciality: {
			type: mongoose.Schema.ObjectId,
			ref: 'ProjectSpeciality',
			default: null,
		},
		numberOfBedrooms: {
			type: Number,
		},
		bhk: {
			type: Number,
		},
		numberOfBedrooms: {
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
				values: ['flat', 'independenthouse', 'land'],
				message:
					'type must be between <flat> | <independenthouse> | <land> ',
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
		bookingAmount: {
			type: Number,
		},
		maxPrice: {
			type: Number,
			required: true,
		},
		minPrice: {
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

		// independenthouse
		carParking: {
			type: String,
			enum: {
				values: ['open', 'covered'],
				message: 'carParking must be between <open> | <covered>',
			},
			required: requireIndependentHouse,
		},
		propertyOwnerShip: {
			type: String,
			enum: {
				values: ['freehold', 'leashed'],
				message: 'type must be between <freehold> | <leashed>',
			},
			required: requireIndependentHouse,
		},
		transactionType: {
			type: String,
			enum: {
				values: ['newbooking', 'resale'],
				message: 'type must be between <newbooking> | <resale> ',
			},
			required: requireIndependentHouse,
		},
		verified: {
			type: Boolean,
			required: requireIndependentHouse,
		},

		// land
		length: {
			type: Number,
			required: requireLand,
		},
		width: {
			type: Number,
			required: requireLand,
		},
		plotFrontage: {
			type: Number,
			required: requireLand,
		},
		plotArea: [
			{
				type: Number,
				required: requireLand,
			},
		],
		widthOfRoad: {
			type: Number,
			required: requireLand,
		},
		facing: {
			type: String,
			enum: {
				values: ['east', 'west', 'north', 'south'],
				message:
					'facing must be between <east> | <west> | <north> |<south> ',
			},
			required: requireLand,
		},
		landUsingZoning: {
			type: String,
			enum: {
				values: ['yellow'],
				message: 'landUsingZoning must be between <yellow>  ',
			},
			required: requireLand,
		},

		constructionDone: {
			type: Boolean,
			required: requireLand,
		},
		boundaryWallMade: {
			type: Boolean,
			required: requireLand,
		},
		gatedCommunity: {
			type: Boolean,
			required: requireLand,
		},
		govermentValuation: {
			type: Number,
			required: requireLand,
		},
		photos: [
			{
				image: {
					type: String,
				},
			},
		],

		floorPlans: [
			{
				image: {
					type: String,
				},
				label: {
					type: String,
				},
			},
		],
	},
	{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

projectPropertySchema.index({
	status: 1,
	city: 1,
	type: 1,
});

projectPropertySchema.pre(/^find/, function (next) {
	this.populate({
		path: 'speciality',
		select: 'id name',
	});

	next();
});

function requireIndependentHouse() {
	if (this.type === 'independenthouse') {
		return true;
	} else {
		return false;
	}
}

function rquiredFor(...types) {
	if (types.includes(this.type)) {
		return true;
	} else {
		return false;
	}
}

function requireLand() {
	if (this.type === 'land') {
		return true;
	} else {
		return false;
	}
}

const projectPropertyModel = model('ProjectProperty', projectPropertySchema);
module.exports = projectPropertyModel;
