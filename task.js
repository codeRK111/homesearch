// const path = require('path');
// const fs = require('fs');
// const csv = require('@fast-csv/format');

const SubModel = require('./models/leadsModel');
const { dummyData } = require('./leads-data-work');
const { getReschedules, getStatuses } = require('./snitazeData');

const testResult = [];
const test = async () => {
	for (const c of dummyData) {
		const d = {};
		const reschedules = getReschedules(c.comments);
		// console.log(reschedules);
		if (reschedules.length > 0) {
			d['reschedules'] = reschedules;
		}
		// const statuses = getStatuses(c.comments);
		// if (statuses.length > 0) {
		// 	d['leadStatus'] = statuses;
		// }
		if (Object.keys(d).length > 0) {
			const filterData = {
				reschedules: d.reschedules ? d.reschedules : [],
			};
			const resp = await SubModel.findByIdAndUpdate(
				c._id['$oid'],
				filterData,
				{ new: true, runValidators: true }
			);
			console.log(filterData);
		}
	}
};

// test();
console.log(JSON.stringify(testResult, null, 2));
