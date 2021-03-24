import {
	selectAddPropertySaleLoading as addPropertyLoading,
	selectLoading as resourcesLoading,
	selectAmenities,
	selectFurnishes,
} from '../../redux/property/property.selector';
import {
	addPropertySale,
	fetchAllPropertyResourcesStart,
} from '../../redux/property/property.actions';
import {
	selectCityLoading as cityLoading,
	selectFetchLocationLoading as locationLoading,
	selectAllStates,
	selectLoading as stateLoading,
} from '../../redux/city/city.selector';
import {
	fetchAllStatesStart,
	fetchCitiesStart as fetchCities,
	fetchLocationssStart as fetchLocations,
} from '../../redux/city/city.actions';
import {
	selectAllUsers,
	selectLoading as userLoading,
} from '../../redux/users/users.selector';

import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import FlatSale from './addPropertySale.component';
import FormHeader from '../../components/formHeader/formHeader.component';
import Grid from '@material-ui/core/Grid';
import IndependentHouseSale from './addPropertySaleIndependentHouse.component';
import LandSale from './addPropertySaleLand.component';
import MuiAlert from '@material-ui/lab/Alert';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import RenderByRole from '../../components/roleRender/renderByRole.component';
import RowSelect from '../../components/rowSelect/rowSelect.component';
import Snackbar from '@material-ui/core/Snackbar';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fetchAllUsersSTart } from '../../redux/users/users.actions';
import { makeStyles } from '@material-ui/core/styles';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { useHistory } from 'react-router-dom';

const initialState = {
	type: 'independenthouse',
};

