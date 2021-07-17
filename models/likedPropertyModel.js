const mongoose = require('mongoose');

const { Schema, model } = mongoose;
const likedPropertySchema = new Schema(
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

likedPropertySchema.index(
	{
		property: 1,
		user: 1,
	},
	{
		unique: true,
	}
);

likedPropertySchema.pre(/^find/, function (next) {
	this.populate({
		path: 'property',
	}).populate({
		path: 'user',
	});

	next();
});

const likedProperty = model('LikedProperty', likedPropertySchema);
module.exports = likedProperty;
