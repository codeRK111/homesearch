const mongoose = require('mongoose');

const { Schema, model } = mongoose;
const AutoIncrement = require('mongoose-sequence')(mongoose);
const gstSchema = new Schema(
	{
		number: {
			type: String,
			unique: true,
			required: [true, 'gst number required'],
			unique: [true, 'A unique number required'],
		},
		cgst: {
			type: Number,
			default: null,
		},
		sgst: {
			type: Number,
			default: null,
		},
		igst: {
			type: Number,
			default: null,
		},
		gstNumber: {
			type: Number,
		},
		createdBy: {
			type: mongoose.Schema.ObjectId,
			ref: 'Admin',
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

gstSchema.plugin(AutoIncrement, {
	inc_field: 'gstNumber',
});

gstSchema.pre(/^find/, function (next) {
	this.populate({
		path: 'createdBy',
		select: 'id name',
	});

	next();
});

const GSTModel = model('gst', gstSchema);
module.exports = GSTModel;
