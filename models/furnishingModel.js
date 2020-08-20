const mongoose = require('mongoose');

const { Schema, model } = mongoose;
const furnishSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'A name must be required'],
			index: {
				unique: true,
			},
		},
		type: {
			type: String,
			enum: {
				values: ['kitchen', 'other'],
			},
			default: 'other',
		},
	},
	{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const FurnishModel = model('Furnish', furnishSchema);
module.exports = FurnishModel;
