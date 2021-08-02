export const configureIntialFlat = (initialValue, furnishes) => {
	const clone = {
		...initialValue,
		availableDate: initialValue.availableDate
			? initialValue.availableDate
			: Date.now(),
		furnishes: furnishes.map((c) => {
			if (initialValue.furnishes.find((b) => b === c.id)) {
				c.value = true;
			} else {
				c.value = false;
			}
			return { ...c };
		}),
	};
	if (initialValue.toiletTypes) {
		clone['indianToilet'] = initialValue.toiletTypes.find(
			(c) => c.toiletType === 'indian'
		)['numbers'];
		clone['westernToilet'] = initialValue.toiletTypes.find(
			(c) => c.toiletType === 'western'
		)['numbers'];
	}
	if (initialValue.speciality) {
		clone.speciality = initialValue.speciality.id;
	} else {
		clone.speciality = null;
	}
	if (initialValue.tower) {
		clone.tower = initialValue.tower;
	} else {
		clone.tower = '';
	}
	return clone;
};

export const configureIntialLand = (initialValue) => {
	const clone = {
		...initialValue,
	};
	if (initialValue.speciality) {
		clone.speciality = initialValue.speciality.id;
	} else {
		clone.speciality = null;
	}
	return clone;
};

export const validateLand = (values) => {
	const error = {};
	if (!values.title) {
		error.title = 'Title required';
	}
	if (!values.description) {
		error.title = 'Description required';
	}
	if (values.numberOfUnits === '') {
		error.numberOfUnits = 'Number of units  required';
	}
	if (values.numberOfUnits === '') {
		error.numberOfUnits = 'Number of units  required';
	}
	if (values.length === '') {
		error.length = 'Length required';
	}

	if (values.plotArea === '') {
		error.plotArea = 'Plot area required';
	}

	if (values.plotFrontage === '') {
		error.plotFrontage = 'Plot frontage required';
	}

	if (values.widthOfRoad === '') {
		error.widthOfRoad = 'Width of road required';
	}

	if (values.minPrice === '') {
		error.minPrice = 'Min. price required';
	}
	if (values.maxPrice === '') {
		error.minPrice = 'Max. price required';
	}

	if (!values.plotArea.find((c) => c > 0)) {
		error.plotArea = 'Atleast one plot area required';
	}
	return error;
};

export const validateFlat = (values) => {
	const error = {};
	if (!values.title) {
		error.title = 'Title required';
	}
	if (!values.description) {
		error.title = 'Description required';
	}
	if (values.numberOfUnits === '') {
		error.numberOfUnits = 'Number of units  required';
	}
	if (values.numberOfBedrooms === '') {
		error.numberOfBedrooms = 'Number of bedrooms required';
	}
	if (values.numberOflivingAreas === '') {
		error.numberOflivingAreas = 'Number of living areas required required';
	}
	if (values.indianToilet === '') {
		error.indianToilet = 'Number of indian toilet required required';
	}
	if (values.westernToilet === '') {
		error.westernToilet = 'Number of western toilet required required';
	}
	if (values.superBuiltupArea === '') {
		error.superBuiltupArea = 'Super built-up area required';
	}
	if (values.carpetArea === '') {
		error.carpetArea = 'Carpet area required';
	}
	if (values.bookingAmount === '') {
		error.bookingAmount = 'Booking amount required';
	}
	if (values.minPrice === '') {
		error.minPrice = 'Min. price required';
	}
	if (values.maxPrice === '') {
		error.minPrice = 'Max. price required';
	}
	return error;
};

export const configureForUpdateFlat = (obj) => {
	if (obj['project']) {
		delete obj['project'];
	}
	obj['toiletTypes'] = [
		{
			toiletType: 'indian',
			numbers: obj.indianToilet,
		},
		{
			toiletType: 'western',
			numbers: obj.westernToilet,
		},
	];
	if (obj.availability === 'immediately') {
		delete obj['availableDate'];
	}
	obj.furnishes = obj.furnishes.filter((b) => b.value).map((c) => c.id);
	return obj;
};

export const configureForUpdateLand = (obj) => {
	if (obj['project']) {
		delete obj['project'];
	}
	if (obj['toiletTypes']) {
		delete obj['toiletTypes'];
	}
	if (obj['furnishes']) {
		delete obj['furnishes'];
	}

	return obj;
};

export const availabilityMenuItems = [
	{
		label: 'Ready to Move',
		value: 'immediately',
	},
	{
		label: 'Procession From',
		value: 'specificdate',
	},
];

export const furnishMenuItems = [
	{
		label: 'Furnished',
		value: 'furnished',
	},
	{
		label: 'Unfurnished',
		value: 'unfurnished',
	},
	{
		label: 'Semi furnished',
		value: 'semifurnished',
	},
];

export const renderTypes = (type) => {
	switch (type) {
		case 'flat':
			return 'Flat';
		case 'land':
			return 'Land';
		case 'independenthouse':
			return 'Independent House';

		default:
			break;
	}
};

export const ownershipMenuItems = [
	{
		label: 'Freehold',
		value: 'freehold',
	},
	{
		label: 'Leased',
		value: 'leashed',
	},
];
export const verifiedMenuItems = [
	{
		label: 'Yes',
		value: true,
	},
	{
		label: 'No',
		value: false,
	},
];

export const transactionTypeMenuItems = [
	{
		label: 'New booking',
		value: 'newbooking',
	},
	{
		label: 'Resale',
		value: 'resale',
	},
];

export const carParkingMenuItems = [
	{
		label: 'Open',
		value: 'open',
	},
	{
		label: 'Covered',
		value: 'covered',
	},
];

export const facingMenuItems = [
	{
		label: 'East',
		value: 'east',
	},
	{
		label: 'West',
		value: 'west',
	},
	{
		label: 'North',
		value: 'north',
	},
	{
		label: 'South',
		value: 'south',
	},
];

export const constructionDoneMenuItems = [
	{
		label: 'Yes',
		value: true,
	},
	{
		label: 'No',
		value: false,
	},
];

export const boundaryWallMadeMenuItems = [
	{
		label: 'Yes',
		value: true,
	},
	{
		label: 'No',
		value: false,
	},
];

export const gatedCommunityMadeMenuItems = [
	{
		label: 'Yes',
		value: true,
	},
	{
		label: 'No',
		value: false,
	},
];
export const landUsingZoningMenuItems = [
	{
		label: 'Yellow Zone',
		value: 'yellow',
	},
];
