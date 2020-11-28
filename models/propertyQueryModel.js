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
			required: [true, 'Property Required'],
		},
		owner: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			required: [true, 'Owner Required'],
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
		});

	next();
});

const propertyQuery = model('PropertyQuery', propertyQuerySchema);
module.exports = propertyQuery;
