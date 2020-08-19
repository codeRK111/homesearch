const mongoose = require('mongoose');

const { Schema, model } = mongoose;
const locationSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'A name must be required'],
		},
		city: {
			type: mongoose.Schema.ObjectId,
			ref: 'City',
			required: [true, 'User must have a city'],
		},
	},
	{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const LocationModel = model('Location', locationSchema);
module.exports = LocationModel;
