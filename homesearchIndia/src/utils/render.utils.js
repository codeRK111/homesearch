import moment from 'moment';

export const renderInfo = (info) => (info ? info : 'Not Specified');
export const renderBool = (info) => (info ? 'Yes' : 'No');
export const parseDate = (date) => {
	const m = moment(date);
	return m.format('Do MMM YYYY');
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

export const handleRERA = (clearance) => {
	const reraDetails = clearance.find((c) => c.name === 'reraapproved');

	return {
		show: reraDetails && reraDetails.value,
		value: reraDetails && reraDetails.details,
	};
};
