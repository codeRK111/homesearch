const mongoose = require('mongoose');
const validator = require('validator');
const moment = require('moment');
const { Schema, model } = mongoose;
const leadsSchema = new Schema(
	{
		name: {
			type: String,
		},
		email: {
			type: String,
		},
		message: {
			type: String,
		},
		feedback: {
			type: String,
		},
		attended: {
			type: Boolean,
			default: false,
		},
		clientSupport: {
			type: mongoose.Schema.ObjectId,
			ref: 'Admin',
			default: null,
		},
		createdBy: {
			type: mongoose.Schema.ObjectId,
			ref: 'Admin',
			default: null,
		},
		assignedAt: {
			type: Date,
			default: null,
		},
		number: {
			type: String,
			required: [true, 'number required'],
		},

		status: {
			type: String,
			enum: {
				values: ['active', 'inactive'],
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

leadsSchema.pre(/^find/, function (next) {
	this.populate({
		path: 'clientSupport',
		select: 'id name',
	}).populate({
		path: 'createdBy',
		select: 'id name',
	});

	next();
});

const leads = model('lead', leadsSchema);
module.exports = leads;
