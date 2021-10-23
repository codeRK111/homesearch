const mongoose = require('mongoose');
const validator = require('validator');
const { pad, idPrefix } = require('../utils/helper');
const { Schema, model } = mongoose;
const AutoIncrement = require('mongoose-sequence')(mongoose);
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
		strategyNumber: {
			type: Number,
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
		timestamps: true,
	}
);

leadsStrategySchema.plugin(AutoIncrement, {
	inc_field: 'strategyNumber',
});

leadsStrategySchema.pre(/^find/, function (next) {
	this.populate({
		path: 'staff',
		select: 'id name',
	});

	next();
});

leadsStrategySchema.virtual('docID').get(function () {
	return `${idPrefix.default}${pad(this.strategyNumber, 3)}`;
});

const leadStrategy = model('leadStrategy', leadsStrategySchema);
module.exports = leadStrategy;
