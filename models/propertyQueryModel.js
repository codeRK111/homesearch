const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const validator = require('validator');

const { Schema, model } = mongoose;
const propertyQuerySchema = new Schema(
	{
		userName: {
			type: String,
		},
		docId: {
			type: Number,
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
		},
		project: {
			type: mongoose.Schema.ObjectId,
			ref: 'Project',
		},
		projectProperty: {
			type: mongoose.Schema.ObjectId,
			ref: 'ProjectProperty',
		},
		owner: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			default: null,
		},
		builder: {
			type: mongoose.Schema.ObjectId,
			ref: 'Builder',
			default: null,
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
		type: {
			type: String,
			enum: {
				values: ['property', 'project', 'projectproperty'],
			},
			default: 'property',
		},
		pFor: {
			type: String,
			enum: {
				values: ['rent', 'sale', 'project', null],
			},
			default: null,
		},
		pType: {
			type: String,
			enum: {
				values: [
					'flat',
					'land',
					'independenthouse',
					'hostel',
					'pg',
					null,
				],
			},
			default: null,
		},
		queryType: {
			type: String,
			enum: {
				values: ['number', 'message', 'whatsapp'],
			},
			default: 'number',
		},
		via: {
			type: String,
			enum: {
				values: ['app', 'web'],
			},
			default: 'web',
		},
		verified: {
			type: Boolean,

			default: false,
		},
		otp: {
			type: String,
			default: null,
			select: false,
		},
		conversation: [
			{
				message: String,
				date: {
					type: Date,
					default: Date.now(),
				},
			},
		],
	},
	{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

propertyQuerySchema.plugin(AutoIncrement, { inc_field: 'docId' });

propertyQuerySchema.pre(/^find/, function (next) {
	this.populate({
		path: 'property',
		select: 'id title for',
	})
		.populate({
			path: 'owner',
			select: 'id name email number',
		})
		.populate({
			path: 'builder',
			select: 'id developerName email phoneNumber',
		})
		.populate({
			path: 'user',
			select: 'id name',
		})
		.populate({
			path: 'project',
			select: 'id title ',
		})
		.populate({
			path: 'projectProperty',
			select: 'id title project',
		});

	next();
});

propertyQuerySchema.methods.correctOtp = function (otp) {
	return Number(otp) === Number(this.otp);
};

propertyQuerySchema.methods.otpExpired = function () {
	return moment().isSameOrAfter(this.otpExpiresAt);
};

const propertyQuery = model('PropertyQuery', propertyQuerySchema);
module.exports = propertyQuery;
