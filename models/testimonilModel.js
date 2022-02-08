const mongoose = require('mongoose');

const { Schema, model } = mongoose;
const testimonialSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'A name must be required'],
			unique: true,
		},
		description: {
			type: String,
			required: [true, 'A description must be required'],
		},
		photo: {
			type: String,
		},
		status: {
			type: String,

			enum: {
				values: ['inactive', 'active'],
			},
			default: 'active',
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
		timestamps: true,
	}
);

const TestimonialModel = model('Testimonial', testimonialSchema);
module.exports = TestimonialModel;
