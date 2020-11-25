import {
	Backdrop,
	Box,
	Button,
	CircularProgress,
	Grid,
} from '@material-ui/core';
import { FieldArray, Form, Formik } from 'formik';

import CheckBox from '../../components/formik/checkbox.component';
import City from './city.component';
import DatePicker from '../../components/formik/datePicker.component';
import DividerHeading from '../../components/DividerHeadinng/dividerHeading.component';
import Furnishes from '../../components/furnishes/furnishes.component';
import Location from './location.component';
import React from 'react';
import Select from '../../components/formik/select.component';
import Snackbar from '../../components/snackbar/snackbar.component';
import TextField from '../../components/formik/textField.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { postProperty } from '../../redux/property/property.actions';
import { selectPostPropertyLoading } from '../../redux/property/property.selectors';
import { useHistory } from 'react-router-dom';
import useStyles from './postPropertyDetails.styles';
import { validateNumber } from '../../utils/validation.utils';

const initialValues = {
	for: 'rent',
	availableFor: [],
	numberOfBedRooms: 1,
	numberOfBalconies: 1,
	noOfFloors: 1,
	floor: 1,
	typeOfToilets: '',
	toiletIndian: 1,
	toiletWestern: 1,
	superBuiltupArea: '',
	carpetArea: '',
	rent: '',
	securityDeposit: '',
	noticePeriod: '',
	furnished: 'furnished',
	furnishes: [],
	amenities: [],
	distanceSchool: 1,
	distanceRailwayStation: 1,
	distanceAirport: 1,
	distanceBusStop: 1,
	distanceHospital: 1,
	availability: 'immediately',
	availableDate: new Date(),
	restrictions: '',
	description: '',
	city: '',
	location: '',
	carParking: 'open',
};

