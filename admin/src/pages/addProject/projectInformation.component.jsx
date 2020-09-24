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
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {
	selectAllStates,
	selectLoading as stateLoading,
	selectCityLoading as cityLoading,
	selectFetchLocationLoading as locationLoading,
} from '../../redux/city/city.selector';
import { fetchBuilders } from '../../redux/builder/builder.action';
import {
	selectFetchBuildersLoading as fetchBuilderLoading,
	selectBuilders,
} from '../../redux/builder/builder.selector';
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
import '../../../node_modules/draft-js-static-toolbar-plugin/lib/plugin.css';
import 'draft-js-static-toolbar-plugin/lib/plugin.css';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

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

const statusMenuItems = [
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

const legalClearanceInitialValueLand = [
	{
		name: 'numberOfOwner',
		value: false,
		label: 'Number of owner',
	},
	{
		name: 'withinBlockArea',
		value: false,
		label: 'Within Block Area',
	},
	{
		name: 'approvedByDevelopmentAutority',
		value: false,
		label: 'Approved by Development Authority',
	},
	{
		name: 'withinAreaOfDevelopmentAuthrity',
		value: false,
		label: 'Within Area of Development Authority',
	},
];

const initialState = {
	projectType: 'flat',
	title: '',
	complitionStatus: 'ongoing',
	description: '',
	distanceSchool: '',
	distanceRailwayStation: '',
	distanceAirport: '',
	distanceBusStop: '',
	distanceHospital: '',
	reraId: '',
	ownerNumber: '',
};

const filter = (state, ...excludeFields) => {
	let clone = { ...state };
	excludeFields.forEach((c) => {
		if (clone[c] === '') {
			delete clone[c];
		}
	});

	return clone;
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
	fetchBuilders,
	selectBuilders,
	fetchBuilderLoading,
	changeType,
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
	const [images, setImages] = React.useState({
		image1: null,
		image2: null,
		image3: null,
		image4: null,
	});
	console.log(legalClearance);
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
		if (name === 'projectType') {
			if (value === 'land') {
				setLegalClearance(legalClearanceInitialValueLand);
			}
			changeType(value);
		}
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
		fetchBuilders(console.log);
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
		const { checked } = e.target;
		setLegalClearance((prevState) => {
			return prevState.map((c) => {
				if (c.name === name) {
					c.value = checked;
				}
				return c;
			});
		});
	};

	const handleImage = (e) => {
		const { name, files } = e.target;
		setImages((prevState) => ({
			...prevState,
			[name]: files[0],
		}));
	};

	const onNext = () => {
		let propertyToSubmit = filter(property);
		propertyToSubmit['state'] = state;
		propertyToSubmit['city'] = selectedCity;
		propertyToSubmit['location'] = selectedLocation;
		propertyToSubmit['builder'] = selectedUser;
		propertyToSubmit['image'] = images;
		if (sAmenities.filter((c) => c.value).length > 0) {
			propertyToSubmit['amenities'] = sAmenities
				.filter((c) => c.value)
				.map((b) => b.id);
		}
		if (
			property.projectType !== 'land' &&
			legalClearance.filter((c) => c.value).length > 0
		) {
			propertyToSubmit['legalClearance'] = legalClearance;
			if (
				legalClearance.find((c) => c.name === 'reraapproved')['value']
			) {
				propertyToSubmit['legalClearance'].find(
					(c) => c.name === 'reraapproved'
				)['details'] = property.reraId;
			}
		}
		if (
			property.projectType === 'land' &&
			legalClearance.filter((c) => c.value).length > 0
		) {
			propertyToSubmit['legalClearance'] = legalClearance;
			if (
				legalClearance.find((c) => c.name === 'numberOfOwner')['value']
			) {
				propertyToSubmit['legalClearance'].find(
					(c) => c.name === 'numberOfOwner'
				)['details'] = property.ownerNumber;
			}
		}
		next(propertyToSubmit);
	};

	React.useEffect(() => {
		fetchResourcesStart(handleFetchResources);
	}, []);
	React.useEffect(() => {
		if (amenities.length > 0) {
			setSAmenities(amenities.map((c) => ({ ...c, value: false })));
		}
	}, [amenities]);

	// React.useEffect(() => {
	// 	if (projct.projectType) {
	// 		changeType(projct.projectType);
	// 	}
	// }, [projct.projectType]);

	return (
		<Box mt="1rem">
			<Backdrop className={classes.backdrop} open={resourcesLoading}>
				<CircularProgress color="secondary" />
			</Backdrop>
			<RowSelect
				heading="Type *"
				name="projectType"
				value={property.projectType}
				onChange={handleChange}
				label="Choose"
				menuItems={typeMenuItems}
			/>
			<RowSelect
				heading="Status *"
				name="complitionStatus"
				value={property.complitionStatus}
				onChange={handleChange}
				label="Choose"
				menuItems={statusMenuItems}
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
				heading="Builder *"
				loading={fetchBuilderLoading}
				name="builder"
				value={selectedUser}
				onChange={(e) => setselectedUser(e.target.value)}
				label="Builder"
				onOpen={fetchUser}
				menuItems={selectBuilders.map((c) => ({
					label: c.developerName,
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
			{property.projectType !== 'land' && (
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
			)}
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
			{property.projectType !== 'land' &&
				legalClearance.find((c) => c.name === 'reraapproved')[
					'value'
				] && (
					<RowTextField
						heading="RERA ID"
						name="reraId"
						onChange={handleChange}
						label="Enter ID"
					/>
				)}
			{property.projectType === 'land' &&
				legalClearance.find((c) => c.name === 'numberOfOwner')[
					'value'
				] && (
					<RowTextField
						heading="Owner Number"
						name="ownerNumber"
						onChange={handleChange}
						label="Enter Number"
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
			<Box mt="1rem" mb="1rem">
				<Grid item xs={12}>
					Images
				</Grid>
			</Box>
			<Grid container spacing={2}>
				<Grid item xs={12} lg={3}>
					<input type="file" name="image1" onChange={handleImage} />
				</Grid>
				<Grid item xs={12} lg={3}>
					<input type="file" name="image2" onChange={handleImage} />
				</Grid>
				<Grid item xs={12} lg={3}>
					<input type="file" name="image3" onChange={handleImage} />
				</Grid>
				<Grid item xs={12} lg={3}>
					<input type="file" name="image4" onChange={handleImage} />
				</Grid>
			</Grid>
			<Box display="flex" justifyContent="flex-end">
				<Button
					variant="contained"
					color="primary"
					onClick={onNext}
					classes={{
						label: 'transform-none',
					}}
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
	fetchBuilderLoading,
	selectBuilders,
});

const mapDispatchToProps = (dispatch) => ({
	fetchStatesStart: () => dispatch(fetchAllStatesStart()),
	fetchCities: (state, callback) =>
		dispatch(fetchCities({ state, callback })),
	fetchLocations: (city, callback) =>
		dispatch(fetchLocations({ city, callback })),
	fetchAllUsersStart: () => dispatch(fetchAllUsersSTart('builder')),
	fetchBuilders: (callback) =>
		dispatch(fetchBuilders({ callback, param: { status: 'active' } })),
	fetchResourcesStart: (callback) =>
		dispatch(fetchAllPropertyResourcesStart({ callback })),
	addProperty: (property, callback) =>
		dispatch(addPropertySale({ property, callback })),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectInformation);
