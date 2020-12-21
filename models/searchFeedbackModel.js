const mongoose = require('mongoose');
const validator = require('validator');

const { Schema, model } = mongoose;
const searchFeedBackSchema = new Schema(
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
		message: {
			type: String,
		},
		searchResult: {
			type: Boolean,
			required: [true, 'Search result required'],
		},
		propertyType: {
			type: String,
			enum: {
				values: ['property', 'project', 'projectproperty'],
			},
			default: 'property',
		},
		category: {
			type: String,
			validate: {
				validator: function (value) {
					if (this.searchResult === false) {
						if (!value) {
							return false;
						}
					}
					return true;
				},
				message: 'Please give a category',
			},
		},
	},
	{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

searchFeedBackSchema.pre(/^find/, function (next) {
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

searchFeedBackSchema.methods.correctOtp = function (otp) {
	return String(otp) === this.otp;
};

const searchFeedBack = model('SearchFeedback', searchFeedBackSchema);
module.exports = searchFeedBack;
