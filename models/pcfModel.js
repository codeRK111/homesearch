const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const pcfSchema = new Schema(
	{
		pcfRole: {
			type: String,
		},
	},
	{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const pcfModel = model('PCF', pcfSchema);

module.exports = pcfModel;
