const mongoose = require('mongoose');

const { Schema, model } = mongoose;
const propertyPackageSchema = new Schema(
	{
		name: {
			type: String,
			unique: true,
			required: [true, 'Package name required'],
		},
		actualPrice: {
			type: Number,
			required: [true, 'actualPrice required'],
		},
		price: {
			type: Number,
			required: [true, 'Price required'],
		},
		packageDetails: [
			{
				detail: {
					type: String,
				},
				detailType: {
					type: String,
					enum: ['present', 'absent'],
					default: 'present',
				},
			},
		],

		mostPopular: {
			type: Boolean,
			default: false,
		},
		status: {
			type: String,
			enum: ['active', 'inactive'],
			default: 'active',
		},
	},

	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
		timestamps: true,
	}
);

const PropertyPackageModel = model('PropertyPackage', propertyPackageSchema);
module.exports = PropertyPackageModel;
