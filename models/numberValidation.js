const mongoose = require('mongoose');
const moment = require('moment');
const sendOtpMessage = require('../utils/sendOtp');
const AppError = require('./../utils/appError');
const { Schema, model } = mongoose;
const numberValidationSchema = new Schema(
	{
		number: {
			type: String,
			required: [true, 'A number must be required'],
		},
		otp: {
			type: Number,
		},
		otpExpiryAt: {
			type: Date,
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
		timestamps: true,
	}
);

numberValidationSchema.pre('save', async function (next) {
	try {
		const randomNumber = Math.floor(1000 + Math.random() * 9000);
		// const result = await sendOtpMessage(this.number, randomNumber);
		// console.log(result.data);
		this.otp = randomNumber;
		this.otpExpiryAt = moment().add(5, 'm');
		next();
	} catch (error) {
		next(new AppError('Unable to send OTP'));
	}
});

numberValidationSchema.methods.isExpired = function () {
	console.log(this.otpExpiryAt);
	console.log(moment().isAfter(this.otpExpiryAt));
	return moment().isAfter(this.otpExpiryAt);
};
numberValidationSchema.methods.isCorrect = function (otp) {
	return Number(otp) === this.otp;
};

const NumberValidationModel = model('NumberValidation', numberValidationSchema);
module.exports = NumberValidationModel;