const typeMenuItems = [
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

const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
}));

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AddProperty = ({
	allStates,
	furnishes,
	amenities,
	resourcesLoading,
	stateLoading,
	cityLoading,
	locationLoading,
	userLoading,
	fetchStatesStart,
	fetchCities,
	fetchLocations,
	selectAllUsers,
	fetchAllUsersStart,
	fetchResourcesStart,
	addPropertyLoading,
	addProperty,
	currentUser,
}) => {
	const classes = useStyles();
	const history = useHistory();
	const [property, setProperty] = React.useState(initialState);
	const [state, setState] = React.useState('');
	const [selectedCity, setselectedCity] = React.useState('');
	const [selectedLocation, setselectedLocation] = React.useState('');
	const [selectedUser, setselectedUser] = React.useState('');
	const [cities, setCities] = React.useState([]);
	const [locations, setLocations] = React.useState([]);
	const [asyncError, setAsyncError] = React.useState('');

	React.useEffect(() => {
		fetchResourcesStart(handleFetchResources);
	}, []);

	const handleFetchResources = (type, data) => {
		if (type === 'success') {
			console.log(data);
			setAsyncError('');
		} else {
			setAsyncError(data);
		}
	};
	const handleFetchCity = (type, data) => {
		if (type === 'success') {
			console.log(data);
			setCities(data.cities);
			setAsyncError('');
		} else {
			setAsyncError(data);
		}
	};
	const handleFetchLocation = (type, data) => {
		if (type === 'success') {
			console.log(data);
			setLocations(data.locations);
			setAsyncError('');
		} else {
			setAsyncError(data);
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setProperty((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};
	const fetchState = () => {
		fetchStatesStart();
	};
	const fetchCity = () => {
		fetchCities(state, handleFetchCity);
	};
	const fetchLocation = () => {
		fetchLocations(selectedCity, handleFetchLocation);
	};
	const fetchUser = () => {
		fetchAllUsersStart();
	};

	const handleAddProperty = (type, data) => {
		if (type === 'success') {
			setAsyncError('');
			history.push('/all-properties-sale/active/sale');
		} else {
			window.scrollTo(0, 0);
			setAsyncError(data);
		}
	};

	const onSubmit = (propertyDetails) => {
		propertyDetails['city'] = selectedCity;
		propertyDetails['for'] = 'sale';
		propertyDetails['sale_type'] = property.type;
		propertyDetails['location'] = selectedLocation;
		propertyDetails['userId'] = selectedUser;
		console.log(propertyDetails);
		addProperty(propertyDetails, handleAddProperty);
	};

	const renderChild = (type) => {
		switch (type) {
			case 'flat':
				return (
					<FlatSale
						furnishes={furnishes}
						amenities={amenities}
						onSubmit={onSubmit}
						type={'apartment'}
						location={
							locations.find((c) => c.id === selectedLocation)
								? locations.find(
										(c) => c.id === selectedLocation
								  )['name']
								: ''
						}
						city={
							cities.find((c) => c.id === selectedCity)
								? cities.find((c) => c.id === selectedCity)[
										'name'
								  ]
								: ''
						}
					/>
				);
			case 'land':
				return (
					<LandSale
						furnishes={furnishes}
						amenities={amenities}
						onSubmit={onSubmit}
						location={
							locations.find((c) => c.id === selectedLocation)
								? locations.find(
										(c) => c.id === selectedLocation
								  )['name']
								: ''
						}
						city={
							cities.find((c) => c.id === selectedCity)
								? cities.find((c) => c.id === selectedCity)[
										'name'
								  ]
								: ''
						}
					/>
				);
			case 'independenthouse':
				return (
					<IndependentHouseSale
						furnishes={furnishes}
						amenities={amenities}
						onSubmit={onSubmit}
						type={'villa'}
						location={
							locations.find((c) => c.id === selectedLocation)
								? locations.find(
										(c) => c.id === selectedLocation
								  )['name']
								: ''
						}
						city={
							cities.find((c) => c.id === selectedCity)
								? cities.find((c) => c.id === selectedCity)[
										'name'
								  ]
								: ''
						}
					/>
				);

			default:
				break;
		}
	};

	const closeSnackbar = () => setAsyncError('');

	// const StateNode = RenderByRole({
	// 	'super-admin': (
	// 		<RowSelect
	// 			heading="State *"
	// 			loading={stateLoading}
	// 			name="type"
	// 			value={state}
	// 			onChange={(e) => setState(e.target.value)}
	// 			label="State"
	// 			onOpen={fetchState}
	// 			menuItems={allStates.map((c) => ({
	// 				label: c,
	// 				value: c,
	// 			}))}
	// 		/>
	// 	),
	// });
	const StateNode = (
		<RowSelect
			heading="State *"
			loading={stateLoading}
			name="type"
			value={state}
			onChange={(e) => setState(e.target.value)}
			label="State"
			onOpen={fetchState}
			menuItems={allStates.map((c) => ({
				label: c,
				value: c,
			}))}
		/>
	);
	const CityNode = RenderByRole({
		'super-admin': (
			<RowSelect
				heading="City *"
				name="type"
				loading={cityLoading}
				value={selectedCity}
				onChange={(e) => setselectedCity(e.target.value)}
				label="City"
				onOpen={fetchCity}
				helperText="Select state for to see available locations"
				menuItems={cities.map((c) => ({
					label: c.name,
					value: c.id,
				}))}
			/>
		),
		admin: (
			<RowSelect
				heading="City *"
				name="type"
				loading={cityLoading}
				value={selectedCity}
				onChange={(e) => setselectedCity(e.target.value)}
				label="City"
				helperText="Select state for to see available locations"
				menuItems={currentUser.propertyAccessCities.map((c) => ({
					label: c.name,
					value: c.id,
				}))}
			/>
		),
		staff: (
			<RowSelect
				heading="City *"
				name="type"
				loading={cityLoading}
				value={selectedCity}
				onChange={(e) => setselectedCity(e.target.value)}
				label="City"
				helperText="Select state for to see available locations"
				menuItems={currentUser.propertyAccessCities.map((c) => ({
					label: c.name,
					value: c.id,
				}))}
			/>
		),
	});
	return (
		<Box p="1rem">
			<Backdrop className={classes.backdrop} open={resourcesLoading}>
				loading resources...
			</Backdrop>
			<Backdrop className={classes.backdrop} open={addPropertyLoading}>
				Submiting data...
			</Backdrop>
			<Snackbar
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				open={!!asyncError}
				onClose={closeSnackbar}
				message={asyncError}
			>
				<Alert severity="error" onClose={closeSnackbar}>
					{asyncError}
				</Alert>
			</Snackbar>
			<h3>Add Property</h3>
			{/* <p className="color-red">{asyncError}</p> */}
			<Box>
				<Paper>
					<Box p="0.5rem">
						<Grid container>
							<Grid item xs={12} md={12} lg={12}>
								<FormHeader text="Location And User Info" />
								<RowSelect
									heading="Type *"
									name="type"
									value={property.type}
									onChange={handleChange}
									label="For"
									menuItems={typeMenuItems}
								/>
								{StateNode}
								<CityNode />
								<RowSelect
									heading="Location *"
									loading={locationLoading}
									name="type"
									value={selectedLocation}
									onChange={(e) =>
										setselectedLocation(e.target.value)
									}
									label="Location"
									onOpen={fetchLocation}
									menuItems={locations.map((c) => ({
										label: c.name,
										value: c.id,
									}))}
								/>
								<RowSelect
									heading="User *"
									loading={userLoading}
									name="type"
									value={selectedUser}
									onChange={(e) =>
										setselectedUser(e.target.value)
									}
									label="User"
									onOpen={fetchUser}
									menuItems={selectAllUsers.map((c) => ({
										label: c.name,
										value: c.id,
									}))}
								/>
								{renderChild(property.type)}
							</Grid>
						</Grid>
					</Box>
				</Paper>
			</Box>
		</Box>
	);
};

const mapStateToProps = createStructuredSelector({
	allStates: selectAllStates,
	furnishes: selectFurnishes,
	amenities: selectAmenities,
	currentUser: selectCurrentUser,
	resourcesLoading,
	stateLoading,
	cityLoading,
	locationLoading,
	selectAllUsers,
	userLoading,
	addPropertyLoading,
});

const mapDispatchToProps = (dispatch) => ({
	fetchStatesStart: () => dispatch(fetchAllStatesStart()),
	fetchCities: (state, callback) =>
		dispatch(fetchCities({ state, callback })),
	fetchLocations: (city, callback) =>
		dispatch(fetchLocations({ city, callback })),
	fetchAllUsersStart: () => dispatch(fetchAllUsersSTart()),
	fetchResourcesStart: (callback) =>
		dispatch(fetchAllPropertyResourcesStart({ callback })),
	addProperty: (property, callback) =>
		dispatch(addPropertySale({ property, callback })),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddProperty);
