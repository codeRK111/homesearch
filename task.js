// const path = require('path');
// const fs = require('fs');
// const csv = require('@fast-csv/format');

const SubModel = require('./models/subscriptionModel');

const test = async () => {
	try {
		const insertId = '61d6bd985acda8375cc4fdfe';
		const resp = await SubModel.updateMany(
			{ package: 'oc' },
			{ packageId: insertId }
		);
		console.log(resp);
	} catch (error) {
		console.log(error);
	}
};

test();
