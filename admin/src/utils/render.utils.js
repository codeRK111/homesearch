import moment from 'moment';

export const renderBoolean = (val) => (val ? 'Yes' : 'No');

export const parseDate = (date) => {
	const m = moment(date);
	return m.format('Do MMM YYYY hh:mm a');
};
