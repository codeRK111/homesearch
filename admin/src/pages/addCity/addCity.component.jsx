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
	selectCityLoading as cityLoading,
} from '../../redux/city/city.selector';
import { fetchAllStatesStart, addCity } from '../../redux/city/city.actions';

const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
}));

const initialState = {
	state: '',
	city: '',
};

const errorState = {
	state: '',
	city: '',
};

const AddCity = ({
	fetchStatesStart,
	stateLoading,
	allStates,
	cityLoading,
	addCity,
}) => {
	const classes = useStyles();
	const [city, setCity] = React.useState(initialState);
	const [error, setError] = React.useState(errorState);
	const [asyncError, setAsyncError] = React.useState('');
	const handleChange = (e) => {
		e.persist();
		setCity((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	React.useEffect(() => {
		fetchStatesStart();
	}, []);

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
			addCity({ name: city['city'], state: city.state }, responseHandler);
		}
	};
	return (
		<Box p="1rem">
			<Backdrop className={classes.backdrop} open={stateLoading}>
				Loading states..
			</Backdrop>
			<Backdrop className={classes.backdrop} open={cityLoading}>
				Adding city,please wait...
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
										<TextField
											name="city"
											value={city['city']}
											onChange={handleChange}
											label="Enter city name"
											helperText={error.city}
											error={!!error.city}
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
												label: 'transform-none',
											}}
											onClick={buttonClick}
										>
											Add City
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
});

const mapDispatchToProps = (dispatch) => ({
	fetchStatesStart: () => dispatch(fetchAllStatesStart()),
	addCity: (city, callback) => dispatch(addCity({ city, callback })),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCity);
