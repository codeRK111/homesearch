const mongoose = require('mongoose');
const moment = require('moment');
const { Schema, model } = mongoose;
const joinRequestSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'Please provide name'],
		},
		email: {
			type: String,
			required: [true, 'Please provide email'],
		},
		phoneNumber: {
			type: String,
			unique: true,
			required: [true, 'Please provide phoneNumber'],
		},
		otp: {
			type: String,
			default: null,
		},
		otpExpiresAt: {
			type: Date,
			select: false,
		},
		verified: {
			type: Boolean,
			default: false,
		},
		type: {
			type: String,
			enum: {
				values: ['builder', 'agent'],
			},
			required: [true, 'Please provide type'],
		},
		remark: {
			type: String,
		},
		remarkBy: {
			type: Schema.ObjectId,
			ref: 'Admin',
			default: null,
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
		timestamps: true,
	}
);

joinRequestSchema.pre(/^find/, function (next) {
	this.populate({
		path: 'remarkBy',
		select: 'id name',
	});

	next();
});

joinRequestSchema.methods.correctOtp = function (otp) {
	return String(otp) === this.otp;
};

joinRequestSchema.methods.otpExpired = function () {
	return moment().isSameOrAfter(this.otpExpiresAt);
};

const propertyQuery = model('JoinRequest', joinRequestSchema);
module.exports = propertyQuery;
