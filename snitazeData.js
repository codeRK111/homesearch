const status = {
	interested: 'INTERESTED',
	'not-interested': 'NOT INTERESTED',
	'call-not-received': 'NOT CONNECTED',
	busy: 'BUSY',
	'not-in-service': 'Not IN SERVICE',
	'switch-off': 'SWITCH OFF',
};

exports.getReschedules = (data) => {
	{
		const rescheduled = data.filter((c) => c.reschedule);
		if (rescheduled.length > 0) {
			return rescheduled.map((b) => {
				return {
					reschedule: b.reschedule['$date'],
					from: b.from['$oid'],
					date: b.date['$date'],
				};
			});
		} else {
			return [];
		}
	}
};
exports.getStatuses = (data) => {
	{
		const rescheduled = data.filter((c) => c.status);
		if (rescheduled.length > 0) {
			return rescheduled.map((b) => {
				return {
					from: b.from['$oid'],
					date: b.date['$date'],
					value: status[b.status],
				};
			});
		} else {
			return [];
		}
	}
};
