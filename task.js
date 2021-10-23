const sendEmail = require('./utils/sendFromSMTp');

async function test() {
	try {
		const res = await sendEmail(
			'rakeshchandrra@gmail.com',
			'payment',
			'For payment purpose'
		);
		console.log(res);
	} catch (error) {
		console.log(JSON.stringify({ message: error.message }));
	}
}

// test();
