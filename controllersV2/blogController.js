const AppError = require('./../utils/appError');
const Blog = require('./../models/blogModel');
const catchAsync = require('./../utils/catchAsync');

exports.addBlog = catchAsync(async (req, res, next) => {
	const exists = await Blog.countDocuments({ title: req.body.title });
	if (exists > 0) {
		return next(new AppError('Title already exists'));
	}
	const clone = Object.assign({}, req.body);
	clone.admin = req.admin.id;
	if (req.file) {
		clone.photo = req.file.filename;
	}
	const blog = await Blog.create(clone);

	res.status(200).json({
		status: 'success',
		data: blog,
	});
});
