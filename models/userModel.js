const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const { Schema, model } = mongoose;
const userSchema = new Schema(
	{
		name: {
			type: String,
			maxlength: [25, 'Max 25 chars allowed'],
			default: null,
		},
		
		number: {
			type: String,
			maxlength: [10, 'Max 10 chars allowed'],
			required: [true, 'A phone number must be required'],
			index: {
				unique: true,
				partialFilterExpression: { number: { $type: 'string' } },
			},
			default: null,
		},
		email: {
			type: String,
			
			lowercase: true,
			index: {
				unique: true,
				partialFilterExpression: { email: { $type: 'string' } },
			},
			default: null,
		},
		
		city: {
			type: mongoose.Schema.ObjectId,
			ref: 'City',
			default: null
		},
		photo: {
			type: String,
			default: null,
		},
		
		gender: {
			type: String,
			enum: {
				values: ['male', 'female', 'other'],
				message: 'gender must be between <male> | <female> | <other>',
			},
		},
		role: {
			type: String,
			enum: {
				values: ['builder', 'agent', 'owner', 'tenant'],
				message:
					'role must be between <builder> | <agent> | <owner> | <tenant>',
			},
			required: true,
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
		createdAt: {
			type: Date,
			default: Date.now(),
		},
		status: {
			type: String,
			enum: {
				values: ['active', 'inactive'],
				message: 'role must be between <active> | <inactive>',
			},
			default: 'active',
		},
		mobileStatus: {
			type: String,
			enum: {
				values: ['semi-private', 'private', 'public'],
				message: 'role must be between <semi-private> | <private>',
			},
			required: true,
		},
		registerThrough: {
			type: String,
			enum: {
				values: [ 'site login', 'admin', 'staff'],
				message:
					'registerThrough must be between <site login> | <admin> | <staff>',
			},
			required: true,
		},
		adminId: {
			type: mongoose.Schema.ObjectId,
			ref: 'Admin',
			default: null,
		},
		createdBy: {
			type: String,
		},
		registerVia: {
			type: String,
			enum: {
				values: [ 'web', 'app'],
				message:
					'registerVia must be between <web> | <app> ',
			},
			required: true,
		},
		paymentStatus: {
			type: String,
			enum: {
				values: ['paid', 'unpaid'],
			},
			default: 'unpaid',
		},
		numberVerified: {
			type: Boolean,
			default: false,
		},
		// passwordResetToken: String,
		// passwordResetTokenExipersAt: Date,
	},
	{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

userSchema.index({
	name: 1,
});

// QUERY MIDDLEWARE
// userSchema.pre(/^find/, function (next) {
// 	this.find({ active: { $ne: false } });
// 	next();
// });

userSchema.pre(/^find/, function (next) {
	this.populate('city');
	next();
});

// DOCUMENT MIDDLEWARE






// INSTANCE METHODS


userSchema.methods.correctOtp = function (otp) {
	return String(otp) === this.otp;
};

userSchema.methods.otpExpired = function () {
	console.log(this.otpExpiresAt);
	return moment().isSameOrAfter(this.otpExpiresAt);
};




const UserModel = model('User', userSchema);
module.exports = UserModel;
