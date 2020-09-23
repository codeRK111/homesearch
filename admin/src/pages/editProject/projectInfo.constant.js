import { TokenExpiredError } from 'jsonwebtoken';

export const initialProjectDetails = {
	title: '',
	status: '',
	projectType: '',
	legalClearance: [],
	amenities: [],
	image1: null,
	image2: null,
	image3: null,
	image4: null,
	description: 'Test',
	distanceAirport: '',
	distanceBusStop: '',
	distanceHospital: '',
	distanceRailwayStation: '',
	distanceSchool: '',
	complitionStatus: '',
	reraId: '',
	numberOfOwner: '',
};

export const complitionStatusMenuItems = [
	{
		value: 'upcoming',
		label: 'Upcoming',
	},
	{
		value: 'ongoing',
		label: 'Ongoing',
	},
	{
		value: 'completed',
		label: 'Completed',
	},
];

export const projectTypeMenuItens = [
	{
		value: 'flat',
		label: 'Flat',
	},
	{
		value: 'land',
		label: 'Land',
	},
	{
		value: 'independenthouse',
		label: 'Independent House',
	},
];

export const statusMenuItems = [
	{
		value: 'active',
		label: 'Active',
	},
	{
		value: 'inactive',
		label: 'Inactive',
	},
];

export const configureIntial = (initialValue, amenities) => {
	const clone = {
		...initialValue,
		initialAmenities: initialValue.amenities,
		amenities: amenities.map((c) => {
			if (initialValue.amenities.find((b) => b === c.id)) {
				c.value = true;
			} else {
				c.value = false;
			}
			return { ...c };
		}),
	};
	if (initialValue.amenities) {
		clone['showAmenities'] =
			initialValue.amenities.length > 0 ? true : false;
	}
	if (initialValue.amenities) {
		clone['initialAmenities'] = initialValue.amenities;
	}
	if (
		initialValue.legalClearance &&
		initialValue.legalClearance.find((c) => c.name === 'reraapproved') &&
		initialValue.legalClearance.find((c) => c.name === 'reraapproved')[
			'value'
		]
	) {
		clone['reraId'] = initialValue.legalClearance.find(
			(c) => c.name === 'reraapproved'
		)['details'];
	}
	if (
		initialValue.legalClearance &&
		initialValue.legalClearance.find((c) => c.name === 'numberOfOwner') &&
		initialValue.legalClearance.find((c) => c.name === 'numberOfOwner')[
			'value'
		]
	) {
		clone['numberOfOwner'] = initialValue.legalClearance.find(
			(c) => c.name === 'numberOfOwner'
		)['details'];
	}

	return clone;
};

export const validate = (values) => {
	const error = {};
	if (!values.title) {
		error.title = 'Title required';
	}
	if (!values.description) {
		error.title = 'Description required';
	}
	if (values.distanceSchool === '') {
		error.distanceSchool = 'Distance from school required';
	}
	if (values.distanceBusStop === '') {
		error.distanceBusStop = 'Distance from bus stop required';
	}
	if (values.distanceRailwayStation === '') {
		error.distanceRailwayStation = 'Distance from railway station required';
	}
	if (values.distanceAirport === '') {
		error.distanceAirport = 'Distance from airport required';
	}
	if (values.distanceHospital === '') {
		error.distanceHospital = 'Distance from hospital required';
	}
	return error;
};

export const configureForUpdate = (obj) => {
	if (obj['builder']) {
		delete obj['builder'];
	}
	if (obj['city']) {
		delete obj['city'];
	}
	if (obj['createdAt']) {
		delete obj['createdAt'];
	}
	delete obj['image1'];
	delete obj['image2'];
	delete obj['image3'];
	delete obj['image4'];

	if (obj['location']) {
		delete obj['location'];
	}
	if (obj['showAmenities']) {
		delete obj['showAmenities'];
	}
	if (obj['initialAmenities']) {
		delete obj['initialAmenities'];
	}
	if (obj.reraId) {
		obj.legalClearance.forEach((c) => {
			if (c.name === 'reraapproved') {
				c.details = obj.reraId;
			}
		});
		delete obj['reraId'];
	}
	if (obj.numberOfOwner) {
		obj.legalClearance.forEach((c) => {
			if (c.name === 'numberOfOwner') {
				c.details = obj.numberOfOwner;
			}
		});
		delete obj['reraId'];
	}
	delete obj['reraId'];
	delete obj['numberOfOwner'];
	return obj;
};

export const showReraId = (values, visible) => {
	return (
		visible.legalClearance &&
		values.legalClearance.find((c) => c.name === 'reraapproved') &&
		values.legalClearance.find((c) => c.name === 'reraapproved')['value']
	);
};

export const showNumber = (values, visible) => {
	return (
		visible.legalClearance &&
		values.legalClearance.find((c) => c.name === 'numberOfOwner') &&
		values.legalClearance.find((c) => c.name === 'numberOfOwner')['value']
	);
};
