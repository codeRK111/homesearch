import React, { useEffect, useRef, useState } from 'react';
import {
	selectAllStates,
	selectLoading as stateLoading,
} from '../../redux/city/city.selector';

import AlertMessage from '../../components/alert';
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Select from '../../components/select/select.component';
import TextField from '../../components/textField/textField.component';
import { addCity } from '../../utils/asyncCity';
import axios from 'axios';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fetchAllStatesStart } from '../../redux/city/city.actions';
import { makeStyles } from '@material-ui/core/styles';

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

const AddCity = ({ fetchStatesStart, stateLoading, allStates }) => {
	const classes = useStyles();
	const cancelToken = useRef(null);
	const [city, setCity] = useState(initialState);
	const [error, setError] = useState(errorState);
	const [asyncError, setAsyncError] = useState('');
	const [image, setImage] = useState(null);
	const [success, setSuccess] = useState(false);
	const [loading, setLoading] = useState(false);
	const handleChange = (e) => {
		e.persist();
		setCity((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	useEffect(() => {
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

	const buttonClick = async () => {
		checkError();
		if (city.state && city['city']) {
			try {
				cancelToken.current = axios.CancelToken.source();
				const body = { ...city, name: city['city'] };
				if (image) body.image = image;
				console.log(city);
				console.log(body);
				await addCity(body, cancelToken.current, setLoading);
				setAsyncError(null);
				setSuccess(true);
				setCity(initialState);
				setImage(null);
			} catch (error) {
				setAsyncError(error);
				setSuccess(false);
			}
		}
	};

	const handleFileChange = (e) => {
		const { files } = e.target;
		setImage(files[0]);
	};
	return (
		<Box p="1rem">
			<Backdrop className={classes.backdrop} open={stateLoading}>
				Loading states..
			</Backdrop>
			<Backdrop className={classes.backdrop} open={loading}>
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
									<Box p="0.5rem">Image</Box>
								</Grid>
								<Grid item xs={12} md={12} lg={8}>
									<Box p="0.5rem">
										<input
											type="file"
											onChange={handleFileChange}
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
								<Grid item xs={12} md={12} lg={4}>
									<AlertMessage
										status={success}
										setStatus={setSuccess}
										message={'City Added Successfully'}
									/>
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
});

const mapDispatchToProps = (dispatch) => ({
	fetchStatesStart: () => dispatch(fetchAllStatesStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCity);
