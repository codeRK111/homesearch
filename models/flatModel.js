const mongoose = require('mongoose');

const { Schema, model } = mongoose;
const flatSchema = new Schema(
	{
		for: {
			type: String,
			enum: {
				values: ['rent', 'resale'],
				message: 'for must be between <rent> | <resale> ',
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
			required: [true, 'Please specify number of bed rooms'],
		},
		toilets: [
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
			required: [true, 'Please specify number of balconies'],
		},
		furnished: {
			type: String,
			enum: {
				values: ['unfurnished', 'furnished', 'semifurnished'],
				message:
					'furnished must be between <unfurnished> | <furnished> | <semifurnished> ',
			},
			required: true,
		},
		furnishes: [
			{
				type: mongoose.Schema.ObjectId,
				ref: 'Furnish',
			},
		],
		externalAmenities: [
			{
				type: mongoose.Schema.ObjectId,
				ref: 'Amenity',
			},
		],
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
	},
	{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const FlatModel = model('Flat', flatSchema);
module.exports = FlatModel;
