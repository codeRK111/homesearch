const mongoose = require('mongoose');

const { Schema, model } = mongoose;
const invoiceSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'A name must be required'],
		},
		email: {
			type: String,
		},

		number: {
			type: String,
			required: [true, 'A number must be required'],
		},
		amount: {
			type: Number,
			required: [true, 'A amount must be required'],
		},
		serviceProvidedBy: {
			type: String,
			required: [true, 'serviceProvidedBy must be required'],
		},
		description: {
			type: String,
		},
		gst: {
			type: String,
			required: [true, 'gst must be required'],
		},
		date: {
			type: Date,
		},
		paymentStatus: {
			type: String,
			enum: ['paid', 'unpaid'],
			default: 'paid',
		},
		discount: {
			type: Number,
			default: 0,
		},
		amountAfterGST: {
			type: Number,
			required: [true, 'A amountAfterGST must be required'],
		},
		sgstPercentage: {
			type: Number,
			default: 9,
		},
		sgstAmount: {
			type: Number,
			default: 0,
		},
		cgstPercentage: {
			type: Number,
			default: 9,
		},
		cgstAmount: {
			type: Number,
			default: 0,
		},
		igstPercentage: {
			type: Number,
			default: 18,
		},
		igstAmount: {
			type: Number,
			default: 18,
		},
		amountAfterDiscount: {
			type: Number,
			default: 0,
		},
		invoiceNumber: {
			type: Number,
			default: 1,
		},

		status: {
			type: String,
			enum: {
				values: ['inactive', 'active'],
			},
			default: 'active',
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
		timestamps: true,
	}
);

const TestimonialModel = model('Invoice', invoiceSchema);
module.exports = TestimonialModel;
