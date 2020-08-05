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
		photo: {
			type: String,
		},
		role: {
			type: String,
			enum: {
				values: ['user', 'admin'],
				message: 'role must be between <user> | <admin>',
			},
			default: 'user',
		},
		password: {
			type: String,
			minlength: [6, 'Minimum 6 characters required'],
			maxlength: [12, 'Minimum 12 characters required'],
			default: null,
			select: false,
		},

		active: {
			type: Boolean,
			default: true,
			select: false,
		},
		number_verified: {
			type: Boolean,
			default: false,
		},
		passwordChangedAt: Date,
		passwordResetToken: String,
		passwordResetTokenExipersAt: Date,
	},
	{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// QUERY MIDDLEWARE
userSchema.pre(/^find/, function (next) {
	this.find({ active: { $ne: false } });
	next();
});

// DOCUMENT MIDDLEWARE
userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();
	this.password = await bcrypt.hash(this.password, 12);
});

userSchema.pre('save', function (next) {
	if (!this.isModified(this.password) || this.isNew) return next();
	this.passwordChangedAt = Date.now() - 1000;
	next();
});

// INSTANCE METHODS
userSchema.methods.correctPassword = async function (userPassword, dbPassword) {
	return await bcrypt.compare(userPassword, dbPassword);
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

userSchema.methods.setToken = function () {
	// TOKEN FOR USER
	const token = crypto.randomBytes(32).toString('hex');
	// ENCRYPTED TOKEN FOR DB
	const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
	this.passwordResetToken = hashedToken;
	this.passwordResetTokenExipersAt = Date.now() + 10 * 60 * 1000;
	console.log({ token });
	console.log({ hashedToken });
	return token;
};

const UserModel = model('User', userSchema);
module.exports = UserModel;
