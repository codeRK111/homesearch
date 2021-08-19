const mongoose = require('mongoose');

const { Schema, model } = mongoose;
const projectAgentSchema = new Schema(
	{
		project: {
			type: mongoose.Schema.ObjectId,
			ref: 'Project',
		},

		agents: [
			{
				type: mongoose.Schema.ObjectId,
				ref: 'Admin',
				default: null,
			},
		],
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
		timestamps: true,
	}
);

projectAgentSchema.pre(/^find/, function (next) {
	this.populate({
		path: 'project',
	}).populate({
		path: 'agents',
	});

	next();
});

const projectAgent = model('ProjectAgent', projectAgentSchema);
module.exports = projectAgent;
