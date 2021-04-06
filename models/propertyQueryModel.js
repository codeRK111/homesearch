const mongoose = require('mongoose');
const validator = require('validator');

const { Schema, model } = mongoose;
const propertyQuerySchema = new Schema(
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
				values: ['property', 'project', 'projectproperty'],
			},
			default: 'property',
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
		conversation: [
			{
				message: String,
				date: {
					type: Date,
					default: Date.now(),
				},
			},
		],
	},
	{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

propertyQuerySchema.pre(/^find/, function (next) {
	this.populate({
		path: 'property',
		select: 'id title',
	})
		.populate({
			path: 'owner',
			select: 'id name ',
		})
		.populate({
			path: 'user',
			select: 'id name',
		})
		.populate({
			path: 'project',
			select: 'id title ',
		})
		.populate({
			path: 'projectProperty',
			select: 'id title project',
		});

	next();
});

propertyQuerySchema.methods.correctOtp = function (otp) {
	console.log(otp);
	console.log(this.otp);
	return Number(otp) === Number(this.otp);
};

propertyQuerySchema.methods.otpExpired = function () {
	return moment().isSameOrAfter(this.otpExpiresAt);
};


const propertyQuery = model('PropertyQuery', propertyQuerySchema);
module.exports = propertyQuery;
