import moment from 'moment';

export const renderBoolean = (val) => (val ? 'Yes' : 'No');

export const parseDate = (date) => {
	const m = moment(date);
	return m.format('Do MMM YYYY hh:mm a');
};

export const capitalizeFirstLetter = (string) =>
	string.charAt(0).toUpperCase() + string.slice(1);