const RentApartment = ({ propertyLoading, postProperty, pType }) => {
	const history = useHistory();
	const classes = useStyles();
	const [images, setImages] = React.useState({
		image1: null,
		image2: null,
		image3: null,
		image4: null,
	});
	const [selectedCity, setSelectedCity] = React.useState({
		id: '',
		name: '',
	});
	const [selectedLocation, setSelectedLocation] = React.useState({
		id: '',
		name: '',
	});
	const [openSnackBar, setOpenSnackBar] = React.useState(false);
	const [snackbarMessage, setSnackbarMessage] = React.useState('');
	const [severity, setSeverity] = React.useState('success');

	const showSnackbar = (message, severity = 'success') => {
		setSnackbarMessage(message);
		setOpenSnackBar(true);
		setSeverity(severity);
	};

	const closeSnackbar = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpenSnackBar(false);
	};

	const validateForm = (values) => {
		const error = {};
		if (!validateNumber(values.numberOfBedRooms)) {
			error.numberOfBedRooms = 'Invalid value';
		}
		if (!validateNumber(values.numberOfBalconies)) {
			error.numberOfBalconies = 'Invalid value';
		}
		if (!validateNumber(values.superBuiltupArea)) {
			error.superBuiltupArea = 'Invalid value';
		}
		if (!validateNumber(values.carpetArea)) {
			error.carpetArea = 'Invalid value';
		}
		if (Number(values.superBuiltupArea) < Number(values.carpetArea)) {
			error.carpetArea =
				'Super builtup area cannot be less than carpet area';
		}
		if (!validateNumber(values.toiletIndian)) {
			error.toiletIndian = 'Invalid value';
		}
		if (!validateNumber(values.toiletWestern)) {
			error.toiletWestern = 'Invalid value';
		}
		if (!validateNumber(values.noOfFloors)) {
			error.noOfFloors = 'Invalid value';
		}

		if (!validateNumber(values.floor)) {
			error.floor = 'Invalid value';
		}
		if (values.noOfFloors < values.floor) {
			error.floor =
				'Property on floor cannot be greater than total floors';
		}
		if (!validateNumber(values.distanceSchool)) {
			error.distanceSchool = 'Invalid value';
		}
		if (!validateNumber(values.distanceRailwayStation)) {
			error.distanceRailwayStation = 'Invalid value';
		}
		if (!validateNumber(values.distanceAirport)) {
			error.distanceAirport = 'Invalid value';
		}
		if (!validateNumber(values.distanceBusStop)) {
			error.distanceBusStop = 'Invalid value';
		}
		if (!validateNumber(values.distanceHospital)) {
			error.distanceHospital = 'Invalid value';
		}
		if (!validateNumber(values.rent)) {
			error.rent = 'Invalid value';
		}
		if (!validateNumber(values.securityDeposit)) {
			error.securityDeposit = 'Invalid value';
		}
		if (!validateNumber(values.noticePeriod)) {
			error.noticePeriod = 'Invalid value';
		}
		if (!values.description) {
			error.description = 'Invalid value';
		}

		return error;
	};

	const handlePostProperty = (status, data = null) => {
		if (status === 'success') {
			showSnackbar('Property posted successfully');
			history.push(`/property-details/${data.id}`);
		} else {
			showSnackbar(data, 'error');
		}
	};

	const submitForm = (values) => {
		console.log(values);
		const type = pType === 'flat' ? 'apartment' : 'villa';
		const data = {
			...values,
			city: selectedCity.id,
			location: selectedLocation.id,
			title: `${values.numberOfBedRooms}BHK ${type} for rent in ${selectedLocation.name},${selectedCity.name} `,

			type: pType,
		};
		if (values.reraapproveId) {
			data.legalClearance = values.legalClearance.map((c) => {
				if (c.name === 'reraapproved') {
					c.details = values.reraapproveId;
				}
				return c;
			});
		}
		let i = 0;
		const propertyImages = {};
		Object.keys(images).forEach((c) => {
			if (images[c]) {
				propertyImages[c] = images[c];
				i++;
			}
		});
		if (i > 0) {
			data['propertyImages'] = propertyImages;
		} else {
			data['propertyImages'] = null;
		}
		console.log(data);

		postProperty(handlePostProperty, data);
	};
	const handleImage = (e) => {
		const { name, files } = e.target;
		setImages((prevState) => ({
			...prevState,
			[name]: files[0],
		}));
	};
	return (
		<Box>
			<Backdrop className={classes.backdrop} open={propertyLoading}>
				<CircularProgress color="inherit" />
			</Backdrop>
			<Snackbar
				status={openSnackBar}
				handleClose={closeSnackbar}
				severity={severity}
				message={snackbarMessage}
			/>
			<Formik
				initialValues={initialValues}
				validate={validateForm}
				onSubmit={submitForm}
			>
				{({ values, setFieldValue }) => (
					<Form>
						<Grid container spacing={1}>
							<Grid item xs={12} md={12}>
								<DividerHeading>
									<h3>Property Details</h3>
								</DividerHeading>
							</Grid>
							<Grid item xs={12} md={6}>
								<City setSelectedCity={setSelectedCity} />
							</Grid>
							<Grid item xs={12} md={6}>
								<Location
									city={selectedCity.id}
									setSelectedCity={setSelectedLocation}
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<TextField
									name="numberOfBedRooms"
									formLabel="Bedrooms *"
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<TextField
									name="numberOfBalconies"
									formLabel="Balconies *"
								/>
							</Grid>

							<Grid item xs={12} md={6}>
								<TextField
									name="superBuiltupArea"
									formLabel="Super builtup Area (Sq. ft) *"
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<TextField
									name="carpetArea"
									formLabel="Carpet Area (Sq. ft) *"
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<Select
									name="availability"
									formLabel="Availability *"
									options={[
										{
											value: 'immediately',
											label: 'Ready to move',
										},
										{
											value: 'specificdate',
											label: 'Specific date',
										},
									]}
								/>
							</Grid>
							{values.availability === 'specificdate' && (
								<Grid item xs={12} md={6}>
									<DatePicker
										formLabel="Select date"
										name="availableDate"
										value={values.availableDate}
										onChange={(value) =>
											setFieldValue(
												'availableDate',
												value
											)
										}
									/>
								</Grid>
							)}
							<Grid item xs={12} md={6}>
								<Select
									name="carParking"
									formLabel="Car Parking *"
									options={[
										{
											value: 'open',
											label: 'Open',
										},
										{
											value: 'covered',
											label: 'Covered',
										},
									]}
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<Select
									name="furnished"
									formLabel="Furnishing status *"
									options={[
										{
											value: 'unfurnished',
											label: 'Unfurnished',
										},
										{
											value: 'furnished',
											label: 'Furnished',
										},
										{
											value: 'semifurnished',
											label: 'Semifurnished',
										},
									]}
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<TextField
									name="toiletIndian"
									formLabel="Number of indian toilet *"
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<TextField
									name="toiletWestern"
									formLabel="Number of western toilet *"
								/>
							</Grid>

							<Grid item xs={12} md={6}>
								<TextField
									name="noOfFloors"
									formLabel="Total number of floors *"
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<TextField
									name="floor"
									formLabel="Property on floor *"
								/>
							</Grid>
							<Grid item xs={12} md={12}>
								<TextField
									name="noticePeriod"
									formLabel="Notice Period (days) *"
								/>
							</Grid>
							<Grid item xs={12} md={12}>
								<TextField
									name="description"
									formLabel="Description"
									multiline={true}
									rows={5}
								/>
							</Grid>
							<Grid item xs={12} md={12}>
								<TextField
									name="restrictions"
									formLabel="Restrictions"
									multiline={true}
									rows={5}
								/>
							</Grid>

							<Grid item xs={12} md={12}>
								<DividerHeading>
									<h3>Pricing</h3>
								</DividerHeading>
							</Grid>
							<Grid item xs={12} md={6}>
								<TextField name="rent" formLabel="Rent *" />
							</Grid>
							<Grid item xs={12} md={6}>
								<TextField
									name="securityDeposit"
									formLabel="Security Deposit *"
								/>
							</Grid>

							<Grid item xs={12} md={12}>
								<DividerHeading>
									<h3>Nearby places</h3>
								</DividerHeading>
							</Grid>
							<Grid item xs={12} md={6}>
								<TextField
									name="distanceSchool"
									formLabel="Distance from school(KM) *"
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<TextField
									name="distanceRailwayStation"
									formLabel="Distance from railway station(KM) *"
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<TextField
									name="distanceAirport"
									formLabel="Distance from airport(KM) *"
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<TextField
									name="distanceBusStop"
									formLabel="Distance from bus stop(KM) *"
								/>
							</Grid>
							<Grid item xs={12} md={12}>
								<TextField
									name="distanceHospital"
									formLabel="Distance from hospital(KM) *"
								/>
							</Grid>
							<Grid item xs={12} md={12}>
								<DividerHeading>
									<h3>Other details</h3>
								</DividerHeading>
							</Grid>
							<Grid item xs={12} md={12}>
								<Box mt="0.5rem" mb="0.5rem">
									<b>Available for</b>
								</Box>
								<Grid container spacing={0}>
									<Grid item xs={6} md={3}>
										<CheckBox
											name="availableFor"
											value="family"
											formLabel="Family"
										/>
									</Grid>

									<Grid item xs={6} md={3}>
										<CheckBox
											name="availableFor"
											value="Bachelors (Men)"
											formLabel="Bachelors (Men)"
										/>
									</Grid>
									<Grid item xs={6} md={3}>
										<CheckBox
											name="availableFor"
											value="Bachelors (Women)"
											formLabel="Bachelors (Women)"
										/>
									</Grid>
									<Grid item xs={6} md={3}>
										<CheckBox
											name="availableFor"
											value="Job holder (Men)"
											formLabel="Job holder (Men)"
										/>
									</Grid>
									<Grid item xs={6}>
										<CheckBox
											name="availableFor"
											value="Job holder (Women)"
											formLabel="Job holder (Women)"
										/>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12} md={12}>
								<Furnishes
									initialValues={initialValues}
									showFurnishes={
										values.furnished !== 'unfurnished'
									}
								/>
							</Grid>

							<Grid item xs={12} md={12}>
								<DividerHeading>
									<h3>Images</h3>
								</DividerHeading>
							</Grid>
							<Grid container spacing={3}>
								<Grid item xs={6} lg={3}>
									<Box className={classes.imageWrapper}>
										<img
											src={
												images.image1
													? URL.createObjectURL(
															images.image1
													  )
													: require('../../assets/no-image.jpg')
											}
											alt="project"
											srcset=""
											className={classes.image}
										/>
									</Box>
									<input
										type="file"
										name="image1"
										onChange={handleImage}
										id="pimage1"
										className={classes.input}
									/>
									<label
										htmlFor="pimage1"
										className={classes.label}
									>
										Upload
									</label>
								</Grid>
								<Grid item xs={6} lg={3}>
									<Box className={classes.imageWrapper}>
										<img
											src={
												images.image2
													? URL.createObjectURL(
															images.image2
													  )
													: require('../../assets/no-image.jpg')
											}
											alt="project"
											srcset=""
											className={classes.image}
										/>
									</Box>
									<input
										type="file"
										name="image2"
										onChange={handleImage}
										id="pimage2"
										className={classes.input}
									/>
									<label
										htmlFor="pimage2"
										className={classes.label}
									>
										Upload
									</label>
								</Grid>
								<Grid item xs={6} lg={3}>
									<Box className={classes.imageWrapper}>
										<img
											src={
												images.image3
													? URL.createObjectURL(
															images.image3
													  )
													: require('../../assets/no-image.jpg')
											}
											alt="project"
											srcset=""
											className={classes.image}
										/>
									</Box>
									<input
										type="file"
										name="image3"
										onChange={handleImage}
										id="pimage3"
										className={classes.input}
									/>
									<label
										htmlFor="pimage3"
										className={classes.label}
									>
										Upload
									</label>
								</Grid>
								<Grid item xs={6} lg={3}>
									<Box className={classes.imageWrapper}>
										<img
											src={
												images.image4
													? URL.createObjectURL(
															images.image4
													  )
													: require('../../assets/no-image.jpg')
											}
											alt="project"
											srcset=""
											className={classes.image}
										/>
									</Box>
									<input
										type="file"
										name="image4"
										onChange={handleImage}
										id="pimage4"
										className={classes.input}
									/>
									<label
										htmlFor="pimage4"
										className={classes.label}
									>
										Upload
									</label>
								</Grid>
							</Grid>
							<Grid item xs={12} md={12}>
								<Box mt="2rem">
									<Button
										variant="contained"
										color="primary"
										fullWidth
										size="large"
										type="submit"
									>
										Post Property
									</Button>
								</Box>
							</Grid>
						</Grid>
					</Form>
				)}
			</Formik>
		</Box>
	);
};

const mapStateToProps = createStructuredSelector({
	propertyLoading: selectPostPropertyLoading,
});

const mapDispatchToProps = (dispatch) => ({
	postProperty: (callback, data) =>
		dispatch(postProperty({ data, callback })),
});

export default connect(mapStateToProps, mapDispatchToProps)(RentApartment);
