const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const { Schema, model } = mongoose;
const userSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'A name must be required'],
			maxlength: [25, 'Max 25 chars allowed'],
		},
		serialNumber: {
			type: Number,
			required: [true, 'A serialNumber must be required'],
			index: {
				unique: true,
			},
		},
		number: {
			type: String,
			maxlength: [10, 'Max 10 chars allowed'],
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
		googleId: {
			type: String,
			required: false, // only required for facebook users
			index: {
				unique: true,
				partialFilterExpression: { googleId: { $type: 'string' } },
			},
			default: null,
		},
		city: {
			type: mongoose.Schema.ObjectId,
			ref: 'City',
			required: [true, 'User must have a city'],
		},
		photo: {
			type: String,
		},
		photoStatus: {
			type: String,
			enum: {
				values: ['uploaded', 'not-uploaded'],
				message:
					'gender must be between <uploaded> | <not-uploaded> | <other>',
			},
			default: 'not-uploaded',
		},
		gender: {
			type: String,
			enum: {
				values: ['male', 'female', 'other'],
				message: 'gender must be between <male> | <female> | <other>',
			},
			required: true,
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
		password: {
			type: String,
			minlength: [6, 'Minimum 6 characters required'],
			maxlength: [12, 'Minimum 12 characters required'],
			default: null,
			select: false,
		},
		otp: {
			type: String,
			maxlength: [4, 'Minimum 12 characters required'],
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
				values: ['google', 'facebook', 'site login', 'admin', 'staff'],
				message:
					'role must be between <google> | <facebook> | <site-login>',
			},
			required: true,
		},
		createdBy: {
			type: String,
		},
		registerVia: {
			type: String,
			required: [true, 'Register via required'],
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
		passwordChangedAt: Date,
		// passwordResetToken: String,
		// passwordResetTokenExipersAt: Date,
	},
	{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

userSchema.index({
	name: 1,
});

// QUERY MIDDLEWARE
userSchema.pre(/^find/, function (next) {
	this.find({ active: { $ne: false } });
	next();
});

userSchema.pre(/^find/, function (next) {
	this.populate('city');
	next();
});

// DOCUMENT MIDDLEWARE
userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();
	this.password = await bcrypt.hash(this.password, 12);
});

userSchema.pre('save', function (next) {
	if (!this.isModified(this.password) || this.isNew) {
		console.log('pass', this.isModified(this.password));
		console.log(this.isNew);
		return next();
	}
	console.log(this.isModified(this.password))
	console.log('updated');
	this.passwordChangedAt = Date.now() - 1000;
	next();
});

userSchema.pre('save', function (next) {
	if (
		!this.isModified(this.password) ||
		this.isNew ||
		this.numberVerified == false
	)
		return next();
	this.otp = null;
	next();
});

// INSTANCE METHODS
userSchema.methods.correctPassword = async function (userPassword, dbPassword) {
	return await bcrypt.compare(userPassword, dbPassword);
};

userSchema.methods.correctOtp = async function (otp) {
	return otp == this.otp;
};

userSchema.methods.passwordChanged = function (jwtCreated) {
	if (this.passwordChangedAt) {
		const passwordChangedAt = parseInt(
			this.passwordChangedAt.getTime() / 1000,
			10
		);
		if (jwtCreated < passwordChangedAt) return true;
	}

	return false;
};

const UserModel = model('User', userSchema);
module.exports = UserModel;
