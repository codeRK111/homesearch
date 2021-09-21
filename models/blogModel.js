const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');
const moment = require('moment');
const { Schema, model } = mongoose;
const blogSchema = new Schema(
	{
		title: {
			type: String,
			unique: true,
			required: [true, 'Title required'],
		},
		shortDesc: {
			type: String,
			required: [true, 'Short description required'],
		},
		description: {
			type: String,
			required: [true, 'Description required'],
		},
		tags: [
			{
				type: String,
			},
		],
		slug: {
			type: String,
		},
		views: {
			type: Number,
		},
		admin: {
			type: mongoose.Schema.ObjectId,
			ref: 'Admin',
			required: [true, 'Admin required'],
		},
		status: {
			type: String,
			enum: {
				values: ['active', 'inactive'],
			},
			default: 'active',
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

blogSchema.pre(/^find/, function (next) {
	this.populate({
		path: 'admin',
		select: 'id name',
	});

	next();
});

blogSchema.pre('save', async function (next) {
	this.slug = slugify(this.title, {
		replacement: '-',
		lower: true,
	});
	next();
});

const blogs = model('Blog', blogSchema);
module.exports = blogs;
