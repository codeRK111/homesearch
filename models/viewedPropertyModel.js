const mongoose = require('mongoose');
const validator = require('validator');

const { Schema, model } = mongoose;
const propertyViewSchema = new Schema(
	{
		createdAt: {
			type: Date,
			default: Date.now(),
		},
		property: {
			type: mongoose.Schema.ObjectId,
			ref: 'Property',
		},
		project: {
			type: mongoose.Schema.ObjectId,
			ref: 'Project',
		},
		projectProperty: {
			type: mongoose.Schema.ObjectId,
			ref: 'ProjectProperty',
		},

		user: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			default: null,
		},

		type: {
			type: String,
			enum: {
				values: ['property', 'project', 'projectproperty'],
			},
			default: 'property',
		},
	},
	{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

propertyViewSchema.pre(/^find/, function (next) {
	this.populate({
		path: 'property',
		select: 'id title',
	})

		.populate({
			path: 'user',
			select: 'id name',
		})
		.populate({
			path: 'project',
			select: 'id title ',
		})
		.populate({
			path: 'projectProperty',
			select: 'id title project',
		});

	next();
});

const propertyViewQuery = model('PropertyView', propertyViewSchema);
module.exports = propertyViewQuery;
