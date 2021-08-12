import moment from 'moment';

export const renderBoolean = (val) => (val ? 'Yes' : 'No');

export const parseDate = (date) => {
	const m = moment(date);
	return m.format('Do MMM YYYY hh:mm a');
};

export const apiUrl = (url, version = null) => {
	return `/api/${version ? version : 'v1'}${url}`;
	// return `/api${url}`;
};

export const capitalizeFirstLetter = (string) =>
	string.charAt(0).toUpperCase() + string.slice(1);

export const renderPropertyTypes = (type) => {
	switch (type) {
		case 'independenthouse':
			return 'Villa';
		case 'flat':
			return 'Apartment';
		case 'land':
			return 'Land';
		case 'hostel':
			return 'Hostel';
		case 'pg':
			return 'PG';

		default:
			return type;
	}
};
export const renderQueryTypes = (type) => {
	switch (type) {
		case 'number':
			return 'Phone Number';
		case 'whatsapp':
			return 'Whatsapp';
		case 'message':
			return 'Enquiry';

		default:
			return type;
	}
};
export const renderPrice = (price) => {
	const num = Number(price);
	if (num < 10000000) {
		if (num < 100000) {
			return `${num / 1000} K`;
		} else {
			return `${num / 100000} L`;
		}
	} else {
		return `${num / 10000000} Cr`;
	}
};

export const renderImage = (image, path) => {
	if (typeof image === 'string') {
		return `${path}/${image}`;
	} else {
		return URL.createObjectURL(image);
	}
};

export const renderLunchingDateLabel = (status) => {
	switch (status) {
		case 'upcoming':
			return 'Lunching month and year';
		case 'ongoing':
			return 'Possesion month and year';
		case 'completed':
			return 'Completion monthn and year';

		default:
			return 'Lunching month and year';
	}
};
