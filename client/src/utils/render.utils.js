import moment from 'moment';
import { validateNumber } from './validation.utils';

export const renderInfo = (info) => (info ? info : 'Not Specified');
export const renderBool = (info) => (info ? 'Yes' : 'No');
export const parseDate = (date) => {
	const m = moment(date);
	return m.format('Do MMM YYYY');
};

export const renderByPropertyFor = (property, pFor, component) => {
	if (property.for === pFor) {
		return component;
	}
	return null;
};
export const renderByPropertyType = (property, type, component) => {
	if (type.includes(property.type)) {
		return component;
	}
	return null;
};

export const apiUrl = (url, version = 1) => {
	return `/api/v${version}${url}`;
	// return `/api${url}`;
};
export const parseDateOnlyMonth = (date) => {
	const m = moment(date);
	return m.format(' MMM YYYY');
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

export const renderTypes = (type) => {
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

export const renderLandArea = (project, info) => {
	if (project.projectType === 'land') {
		return `${Math.min(...info.minAreaLand)} - ${Math.max(
			...info.maxAreaLand
		)}`;
	} else {
		return `${info.minArea} - ${info.maxArea}`;
	}
};

export const renderProjectTypes = (project, info) => {
	if (project.projectType === 'land') {
		return 'Land';
	} else {
		switch (project.projectType) {
			case 'independenthouse':
			case 'flat':
				return `${info.bedRooms.join(',')} BHK`;

			default:
				break;
		}
	}
};

export const renderProjectAmenities = (project) => {
	if (project.projectType !== 'land') {
		return true;
	} else {
		return false;
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

export const renderMinAndMax = (arr) => {
	return arr.length > 1
		? `${Math.min(...arr)}-${Math.max(...arr)}`
		: `${arr[0]}`;
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

export const renderAvailability = (property) => {
	if (property.availability === 'immediately') {
		return 'Ready to move';
	} else {
		return parseDateOnlyMonth(property.availableDate);
	}
};

export const renderFloorPlans = (property) => {
	const defaultImage = require('../assets/no-image.jpg');
	return {
		image1: property.floorplan1
			? `/assets/projects/${property.floorplan1}`
			: defaultImage,
		image2: property.floorplan2
			? `/assets/projects/${property.floorplan2}`
			: defaultImage,
	};
};
export const renderImage = (image, dir = 'projects') => {
	const defaultImage = require('../assets/no-image.jpg');
	return image ? `/assets/${dir}/${image}` : defaultImage;
};

export const handleRERA = (clearance) => {
	const reraDetails = clearance.find((c) => c.name === 'reraapproved');

	return {
		show: reraDetails && reraDetails.value,
		value: reraDetails && reraDetails.details,
	};
};

export const returnValidImage = (c) => {
	switch (true) {
		case !!c.image1:
			return c.image1;
		case !!c.image2:
			return c.image2;
		case !!c.image3:
			return c.image3;
		case !!c.image4:
			return c.image4;

		default:
			return null;
	}
};
export const renderPriceRange = (price, amount = 1) => {
	let l = '';
	switch (amount) {
		case 1000:
			l = 'K';
			break;
		case 100000:
			l = 'L';
			break;

		default:
			l = '';
			break;
	}
	if (price.min === price.max) {
		return `${price.min / amount}${l}`;
	} else {
		return `${price.min / amount} - ${price.max / amount}${l}`;
	}
};

export const shortLength = (sentence, length) => {
	if (sentence.length > length) {
		return `${sentence.substr(0, length)} ...`;
	} else {
		return sentence;
	}
};

export const toHumanReadble = (price) => {
	if (validateNumber(price)) {
		return Number(price).toLocaleString('en-IN');
	}
	return null;
};
export const toHumanReadbleString = (price) => {
	if (validateNumber(price)) {
		let p = Number(price);

		const a = [
			'',
			'One ',
			'Two ',
			'Three ',
			'Four ',
			'Five ',
			'Six ',
			'Seven ',
			'Eight ',
			'Nine ',
			'Ten ',
			'Eleven ',
			'Twelve ',
			'Thirteen ',
			'Fourteen ',
			'Fifteen ',
			'Sixteen ',
			'Seventeen ',
			'Eighteen ',
			'Nineteen ',
		];
		const b = [
			'',
			'',
			'Twenty',
			'Thirty',
			'Forty',
			'Fifty',
			'Sixty',
			'Seventy',
			'Eighty',
			'Ninety',
		];
		if ((p = p.toString()).length > 9) return 'overflow';
		let n = ('000000000' + p)
			.substr(-9)
			.match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
		if (!n) return;
		var str = '';
		str +=
			n[1] != 0
				? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore '
				: '';
		str +=
			n[2] != 0
				? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lakh '
				: '';
		str +=
			n[3] != 0
				? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) +
				  'Thousand '
				: '';
		str +=
			n[4] != 0
				? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) +
				  'Hundred '
				: '';
		str +=
			n[5] != 0
				? (str != '' ? 'And ' : '') +
				  (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]])
				: '';
		return str;

		// if (p >= 100000) {
		// 	return `₹ ${p / 100000} Lakh`;
		// } else {
		// 	return `₹ ${p / 1000}K`;
		// }
	}
	return null;
};
