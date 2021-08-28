import React, { useRef, useState } from 'react';

import AlertMessage from '../../components/alert';
import { Avatar } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Select from '../../components/select/select.component';
import TextField from '../../components/textField/textField.component';
import axios from 'axios';
import { selectFetchCityDetailsLoading as cityDetailsLoading } from '../../redux/city/city.selector';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fetchCityDetailsStart as fetchCityDetails } from '../../redux/city/city.actions';
import { makeStyles } from '@material-ui/core/styles';
import { updateCity } from '../../utils/asyncCity';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
}));

const EditComponent = ({
	cityDetailsLoading,
	fetchCityDetails,
	match: {
		params: { id },
	},
}) => {
	const cancelToken = useRef(null);
	const history = useHistory();
	const classes = useStyles();
	const [asyncError, setAsyncError] = React.useState('');
	const [cityDetails, setCityDetails] = React.useState({
		name: '',
		state: '',
		image: '',
	});
	const [image, setImage] = useState(null);
	const [success, setSuccess] = useState(false);
	const [loading, setLoading] = useState(false);
	const handleFetchCityDetails = (type, data) => {
		if (type === 'success') {
			console.log(data);
			setCityDetails({
				state: data.city.state,
				name: data.city.name,
				image: data.city.image,
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

	const handleFileChange = (e) => {
		const { files } = e.target;
		setImage(files[0]);
	};

	const updateCityClick = async () => {
		try {
			cancelToken.current = axios.CancelToken.source();
			const body = {
				name: cityDetails.name,
				state: cityDetails.state,
				image,
			};

			const resp = await updateCity(
				id,
				body,
				cancelToken.current,
				setLoading
			);
			setAsyncError(null);
			setSuccess(true);
			setImage(null);
			if (resp.image) {
				setCityDetails((prevState) => ({
					...prevState,
					image: resp.image,
				}));
			}
		} catch (error) {
			setAsyncError(error);
			setSuccess(false);
		}
	};

	return (
		<Box p="1rem">
			<Backdrop className={classes.backdrop} open={cityDetailsLoading}>
				fetching city details ...
			</Backdrop>
			<Backdrop className={classes.backdrop} open={loading}>
				updating city details ...
			</Backdrop>
			<h3>Edit City</h3>
			<p className="color-red">{asyncError}</p>
			<Paper>
				<Box p="0.5rem">
					<Grid container>
						<Grid item xs={12} md={12} lg={8}>
							<Grid container spacing={1}>
								{cityDetails.image && (
									<Grid item xs={12}>
										<Avatar
											src={`/assets/cities/${cityDetails.image}`}
										/>
									</Grid>
								)}
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
								<Grid item xs={12} md={8}>
									<AlertMessage
										status={success}
										setStatus={setSuccess}
										message={'City Updated Successfully'}
									/>
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
});

const mapDispatchToProps = (dispatch) => ({
	fetchCityDetails: (cityId, callback) =>
		dispatch(fetchCityDetails({ cityId, callback })),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditComponent);
