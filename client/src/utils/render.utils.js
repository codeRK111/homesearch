import moment from 'moment';

export const renderInfo = (info) => (info ? info : 'Not Specified');
export const renderBool = (info) => (info ? 'Yes' : 'No');
export const parseDate = (date) => {
	const m = moment(date);
	return m.format('Do MMM YYYY');
};

export const capitalizeFirstLetter = (string) =>
	string.charAt(0).toUpperCase() + string.slice(1);

export const renderToilets = (toilets) => {
	let count = 0;
	toilets.forEach((c) => (count += c.numbers));
	return count;
};

export const renderFor = (pFor) => {
	switch (pFor) {
		case 'sale':
			return 'Sale';

		default:
			break;
	}
};

export const renderStatus = (status) => {
	switch (status) {
		case 'active':
			return 'Active';
		case 'expired':
			return 'Expired';
		case 'underScreening':
			return 'Under Screening';

		default:
			break;
	}
};

export const renderTransactionType = (type) => {
	switch (type) {
		case 'newbooking':
			return 'New Booking';
		case 'resale':
			return 'Resale';

		default:
			return type;
	}
};

export const renderOwnership = (property) => {
	if (property.propertyOwnerShip === 'freehold') {
		return 'Freehold';
	} else {
		return 'Leashed';
	}
};

export const renderVerified = (verified) =>
	verified ? 'Verified' : 'Not-verified';

export const renderPerSqft = (property) => {
	if (property.salePriceOver === 'superBuildUpArea') {
		return `₹ ${(
			property.salePrice /
			property.superBuiltupArea /
			1000
		).toFixed(2)}K`;
	} else {
		return `₹ ${(property.salePrice / property.carpetArea / 1000).toFixed(
			2
		)}K`;
	}
};

export const renderPerSqftLand = (property) => {
	return `₹ ${(property.salePrice / property.plotArea / 1000).toFixed(2)}K`;
};

export const renderPriceOver = (property) => {
	if (property.salePriceOver === 'superBuildUpArea') {
		return '(SBA)';
	} else {
		return '(CA)';
	}
};

export const renderFurnishAndAmenities = (info) => {
	if (info.for === 'sale') {
		if (info.sale_type !== 'land') {
			return true;
		} else {
			return false;
		}
	}

	if (info.for === 'rent') {
		return true;
	}
};

export const renderLegalClearance = (info) => {
	if (info['for'] !== 'rent') {
		return true;
	} else {
		return false;
	}
};

export const renderArray = (info) => {
	let str = '';
	info.forEach((c) => {
		str += `${capitalizeFirstLetter(c)},`;
	});
	return str.slice(0, -1);
};
