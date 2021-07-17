const mongoose = require('mongoose');

const { Schema, model } = mongoose;
const savedPropertySchema = new Schema(
	{
		property: {
			type: mongoose.Schema.ObjectId,
			ref: 'Property',
		},

		user: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			default: null,
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
		timestamps: true,
	}
);

savedPropertySchema.index(
	{
		property: 1,
		user: 1,
	},
	{
		unique: true,
	}
);

savedPropertySchema.pre(/^find/, function (next) {
	this.populate({
		path: 'property',
	}).populate({
		path: 'user',
	});

	next();
});

const savedProperty = model('SavedProperty', savedPropertySchema);
module.exports = savedProperty;
