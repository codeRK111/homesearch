const mongoose = require('mongoose');
const validator = require('validator');
const moment = require('moment');
const { Schema, model } = mongoose;
const whatsappQuerySchema = new Schema(
	{
		userName: {
			type: String,
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
			lowercase: true,
			validate: [validator.isEmail, 'Please use a valid email'],
		},

		createdAt: {
			type: Date,
			default: Date.now(),
		},
		property: {
			type: mongoose.Schema.ObjectId,
			ref: 'Property',
		},
		project: {
			type: mongoose.Schema.ObjectId,
			ref: 'Project',
		},
		projectProperty: {
			type: mongoose.Schema.ObjectId,
			ref: 'ProjectProperty',
		},
		owner: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			default: null,
		},
		builder: {
			type: mongoose.Schema.ObjectId,
			ref: 'Builder',
			default: null,
		},
		user: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			default: null,
		},
		message: {
			type: String,
		},

		status: {
			type: String,
			enum: {
				values: ['pending', 'resolved'],
			},
			default: 'pending',
		},
		type: {
			type: String,
			enum: {
				values: ['property', 'project', 'projectProperty'],
			},
			default: 'property',
		},
		propertyFor: {
			type: String,
			enum: {
				values: ['rent', 'sale', 'project', 'projectProperty'],
			},
			default: null,
		},
		verified: {
			type: Boolean,

			default: false,
		},
		otp: {
			type: String,
			default: null,
			select: false,
		},
		otpExpiresAt: {
			type: Date,
			default: null,
			select: false,
		},
	},
	{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

whatsappQuerySchema.pre(/^find/, function (next) {
	this.populate({
		path: 'property',
		select: 'id title',
	})
		.populate({
			path: 'owner',
			select: 'id name number',
		})
		.populate({
			path: 'user',
			select: 'id name number',
		})
		.populate({
			path: 'builder',
			select: 'id developerName phoneNumber',
		})
		.populate({
			path: 'project',
			select: 'id title ',
		});

	next();
});

whatsappQuerySchema.methods.correctOtp = function (otp) {
	return Number(otp) === Number(this.otp);
};

whatsappQuerySchema.methods.otpExpired = function () {
	return moment().isSameOrAfter(this.otpExpiresAt);
};

const propertyQuery = model('WhatsappQuery', whatsappQuerySchema);
module.exports = propertyQuery;
