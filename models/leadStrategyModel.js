const mongoose = require('mongoose');
const validator = require('validator');
const { Schema, model } = mongoose;
const leadsStrategySchema = new Schema(
	{
		staff: {
			type: mongoose.Schema.ObjectId,
			ref: 'Admin',
			default: null,
		},
		url: {
			type: String,
			required: [true, 'A url must be required'],
			validate: [validator.isURL, 'Please use a valid url'],
		},
		photo: {
			type: String,
			required: [true, 'A photo must be required'],
		},
		description: {
			type: String,
			required: [true, 'A description required'],
		},

		status: {
			type: String,
			enum: {
				values: ['active', 'inactive'],
			},
			default: 'active',
		},
		docNumber: {
			type: Number,
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
		timestamps: true,
	}
);

leadsStrategySchema.pre(/^find/, function (next) {
	this.populate({
		path: 'staff',
		select: 'id name',
	});

	next();
});

const leadStrategy = model('leadStrategy', leadsStrategySchema);
module.exports = leadStrategy;
