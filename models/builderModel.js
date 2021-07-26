const mongoose = require('mongoose');
const Project = require('./projectModule');
const validator = require('validator');
const slugify = require('slugify');
const { Schema, model } = mongoose;
const builderSchema = new Schema(
	{
		developerName: {
			type: String,
			required: [true, 'A developerName must be required'],
		},
		description: {
			type: String,
			required: [true, 'A description must be required'],
		},
		officeAddress: {
			type: String,
			required: [true, 'A officeAddress must be required'],
		},
		phoneNumber: {
			type: String,
			maxlength: [10, '10 chars allowed for phone_number'],
			minlength: [10, '10 chars allowed for phone_number'],
			index: {
				unique: true,
				partialFilterExpression: { number: { $type: 'string' } },
			},
			default: null,
		},
		email: {
			type: String,
			unique: true,
			lowercase: true,
			required: [true, 'A email must be required'],
			validate: [validator.isEmail, 'Please use a valid email'],
		},
		operatingSince: {
			type: Date,
			default: Date.now(),
		},
		createdAt: {
			type: Date,
			default: Date.now(),
		},
		cities: [
			{
				type: mongoose.Schema.ObjectId,
				ref: 'City',
				required: [true, 'Builder must have some cities'],
			},
		],
		// promoters: [
		// 	{
		// 		type: String,
		// 		unique: true,
		// 	},
		// ],
		totalProjects: {
			type: Number,
			required: [true, 'Please provide total number of projects'],
		},
		underConstructionProjects: {
			type: Number,
			required: [
				true,
				'Please provide total number of projects under construction',
			],
		},
		completedProjects: {
			type: Number,
			required: [
				true,
				'Please provide total number of projects that are completed',
			],
		},
		logo: {
			type: String,
			default: null,
		},
		photos: [
			{
				image: {
					type: String,
				},
			},
		],

		status: {
			type: String,
			enum: {
				values: ['active', 'inactive'],
			},
			default: 'active',
		},
		adminId: {
			type: mongoose.Schema.ObjectId,
			ref: 'Admin',
			default: null,
		},
		slug: {
			type: String,
			unique: [true, 'slug already exists'],
		},
	},
	{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

builderSchema.pre(/^find/, function (next) {
	this.populate('cities');
	next();
});

builderSchema.pre('save', async function (next) {
	this.slug = slugify(this.developerName, {
		replacement: '-',
		lower: true,
	});
	next();
});

const BuilderModel = model('Builder', builderSchema);
module.exports = BuilderModel;
