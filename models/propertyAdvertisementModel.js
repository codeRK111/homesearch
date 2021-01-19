const mongoose = require('mongoose');

const { Schema, model } = mongoose;
const projectAdvertisementSchema = new Schema(
	{
		staff: {
			type: mongoose.Schema.ObjectId,
			ref: 'Admin',
			required: [true, 'A staff required '],
		},
		admin: {
			type: mongoose.Schema.ObjectId,
			ref: 'Admin',
			required: [true, 'A staff required '],
		},
		minCallsPerDay: {
			type: Number,
			required: [true, 'Minimum calls per day required'],
		},
		minCallsPerMonth: {
			type: Number,
			required: [true, 'Minimum calls per month required'],
		},
		message: {
			type: String,
		},
		createdAt: {
			type: Date,
			default: Date.now(),
		},
	},
	{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

projectAdvertisementSchema.pre(/^find/, function (next) {
	this.populate({
		path: 'staff',
		select: 'id name',
	}).populate({
		path: 'admin',
		select: 'id name ',
	});

	next();
});

const ProjectAdvertisementModel = model(
	'ProjectAdvertisement',
	projectAdvertisementSchema
);
module.exports = ProjectAdvertisementModel;
