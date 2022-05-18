const mongoose = require('mongoose');
const validator = require('validator');

const { Schema, model } = mongoose;
const contactSchema = new Schema(
	{
		name: {
			type: String,
		},
		message: {
			type: String,
		},

		phoneNumber: {
			type: String,
			maxlength: [10, '10 chars allowed for phone_number'],
			minlength: [10, '10 chars allowed for phone_number'],
		},
		email: {
			type: String,
			lowercase: true,
			validate: [validator.isEmail, 'Please use a valid email'],
		},

		otp: {
			type: String,
			default: null,
			select: false,
		},
		verified: {
			type: Boolean,
			default: false,
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
		timestamps: true,
	}
);

contactSchema.methods.correctOtp = function (otp) {
	return String(otp) === this.otp;
};

const contactQuery = model('UserContact', contactSchema);
module.exports = contactQuery;
