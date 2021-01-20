const mongoose = require('mongoose');

const { Schema, model } = mongoose;
// builderName: '',
// 		contactPersonName: '',
// 		contactNumber: '',
// 		ulternateContactNumber: '',
// 		email: '',
// 		projectName: '',
// 		city: '',
// 		callAttended: true,
// 		clientResponse: '',
// 		scheduleCall: false,
// 		scheduleMessage: '',
// 		status: 'open',
// 		deniedReson: '',
const projectAdvertisementLeadsSchema = new Schema(
	{
		staff: {
			type: mongoose.Schema.ObjectId,
			ref: 'Admin',
			required: [true, 'A staff required '],
		},
		projectAdvertisement: {
			type: mongoose.Schema.ObjectId,
			ref: 'ProjectAdvertisement',
			required: [true, 'A projectAdvertisement required '],
		},
		builderName: {
			type: String,
			required: [true, 'A builderName required '],
		},
		contactNumber: {
			type: String,
			minlength: [10, 'min 10 digits required'],
			maxlength: [10, 'min 10 digits required'],
			required: [true, 'A contactNumber required '],
		},
		ulternateContactNumber: {
			type: String,
			minlength: [10, 'min 10 digits required'],
			maxlength: [10, 'min 10 digits required'],
			default: null,
		},
		contactPersonName: {
			type: String,
			required: [true, 'A contactPersonName required '],
			default: null,
		},
		email: {
			type: String,
			default: null,
		},
		projectName: {
			type: String,
			default: null,
		},
		propertyName: {
			type: String,
			default: null,
		},
		pCategory: {
			type: String,
			enum: ['flat', 'land', 'independenthouse', 'hostel', 'pg'],
		},
		city: {
			type: mongoose.Schema.ObjectId,
			ref: 'City',
			required: [true, 'A city required'],
		},
		callAttended: {
			type: Boolean,
			required: [true, 'Wheather call attended or not '],
		},
		clientResponse: {
			type: String,
			default: null,
		},
		scheduleCall: {
			type: Boolean,
			default: false,
		},
		scheduleTime: {
			type: Date,
		},
		scheduleMessage: {
			type: String,
			default: null,
		},
		status: {
			type: String,
			enum: ['open', 'closed', 'denied'],
			required: [true, 'status required '],
		},
		deniedResponse: [
			{
				message: String,
				date: {
					type: Date,
					default: Date.now(),
				},
			},
		],

		createdAt: {
			type: Date,
			default: Date.now(),
		},
	},
	{ toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

projectAdvertisementLeadsSchema.pre(/^find/, function (next) {
	this.populate({
		path: 'staff',
		select: 'id name',
	}).populate({
		path: 'city',
		select: 'id name ',
	});

	next();
});

const ProjectAdvertisementModel = model(
	'ProjectAdvertisementLeads',
	projectAdvertisementLeadsSchema
);
module.exports = ProjectAdvertisementModel;
