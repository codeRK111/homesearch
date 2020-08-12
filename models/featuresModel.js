const mongoose = require('mongoose');

const { Schema, model } = mongoose;
const featureSchema = new Schema(
	{
		adminNumber: {
			type: String,
			minlength: [10, '10 digits equired'],
			maxlength: [10, '10 digits equired'],
		},
		otp: {
			type: String,
			default: null,
		},
	},
	{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

featureSchema.methods.correctOtp = function (otp) {
	console.log(this.otp);
	console.log(otp);
	return otp == this.otp;
};

const Feature = model('Sitefeature', featureSchema);
module.exports = Feature;
