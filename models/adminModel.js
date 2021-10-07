const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const { Schema, model } = mongoose;
const adminSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'A name must be required'],
			maxlength: [25, 'Max 25 chars allowed'],
		},
		docNumber: {
			type: Number,
		},
		leadTarget: {
			type: Number,
			default: 0,
		},
		completeLeadTarget: {
			type: Number,
			default: 0,
		},
		dealTarget: {
			type: Number,
			default: 0,
		},
		completeDealTarget: {
			type: Number,
			default: 0,
		},
		number: {
			type: String,
			maxlength: [10, 'Max 10 chars allowed'],
			required: [true, 'A phone number must be required'],

			default: null,
		},
		username: {
			type: String,
			required: [true, 'A username must be required'],
			maxlength: [25, 'Max 10 chars allowed'],
		},
		serialNumber: {
			type: Number,
			required: [true, 'A serialNumber must be required'],
			index: {
				unique: true,
			},
		},
		email: {
			type: String,
			unique: true,
			lowercase: true,
			required: [true, 'A email must be required'],
			validate: [validator.isEmail, 'Please use a valid email'],
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
		ableToSee: [
			{
				type: String,
				enum: {
					values: [
						'self-created-users',
						'other-staff-created-users',
						'google-users',
					],
					message:
						'ableToSee must be between <self-created-users> | <other-staff-created-users> | <google-users> ',
				},
				required: true,
			},
		],
		cities: [
			{
				type: mongoose.Schema.ObjectId,
				ref: 'City',
			},
		],
		city: {
			type: mongoose.Schema.ObjectId,
			ref: 'City',
		},
		password: {
			type: String,

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
		type: {
			type: String,
			enum: {
				values: [
					'super-admin',
					'admin',
					'gm',
					'bdm',
					'staff',
					'clientSupport',
					'digitalMarketing',
					'leadStrategist',
					'salesExecutive',
					'assistantSalesManager',
				],
				message:
					'role must be between <super-admin> | <admin> | <staff>',
			},
			default: 'staff',
		},
		propertyAccess: {
			type: [String],
			required: [true, 'Property access required'],
		},
		userAccess: {
			type: [String],
			required: [true, 'User access required'],
		},
		builderAccess: {
			type: [String],
			required: [true, 'Builder access required'],
		},
		expertQueryAccess: {
			type: [String],
			required: [true, 'Builder access required'],
		},
		propertyActions: {
			type: [String],
			required: [true, 'Property action required'],
		},
		userActions: {
			type: [String],
			required: [true, 'User action required'],
		},
		builderActions: {
			type: [String],
			required: [true, 'Builder action required'],
		},
		cityActions: {
			type: [String],
			required: [true, 'Builder action required'],
		},
		locationActions: {
			type: [String],
			required: [true, 'Builder action required'],
		},
		expertQueryActions: {
			type: [String],
			required: [true, 'Builder action required'],
		},
		propertyAccessCities: {
			type: [{ type: mongoose.Schema.ObjectId, ref: 'City' }],
			required: [true, 'Property access cities required'],
		},
		userAccessCities: {
			type: [{ type: mongoose.Schema.ObjectId, ref: 'City' }],
			required: [true, 'User access cities required'],
		},
		builderAccessCities: {
			type: [{ type: mongoose.Schema.ObjectId, ref: 'City' }],
			required: [true, 'Builder access cities required'],
		},
		kras: [
			{
				kraType: {
					type: String,
					enum: ['projectAdvertisement'],
				},
				id: {
					type: String,
				},
			},
		],
		staffAccess: [
			{
				type: mongoose.Schema.ObjectId,
				ref: 'Admin',
			},
		],

		passwordChangedAt: Date,
		// passwordResetToken: String,
		// passwordResetTokenExipersAt: Date,
	},
	{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

adminSchema.index({
	name: 1,
});

adminSchema.pre(/^find/, function (next) {
	this.populate({
		path: 'propertyAccessCities',
		select: 'id name',
	})
		.populate({
			path: 'userAccessCities',
			select: 'id name ',
		})
		.populate({
			path: 'builderAccessCities',
			select: 'id name ',
		})
		.populate({
			path: 'city',
			select: 'id name ',
		});

	next();
});

adminSchema.plugin(AutoIncrement, {
	inc_field: 'docNumber',
});

// QUERY MIDDLEWARE
// adminSchema.pre(/^find/, function (next) {
// 	this.find({ active: { $ne: false } });
// 	next();
// });

adminSchema.pre(/^find/, function (next) {
	this.populate('cities');
	next();
});

// DOCUMENT MIDDLEWARE
adminSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();
	this.password = await bcrypt.hash(this.password, 12);
});

adminSchema.pre('save', function (next) {
	if (!this.isModified(this.password) || this.isNew) return next();
	this.passwordChangedAt = Date.now() - 1000;
	next();
});

// adminSchema.pre('save', function (next) {
// 	if (
// 		!this.isModified(this.password) ||
// 		this.isNew ||
// 		this.number_verified == false
// 	)
// 		return next();
// 	this.otp = null;
// 	next();
// });

// INSTANCE METHODS
adminSchema.methods.correctPassword = async function (
	userPassword,
	dbPassword
) {
	return await bcrypt.compare(userPassword, dbPassword);
};

// adminSchema.methods.correctOtp = async function (otp) {
// 	return otp == this.otp;
// };

adminSchema.methods.passwordChanged = function (jwtCreated) {
	if (this.passwordChangedAt) {
		const passwordChangedAt = parseInt(
			this.passwordChangedAt.getTime() / 1000,
			10
		);
		if (jwtCreated < passwordChangedAt) return true;
	}

	return false;
};

const AdminModel = model('Admin', adminSchema);
module.exports = AdminModel;
