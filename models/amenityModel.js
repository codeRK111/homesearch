const mongoose = require('mongoose');

const { Schema, model } = mongoose;
const amenitiesSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'A name must be required'],
		},
	},
	{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const AmenitiesModel = model('Amenity', amenitiesSchema);
module.exports = AmenitiesModel;
