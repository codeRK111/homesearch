// const path = require('path');
// const fs = require('fs');
// const csv = require('@fast-csv/format');

const SubModel = require('./models/subscriptionModel');

const test = async () => {
	try {
		const insertId2999 = '61d6cc3f414fb03d30db9db5';
		const resp = await SubModel.updateMany(
			{ package: insertId2999 },
			{ packageId: insertId2999 }
		);
		console.log(resp);
	} catch (error) {
		console.log(error);
	}
};

test();
