const mongoose = require('mongoose');

const { Schema, model } = mongoose;
const amenitiesSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'A name must be required'],
			unique: true,
		},
		type: {
			type: String,
			enum: {
				values: ['internal', 'external'],
			},
			default: 'external',
		},
	},
	{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const AmenitiesModel = model('Amenity', amenitiesSchema);
module.exports = AmenitiesModel;
