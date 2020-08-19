const mongoose = require('mongoose');

const { Schema, model } = mongoose;
const furnishSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'A name must be required'],
		},
	},
	{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const FurnishModel = model('Furnish', furnishSchema);
module.exports = FurnishModel;
