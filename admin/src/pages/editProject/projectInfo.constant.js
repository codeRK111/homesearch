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
