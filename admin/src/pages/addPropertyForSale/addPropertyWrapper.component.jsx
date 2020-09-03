import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Backdrop from '@material-ui/core/Backdrop';
import Paper from '@material-ui/core/Paper';
import RowSelect from '../../components/rowSelect/rowSelect.component';
import FormHeader from '../../components/formHeader/formHeader.component';
import FlatSale from './addPropertySale.component';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import {
	selectAllStates,
	selectLoading as stateLoading,
	selectCityLoading as cityLoading,
	selectFetchLocationLoading as locationLoading,
} from '../../redux/city/city.selector';
import {
	fetchAllStatesStart,
	fetchCitiesStart as fetchCities,
	fetchLocationssStart as fetchLocations,
} from '../../redux/city/city.actions';
import {
	selectAmenities,
	selectFurnishes,
	selectLoading as resourcesLoading,
} from '../../redux/property/property.selector';
import {
	fetchAllPropertyResourcesStart,
	addProperty,
} from '../../redux/property/property.actions';
import {
	selectAllUsers,
	selectLoading as userLoading,
} from '../../redux/users/users.selector';
import { fetchAllUsersSTart } from '../../redux/users/users.actions';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const initialState = {
	type: 'flat',
};

const typeMenuItems = [
	{
		value: 'flat',
		label: 'Flat',
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

	const onSubmit = (propertyDetails) => {
		setAsyncError('Not connected with api');
	};

	const closeSnackbar = () => setAsyncError('');
	return (
		<Box p="1rem">
			<Backdrop className={classes.backdrop} open={resourcesLoading}>
				loading resources...
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
								<RowSelect
									heading="State *"
									loading={stateLoading}
									name="type"
									value={state}
									onChange={(e) => setState(e.target.value)}
									label="State"
									onOpen={fetchState}
									helperText="Select state for to see available cities"
									menuItems={allStates.map((c) => ({
										label: c,
										value: c,
									}))}
								/>
								<RowSelect
									heading="City *"
									name="type"
									loading={cityLoading}
									value={selectedCity}
									onChange={(e) =>
										setselectedCity(e.target.value)
									}
									label="City"
									onOpen={fetchCity}
									helperText="Select state for to see available locations"
									menuItems={cities.map((c) => ({
										label: c.name,
										value: c.id,
									}))}
								/>
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
								<FlatSale
									furnishes={furnishes}
									amenities={amenities}
									onSubmit={onSubmit}
								/>
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
	resourcesLoading,
	stateLoading,
	cityLoading,
	locationLoading,
	selectAllUsers,
	userLoading,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(AddProperty);
