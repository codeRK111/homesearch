const mongoose = require('mongoose');

const { Schema, model } = mongoose;
const propertyPackageSchema = new Schema(
	{
		name: {
			type: String,
			unique: true,
			required: [true, 'Package name required'],
		},
		category: {
			type: String,
			enum: ['tenant', 'builder', 'realtor', 'owner', 'buyer'],
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
		gst: {
			type: mongoose.Schema.ObjectId,
			ref: 'gst',
			default: null,
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

propertyPackageSchema.pre(/^find/, function (next) {
	this.populate({
		path: 'gst',
	});

	next();
});

const PropertyPackageModel = model('PropertyPackage', propertyPackageSchema);
module.exports = PropertyPackageModel;
