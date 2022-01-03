const { Schema, model } = mongoose;

const targetSchema = new Schema(
	{
		targetAmount: {
			type: Number,
			required: [true, 'Target amount required'],
		},
		completedAmount: {
			type: Number,
			default: 0,
		},
		year: {
			type: Number,
			required: [true, 'year required'],
		},
		month: {
			type: Number,
			required: [true, 'year required'],
		},
		staff: {
			type: Schema.ObjectId,
			ref: 'Admin',
			required: [true, 'Staff required'],
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
		timestamps: true,
	}
);

targetSchema.pre(/^find/, function (next) {
	this.populate({
		path: 'staff',
		select: 'id name',
	});

	next();
});
