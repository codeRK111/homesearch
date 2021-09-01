const mongoose = require('mongoose');

const { Schema, model } = mongoose;
const citySchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'A name must be required'],
		},
		state: {
			type: String,
			required: [true, 'A state must be required'],
		},
		image: {
			type: String,
			default: null,
		},
		top: {
			type: Boolean,
			default: false,
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
	{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const CityModel = model('City', citySchema);
module.exports = CityModel;
