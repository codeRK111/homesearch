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
	selectFetchCityDetailsLoading as cityDetailsLoading,
	selectUpdateCityLoading as updateCityLoading,
} from '../../redux/city/city.selector';
import {
	fetchCityDetailsStart as fetchCityDetails,
	updateCityStart as updateCity,
} from '../../redux/city/city.actions';

const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
}));

const EditComponent = ({
	cityDetailsLoading,
	fetchCityDetails,
	updateCityLoading,
	updateCity,
	match: {
		params: { id },
	},
}) => {
	const history = useHistory();
	const classes = useStyles();
	const [asyncError, setAsyncError] = React.useState('');
	const [cityDetails, setCityDetails] = React.useState({
		name: '',
		state: '',
	});
	const handleFetchCityDetails = (type, data) => {
		if (type === 'success') {
			console.log(data);
			setCityDetails({
				state: data.city.state,
				name: data.city.name,
			});
			setAsyncError('');
		} else {
			setAsyncError(data);
		}
	};

	const handleUpdateCity = (type, data) => {
		if (type === 'success') {
			setAsyncError('');
			history.push(`/cities/${cityDetails.state}`);
		} else {
			setAsyncError(data);
		}
	};
	React.useEffect(() => {
		if (id) {
			fetchCityDetails(id, handleFetchCityDetails);
		}
	}, [id]);

	const handleChange = (e) => {
		e.persist();
		setCityDetails((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const updateCityClick = () => {
		updateCity(id, cityDetails, handleUpdateCity);
	};

	return (
		<Box p="1rem">
			<Backdrop className={classes.backdrop} open={cityDetailsLoading}>
				fetching city details ...
			</Backdrop>
			<Backdrop className={classes.backdrop} open={updateCityLoading}>
				updating city details ...
			</Backdrop>
			<h3>Edit City</h3>
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
											value={cityDetails.state}
											onChange={handleChange}
											menuItems={[
												{
													label: 'None',
													value: '',
												},
												{
													label: cityDetails.state,
													value: cityDetails.state,
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
										<TextField
											label="City"
											name="name"
											value={cityDetails.name}
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
											onClick={updateCityClick}
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
	cityDetailsLoading,
	updateCityLoading,
});

const mapDispatchToProps = (dispatch) => ({
	fetchCityDetails: (cityId, callback) =>
		dispatch(fetchCityDetails({ cityId, callback })),
	updateCity: (cityId, city, callback) =>
		dispatch(updateCity({ cityId, city, callback })),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditComponent);
