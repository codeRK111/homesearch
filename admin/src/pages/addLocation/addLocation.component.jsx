import React from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import Select from '../../components/select/select.component';
import TextField from '../../components/textField/textField.component';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
	selectAllStates,
	selectLoading as stateLoading,
	selectFetchCitiesLoading as cityLoading,
	selectLocationLoading as locationLoading,
} from '../../redux/city/city.selector';
import {
	fetchAllStatesStart,
	addLocation,
	fetchCitiesStart as fetchCities,
} from '../../redux/city/city.actions';

const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
}));

const initialState = {
	state: '',
	city: '',
	location: '',
};

const errorState = {
	state: '',
	city: '',
	location: '',
};

const AddLocation = ({
	fetchStatesStart,
	stateLoading,
	allStates,
	cityLoading,
	addLocation,
	fetchCities,
	locationLoading,
}) => {
	const classes = useStyles();
	const [city, setCity] = React.useState(initialState);
	const [error, setError] = React.useState(errorState);
	const [asyncError, setAsyncError] = React.useState('');
	const [cities, setCities] = React.useState([]);
	const handleChange = (e) => {
		e.persist();
		setCity((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	React.useEffect(() => {
		fetchStatesStart();
	}, [fetchStatesStart]);
	React.useEffect(() => {
		if (city.state) {
			const cityResponseHandler = (type, data) => {
				if (type === 'success') {
					console.log(data);
					setCities(data.cities);
					setAsyncError('');
				} else {
					setAsyncError(data);
				}
			};
			fetchCities(city.state, cityResponseHandler);
		}
	}, [city.state, fetchCities]);

	const checkError = (state) => {
		if (!city.state) {
			setError((prevState) => ({
				...prevState,
				state: 'Please select a state',
			}));
		} else {
			setError((prevState) => ({ ...prevState, state: '' }));
		}

		if (!city['city']) {
			setError((prevState) => ({
				...prevState,
				city: 'Please select a city',
			}));
		} else {
			setError((prevState) => ({ ...prevState, city: '' }));
		}

		if (!city['location']) {
			setError((prevState) => ({
				...prevState,
				location: 'Please add a location',
			}));
		} else {
			setError((prevState) => ({ ...prevState, location: '' }));
		}
	};

	const responseHandler = (type, data) => {
		if (type === 'success') {
			console.log(data);
			setAsyncError('');
		} else {
			setAsyncError(data);
		}
	};

	const buttonClick = () => {
		checkError();
		if (city.state && city['city']) {
			addLocation(
				{ name: city['location'], city: city['city'] },
				responseHandler
			);
		}
	};
	return (
		<Box p="1rem">
			<Backdrop className={classes.backdrop} open={stateLoading}>
				Loading states..
			</Backdrop>

			<Backdrop className={classes.backdrop} open={locationLoading}>
				Adding location,please wait...
			</Backdrop>
			<h3>Add City</h3>
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
											name="state"
											value={city.state}
											onChange={handleChange}
											label="State"
											menuItems={allStates.map((c) => ({
												value: c,
												label: c,
											}))}
											helperText={error.state}
											error={!!error.state}
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
											name="city"
											value={city.city}
											onChange={handleChange}
											label="city"
											menuItems={cities.map((c) => ({
												value: c.id,
												label: c.name,
											}))}
											helperText={error.city}
											error={!!error.city}
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
											name="location"
											value={city['location']}
											onChange={handleChange}
											label="Enter location name"
											helperText={error.location}
											error={!!error.location}
										/>
									</Box>
								</Grid>
							</Grid>
							<Grid container spacing={1}>
								<Grid item xs={12} md={12} lg={4}>
									<Box mt="1rem">
										<Button
											color="primary"
											variant="contained"
											classes={{
												label: 'tranform-none',
											}}
											onClick={buttonClick}
										>
											Add Location
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
	allStates: selectAllStates,
	stateLoading,
	cityLoading,
	locationLoading,
});

const mapDispatchToProps = (dispatch) => ({
	fetchStatesStart: () => dispatch(fetchAllStatesStart()),
	fetchCities: (state, callback) =>
		dispatch(fetchCities({ state, callback })),
	addLocation: (location, callback) =>
		dispatch(addLocation({ location, callback })),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddLocation);
