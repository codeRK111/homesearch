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
		dealBy: {
			type: mongoose.Schema.ObjectId,
			ref: 'Admin',
			default: null,
		},
		paymentLink: {
			type: mongoose.Schema.ObjectId,
			ref: 'paymentlink',
			default: null,
		},

		packageType: {
			type: String,
			enum: {
				values: ['tenantPackage', 'paymentLink'],
			},
			default: 'tenantPackage',
		},
		package: {
			type: String,
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
	}).populate({
		path: 'dealBy',
		select: 'id name',
	});

	next();
});

const subscriptions = model('subscription', subscriptionSchema);
module.exports = subscriptions;
