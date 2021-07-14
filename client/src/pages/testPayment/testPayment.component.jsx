import React from 'react';
import axios from 'axios';

// import logo from '../../assets/logo.png';
const TestPayment = () => {
	function loadScript(src) {
		return new Promise((resolve) => {
			const script = document.createElement('script');
			script.src = src;
			script.onload = () => {
				resolve(true);
			};
			script.onerror = () => {
				resolve(false);
			};
			document.body.appendChild(script);
		});
	}

	async function displayRazorpay() {
		const res = await loadScript(
			'https://checkout.razorpay.com/v1/checkout.js'
		);

		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?');
			return;
		}

		// creating a new order
		const result = await axios.post('/api/v1/api-test/payment-test');

		if (!result) {
			alert('Server error. Are you online?');
			return;
		}

		// Getting the order details back
		const { amount, id: order_id, currency } = result.data;
		const rzTestKeyId =
			process.env.NODE_ENV === 'development'
				? process.env.REACT_APP_RZ_TEST_ID
				: process.env.REACT_APP_RZ_LIVE_ID;

		const options = {
			key: rzTestKeyId, // Enter the Key ID generated from the Dashboard
			amount: amount.toString(),
			currency: currency,
			name: 'Soumya Corp.',
			description: 'Test Transaction',
			order_id: order_id,
			handler: async function (response) {
				const data = {
					orderCreationId: order_id,
					razorpayPaymentId: response.razorpay_payment_id,
					razorpayOrderId: response.razorpay_order_id,
					razorpaySignature: response.razorpay_signature,
				};

				const result = await axios.post(
					'/api/v1/api-test/success',
					data
				);

				alert(result.data.msg);
			},
			prefill: {
				name: 'Soumya Dey',
				email: 'SoumyaDey@example.com',
				contact: '9999999999',
			},
			notes: {
				address: 'Soumya Dey Corporate Office',
			},
			theme: {
				color: '#61dafb',
			},
		};

		// const paymentObject = new window.Razorpay(options);
		// paymentObject.open();
	}
	return (
		<div>
			<button className="App-link" onClick={displayRazorpay}>
				Pay ₹5
			</button>
			<h1>{process.env.NODE_ENV}</h1>
			<h1>{process.env.REACT_APP_RZ_TEST_ID}</h1>
		</div>
	);
};

export default TestPayment;
