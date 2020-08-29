import React from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import RowSelect from '../../components/rowSelect/rowSelect.component';
import RowTextField from '../../components/rowTextField/rowTextField.component';

const forMenuItems = [
	{
		value: 'rent',
		label: 'Rent',
	},
];

const typeMenuItems = [
	{
		value: 'flat',
		label: 'Flat',
	},
	{
		value: 'independenthouse',
		label: 'Independent House',
	},
	{
		value: 'guesthouse',
		label: 'Guest House',
	},
];

const userMenuItems = [
	{
		value: '',
		label: 'None',
	},
];

const stateMenuItems = [
	{
		value: '',
		label: 'None',
	},
];

const cityMenuItems = [
	{
		value: '',
		label: 'None',
	},
];

const locationMenuItems = [
	{
		value: '',
		label: 'None',
	},
];

const floorMenuItems = [
	{
		value: 'Entire Building',
		label: 'Entire Building',
	},
	{
		value: 'Ground floor',
		label: 'Ground floor',
	},
	{
		value: '1st floor',
		label: '1st floor',
	},
	{
		value: '2nd floor',
		label: '2nd floor',
	},
	{
		value: '3rd floor',
		label: '3rd floor',
	},
];

const initialState = {
	for: 'rent',
	type: '',
	userId: '',
	city: '',
	location: '',
	state: '',
	title: '',
	description: '',
	numberOfBedRooms: '',
	numberOfBalconies: '',
	noOfFloors: '',
	toiletIndian: '',
	toiletWestern: '',
	superBuiltupArea: '',
	carpetArea: '',
	rent: '',
	securityDeposit: '',
	furnished: '',
	distanceSchool: '',
	distanceCollege: '',
	distanceRailwayStation: '',
	distanceAirport: '',
	distanceMetroStation: '',
	distanceBusStop: '',
	distanceHospital: '',
	distanceShoppingMall: '',
	distanceBank: '',
	availability: '',
	externalAmenities: [],
	furnishes: [],
	floor: '',
};

const EditProperty = () => {
	const [property, setProperty] = React.useState(initialState);

	const handlePropertyChange = (e) => {
		e.persist();
		setProperty((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};
	return (
		<Box p="1rem">
			<h3>Edit Property</h3>
			<Paper>
				<Box p="0.5rem">
					<Grid container>
						<Grid item xs={12} md={12} lg={9}>
							<RowSelect
								heading="For *"
								name="for"
								value={property.for}
								onChange={handlePropertyChange}
								label={'Select'}
								menuItems={forMenuItems}
							/>
							<RowSelect
								heading="Type *"
								name="type"
								value={property.type}
								onChange={handlePropertyChange}
								label={'Type'}
								menuItems={typeMenuItems}
							/>
							<RowSelect
								heading="User *"
								name="userId"
								value={property.userId}
								onChange={handlePropertyChange}
								label={'User'}
								menuItems={userMenuItems}
							/>
							<RowSelect
								heading="State *"
								name="state"
								value={property.state}
								onChange={handlePropertyChange}
								label={'State'}
								menuItems={stateMenuItems}
							/>
							<RowSelect
								heading="City *"
								name="city"
								value={property.city}
								onChange={handlePropertyChange}
								label={'City'}
								menuItems={cityMenuItems}
							/>
							<RowSelect
								heading="Location *"
								name="location"
								value={property.location}
								onChange={handlePropertyChange}
								label={'Location'}
								menuItems={locationMenuItems}
							/>
							<RowTextField
								heading="Title *"
								name="title"
								value={property.title}
								onChange={handlePropertyChange}
								label={'Title'}
							/>
							<RowTextField
								heading="Description *"
								name="description"
								value={property.description}
								onChange={handlePropertyChange}
								label={'Description'}
								multiline
								rows={4}
							/>
							<RowTextField
								heading="Number of bed rooms *"
								name="numberOfBedRooms"
								value={property.numberOfBedRooms}
								onChange={handlePropertyChange}
								label={'Description'}
							/>
							<RowTextField
								heading="Number of balconies *"
								name="numberOfBalconies"
								value={property.numberOfBalconies}
								onChange={handlePropertyChange}
								label={'Balconies'}
							/>
							<RowTextField
								heading="Number of Floors *"
								name="noOfFloors"
								value={property.noOfFloors}
								onChange={handlePropertyChange}
								label={'floors'}
							/>
							<RowSelect
								heading="Property on Floor *"
								name="floor"
								value={property.floor}
								onChange={handlePropertyChange}
								label={'Floor'}
								menuItems={floorMenuItems}
							/>
						</Grid>
					</Grid>
				</Box>
			</Paper>
		</Box>
	);
};

export default EditProperty;
