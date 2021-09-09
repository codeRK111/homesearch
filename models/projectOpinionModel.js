const mongoose = require('mongoose');
const validator = require('validator');

const { Schema, model } = mongoose;
const projectOpinionSchema = new Schema(
	{
		parkingEasy: {
			type: Boolean,
			default: false,
		},
		walkableDistanceFromMarket: {
			type: Boolean,
			default: false,
		},
		studentArea: {
			type: Boolean,
			default: false,
		},
		dogFriendly: {
			type: Boolean,
			default: false,
		},
		familyArea: {
			type: Boolean,
			default: false,
		},
		safeArea: {
			type: Boolean,
			default: false,
		},

		user: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
		},
		project: {
			type: mongoose.Schema.ObjectId,
			ref: 'Project',
		},
		status: {
			type: String,
			enum: {
				values: ['active', 'inactive'],
				message: 'role must be between <active> | <inactive>',
			},
			default: 'active',
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
		timestamps: true,
	}
);

projectOpinionSchema.pre(/^find/, function (next) {
	this.populate({
		path: 'user',
		select: '-city -googleId -photoStatus -createdAt -paymentStatus -email -serialNumber -gender -createdBy -registerThrough -registerVia -passwordChangedAt -__v ',
	}).populate({
		path: 'project',
		select: '+id +title',
	});
	next();
});

projectOpinionSchema.pre(/^find/, function (next) {
	this.populate({
		path: 'property',
		select: 'id title',
	}).populate({
		path: 'project',
		select: 'id title ',
	});

	next();
});

const projectOpinion = model('ProjectOpinion', projectOpinionSchema);
module.exports = projectOpinion;
