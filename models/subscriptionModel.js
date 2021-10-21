const mongoose = require('mongoose');
const validator = require('validator');
const moment = require('moment');
const { Schema, model } = mongoose;
const AutoIncrement = require('mongoose-sequence')(mongoose);
const AppError = require('./../utils/appError');
const Admin = require('./adminModel');
const subscriptionSchema = new Schema(
	{
		mainAmount: {
			type: Number,
			required: [true, 'Please provide main price'],
		},
		paidAmount: {
			type: Number,
			required: [true, 'Please provide paid price'],
		},
		user: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			default: null,
		},

		packageType: {
			type: String,
			enum: {
				values: ['tenantPackage'],
			},
			default: 'tenantPackage',
		},
		package: {
			type: String,
			required: [true, 'Package Required'],
		},
		totalPropertyAllowed: {
			type: Number,
		},
		orderId: {
			type: String,
		},
		paymentId: {
			type: String,
		},
		remainingProperties: {
			type: Number,
		},
		subscriptionNumber: {
			type: Number,
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
		timestamps: true,
	}
);

subscriptionSchema.plugin(AutoIncrement, {
	inc_field: 'subscriptionNumber',
});

subscriptionSchema.pre(/^find/, function (next) {
	this.populate({
		path: 'user',
		select: 'id name email number',
	});

	next();
});

const subscriptions = model('subscription', subscriptionSchema);
module.exports = subscriptions;
