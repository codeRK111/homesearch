const mongoose = require('mongoose');

const { Schema, model } = mongoose;
const specialitySchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'A name must be required'],
			unique: true,
		},
		description: {
			type: String,

			default: null,
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

const SpecialityModel = model('ProjectSpeciality', specialitySchema);
module.exports = SpecialityModel;
