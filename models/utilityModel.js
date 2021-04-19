const mongoose = require('mongoose');

const { Schema, model } = mongoose;
const utilitySchema = new Schema(
	{
		builderPackages: [
			{
				name: String,
				price: Number,
			},
		],
	},

	{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const UtilityModel = model('Utility', utilitySchema);
module.exports = UtilityModel;
