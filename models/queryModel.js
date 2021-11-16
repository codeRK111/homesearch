const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const AutoIncrement = require('mongoose-sequence')(mongoose);
const querySchema = new Schema(
	{
		queryByUser: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			default: null,
		},
		queryForUser: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			default: null,
		},
		queryForHSA: {
			type: mongoose.Schema.ObjectId,
			ref: 'Admin',
			default: null,
		},
		queryForBuilder: {
			type: mongoose.Schema.ObjectId,
			ref: 'Builder',
			default: null,
		},
		queryFor: {
			type: String,
			enum: {
				values: ['owner', 'agent', 'builder', 'hsa'],
			},
		},
		queryType: {
			type: String,
			enum: {
				values: ['message', 'number', 'whatsapp', 'profile'],
			},
		},
		queryOn: {
			type: String,
			enum: {
				values: ['property', 'project'],
			},
		},
		property: {
			type: mongoose.Schema.ObjectId,
			ref: 'Property',
			default: null,
		},
		details: {
			pType: {
				type: String,
				enum: {
					values: [
						'flat',
						'independenthouse',
						'hostel',
						'pg',
						'guesthouse',
						'serviceapartment',
					],
				},
			},
			pFor: {
				type: String,
				enum: {
					values: ['rent', 'sale'],
				},
			},
		},
		queryNumber: {
			type: Number,
		},
		status: {
			type: String,
			enum: {
				values: ['active', 'inactive'],
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

querySchema.plugin(AutoIncrement, {
	inc_field: 'queryNumber',
});

querySchema.pre(/^find/, function (next) {
	this.populate({
		path: 'queryByUser',
		select: 'id name email number',
	}).populate({
		path: 'queryForUser',
		select: 'id name email number',
	});

	next();
});

querySchema.pre(/^find/, function (next) {
	this.populate({
		path: 'queryByUser',
		select: '-city -googleId -photoStatus -createdAt -paymentStatus  -serialNumber -gender -createdBy -registerThrough -registerVia -passwordChangedAt -__v ',
	});
	next();
});

const subscriptions = model('query', querySchema);
module.exports = subscriptions;
