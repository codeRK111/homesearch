const AppError = require('./../utils/appError');
const Blog = require('./../models/blogModel');
const catchAsync = require('./../utils/catchAsync');
const fs = require('fs');
const path = require('path');

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

exports.getBlogs = catchAsync(async (req, res, next) => {
	const filter = {};
	const page = req.query.page * 1 || 1;
	const limit = req.query.limit * 1 || 10;
	const skip = (page - 1) * limit;

	if (req.query.status) {
		filter.status = req.query.status;
	}

	const totalDocs = await Blog.countDocuments(filter);
	const blogs = await Blog.find(filter)
		.sort('-createdAt')
		.skip(skip)
		.limit(limit);
	res.status(200).json({
		status: 'success',
		data: {
			totalDocs,
			blogs,
		},
	});
});
exports.getBlogsByUser = catchAsync(async (req, res, next) => {
	const filter = {};

	filter.status = 'active';

	const blogs = await Blog.find(filter).sort('-views -createdAt');

	res.status(200).json({
		status: 'success',
		data: {
			blogs,
		},
	});
});

exports.getBlogDetails = catchAsync(async (req, res, next) => {
	const blog = await Blog.findById(req.params.id);
	res.status(200).json({
		status: 'success',
		data: blog,
	});
});
exports.getBlogDetailsBySlug = catchAsync(async (req, res, next) => {
	const blog = await Blog.findOne({
		slug: req.params.slug,
		status: 'active',
	});
	res.status(200).json({
		status: 'success',
		data: blog,
	});
});
exports.updateBlogDetails = catchAsync(async (req, res, next) => {
	const blog = await Blog.findById(req.params.id);
	const clone = Object.assign({}, req.body);
	const excludeFields = ['_id', 'slug', 'createdAt', 'updatedAt', 'admin'];
	if (clone.views) {
		clone.views = Number(clone.views);
	}

	excludeFields.forEach((c) => {
		if (clone[c]) {
			delete clone[c];
		}
	});
	if (req.file) {
		fs.unlink(
			path.join(__dirname, '../', 'images', 'blog_images/') + blog.photo,
			function (err) {}
		);
		clone.photo = req.file.filename;
	}

	const newBlog = await Blog.findByIdAndUpdate(req.params.id, clone, {
		new: true,
		runValidators: true,
	});

	res.status(200).json({
		status: 'success',
		data: newBlog,
	});
});
