const mongoose = require('mongoose');
const validator = require('validator');
const moment = require('moment');
const { Schema, model } = mongoose;
const leadsSchema = new Schema(
	{
		name: {
			type: String,
		},
		email: {
			type: String,
		},
		message: {
			type: String,
		},
		feedback: {
			type: String,
		},
		attended: {
			type: Boolean,
			default: false,
		},
		clientSupport: {
			type: mongoose.Schema.ObjectId,
			ref: 'Admin',
			default: null,
		},
		bdm: {
			type: mongoose.Schema.ObjectId,
			ref: 'Admin',
			default: null,
		},
		createdBy: {
			type: mongoose.Schema.ObjectId,
			ref: 'Admin',
			default: null,
		},
		assignedAt: {
			type: Date,
			default: null,
		},
		hold: {
			type: Boolean,
			default: false,
		},
		holdDate: {
			type: Date,
			default: null,
		},
		number: {
			type: String,
			required: [true, 'number required'],
		},

		status: {
			type: String,
			enum: {
				values: ['active', 'inactive'],
			},
			default: 'active',
		},
		userCategory: {
			type: String,
			enum: {
				values: [
					'tenant',
					'buyer',
					'owner',
					'realtor',
					'builder',
					'unknown',
				],
			},
			default: 'unknown',
		},
		requirement: {
			type: String,
			enum: {
				values: ['hvp', 'ndp'],
			},
		},
		category: {
			type: String,
			enum: {
				values: ['rent', 'sale', 'project'],
			},
		},
		pType: {
			type: String,
			enum: {
				values: ['flat', 'independenthouse', 'hostel', 'pg', 'land'],
			},
		},
		source: {
			type: String,
			enum: {
				values: [
					'outsource',
					'consultant',
					'staff',
					'socialMedia',
					'website',
				],
			},
		},
		minPrice: {
			type: String,
		},
		maxPrice: {
			type: String,
		},
		comments: [
			{
				from: {
					type: mongoose.Schema.ObjectId,
					ref: 'Admin',
				},
				message: {
					type: String,
				},
				date: {
					type: Date,
					default: Date.now(),
				},
			},
		],
		images: [
			{
				type: String,
			},
		],
		preferedLocation: {
			type: String,
		},
		stage: {
			type: Number,
			default: 0,
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
		timestamps: true,
	}
);

console.log(moment().subtract(7, 'd').format());

leadsSchema.pre(/^find/, function (next) {
	this.populate({
		path: 'clientSupport',
		select: 'id name',
	})
		.populate({
			path: 'createdBy',
			select: 'id name',
		})
		.populate({
			path: 'comments.from',
			select: 'id name type',
		});

	next();
});

const leads = model('lead', leadsSchema);
module.exports = leads;
