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

const leads = model('lead', leadsSchema);
module.exports = leads;
