import 'draft-js-static-toolbar-plugin/lib/plugin.css';
import '../../../node_modules/draft-js-static-toolbar-plugin/lib/plugin.css';

import {
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	Grid,
} from '@material-ui/core';
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
	selectFetchBuildersLoading as fetchBuilderLoading,
	selectBuilders,
} from '../../redux/builder/builder.selector';
import {
	selectAllUsers,
	selectLoading as userLoading,
} from '../../redux/users/users.selector';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { EditorState } from 'draft-js';
import React from 'react';
import RowChildren from '../../components/rowCheckBox/rowCheckbox.component';
import RowSelect from '../../components/rowSelect/rowSelect.component';
import RowTextField from '../../components/rowTextField/rowTextField.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fetchAllUsersSTart } from '../../redux/users/users.actions';
import { fetchBuilders } from '../../redux/builder/builder.action';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const typeMenuItems = [
	{
		value: 'flat',
		label: 'Apartment',
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
	usp: '',
	bookingAmount: '',
	emi: '',
	totalLandArea: '',
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
	image: {
		width: '100px',
		height: '100px',
	},
	input: {
		display: 'none',
	},
	label: {
		padding: '0.5rem 1.7rem',
		border: '1px solid #cccccc',
		width: '100%',
		borderRadius: '5px',
		backgroundColor: '#cccccc',
		cursor: 'pointer',
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
	const [photos, setPhotos] = React.useState([]);
	const [defaultPhoto, setDefaultPhoto] = React.useState(0);

	const addMore = () => {
		setPhotos([
			...photos,
			{
				id: photos.length + 1,
				image: null,
			},
		]);
	};
	const handleImage = (img) => (e) => {
		const { name, files } = e.target;
		console.log({ name });
		setPhotos((prevState) =>
			prevState.map((c) => {
				if (c.id === img.id) {
					c.image = files[0];
				}
				return c;
			})
		);
	};
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
		const { checked } = e.target;
		setSAmenities((prevState) => {
			return prevState.map((c) => {
				if (c.id === id) {
					c.value = checked;
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

	const onNext = () => {
		let propertyToSubmit = filter(property);
		propertyToSubmit['state'] = state;
		propertyToSubmit['city'] = selectedCity;
		propertyToSubmit['location'] = selectedLocation;
		propertyToSubmit['builder'] = selectedUser;
		const propertyImages = photos
			.filter((c) => !!c.image)
			.map((b) => b.image);
		if (propertyImages[defaultPhoto]) {
			propertyToSubmit['defaultPhoto'] = defaultPhoto;
		}

		propertyToSubmit['propertyImages'] = propertyImages;
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

			<RowTextField
				heading="Booking Amount"
				name="bookingAmount"
				onChange={handleChange}
				type="number"
				label="Rs"
			/>
			<RowTextField
				heading="EMI Approx"
				name="emi"
				onChange={handleChange}
				type="number"
				label="Rs"
			/>
			<RowTextField
				heading="Total Land Area"
				name="totalLandArea"
				onChange={handleChange}
				type="number"
				label="Acres"
			/>
			<RowTextField
				heading="USP"
				name="usp"
				onChange={handleChange}
				type="text"
			/>
			<Box mt="1rem" mb="1rem">
				<Grid item xs={12}>
					Images
				</Grid>
			</Box>
			<Box p="0.8rem">
				<Grid container spacing={3}>
					{photos.map((c, i) => (
						<Grid key={c.id} item xs={6} lg={3}>
							<Box className={classes.imageWrapper}>
								<img
									src={
										c.image
											? URL.createObjectURL(c.image)
											: require('../../assets/no-image.jpg')
									}
									alt="project"
									srcset=""
									className={classes.image}
								/>
							</Box>
							<input
								type="file"
								onChange={handleImage(c)}
								id={`image-${c.id}`}
								className={classes.input}
							/>
							<label
								htmlFor={`image-${c.id}`}
								className={classes.label}
							>
								Upload
							</label>
							<Box display="flex">
								<FormControlLabel
									control={
										<Checkbox
											checked={defaultPhoto === i}
											onChange={(e) => setDefaultPhoto(i)}
											name="checkedB"
											color="primary"
										/>
									}
									label="Thumbnail"
								/>
							</Box>
						</Grid>
					))}
				</Grid>
				<Box mt="2rem">
					<button onClick={addMore} type="button">
						Add More Image
					</button>
				</Box>
			</Box>
			<Box display="flex" justifyContent="flex-end">
				<Button
					variant="contained"
					color="primary"
					onClick={onNext}
					classes={{
						label: 'transform-none',
					}}
					// disabled={
					// 	!(
					// 		property.title &&
					// 		property.description &&
					// 		state &&
					// 		selectedCity &&
					// 		selectedLocation &&
					// 		selectedUser &&
					// 		property.bookingAmount &&
					// 		property.emi &&
					// 		property.usp
					// 	)
					// }
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
