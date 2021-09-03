const mongoose = require('mongoose');
const validator = require('validator');

const { Schema, model } = mongoose;
const propertyReviewSchema = new Schema(
	{
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

		propertyType: {
			type: String,
			enum: {
				values: ['property', 'project'],
			},
			default: 'property',
		},
		propertyItemType: {
			type: String,
			enum: {
				values: ['flat', 'independenthouse', 'land'],
			},
		},
		pFor: {
			type: String,
			enum: {
				values: ['rent', 'sale', 'project'],
			},
		},

		message: {
			type: String,
			required: [true, 'Please include a message'],
		},
		user: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
		},
		status: {
			type: String,
			enum: {
				values: ['active', 'inactive'],
				message: 'role must be between <active> | <inactive>',
			},
			default: 'inactive',
		},
		top: {
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

propertyReviewSchema.pre(/^find/, function (next) {
	this.populate({
		path: 'user',
		select: '-city -googleId -photoStatus -createdAt -paymentStatus -email -serialNumber -gender -createdBy -registerThrough -registerVia -passwordChangedAt -__v ',
	});
	next();
});

propertyReviewSchema.pre(/^find/, function (next) {
	this.populate({
		path: 'property',
		select: 'id title',
	}).populate({
		path: 'project',
		select: 'id title ',
	});

	next();
});

const propertyReview = model('PropertyReview', propertyReviewSchema);
module.exports = propertyReview;
