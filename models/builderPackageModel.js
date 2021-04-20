const mongoose = require('mongoose');

const { Schema, model } = mongoose;
const builderPackageSchema = new Schema(
	{
		name: {
			type: String,
			unique: true,
			required: [true, 'Package name required'],
		},
		price: {
			type: Number,
			required: [true, 'Price required'],
		},
		packageDetails: [
			{
				type: String,
			},
		],
		photo: {
			type: String,
			default: null,
		},
		status: {
			type: String,
			enum: ['active', 'inactive'],
			default: 'active',
		},
	},

	{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const BuilderPackageModel = model('BuilderPackage', builderPackageSchema);
module.exports = BuilderPackageModel;
