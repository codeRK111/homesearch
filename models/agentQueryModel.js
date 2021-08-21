const mongoose = require('mongoose');
const validator = require('validator');

const { Schema, model } = mongoose;
const agentQuerySchema = new Schema(
	{
		builder: {
			type: mongoose.Schema.ObjectId,
			ref: 'Builder',
			default: null,
		},
		user: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			default: null,
		},
		agent: {
			type: mongoose.Schema.ObjectId,
			ref: 'Admin',
			default: null,
		},

		status: {
			type: String,
			enum: {
				values: ['pending', 'resolved'],
			},
			default: 'pending',
		},
		type: {
			type: String,
			enum: {
				values: ['project', 'projectproperty'],
			},
			default: 'project',
		},
		project: {
			type: mongoose.Schema.ObjectId,
			ref: 'Project',
		},
		projectProperty: {
			type: mongoose.Schema.ObjectId,
			ref: 'ProjectProperty',
		},

		pType: {
			type: String,
			enum: {
				values: ['flat', 'land', 'independenthouse'],
			},
			default: null,
		},
		queryType: {
			type: String,
			enum: {
				values: ['number', 'message', 'whatsapp'],
			},
			default: 'number',
		},
		via: {
			type: String,
			enum: {
				values: ['app', 'web'],
			},
			default: 'web',
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
		timestamps: true,
	}
);

agentQuerySchema.pre(/^find/, function (next) {
	this.populate({
		path: 'builder',
		select: 'id developerName email phoneNumber',
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
		})
		.populate({
			path: 'agent',
			select: 'id name',
		});

	next();
});

const propertyQuery = model('AgentQuery', agentQuerySchema);
module.exports = propertyQuery;
