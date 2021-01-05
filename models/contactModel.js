const mongoose = require('mongoose');
const validator = require('validator');

const { Schema, model } = mongoose;
const contactSchema = new Schema(
	{
		name: {
			type: String,
		},

		phoneNumber: {
			type: String,
			maxlength: [10, '10 chars allowed for phone_number'],
			minlength: [10, '10 chars allowed for phone_number'],
			index: {
				unique: true,
				partialFilterExpression: { number: { $type: 'string' } },
			},
			default: null,
		},
		email: {
			type: String,
			lowercase: true,
			validate: [validator.isEmail, 'Please use a valid email'],
		},

		createdAt: {
			type: Date,
			default: Date.now(),
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
		adminId: {
			type: mongoose.Schema.ObjectId,
			ref: 'Admin',
			default: null,
		},
	},
	{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

contactSchema.methods.correctOtp = async function (otp) {
	return otp == this.otp;
};

const contactQuery = model('Contact', contactSchema);
module.exports = contactQuery;
