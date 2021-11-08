const Razorpay = require('razorpay');
const catchAsync = require('./../utils/catchAsync');
const sendEmailSubscriptionFeedback = require('./../utils/sendMailReview');
const Subscription = require('./../models/subscriptionModel');
const Link = require('./../models/paymentLinkModel');
const Admin = require('./../models/adminModel');
const crypto = require('crypto');
const { nanoid } = require('nanoid');
const AppError = require('../utils/appError');
const moment = require('moment');

exports.createOrder = catchAsync(async (req, res, next) => {
	try {
		const key_id =
			process.env.NODE_ENV === 'development'
				? process.env.RAZORPAY_KEY_ID
				: process.env.RAZORPAY_KEY_LIVE_ID;
		const key_secret =
			process.env.NODE_ENV === 'development'
				? process.env.RAZORPAY_KEY_SECRET
				: process.env.RAZORPAY_KEY_LIVE_SECRET;
		const instance = new Razorpay({
			key_id,
			key_secret,
		});

		const options = {
			amount: 500, // amount in smallest currency unit
			currency: 'INR',
			receipt: nanoid(),
		};

		const order = await instance.orders.create(options);
		console.log({
			key_id,
			key_secret,
		});

		if (!order) return res.status(500).send('Some error occured');

		res.json(order);
	} catch (error) {
		res.status(500).send(error);
	}
});
exports.paymentLinkCreateOrder = catchAsync(async (req, res, next) => {
	try {
		const key_id =
			process.env.NODE_ENV === 'development'
				? process.env.RAZORPAY_KEY_ID
				: process.env.RAZORPAY_KEY_LIVE_ID;
		const key_secret =
			process.env.NODE_ENV === 'development'
				? process.env.RAZORPAY_KEY_SECRET
				: process.env.RAZORPAY_KEY_LIVE_SECRET;
		const instance = new Razorpay({
			key_id,
			key_secret,
		});

		const link = await Link.findById(req.params.id);
		if (link.status !== 'active') {
			return next(new AppError('Link expired'));
		}

		const options = {
			amount: link.amount * 100, // amount in smallest currency unit
			currency: 'INR',
			receipt: nanoid(),
		};

		const order = await instance.orders.create(options);

		if (!order)
			return next(new AppError('Unable to make any payment right now'));

		res.json(order);
	} catch (error) {
		res.status(500).send(error);
	}
});
exports.createOrderTenantPackage = catchAsync(async (req, res, next) => {
	try {
		const key_id =
			process.env.NODE_ENV === 'development'
				? process.env.RAZORPAY_KEY_ID
				: process.env.RAZORPAY_KEY_LIVE_ID;
		const key_secret =
			process.env.NODE_ENV === 'development'
				? process.env.RAZORPAY_KEY_SECRET
				: process.env.RAZORPAY_KEY_LIVE_SECRET;
		const instance = new Razorpay({
			key_id,
			key_secret,
		});

		let amount = 0;
		if (req.body.packageName === 'b') {
			amount = 2999 * 100;
		} else if (req.body.packageName === 'oc') {
			amount = 999 * 100;
		} else {
			return res.status(500).send('Invalid Package');
		}

		const options = {
			amount, // amount in smallest currency unit
			currency: 'INR',
			receipt: nanoid(),
		};

		const order = await instance.orders.create(options);

		if (!order) return res.status(500).send('Some error occured');

		res.json(order);
	} catch (error) {
		res.status(500).send(error);
	}
});
exports.success = catchAsync(async (req, res, next) => {
	try {
		// getting the details back from our font-end
		const {
			orderCreationId,
			razorpayPaymentId,
			razorpayOrderId,
			razorpaySignature,
		} = req.body;

		// Creating our own digest
		// The format should be like this:
		// digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
		const key_secret =
			process.env.NODE_ENV === 'development'
				? process.env.RAZORPAY_KEY_SECRET
				: process.env.RAZORPAY_KEY_LIVE_SECRET;
		const shasum = crypto.createHmac('sha256', key_secret);
		shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
		const digest = shasum.digest('hex');

		// comaparing our digest with the actual signature
		if (digest !== razorpaySignature)
			return res.status(400).json({ msg: 'Transaction not legit!' });

		const options = {
			mainAmount: req.body.mainAmount,
			paidAmount: req.body.paidAmount,
			package: req.body.package,
			totalPropertyAllowed: 5,
			orderId: razorpayOrderId,
			paymentId: razorpayPaymentId,
			user: req.user.id,
			packageType: 'tenantPackage',
		};

		if (req.body.homeSearchStaff) {
			const staff = await Admin.findById(req.body.homeSearchStaff);
			console.log(staff);
			if (staff) {
				options.dealBy = req.body.homeSearchStaff;
				staff.completeDealTarget = staff.completeDealTarget + 1;
				await staff.save();
			}
		}

		const subscription = await Subscription.create(options);

		// THE PAYMENT IS LEGIT & VERIFIED
		// YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT

		res.json({
			msg: 'success',
			orderId: razorpayOrderId,
			paymentId: razorpayPaymentId,
			subscription,
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).json(error);
	}
});
exports.paymentLinkSuccess = catchAsync(async (req, res, next) => {
	try {
		// getting the details back from our font-end
		const {
			orderCreationId,
			razorpayPaymentId,
			razorpayOrderId,
			razorpaySignature,
		} = req.body;

		// Creating our own digest
		// The format should be like this:
		// digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
		const key_secret =
			process.env.NODE_ENV === 'development'
				? process.env.RAZORPAY_KEY_SECRET
				: process.env.RAZORPAY_KEY_LIVE_SECRET;
		const shasum = crypto.createHmac('sha256', key_secret);
		shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
		const digest = shasum.digest('hex');

		// comaparing our digest with the actual signature
		if (digest !== razorpaySignature)
			return res.status(400).json({ msg: 'Transaction not legit!' });

		const options = {
			paidAmount: req.body.paidAmount,
			paymentLink: req.body.paymentLink,
			orderId: razorpayOrderId,
			paymentId: razorpayPaymentId,
			user: req.user.id,
			packageType: 'paymentLink',
		};

		if (req.body.homeSearchStaff) {
			const staff = await Admin.findById(req.body.homeSearchStaff);
			console.log(staff);
			if (staff) {
				options.dealBy = req.body.homeSearchStaff;
				staff.completeDealTarget = staff.completeDealTarget + 1;
				await staff.save();
			}
		}

		const subscription = await Subscription.create(options);
		if (req.body.paymentLink) {
			await Link.findByIdAndUpdate(req.body.paymentLink, {
				status: 'inactive',
			});
		}

		// THE PAYMENT IS LEGIT & VERIFIED
		// YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT

		res.json({
			msg: 'success',
			orderId: razorpayOrderId,
			paymentId: razorpayPaymentId,
			subscription,
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).json(error);
	}
});
exports.getSubscriptions = catchAsync(async (req, res, next) => {
	const filter = {};
	const page = req.query.page * 1 || 1;
	const limit = req.query.limit * 1 || 10;
	const skip = (page - 1) * limit;

	const totalDocs = await Subscription.countDocuments(filter);

	const subscriptions = await Subscription.find(filter)
		.sort('-createdAt')
		.skip(skip)
		.limit(limit);
	res.status(200).json({
		status: 'success',
		data: { subscriptions, totalDocs },
	});
});
exports.createPaymentLink = catchAsync(async (req, res, next) => {
	if (!req.body.amount) {
		return next(new AppError('amount required'));
	}

	const link = await Link.create(req.body);

	res.status(200).json({
		status: 'success',
		data: { link: `https://homesearch18.com/pay?pl=${link.id}` },
	});
});

exports.getPaymentLinkDetails = catchAsync(async (req, res, next) => {
	const link = await Link.findById(req.params.id);
	const isBefore = moment().isBefore(link.expiryDate);
	if (link.status !== 'active' || !isBefore) {
		return next(new AppError('This payment link is expired'));
	}

	res.status(200).json({
		status: 'success',
		data: { link },
	});
});

exports.getAllLinks = catchAsync(async (req, res, next) => {
	const filter = {};
	const page = req.query.page * 1 || 1;
	const limit = req.query.limit * 1 || 10;
	const skip = (page - 1) * limit;

	const totalDocs = await Link.countDocuments(filter);
	const links = await Link.find(filter)
		.sort('-createdAt')
		.skip(skip)
		.limit(limit);

	res.status(200).json({
		status: 'success',
		data: { links, totalDocs },
	});
});
exports.sendFeedback = catchAsync(async (req, res, next) => {
	const subscription = await Subscription.findById(req.params.id);
	if (!subscription) {
		return next(new AppError('subscription not found'));
	}
	if (!subscription.user.email) {
		return next(new AppError('email not found'));
	}

	const link = `${req.hostname}/package-feedback/${subscription.id}`;
	console.log(link);
	try {
		const resp = await sendEmailSubscriptionFeedback(
			subscription.user.email,
			'Homesearch Package Feedback',
			link
		);
		subscription.paymentReviewStatus = 'sent';
		await subscription.save();
		console.log(resp);
		res.status(200).json({
			status: 'success',
			data: subscription,
		});
	} catch (error) {
		return next(new AppError(error.message));
	}
});
exports.submitFeedback = catchAsync(async (req, res, next) => {
	const subscription = await Subscription.findById(req.params.id);
	if (!subscription) {
		return next(new AppError('subscription not found'));
	}
	if (subscription.user.id !== req.user.id) {
		return next(new AppError('Not authorized'));
	}

	if (req.body.paymentReview) {
		subscription.paymentReview = req.body.paymentReview;
	}
	if (req.body.paymentRating) {
		subscription.paymentRating = req.body.paymentRating;
	}

	try {
		subscription.paymentReviewStatus = 'received';
		subscription.feedbackAt = Date.now();
		await subscription.save();
		res.status(200).json({
			status: 'success',
			data: subscription,
		});
	} catch (error) {
		return next(new AppError(error.message));
	}
});
exports.getSubscriptionDetails = catchAsync(async (req, res, next) => {
	const subscription = await Subscription.findById(req.params.id);
	if (!subscription) {
		return next(new AppError('subscription not found'));
	}
	res.status(200).json({
		status: 'success',
		data: subscription,
	});
});
