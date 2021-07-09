const mongoose = require('mongoose');

const { Schema, model } = mongoose;
const propertyPackageSchema = new Schema(
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
				detail: {
					type: String,
				},
			},
		],
		expiresAt: {
			type: Date,
			default: null,
			select: false,
			required: [true, 'expiry date required'],
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
