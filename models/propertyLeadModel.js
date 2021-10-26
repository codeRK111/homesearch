const mongoose = require('mongoose');
const validator = require('validator');
const moment = require('moment');
const { Schema, model } = mongoose;
const AppError = require('./../utils/appError');
const Admin = require('./adminModel');
const propertyLeadSchema = new Schema(
	{
		name: {
			type: String,
		},
		email: {
			type: String,
		},

		createdBy: {
			type: mongoose.Schema.ObjectId,
			ref: 'Admin',
			default: null,
		},

		number: {
			type: String,
			required: [true, 'number required'],
		},

		status: {
			type: String,
			enum: {
				values: ['active', 'inactive'],
			},
			default: 'active',
		},
		for: {
			type: String,
			enum: {
				values: ['rent', 'sale'],
			},
			required: [true, 'for required'],
		},
		facing: {
			type: String,
			enum: {
				values: ['east', 'west', 'north', 'south'],
				message:
					'facing must be between <east> | <west> | <north> |<south> ',
			},
			required: [true, 'facing required'],
		},
		amenities: {
			type: [
				{
					type: mongoose.Schema.ObjectId,
					ref: 'Amenity',
				},
			],
		},
		superBuiltupArea: {
			type: Number,
		},
		carpetArea: {
			type: Number,
		},
		floor: {
			type: Number,
		},
		propertyOnFloor: {
			type: String,
		},
		availableFor: [
			{
				type: String,
			},
		],
		maintainanceFee: {
			type: Number,
		},
		petAllowed: {
			type: Number,
		},
		lat: {
			type: Number,
		},
		lng: {
			type: Number,
		},

		minPrice: {
			type: String,
		},
		maxPrice: {
			type: String,
		},

		photos: [
			{
				type: String,
			},
		],
		propertyRequirements: [
			{
				type: String,
			},
		],
		location: {
			type: mongoose.Schema.ObjectId,
			ref: 'Location',
		},

		city: {
			type: mongoose.Schema.ObjectId,
			ref: 'City',
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
		timestamps: true,
	}
);

propertyLeadSchema.pre(/^find/, function (next) {
	this.populate({
		path: 'createdBy',
		select: 'id name',
	})
		.populate('city')
		.populate('location');

	next();
});

const PropertyLeads = model('PropertyLead', propertyLeadSchema);
module.exports = PropertyLeads;
