const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const AutoIncrement = require('mongoose-sequence')(mongoose);
const paymentLinkSchema = new Schema(
	{
		amount: {
			type: Number,
			required: [true, 'Please provide amount'],
		},
		phone: {
			type: String,
		},
		name: {
			type: String,
		},
		notes: {
			type: String,
		},
		paymentLinkNumber: {
			type: Number,
		},
		dealBy: {
			type: mongoose.Schema.ObjectId,
			ref: 'Admin',
			default: null,
		},
		status: {
			type: String,
			enum: {
				values: ['active', 'inactive'],
			},
			default: 'active',
		},
		expiryDate: {
			type: Date,
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
		timestamps: true,
	}
);

paymentLinkSchema.plugin(AutoIncrement, {
	inc_field: 'paymentLinkNumber',
});

const paymentLink = model('paymentlink', paymentLinkSchema);
module.exports = paymentLink;
