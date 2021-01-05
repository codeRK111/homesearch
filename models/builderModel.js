const mongoose = require('mongoose');
const validator = require('validator');

const { Schema, model } = mongoose;
const builderSchema = new Schema(
	{
		developerName: {
			type: String,
			required: [true, 'A developerName must be required'],
		},
		description: {
			type: String,
			required: [true, 'A description must be required'],
		},
		officeAddress: {
			type: String,
			required: [true, 'A officeAddress must be required'],
		},
		phoneNumber: {
			type: String,
			maxlength: [10, '10 chars allowed for phone_number'],
			minlength: [10, '10 chars allowed for phone_number'],
			index: {
				unique: true,
				partialFilterExpression: { number: { $type: 'string' } },
			},
			default: null,
		},
		email: {
			type: String,
			unique: true,
			lowercase: true,
			required: [true, 'A email must be required'],
			validate: [validator.isEmail, 'Please use a valid email'],
		},
		operatingSince: {
			type: Date,
			default: Date.now(),
		},
		createdAt: {
			type: Date,
			default: Date.now(),
		},
		cities: [
			{
				type: mongoose.Schema.ObjectId,
				ref: 'City',
				required: [true, 'Builder must have some cities'],
			},
		],
		// location: {
		// 	type: mongoose.Schema.ObjectId,
		// 	ref: 'Location',
		// 	required: [true, 'Missing location'],
		// },
		logo: {
			type: String,
			default: null,
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
		image5: {
			type: String,
			default: null,
		},
		image6: {
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
		adminId: {
			type: mongoose.Schema.ObjectId,
			ref: 'Admin',
			default: null,
		},
	},
	{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

builderSchema.pre(/^find/, function (next) {
	this.populate('cities');
	next();
});

const BuilderModel = model('Builder', builderSchema);
module.exports = BuilderModel;
