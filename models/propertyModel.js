const mongoose = require('mongoose');
const moment = require('moment');
const { Schema, model } = mongoose;
const propertySchema = new Schema(
	{
		for: {
			type: String,
			enum: {
				values: ['rent', 'sale'],
				message: 'for must be between <rent> | <sale> ',
			},
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		sale_type: {
			type: String,
			enum: {
				values: ['flat', 'land'],
				message: 'type must be between <flat> | <land>',
			},
			required: requireSaleType,
		},
		propertyOwnerShip: {
			type: String,
			enum: {
				values: ['freehold', 'leashed'],
				message: 'type must be between <freehold> | <leashed>',
			},
			required: requireSaleType,
		},
		salePriceOver: {
			type: String,
			enum: {
				values: ['superBuildUpArea', 'carpetArea'],
				message:
					'type must be between <superBuildUpArea> | <carpetArea>',
			},
			required: requireSaleType,
		},
		postedBy: {
			type: String,
			enum: {
				values: ['owner', 'broker', 'builder', 'tenant'],
				message: 'type must be between <owner> | <broker> | <builder>',
			},
			required: requireSaleType,
		},
		transactionType: {
			type: String,
			enum: {
				values: ['newbooking', 'resale'],
				message: 'type must be between <newbooking> | <resale> ',
			},
			required: requireSaleType,
		},
		salePrice: {
			type: Number,
			required: requireSaleType,
		},
		verified: {
			type: Boolean,
			required: requireSaleType,
		},
		amenities: {
			type: [
				{
					type: mongoose.Schema.ObjectId,
					ref: 'Amenity',
				},
			],
			validate: (v) => Array.isArray(v) && v.length > 0,
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
						],
						message:
							'type must be between <approvalOfBuilding> | <nocFromFireDepts> | <electricityConnUse> |<StructuralStatbilityCertificate> |<nocFromPollutionDepts> |<functionalCertificate> | <holdingTax> | <completionCertificate> | <reraapproved>',
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
			required: requireRentType,
		},
		availableFor: [
			{
				type: String,
			},
		],
		city: {
			type: mongoose.Schema.ObjectId,
			ref: 'City',
			required: [true, 'Flat must have a city'],
		},
		location: {
			type: mongoose.Schema.ObjectId,
			ref: 'Location',
			required: [true, 'Flat must have a location'],
		},
		numberOfBedRooms: {
			type: Number,
		},
		numberOfOccupants: {
			type: Number,
		},
		numberOfRoomMates: {
			type: Number,
		},
		typeOfToilets: {
			type: String,
			enum: {
				values: ['attached', 'common'],
				message: 'for must be between <attached> | <common> ',
			},
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
					required: true,
				},
				numbers: {
					type: Number,
					default: 1,
				},
			},
		],
		numberOfBalconies: {
			type: Number,
		},
		superBuiltupArea: {
			type: Number,
		},
		carpetArea: {
			type: Number,
		},
		rent: {
			type: Number,
		},
		area: {
			type: Number,
		},
		securityDeposit: {
			type: Number,
		},
		floor: {
			type: String,
		},
		noOfFloors: {
			type: Number,
		},
		isBalcony: {
			type: Boolean,
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
		kitchen: [
			{
				type: mongoose.Schema.ObjectId,
				ref: 'Furnish',
			},
		],
		fooding: [
			{
				type: String,
				enum: {
					values: ['veg', 'nonveg', 'none', 'both'],
				},
			},
		],
		foodSchedule: [
			{
				type: String,
				enum: {
					values: [
						'bedtea',
						'breakfast',
						'lunch',
						'evngsnacks',
						'dinner',
					],
				},
			},
		],
		otherAmenties: [
			{
				type: mongoose.Schema.ObjectId,
				ref: 'Amenity',
			},
		],
		externalAmenities: [
			{
				type: mongoose.Schema.ObjectId,
				ref: 'Amenity',
			},
		],
		noticePeriod: {
			type: String,
		},
		restrictions: {
			type: String,
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

		availability: {
			type: String,
			enum: {
				values: ['immediately', 'specificdate'],
				message:
					'availability must be between <immediately> | <specificdate>  ',
			},
			required: true,
		},
		availableDate: {
			type: Date,
		},
		createdAt: {
			type: Date,
			default: Date.now(),
		},
		expiresAt: {
			type: Date,
		},
		createdBy: {
			type: String,
			enum: {
				values: ['admin', 'user'],
				message: 'Missing createdBy should be between <admin> | <user>',
			},
			required: true,
		},
		userId: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
		},
		adminId: {
			type: mongoose.Schema.ObjectId,
			ref: 'Admin',
		},
		description: {
			type: String,
		},
		video: {
			type: String,
		},
		photos: [
			{
				type: String,
			},
		],
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

propertySchema.index({
	status: 1,
	city: 1,
	type: 1,
});

propertySchema.pre(/^find/, function (next) {
	this.populate({
		path: 'furnishes',
		select: 'id name type',
	})
		.populate({
			path: 'externalAmenities',
			select: 'id name type',
		})
		.populate({
			path: 'otherAmenties',
			select: 'id name type',
		})
		.populate('location')
		.populate({
			path: 'userId',
			select:
				'-city -googleId -photoStatus -createdAt -paymentStatus -email -serialNumber -gender -createdBy -registerThrough -registerVia -passwordChangedAt -__v -photo',
		})
		.populate('city');
	next();
});

function requireSaleType() {
	if (this.type === 'sale') {
		return true;
	} else {
		return false;
	}
}

function requireRentType() {
	if (this.type === 'rent') {
		return true;
	} else {
		return false;
	}
}

propertySchema.pre('save', function (next) {
	if (this.status === 'active') {
		this.expiresAt = moment().add(60, 'days');
	}
	next();
});

const PropertyModel = model('Property', propertySchema);
module.exports = PropertyModel;
