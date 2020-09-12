import React from 'react';
import RowSelect from '../../components/rowSelect/rowSelect.component';
import RowTextField from '../../components/rowTextField/rowTextField.component';
import {
	Box,
	Button,
	FormControlLabel,
	Checkbox,
	Grid,
} from '@material-ui/core';
import RowChildren from '../../components/rowCheckBox/rowCheckbox.component';
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
	selectAddPropertySaleLoading as addPropertyLoading,
} from '../../redux/property/property.selector';
import {
	fetchAllPropertyResourcesStart,
	addPropertySale,
} from '../../redux/property/property.actions';
import {
	selectAllUsers,
	selectLoading as userLoading,
} from '../../redux/users/users.selector';
import { fetchAllUsersSTart } from '../../redux/users/users.actions';
import { useHistory } from 'react-router-dom';
import RowHOC from '../../components/rowCheckBox/rowCheckbox.component';
import { EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createToolbarPlugin from 'draft-js-static-toolbar-plugin';
import '../../../node_modules/draft-js-static-toolbar-plugin/lib/plugin.css';
import 'draft-js-static-toolbar-plugin/lib/plugin.css';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';

const typeMenuItems = [
	{
		value: 'flat',
		label: 'Flat',
	},
	// {
	// 	value: 'land',
	// 	label: 'Land',
	// },
	// {
	// 	value: 'independenthouse',
	// 	label: 'Independent House',
	// },
];

const legalClearanceInitialValue = [
	{
		name: 'approvalOfBuilding',
		value: false,
		label: 'Approval of building',
	},
	{
		name: 'nocFromFireDepts',
		value: false,
		label: 'NOC from Fire depts',
	},
	{
		name: 'electricityConnUse',
		value: false,
		label: 'Electricity Connection use',
	},
	{
		name: 'StructuralStatbilityCertificate',
		value: false,
		label: 'Structural stability certificate',
	},
	{
		name: 'nocFromPollutionDepts',
		value: false,
		label: 'NOC from Pollution deptt',
	},
	{
		name: 'functionalCertificate',
		value: false,
		label: 'Occupation / functional certificate',
	},
	{
		name: 'holdingTax',
		value: false,
		label: 'Municipal /Holding Tax',
	},
	{
		name: 'completionCertificate',
		value: false,
		label: 'Completion Certificate',
	},
	{
		name: 'reraapproved',
		value: false,
		label: 'RERA Approved',
	},
];

const initialState = {
	type: 'flat',
	title: '',
	description: '',
	distanceSchool: '',
	distanceRailwayStation: '',
	distanceAirport: '',
	distanceBusStop: '',
	distanceHospital: '',
	reraId: '',
};

const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
}));

