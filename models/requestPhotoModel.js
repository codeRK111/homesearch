const mongoose = require('mongoose');
const validator = require('validator');

const { Schema, model } = mongoose;
const photoRequestSchema = new Schema(
	{
		userName: {
			type: String,
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
			validate: {
				validator: function (value) {
					if (this.propertyType === 'property') {
						if (!value) {
							return false;
						}
					}
					return true;
				},
				message: 'Please give property details',
			},
		},
		project: {
			type: mongoose.Schema.ObjectId,
			ref: 'Project',
			validate: {
				validator: function (value) {
					if (this.propertyType === 'project') {
						if (!value) {
							return false;
						}
					}
					return true;
				},
				message: 'Please give project details',
			},
		},
		projectProperty: {
			type: mongoose.Schema.ObjectId,
			ref: 'ProjectProperty',
			validate: {
				validator: function (value) {
					if (this.propertyType === 'projectproperty') {
						if (!value) {
							return false;
						}
					}
					return true;
				},
				message: 'Please give a property of the project',
			},
		},

		propertyType: {
			type: String,
			enum: {
				values: ['property', 'project', 'projectproperty'],
			},
			default: 'property',
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
	},
	{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

photoRequestSchema.pre(/^find/, function (next) {
	this.populate({
		path: 'property',
		select: 'id title',
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

photoRequestSchema.methods.correctOtp = function (otp) {
	return String(otp) === this.otp;
};

const searchFeedBack = model('PhotoRequest', photoRequestSchema);
module.exports = searchFeedBack;
