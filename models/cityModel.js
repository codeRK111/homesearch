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
	},
	{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const CityModel = model('City', citySchema);
module.exports = CityModel;
