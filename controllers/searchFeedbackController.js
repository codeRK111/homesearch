const SearchFeedback = require('./../models/searchFeedbackModel');
const catchAsync = require('./../utils/catchAsync');

exports.addSearchFeedback = catchAsync(async (req, res, next) => {
	const body = req.body;

	let feedback = await SearchFeedback.create(body);

	res.status(200).json({
		status: 'success',
		data: {
			feedback,
		},
	});
});

exports.getFeedbacks = catchAsync(async (req, res, next) => {
	const filter = req.body;
	const excludeFields = ['page', 'limit'];
	excludeFields.forEach((c) => {
		if (filter[c]) delete filter[c];
	});
	const page = req.body.page * 1 || 1;
	const limit = req.body.limit * 1 || 10;
	const skip = (page - 1) * limit;
	const feedbacks = await SearchFeedback.find(filter).skip(skip).limit(limit);
	const counts = await SearchFeedback.countDocuments(filter);
	res.status(200).json({
		status: 'success',
		data: {
			feedbacks,
			counts,
		},
	});
});

exports.updateFeedback = catchAsync(async (req, res, next) => {
	const feedback = await SearchFeedback.findByIdAndUpdate(
		req.params.id,
		req.body,
		{
			new: true,
			runValidators: true,
		}
	);
	res.status(200).json({
		status: 'success',
		data: {
			feedback,
		},
	});
});

exports.deleteFeedback = catchAsync(async (req, res, next) => {
	const feedback = await SearchFeedback.findByIdAndRemove(req.params.id);

	res.status(200).json({
		status: 'success',
		data: {
			feedback,
		},
	});
});
