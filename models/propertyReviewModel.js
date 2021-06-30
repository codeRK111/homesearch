const mongoose = require('mongoose');
const validator = require('validator');

const { Schema, model } = mongoose;
const propertyReviewSchema = new Schema(
	{
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

		message: {
			type: String,
			required: [true, 'Please include a message'],
		},
		user: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
		},
	},
	{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
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

propertyReviewSchema.methods.correctOtp = function (otp) {
	return String(otp) === this.otp;
};

const searchFeedBack = model('PropertyReview', propertyReviewSchema);
module.exports = searchFeedBack;
