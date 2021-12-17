const Razorpay = require('razorpay');
const catchAsync = require('./../utils/catchAsync');
const createInvoice = require('./../utils/createTenantInvoice');
const sendEmailProposal = require('./../utils/sendMailProposal');
const sendMessageProposal = require('./../utils/sendProposal');
const sendEmailSubscriptionFeedback = require('./../utils/sendMailReview');
const sendEmailInvoice = require('./../utils/sendMailInvoice');
const Subscription = require('./../models/subscriptionModel');
const Lead = require('./../models/leadsModel');
const Link = require('./../models/paymentLinkModel');
const Admin = require('./../models/adminModel');
const crypto = require('crypto');
const { nanoid } = require('nanoid');
const AppError = require('../utils/appError');
const moment = require('moment');
const mongoose = require('mongoose');

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
exports.verifyPayment = catchAsync(async (req, res, next) => {
	try {
		if (!req.params.paymentId) {
			res.status(500).send('Payment Id not found');
		}
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

		const paymentDetails = await instance.payments.fetch(
			req.params.paymentId
		);
		res.status(200).json({
			status: 'success',
			data: { paymentDetails },
		});
	} catch (error) {
		JSON.stringify(error);
		let message = '';
		if (error.description) {
			message = error.description;
		} else {
			message = 'Invalid Id';
		}
		return next(new AppError(message));
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
		const newDoc = await Subscription.findById(subscription.id);

		const invoiceName = await createInvoice(
			{
				name: newDoc.user.name,
				email: newDoc.user.email,
				number: newDoc.user.number,
			},
			{
				paymentID: razorpayPaymentId,
				id: subscription.subscriptionNumber,
				package: 'Tenant Package',
				totalAmount: req.body.mainAmount,
				amountPaid: req.body.paidAmount,
				discount: 500,
				tax: 0,
			}
		);

		console.log(invoiceName);
		const respEmail = await sendEmailInvoice(
			newDoc.user.email,
			'Homesearch package invoice',
			invoiceName.fileName,
			`${invoiceName.docName}.pdf`
		);
		console.log(respEmail);
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
	// filter.packageType = 'consultantFee';
	let year = new Date().getFullYear();
	let yearEnd = new Date().getFullYear();
	if (req.query.dealBy) {
		filter.dealBy = req.query.dealBy;
	}
	if (req.query.paymentMode) {
		filter.paymentMode = req.query.paymentMode;
	}
	if (req.query.year) {
		year = req.query.year;
		filter.createdAt = {
			$gte: moment(year).startOf('day').format(),
			$lt: moment(`${Number(year) + 1}`)
				.startOf('day')
				.format(),
		};
	}
	if (req.query.month) {
		const startMonth = Number(req.query.month) + 1;
		let endMonth;
		if (startMonth === 12) {
			endMonth = 1;
			yearEnd = yearEnd + 1;
		} else {
			endMonth = startMonth + 1;
		}
		filter.createdAt = {
			$gte: moment(`${year}-${startMonth}`).startOf('day').format(),
			$lt: moment(`${yearEnd}-${endMonth}`).startOf('day').format(),
		};
	}

	// console.log(filter);

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
exports.getRevenue = catchAsync(async (req, res, next) => {
	const filter = {};
	// filter.packageType = 'consultantFee';
	let year = new Date().getFullYear();
	let yearEnd = new Date().getFullYear();
	if (req.query.dealBy) {
		filter.dealBy = mongoose.Types.ObjectId(req.query.dealBy);
	}
	if (req.query.paymentMode) {
		filter.paymentMode = req.query.paymentMode;
	}
	if (req.query.year) {
		year = req.query.year;
		filter.createdAt = {
			$gte: moment(year).startOf('day').toDate(),
			$lt: moment(`${Number(year) + 1}`)
				.startOf('day')
				.toDate(),
		};
	}
	if (req.query.month) {
		const startMonth = Number(req.query.month) + 1;
		let endMonth;
		if (startMonth === 12) {
			endMonth = 1;
			yearEnd = yearEnd + 1;
		} else {
			endMonth = startMonth + 1;
		}

		const gte = moment(`${year}-${startMonth}`).startOf('day').toDate();
		const lt = moment(`${yearEnd}-${endMonth}`).startOf('day').toDate();
		if (filter.createdAt) {
			delete filter.createdAt;
		}
		filter['$and'] = [
			{ createdAt: { $gte: gte } },
			{ createdAt: { $lt: lt } },
		];
	}

	console.log(JSON.stringify(filter));

	const totalAmount = await Subscription.aggregate([
		{
			$addFields: {
				createdAt: { $toDate: '$createdAt' },
			},
		},
		{ $match: filter },
		{
			$group: {
				_id: null,
				total: { $sum: '$paidAmount' },
			},
		},
	]);

	res.status(200).json({
		status: 'success',
		data: { totalAmount },
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

	const link = `https://homesearch18.com/package-feedback/${subscription.id}`;
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

exports.createSubscription = catchAsync(async (req, res, next) => {
	const requireFields = [
		'mainAmount',
		'paidAmount',
		'dealBy',
		'packageType',
		'name',
		'number',
		'paymentMode',
	];
	const validFields = [
		'mainAmount',
		'paidAmount',
		'dealBy',
		'packageType',
		'package',
		'email',
		'name',
		'number',
		'paymentMode',
		'createdAt',
	];
	const excludedFields = [];
	requireFields.forEach((c) => {
		if (!req.body[c]) {
			excludedFields.push(c);
		}
	});
	if (excludedFields.length > 0) {
		return next(
			new AppError(`Missing fields - ${excludedFields.join(',')}`)
		);
	}
	const keys = Object.keys(req.body);
	keys.forEach((c) => {
		if (!validFields.includes(c)) {
			delete req.body[c];
		}
	});
	const subscription = await Subscription.create(req.body);
	let package;
	if (req.body.packageType === 'tenantPackage') {
		package = 'Tenant Package';
	} else if (req.body.packageType === 'paymentLink') {
		package = 'Custom Requirements';
	} else {
		package = 'Consultant Fee';
	}

	const discount = req.body.mainAmount - req.body.paidAmount;

	const invoiceName = await createInvoice(
		{
			name: req.body.name,
			email: req.body.email ? req.body.email : null,
			number: req.body.number,
		},
		{
			id: subscription.subscriptionNumber,
			package,
			totalAmount: req.body.mainAmount,
			amountPaid: req.body.paidAmount,
			discount,
			tax: 0,
		}
	);

	console.log(invoiceName);
	if (req.body.email) {
		const respEmail = await sendEmailInvoice(
			req.body.email,
			'Homesearch package invoice',
			invoiceName.fileName,
			`${invoiceName.docName}.pdf`
		);
		console.log(respEmail);
	}

	res.status(200).json({
		status: 'success',
		data: subscription,
	});
});
exports.sendProposal = catchAsync(async (req, res, next) => {
	const requireFields = [
		'proposalPackage',
		'proposalPrice',
		'propertyToBeShown',
		'leadId',
	];

	const excludedFields = [];
	requireFields.forEach((c) => {
		if (!req.body[c]) {
			excludedFields.push(c);
		}
	});
	if (excludedFields.length > 0) {
		return next(
			new AppError(`Missing fields - ${excludedFields.join(',')}`)
		);
	}

	const lead = await Lead.findById(req.body.leadId);
	if (!lead) {
		return next(new AppError('Lead not found'));
	}
	// if (lead.proposalStatus === 'sent') {
	// 	return next(new AppError('Proposal already sent'));
	// }

	const leadRequireFields = [
		'name',
		'email',
		'number',
		'city',
		'preferedLocation',
		'minPrice',
		'maxPrice',
	];
	const excludedLeadFields = [];
	leadRequireFields.forEach((c) => {
		if (!lead[c]) {
			excludedLeadFields.push(c);
		}
	});
	if (excludedLeadFields.length > 0) {
		return next(
			new AppError(`Missing fields - ${excludedLeadFields.join(',')}`)
		);
	}

	lead.proposalStatus = 'sent';
	lead.proposalPackage = req.body.proposalPackage;
	lead.proposalPrice = req.body.proposalPrice;
	lead.propertyToBeShown = req.body.propertyToBeShown;
	lead.proposedBy = req.admin.id;
	await lead.save();
	const url = `/manage-proposal/${lead.id}`;
	res.status(200).json({
		status: 'success',
		data: {
			lead,
			url,
		},
	});
	const smsResult = await sendEmailProposal(
		lead.email,
		'Homesearch Proposal',
		url
	);
	const sm = await sendMessageProposal('18', lead.id, lead.number);
	// console.log(smsResult);
	console.log(sm.data);
});

exports.getProposalDetails = catchAsync(async (req, res, next) => {
	const lead = await Lead.findById(req.params.id);
	if (!lead) return next(new AppError('Lead not found', 404));
	const resp = {
		id: lead.id,
		name: lead.name,
		email: lead.email,
		number: lead.number,
		minPrice: lead.minPrice,
		maxPrice: lead.maxPrice,
		propertyRequirements: lead.propertyRequirements,
		preferedLocation: lead.preferedLocation,
		preferedLocation: lead.preferedLocation,
		city: lead.city,
		proposalPackage: lead.proposalPackage,
		proposalPrice: lead.proposalPrice,
		proposalComments: lead.proposalComments,
		proposedBy: lead.proposedBy,
		category: lead.category,
	};

	res.status(200).json({
		status: 'success',
		data: resp,
	});
});

exports.proposalResponse = catchAsync(async (req, res, next) => {
	const dataToupdate = {};

	if (!req.body.proposalStatus) {
		return next(new AppError('proposal status is missing'));
	}
	if (req.body.proposalStatus === 'declined' && !req.body.comment) {
		return next(new AppError('comment is missing'));
	}
	dataToupdate.proposalStatus = req.body.proposalStatus;
	if (req.body.comment) {
		dataToupdate['$push'] = {
			proposalComments: {
				comment: req.body.comment,
				action: req.body.proposalStatus,
			},
		};
	}

	if (req.body.proposalStatus === 'accepted') {
		dataToupdate.proposalAcceptDate = Date.now();
		dataToupdate.propertyVisitDate = req.body.propertyVisitDate;
	}

	const lead = await Lead.findByIdAndUpdate(req.params.id, dataToupdate, {
		runValidators: true,
		new: true,
	});

	res.status(200).json({
		status: 'success',
		data: lead.id,
	});
});
