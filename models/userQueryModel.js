const mongoose = require('mongoose');
const validator = require('validator');
const moment = require('moment');
const { Schema, model } = mongoose;
const userQuerySchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'Name required'],
		},
		email: {
			type: String,
		},
		message: {
			type: String,
			required: [true, 'message required'],
		},
		number: {
			type: String,
			required: [true, 'number required'],
		},

		user: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			default: null,
		},
		responseBy: {
			type: Schema.ObjectId,
			ref: 'Admin',
			default: null,
		},

		queryStatus: {
			type: String,
			enum: {
				values: ['pending', 'resolved'],
			},
			default: 'pending',
		},
		response: {
			type: String,
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
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
		timestamps: true,
	}
);

userQuerySchema.pre(/^find/, function (next) {
	this.populate({
		path: 'user',
		select: 'id name email number',
	}).populate({
		path: 'responseBy',
		select: 'id name',
	});

	next();
});

userQuerySchema.methods.correctOtp = function (otp) {
	return String(otp) === this.otp;
};

userQuerySchema.methods.otpExpired = function () {
	return moment().isSameOrAfter(this.otpExpiresAt);
};

const userQuery = model('UserQuery', userQuerySchema);
module.exports = userQuery;
