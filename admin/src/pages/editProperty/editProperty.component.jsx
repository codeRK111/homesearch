import React from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {
	selectAmenities,
	selectFurnishes,
	selectLoading as resourcesLoading,
	selectPropertyDetailsLoading as propertyDetailsLoading,
	selectUpdatePropertyLoading as updateLoading,
} from '../../redux/property/property.selector';
import {
	fetchPropertyDetails,
	fetchAllPropertyResourcesStart,
	updateProperty,
} from '../../redux/property/property.actions';
import FlatEdit from './flat-edit.component';
import HostelEdit from './hostel-edit.component';
import { useHistory } from 'react-router-dom';
import Backdrop from '@material-ui/core/Backdrop';

const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
}));

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
	availableFor: [],
	floor: '',
};

const EditProperty = ({
	propertyDetailsLoading,
	fetchPropertyDetails,
	amenities,
	furnishes,
	fetchResourcesStart,
	updateLoading,
	updateProperty,
	match: {
		params: { id },
	},
}) => {
	const history = useHistory();
	const classes = useStyles();
	const [property, setProperty] = React.useState(initialState);
	const [asyncError, setAsyncError] = React.useState('');
	const [loading, setLoading] = React.useState(false);

	React.useEffect(() => {
		const handleFetchResources = (type, data) => {
			if (type === 'success') {
				fetchPropertyDetails(id, handleFetchPropertyDetails);
				console.log(data);
				setAsyncError('');
			} else {
				setLoading(false);
				setAsyncError(data);
			}
		};
		setLoading(true);
		fetchResourcesStart(handleFetchResources);
	}, [fetchResourcesStart, fetchPropertyDetails, id]);

	const handleFetchPropertyDetails = (status, data) => {
		if (status === 'success') {
			console.log(data);
			setProperty(data.property);
			setLoading(false);
			setAsyncError('');
		} else {
			setLoading(false);
			console.log(data);
			setAsyncError(data);
		}
	};

	const handleEditProperty = (type, data) => {
		if (type === 'success') {
			setAsyncError('');
			history.push(`/all-properties/${property.status}`);
		} else {
			setAsyncError(data);
		}
	};

	const onSubmit = (propertyDetails) => {
		console.log('propertyDetails--->', propertyDetails);
		delete propertyDetails['city'];
		delete propertyDetails['type'];
		delete propertyDetails['for'];
		delete propertyDetails['location'];
		delete propertyDetails['userId'];
		updateProperty(id, propertyDetails, handleEditProperty);
	};

	return (
		<Box p="1rem">
			<Backdrop
				className={classes.backdrop}
				open={loading}
				// onClick={handleClose}
			>
				Loading ...
			</Backdrop>
			<h3>Edit Property</h3>
			<p className="color-red">{asyncError}</p>
			<Paper>
				<Box p="0.5rem">
					<Grid container></Grid>
					{(() => {
						switch (property.type) {
							case 'hostel':
							case 'pg':
								return (
									<HostelEdit
										onClick={onSubmit}
										state={property}
										furnishes={furnishes}
										amenities={amenities}
										loading={propertyDetailsLoading}
									/>
								);
							case 'flat':
							case 'independenthouse':
							case 'guesthouse':
								return (
									<FlatEdit
										onClick={onSubmit}
										state={property}
										furnishes={furnishes}
										amenities={amenities}
										loading={propertyDetailsLoading}
									/>
								);

							default:
								break;
						}
					})()}
				</Box>
			</Paper>
		</Box>
	);
};

const mapStateToProps = createStructuredSelector({
	resourcesLoading,
	propertyDetailsLoading,
	amenities: selectAmenities,
	furnishes: selectFurnishes,
	updateLoading,
});

const mapDispatchToProps = (dispatch) => ({
	fetchPropertyDetails: (propertyId, callback) =>
		dispatch(fetchPropertyDetails({ propertyId, callback })),
	fetchResourcesStart: (callback) =>
		dispatch(fetchAllPropertyResourcesStart({ callback })),
	updateProperty: (propertyId, property, callback) =>
		dispatch(updateProperty({ propertyId, property, callback })),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProperty);
