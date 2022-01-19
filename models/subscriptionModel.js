const mongoose = require('mongoose');
const validator = require('validator');
const moment = require('moment');
const { Schema, model } = mongoose;
const AutoIncrement = require('mongoose-sequence')(mongoose);
const AppError = require('./../utils/appError');
const Admin = require('./adminModel');
const subscriptionSchema = new Schema(
	{
		name: {
			type: String,
		},
		email: {
			type: String,
		},
		number: {
			type: String,
		},
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
				values: ['tenantPackage', 'paymentLink', 'consultantFee'],
			},
			default: 'tenantPackage',
		},
		package: {
			type: String,
		},
		packageId: {
			type: mongoose.Schema.ObjectId,
			ref: 'PropertyPackage',
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
		paymentReviewStatus: {
			type: String,
			enum: ['not-sent', 'sent', 'received'],
			default: 'not-sent',
		},
		paymentMode: {
			type: String,
			enum: ['cash', 'online', 'gateway'],
			default: 'online',
		},
		paymentReview: {
			type: String,
		},
		paymentRating: {
			type: Number,
		},
		feedbackAt: {
			type: Date,
		},
		invoice: {
			type: String,
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
	})
		.populate({
			path: 'dealBy',
			select: 'id name',
		})
		.populate({
			path: 'packageId',
		});

	next();
});

const subscriptions = model('subscription', subscriptionSchema);
module.exports = subscriptions;
