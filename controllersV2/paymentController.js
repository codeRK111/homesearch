const Razorpay = require('razorpay');
const catchAsync = require('./../utils/catchAsync');
const createInvoice = require('./../utils/createTenantInvoice');
const createInvoiceMannual = require('./../utils/createTenantInvoiceMannual');
const createInvoiceMannualV2 = require('./../utils/createTenantInvoiceMannual-v2');
const sendEmailProposal = require('./../utils/sendMailProposal');
const sendMessageProposal = require('./../utils/sendProposal');
const sendEmailSubscriptionFeedback = require('./../utils/sendMailReview');
const sendEmailInvoice = require('./../utils/sendMailInvoice');
const Subscription = require('./../models/subscriptionModel');
const GSTModel = require('./../models/gstModel');
const Invoice = require('./../models/invoiceModel');
const Lead = require('./../models/leadsModel');
const Link = require('./../models/paymentLinkModel');
const Admin = require('./../models/adminModel');
const Package = require('./../models/propertyPackageModel');
const StaffTargetModel = require('./../models/staffTargetModel');
const crypto = require('crypto');
const { nanoid } = require('nanoid');
const AppError = require('../utils/appError');
const moment = require('moment');
const mongoose = require('mongoose');
const PropertyPackage = require('./../models/propertyPackageModel');
const path = require('path');
const calculatePrice = require('../utils/calculate-price');

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
			amount: calculatePrice(link.gst, link.amount) * 100, // amount in smallest currency unit
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
		const packageData = await PropertyPackage.findById(
			req.body.packageName
		);
		if (!packageData) {
			return res.status(500).send('Invalid Package');
		}
		amount = calculatePrice(packageData.gst, packageData.price) * 100;

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
			packageId: req.body.package,
			totalPropertyAllowed: 5,
			orderId: razorpayOrderId,
			paymentId: razorpayPaymentId,
			user: req.user.id,
			packageType: 'tenantPackage',
		};

		if (req.body.homeSearchStaff) {
			options.dealBy = req.body.homeSearchStaff;
			const d = new Date();
			const year = d.getFullYear();
			const month = d.getMonth();
			const target = await StaffTargetModel.findOne({
				year,
				month,
				staff: req.body.homeSearchStaff,
			});
			if (target) {
				let existingAmount = 0;
				if (target.completedAmount) {
					existingAmount = target.completedAmount;
				}
				target.completedAmount = existingAmount + req.body.paidAmount;
				await target.save();
			} else {
				await StaffTargetModel.create({
					year,
					month,
					completedAmount: req.body.paidAmount,
					staff: req.body.homeSearchStaff,
					targetAmount: 0,
				});
			}
		}

		const subscription = await Subscription.create(options);
		const newDoc = await Subscription.findById(subscription.id);

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
				const d = new Date();
				const year = d.getFullYear();
				const month = d.getMonth();
				const target = await StaffTargetModel.findOne({
					year,
					month,
					staff: req.body.homeSearchStaff,
				});
				if (target) {
					let existingAmount = 0;
					if (target.completedAmount) {
						existingAmount = target.completedAmount;
					}
					target.completedAmount =
						existingAmount + req.body.paidAmount;
					await target.save();
				} else {
					await StaffTargetModel.create({
						year,
						month,
						completedAmount: req.body.paidAmount,
						staff: req.body.homeSearchStaff,
						targetAmount: 0,
					});
				}
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
	// filter.package = 'b';
	let year = new Date().getFullYear();
	let yearEnd = new Date().getFullYear();
	if (req.query.dealBy) {
		filter.dealBy = req.query.dealBy;
	}
	if (req.query.paymentMode) {
		filter.paymentMode = req.query.paymentMode;
	}
	if (req.query.packageType) {
		filter.package = req.query.packageType;
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
	if (req.query.packageType) {
		if (req.query.packageType === 'consultantFee') {
			filter.packageType = req.query.packageType;
		} else {
			filter.package = req.query.packageType;
		}
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
	if (!req.body.gst) {
		return next(new AppError('gst required'));
	}

	const link = await Link.create(req.body);

	res.status(200).json({
		status: 'success',
		data: { link: `pay?pl=${link.id}` },
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
	const subData = req.body;
	if (req.body.package) {
		subData.packageId = req.body.package;
	}
	const subscription = await Subscription.create(subData);
	let package;
	if (req.body.packageType === 'tenantPackage') {
		package = 'Tenant Package';
	} else if (req.body.packageType === 'paymentLink') {
		package = 'Custom Requirements';
	} else {
		package = 'Consultant Fee';
	}

	if (req.body.dealBy) {
		const d = new Date();
		const year = d.getFullYear();
		const month = d.getMonth();
		const target = await StaffTargetModel.findOne({
			year,
			month,
			staff: req.body.dealBy,
		});
		if (target) {
			let existingAmount = 0;
			if (target.completedAmount) {
				existingAmount = target.completedAmount;
			}
			target.completedAmount = existingAmount + req.body.paidAmount;
			await target.save();
		} else {
			await StaffTargetModel.create({
				year,
				month,
				completedAmount: req.body.paidAmount,
				staff: req.body.dealBy,
				targetAmount: 0,
			});
		}
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

exports.sendInvoice = catchAsync(async (req, res, next) => {
	const subscription = await Subscription.findById(req.params.id);
	if (!subscription) {
		return next(new AppError('Invalid Subscription'));
	}
	let name,
		email,
		number,
		amountPaid,
		totalAmount,
		discount,
		id,
		package,
		tax;

	if (subscription.user) {
		name = subscription.user.name;
		email = subscription.user.email;
		number = subscription.user.number;
	} else {
		if (!subscription.email) {
			return next(new AppError('Email not found'));
		}
		if (!subscription.number) {
			return next(new AppError('Phone Number  not found'));
		}
		name = subscription.name ? subscription.name : 'Homesearch User';
		email = subscription.email;
		number = subscription.number;
	}
	if (!subscription.paidAmount) {
		return next(new AppError('Amount  not found'));
	}
	amountPaid = subscription.paidAmount;
	totalAmount = subscription.mainAmount
		? subscription.mainAmount
		: subscription.paidAmount;
	discount = totalAmount - amountPaid;
	id = subscription.subscriptionNumber;
	if (subscription.packageId) {
		package = subscription.packageId.name;
	} else if (subscription.packageType === 'paymentLink') {
		package = 'Custom requirement';
	} else {
		package = 'Homesearch Package';
	}
	tax = 0;
	console.log({
		name,
		email,
		number,
		amountPaid,
		totalAmount,
		discount,
		id,
		package,
		tax,
	});

	try {
		const invoiceName = await createInvoice(
			{
				name,
				email,
				number,
			},
			{
				id,
				package,
				totalAmount,
				amountPaid,
				discount,
				tax,
			}
		);
		const resp = await sendEmailInvoice(
			email,
			'Homesearch package invoice',
			invoiceName.fileName,
			`${invoiceName.docName}.pdf`
		);

		res.status(200).json({
			status: 'success',
			data: invoiceName.fileName,
			resp,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			status: 'success',
			error: error.message,
		});
	}
});

exports.downloadInvoice = catchAsync(async (req, res, next) => {
	const subscription = await Subscription.findById(req.params.id);
	if (!subscription) {
		return next(new AppError('Invalid Subscription'));
	}
	let name,
		email,
		number,
		amountPaid,
		totalAmount,
		discount,
		id,
		package,
		igst = 0,
		cgst = 0,
		sgst = 0,
		gst = null;

	if (subscription.user) {
		name = subscription.user.name;
		email = subscription.user.email;
		number = subscription.user.number;
	} else {
		if (!subscription.number) {
			return next(new AppError('Phone Number  not found'));
		}
		name = subscription.name ? subscription.name : 'Homesearch User';
		email = subscription.email ? subscription.email : 'x';
		number = subscription.number;
	}
	if (!subscription.paidAmount) {
		return next(new AppError('Amount  not found'));
	}
	amountPaid = subscription.paidAmount;
	totalAmount = subscription.mainAmount
		? subscription.mainAmount
		: subscription.paidAmount;
	discount = totalAmount - amountPaid;
	id = subscription.subscriptionNumber;
	if (subscription.packageId) {
		package = subscription.packageId.name;
		const packageDetails = await Package.findById(
			subscription.packageId.id
		);
		if (packageDetails && packageDetails.gst) {
			gst = packageDetails.gst;
			if (packageDetails.gst.igst) {
				igst = packageDetails.price * (packageDetails.gst.igst / 100);
			}
			if (packageDetails.gst.cgst) {
				cgst = packageDetails.price * (packageDetails.gst.cgst / 100);
			}
			if (packageDetails.gst.sgst) {
				sgst = packageDetails.price * (packageDetails.gst.sgst / 100);
			}
		}
	} else if (subscription.packageType === 'paymentLink') {
		package = 'Custom requirement';
		if (subscription.paymentLink && subscription.paymentLink.gst) {
			gst = subscription.paymentLink.gst;
			if (subscription.paymentLink.gst.igst) {
				igst =
					subscription.paymentLink.amount *
					(subscription.paymentLink.gst.igst / 100);
			}
			if (subscription.paymentLink.gst.cgst) {
				cgst =
					subscription.paymentLink.amount *
					(subscription.paymentLink.gst.cgst / 100);
			}
			if (subscription.paymentLink.gst.sgst) {
				sgst =
					subscription.paymentLink.amount *
					(subscription.paymentLink.gst.sgst / 100);
			}
		}
	} else {
		package = 'Homesearch Package';
	}
	tax = {
		igst: igst.toFixed(2),
		cgst: cgst.toFixed(2),
		sgst: sgst.toFixed(2),
	};
	console.log({
		name,
		email,
		number,
		amountPaid: calculatePrice(gst, amountPaid),
		totalAmount,
		discount,
		id,
		package,
		tax,
	});

	try {
		const invoiceName = await createInvoice(
			{
				name,
				email,
				number,
			},
			{
				id,
				package,
				totalAmount,
				amountPaid: calculatePrice(gst, amountPaid),
				discount,
				tax,
			},
			(fileName, docName) => {
				res.download(
					__dirname + `/../static/invoices/${docName}.pdf`,
					(err) => {
						console.log(err);
					}
				);
			}
		);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			status: 'success',
			error: error.message,
		});
	}
});

exports.assignTarget = catchAsync(async (req, res, next) => {
	const isExisting = await StaffTargetModel.findOne({
		year: req.body.year,
		month: req.body.month,
		staff: req.body.staff,
	});
	if (isExisting) {
		isExisting.targetAmount = req.body.targetAmount;
		isExisting.incentivePercentage = req.body.incentivePercentage;
		await isExisting.save();
		res.status(200).json({
			status: 'success',
			data: isExisting,
		});
	} else {
		const target = await StaffTargetModel.create(req.body);
		res.status(200).json({
			status: 'success',
			data: target,
		});
	}
});

exports.fetchTargetDeails = catchAsync(async (req, res, next) => {
	const target = await StaffTargetModel.findOne({
		year: req.body.year,
		month: req.body.month,
		staff: req.body.staff,
	});
	res.status(200).json({
		status: 'success',
		data: target,
	});
});

exports.createAndDownloadInvoice = catchAsync(async (req, res, next) => {
	const info = {
		name: req.body.name,
		email: req.body.email ? req.body.email : 'x',
		number: req.body.number,
		description: req.body.description,
		serviceProvidedBy: req.body.serviceProvidedBy,
		mainAmount: req.body.amount,
		gstType: req.body.gstType,
		date: req.body.date,
		discount: req.body.discount,
		amountPaid: req.body.amount - req.body.discount,
		igst: 0,
		cgst: 0,
		sgst: 0,
		amountAfterGst: 0,
	};

	const gstDetails = await GSTModel.findById(req.body.gst);
	if (!gstDetails) {
		return next(new AppError('Invalid GST'));
	}
	console.log(gstDetails);
	info.gstNumber = gstDetails.number;
	if (req.body.gstType === 'excluded') {
		let igst, sgst, cgst;
		if (gstDetails.igst) {
			igst = info.amountPaid * (gstDetails.igst / 100);
			info.igst = igst.toFixed(2);
		}
		if (gstDetails.cgst) {
			cgst = info.amountPaid * (gstDetails.cgst / 100);
			info.cgst = cgst.toFixed(2);
		}
		if (gstDetails.sgst) {
			sgst = info.amountPaid * (gstDetails.sgst / 100);
			info.sgst = sgst.toFixed(2);
		}
		info.amountAfterGst = calculatePrice(
			{
				igst: gstDetails.igst,
				cgst: gstDetails.cgst,
				sgst: gstDetails.sgst,
			},
			info.amountPaid
		);
	} else {
		info.amountAfterGst = info.mainAmount - info.discount;
		info.amountPaid = ((info.amountAfterGst / 118) * 100).toFixed(2);
		let igst, sgst, cgst;
		if (gstDetails.igst) {
			igst = info.amountPaid * (gstDetails.igst / 100);
			info.igst = igst.toFixed(2);
		}
		if (gstDetails.cgst) {
			cgst = info.amountPaid * (gstDetails.cgst / 100);
			info.cgst = cgst.toFixed(2);
		}
		if (gstDetails.sgst) {
			sgst = info.amountPaid * (gstDetails.sgst / 100);
			info.sgst = sgst.toFixed(2);
		}
	}

	info.invoiceId = req.body.invoiceId
		? req.body.invoiceId
		: Math.floor(Math.random() * 10000);
	console.log(info);

	try {
		const invoiceName = await createInvoiceMannual(
			info,
			(fileName, docName) => {
				res.download(
					__dirname + `/../static/invoices/${docName}.pdf`,
					(err) => {
						console.log(err);
					}
				);
			}
		);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			status: 'success',
			error: error.message,
		});
	}
});
exports.createAndDownloadInvoiceManually = catchAsync(
	async (req, res, next) => {
		try {
			const data = req.body;
			const lastInvoice = await Invoice.find().sort({ _id: -1 }).limit(1);
			if (lastInvoice.length > 0) {
				data.invoiceNumber = lastInvoice[0].invoiceNumber + 1;
			} else {
				data.invoiceNumber = 1;
			}

			const inv = await Invoice.create(data);
			console.log(inv);

			const invoiceName = await createInvoiceMannualV2(
				inv,
				(fileName, docName) => {
					res.download(
						__dirname + `/../static/invoices/${docName}.pdf`,
						(err) => {
							console.log(err);
						}
					);
				}
			);
		} catch (error) {
			console.log(error);
			res.status(500).json({
				status: 'success',
				error: error.message,
			});
		}
	}
);
exports.downloadInvoiceFromDB = catchAsync(async (req, res, next) => {
	try {
		const invoice = await Invoice.findById(req.params.id);
		if (!invoice) {
			return next(AppError('Invoice Not found'));
		}

		const invoiceName = await createInvoiceMannualV2(
			invoice,
			(fileName, docName) => {
				res.download(
					__dirname + `/../static/invoices/${docName}.pdf`,
					(err) => {
						console.log(err);
					}
				);
			}
		);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			status: 'success',
			error: error.message,
		});
	}
});

exports.getAllInvoices = catchAsync(async (req, res, next) => {
	const filter = {};
	const page = req.query.page * 1 || 1;
	const limit = req.query.limit * 1 || 10;
	const skip = (page - 1) * limit;

	if (req.query.status) {
		filter.status = req.query.status;
	}

	const totalDocs = await Invoice.countDocuments(filter);

	const invoices = await Invoice.find(filter)
		.sort('-createdAt')
		.skip(skip)
		.limit(limit);
	res.status(200).json({
		status: 'success',
		data: { invoices, totalDocs },
	});
});

exports.updateInvoice = catchAsync(async (req, res, next) => {
	const invoice = await Invoice.findById(req.params.id);
	if (!invoice) {
		if (req.file) {
		}
		return next(new AppError('Invoice not found'));
	}

	const inv = await Invoice.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});

	res.status(200).json({
		status: 'success',
		data: { invoice: inv },
	});
});

exports.deleteInvoice = catchAsync(async (req, res, next) => {
	const invoice = await Invoice.findById(req.params.id);
	if (!invoice) {
		return next(new AppError('Invoice not found'));
	}

	await Invoice.findByIdAndRemove(req.params.id);

	res.status(200).json({
		status: 'success',
		data: null,
	});
});
