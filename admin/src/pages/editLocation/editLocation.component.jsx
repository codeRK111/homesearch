import React from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import Select from '../../components/select/select.component';
import TextField from '../../components/textField/textField.component';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
	selectFetchLocationDetailsLoading as locationDetailsLoading,
	selectUpdateLocationLoading as updateLocationLoading,
} from '../../redux/city/city.selector';
import {
	fetchLocationDetailsStart as fetchLocationDetails,
	updateLocationStart as updateLocation,
} from '../../redux/city/city.actions';

const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
}));

const EditComponent = ({
	locationDetailsLoading,
	updateLocationLoading,
	fetchLocationDetails,
	updateLocation,
	match: {
		params: { id },
	},
}) => {
	const history = useHistory();
	const classes = useStyles();
	const [asyncError, setAsyncError] = React.useState('');
	const [locationDetails, setLocationDetails] = React.useState({
		city: '',
		state: '',
		location: '',
		cityId: '',
	});
	const handleFetchLocationDetails = (type, data) => {
		if (type === 'success') {
			console.log(data);
			setLocationDetails({
				state: data.location.city.state,
				location: data.location.name,
				city: data.location.city.name,
				cityId: data.location.city.id,
			});
			setAsyncError('');
		} else {
			setAsyncError(data);
		}
	};

	const handleUpdateLocation = (type, data) => {
		if (type === 'success') {
			setAsyncError('');
			history.push(
				`/locations/${locationDetails.state}/${locationDetails.cityId}`
			);
		} else {
			setAsyncError(data);
		}
	};
	React.useEffect(() => {
		if (id) {
			fetchLocationDetails(id, handleFetchLocationDetails);
		}
	}, [id]);

	const handleChange = (e) => {
		e.persist();
		setLocationDetails((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const updateLocationClick = () => {
		updateLocation(
			id,
			{ name: locationDetails.location, city: locationDetails.cityId },
			handleUpdateLocation
		);
	};

	return (
		<Box p="1rem">
			<Backdrop
				className={classes.backdrop}
				open={locationDetailsLoading}
			>
				fetching location details ...
			</Backdrop>
			<Backdrop className={classes.backdrop} open={updateLocationLoading}>
				updating location details ...
			</Backdrop>
			<h3>Edit Location</h3>
			<p className="color-red">{asyncError}</p>
			<Paper>
				<Box p="0.5rem">
					<Grid container>
						<Grid item xs={12} md={12} lg={8}>
							<Grid container spacing={1}>
								<Grid item xs={12} md={12} lg={4}>
									<Box p="0.5rem">State</Box>
								</Grid>
								<Grid item xs={12} md={12} lg={8}>
									<Box p="0.5rem">
										<Select
											label="State"
											name="state"
											value={locationDetails.state}
											onChange={handleChange}
											menuItems={[
												{
													label: 'None',
													value: '',
												},
												{
													label:
														locationDetails.state,
													value:
														locationDetails.state,
												},
											]}
										/>
									</Box>
								</Grid>
							</Grid>
							<Grid container spacing={1}>
								<Grid item xs={12} md={12} lg={4}>
									<Box p="0.5rem">City</Box>
								</Grid>
								<Grid item xs={12} md={12} lg={8}>
									<Box p="0.5rem">
										<Select
											label="City"
											name="city"
											value={locationDetails.city}
											onChange={handleChange}
											menuItems={[
												{
													label: 'None',
													value: '',
												},
												{
													label: locationDetails.city,
													value: locationDetails.city,
												},
											]}
										/>
									</Box>
								</Grid>
							</Grid>
							<Grid container spacing={1}>
								<Grid item xs={12} md={12} lg={4}>
									<Box p="0.5rem">Location</Box>
								</Grid>
								<Grid item xs={12} md={12} lg={8}>
									<Box p="0.5rem">
										<TextField
											label="City"
											name="location"
											value={locationDetails.location}
											onChange={handleChange}
										/>
									</Box>
								</Grid>
							</Grid>
							<Grid container spacing={1}>
								<Grid item xs={12} md={12} lg={4}>
									<Box p="0.5rem">
										<Button
											className="tarnsform-none"
											color="primary"
											variant="contained"
											onClick={updateLocationClick}
										>
											Update
										</Button>
									</Box>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Box>
			</Paper>
		</Box>
	);
};

const mapStateToProps = createStructuredSelector({
	locationDetailsLoading,
	updateLocationLoading,
});

const mapDispatchToProps = (dispatch) => ({
	fetchLocationDetails: (locationId, callback) =>
		dispatch(fetchLocationDetails({ locationId, callback })),
	updateLocation: (locationId, location, callback) =>
		dispatch(updateLocation({ locationId, location, callback })),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditComponent);
