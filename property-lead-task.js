// const path = require('path');
// const fs = require('fs');
// const csv = require('@fast-csv/format');

const SubModel = require('./models/propertyLeadModel');

const test = async () => {
	try {
		const resp = await SubModel.updateMany({}, { isPosted: false });
		console.log(resp);
	} catch (error) {
		console.log(error);
	}
};

test();
