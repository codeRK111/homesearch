const mongoose = require('mongoose');
const validator = require('validator');
const moment = require('moment');
const { Schema, model } = mongoose;
const AppError = require('./../utils/appError');
const Admin = require('./adminModel');
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
		executive: {
			type: mongoose.Schema.ObjectId,
			ref: 'Admin',
			default: null,
		},
		closedBy: {
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
		saleAssignedAt: {
			type: Date,
			default: null,
		},
		saleExecutiveAssignedAt: {
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
				values: ['rent', 'sale', 'project', 'buy'],
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
					'homesearch',
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
				reschedule: {
					type: Date,
				},
				closeFeedback: {
					type: Boolean,
					default: false,
				},
			},
		],
		images: [
			{
				type: String,
			},
		],
		propertyRequirements: [
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
			// 0 - No Action | Not Intersted
			// 1 - Client SUpport
			// 2 - Hold Date
			// 3 - BDM | ASM
			// 4 - SE
			// 9 - Post Property
			// 10 - Close
		},
		city: {
			type: mongoose.Schema.ObjectId,
			ref: 'City',
		},
		revenue: {
			type: Number,
		},
		revenueFeedback: {
			type: String,
		},
		notInterested: {
			type: Boolean,
			default: false,
		},
		saleStaffType: {
			type: String,
			enum: {
				values: ['bdm', 'assistantSalesManager', 'salesExecutive'],
			},
		},
		proposalStatus: {
			type: String,
			enum: {
				values: ['sent', 'not-sent', 'accepted', 'declined'],
			},
			default: 'not-sent',
		},
		proposalAcceptDate: {
			type: Date,
		},
		propertyVisitDate: {
			type: Date,
		},
		proposalPackage: {
			type: String,
			enum: {
				values: ['b', 'oc', 'custom'],
			},
			default: 'b',
		},
		proposalPrice: {
			type: Number,
		},
		paymentLink: {
			type: mongoose.Schema.ObjectId,
			ref: 'paymentlink',
			default: null,
		},
		proposalComments: [
			{
				comment: {
					type: String,
				},
				createdAt: {
					type: Date,
					default: Date.now(),
				},
				action: {
					type: String,
					enum: {
						values: ['accepted', 'declined'],
					},
					default: 'accepted',
				},
			},
		],
		proposedBy: {
			type: mongoose.Schema.ObjectId,
			ref: 'Admin',
			default: null,
		},
		propertyToBeShown: {
			type: Number,
			default: 5,
		},
		invoice: {
			type: String,
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
		timestamps: true,
	}
);

leadsSchema.pre('save', function (next) {
	Admin.findByIdAndUpdate(this.createdBy, {
		$inc: { completeLeadTarget: 1 },
	})
		.then((c) => {
			console.log(c);
			next();
		})
		.catch((_) => next());
});

leadsSchema.pre('save', function (next) {
	if (this.isNew) {
		Admin.findByIdAndUpdate(this.createdBy, {
			$inc: { completeLeadTarget: 1 },
		})
			.then((c) => {
				console.log(c);
				next();
			})
			.catch((_) => next());
	} else {
		console.log(this.isModified('stage'));
		console.log(this.stage);
		if (this.isModified('stage') && this.stage === 10) {
			Admin.findByIdAndUpdate(this.closedBy, {
				$inc: { completeDealTarget: 1 },
			})
				.then((c) => {
					console.log(c);
					next();
				})
				.catch((_) => next());
		} else {
			next();
		}
		next();
	}
});

leadsSchema.pre(/^find/, function (next) {
	this.populate({
		path: 'clientSupport',
		select: 'id name',
	})
		.populate({
			path: 'bdm',
			select: 'id name',
		})
		.populate({
			path: 'executive',
			select: 'id name',
		})
		.populate({
			path: 'closedBy',
			select: 'id name',
		})
		.populate({
			path: 'createdBy',
			select: 'id name',
		})
		.populate({
			path: 'comments.from',
			select: 'id name type',
		})
		.populate('city');

	next();
});

const leads = model('lead', leadsSchema);
module.exports = leads;
