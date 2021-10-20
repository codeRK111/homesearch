const Razorpay = require('razorpay');
const catchAsync = require('./../utils/catchAsync');
const Subscription = require('./../models/subscriptionModel');
const crypto = require('crypto');
const { nanoid } = require('nanoid');

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

		const subscription = await Subscription.create({
			mainAmount: req.body.mainAmount,
			paidAmount: req.body.paidAmount,
			package: req.body.package,
			totalPropertyAllowed: 5,
			orderId: razorpayOrderId,
			paymentId: razorpayPaymentId,
			user: req.user.id,
			packageType: 'tenantPackage',
		});

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
