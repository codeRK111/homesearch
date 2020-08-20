const mongoose = require('mongoose');

const { Schema, model } = mongoose;
const propertySchema = new Schema(
	{
		for: {
			type: String,
			enum: {
				values: ['rent', 'resale'],
				message: 'for must be between <rent> | <resale> ',
			},
			required: true,
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
			required: true,
		},
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
					values: ['veg', 'nonveg', 'none'],
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
		distanceCollege: {
			type: Number,
		},
		distanceRailwayStation: {
			type: Number,
		},
		distanceAirport: {
			type: Number,
		},
		distanceMetroStation: {
			type: Number,
		},
		distanceBusStop: {
			type: Number,
		},
		distanceHospital: {
			type: Number,
		},
		distanceShoppingMall: {
			type: Number,
		},
		distanceBank: {
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
		userId: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			required: true,
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
				values: ['active', 'inactive'],
			},
			default: 'inactive',
		},
	},
	{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

propertySchema.index({
	status: 1,
	city: 1,
	type: 1,
});

const PropertyModel = model('Property', propertySchema);
module.exports = PropertyModel;
