const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema, model } = mongoose;
const AutoIncrement = require('mongoose-sequence')(mongoose);
const chanelPartnerSchema = new Schema(
	{
		name: {
			type: String,
		},
		email: {
			type: String,
			unique: true,
		},
		number: {
			type: String,
		},
		password: {
			type: String,
		},
		chanelNumber: {
			type: Number,
		},
		status: {
			type: String,
			enum: ['active', 'inactive', 'unverified', 'declined'],
			default: 'inactive',
		},
		declinedReason: {
			type: String,
		},
		photo: {
			type: String,
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
		timestamps: true,
	}
);

chanelPartnerSchema.plugin(AutoIncrement, {
	inc_field: 'chanelNumber',
});

chanelPartnerSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();
	this.password = await bcrypt.hash(this.password, 12);
});

chanelPartnerSchema.methods.correctPassword = async function (
	userPassword,
	dbPassword
) {
	return await bcrypt.compare(userPassword, dbPassword);
};

chanelPartnerSchema.pre(/^find/, function (next) {
	this.populate({
		path: 'user',
		select: 'id name email number',
	})
		.populate({
			path: 'dealBy',
			select: 'id name',
		})
		.populate({
			path: 'packageId',
		});

	next();
});

const chanelPartner = model('chanelPartner', chanelPartnerSchema);
module.exports = chanelPartner;