const ProjectInformation = ({
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
	next,
}) => {
	const classes = useStyles();
	const history = useHistory();
	const [property, setProperty] = React.useState(initialState);
	const [editorState, setEditorState] = React.useState(() =>
		EditorState.createEmpty()
	);
	const [state, setState] = React.useState('');
	const [selectedCity, setselectedCity] = React.useState('');
	const [selectedLocation, setselectedLocation] = React.useState('');
	const [selectedUser, setselectedUser] = React.useState('');
	const [cities, setCities] = React.useState([]);
	const [locations, setLocations] = React.useState([]);
	const [asyncError, setAsyncError] = React.useState('');
	const [sAmenities, setSAmenities] = React.useState([]);
	const [legalClearance, setLegalClearance] = React.useState(
		legalClearanceInitialValue
	);

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

	const handleAmenities = (id) => (e) => {
		setSAmenities((prevState) => {
			return prevState.map((c) => {
				if (c.id === id) {
					c.value = e.target.checked;
				}
				return c;
			});
		});
	};

	const handleLegalClearance = (name) => (e) => {
		setLegalClearance((prevState) => {
			return prevState.map((c) => {
				if (c.name === name) {
					c.value = e.target.checked;
				}
				return c;
			});
		});
	};

	React.useEffect(() => {
		fetchResourcesStart(handleFetchResources);
	}, []);
	React.useEffect(() => {
		if (amenities.length > 0) {
			setSAmenities(amenities.map((c) => ({ ...c, value: false })));
		}
	}, [amenities]);
	return (
		<Box mt="1rem">
			<Backdrop className={classes.backdrop} open={resourcesLoading}>
				loading resources...
			</Backdrop>
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
				onChange={(e) => setselectedCity(e.target.value)}
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
				onChange={(e) => setselectedLocation(e.target.value)}
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
				onChange={(e) => setselectedUser(e.target.value)}
				label="User"
				onOpen={fetchUser}
				menuItems={selectAllUsers.map((c) => ({
					label: c.name,
					value: c.id,
				}))}
			/>
			<RowTextField
				heading="Title*"
				name="title"
				value={property.title}
				onChange={handleChange}
				label="Enter title"
			/>
			<RowTextField
				heading="Description*"
				name="description"
				value={property.description}
				onChange={handleChange}
				label="Enter description"
				rows={5}
				multiline={true}
			/>
			<RowChildren heading={'Amenities'}>
				{sAmenities.map((c) => (
					<Grid item xs={12} lg={4} key={c.id}>
						<FormControlLabel
							control={
								<Checkbox
									checked={c.value}
									onChange={handleAmenities(c.id)}
									name="checkedB"
									color="primary"
								/>
							}
							label={c.name}
						/>
					</Grid>
				))}
			</RowChildren>
			<RowChildren heading="Legal clearance">
				<Grid container>
					{legalClearance.map((c, i) => {
						return (
							<Grid item lg={6} key={i}>
								<FormControlLabel
									control={
										<Checkbox
											checked={c.value}
											onChange={handleLegalClearance(
												c.name
											)}
											name="checkedB"
											label={c.label}
											color="primary"
										/>
									}
									label={c.label}
								/>
							</Grid>
						);
					})}
				</Grid>
			</RowChildren>
			{legalClearance.find((c) => c.name === 'reraapproved')['value'] && (
				<RowTextField
					heading="RERA ID"
					name="reraId"
					onChange={handleChange}
					label="Enter ID"
				/>
			)}
			<RowTextField
				heading="Distance from school"
				name="distanceSchool"
				onChange={handleChange}
				type="number"
				label="In KM"
			/>
			<RowTextField
				heading="Distance from railway station"
				name="distanceRailwayStation"
				onChange={handleChange}
				type="number"
				label="In KM"
			/>
			<RowTextField
				heading="Distance from airport"
				name="distanceAirport"
				onChange={handleChange}
				type="number"
				label="In KM"
			/>
			<RowTextField
				heading="Distance from bus stop"
				name="distanceBusStop"
				onChange={handleChange}
				type="number"
				label="In KM"
			/>
			<RowTextField
				heading="Distance from hospital"
				name="distanceHospital"
				onChange={handleChange}
				type="number"
				label="In KM"
			/>
			<Box display="flex" justifyContent="flex-end">
				<Button
					variant="contained"
					color="primary"
					onClick={next}
					disabled={
						!(
							property.title &&
							property.description &&
							state &&
							selectedCity &&
							selectedLocation &&
							selectedUser
						)
					}
				>
					Next
				</Button>
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
	addPropertyLoading,
});

const mapDispatchToProps = (dispatch) => ({
	fetchStatesStart: () => dispatch(fetchAllStatesStart()),
	fetchCities: (state, callback) =>
		dispatch(fetchCities({ state, callback })),
	fetchLocations: (city, callback) =>
		dispatch(fetchLocations({ city, callback })),
	fetchAllUsersStart: () => dispatch(fetchAllUsersSTart('builder')),
	fetchResourcesStart: (callback) =>
		dispatch(fetchAllPropertyResourcesStart({ callback })),
	addProperty: (property, callback) =>
		dispatch(addPropertySale({ property, callback })),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectInformation);
