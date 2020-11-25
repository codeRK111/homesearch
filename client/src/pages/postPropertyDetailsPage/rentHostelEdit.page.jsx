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
import ExistingImages from './existingImages.component';
import Furnishes from '../../components/furnishes/furnishes.component';
import Location from './location.component';
import React from 'react';
import Select from '../../components/formik/select.component';
import Snackbar from '../../components/snackbar/snackbar.component';
import TextField from '../../components/formik/textField.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUpdatePropertyLoading } from '../../redux/property/property.selectors';
import { updateProperty } from '../../redux/property/property.actions';
import { useHistory } from 'react-router-dom';
import useStyles from './postPropertyDetails.styles';
import { validateNumber } from '../../utils/validation.utils';

const RentApartment = ({
	propertyLoading,
	updateProperty,
	pType,
	initialValues,
}) => {
	const history = useHistory();
	const classes = useStyles();
	const [images, setImages] = React.useState({
		image1: null,
		image2: null,
		image3: null,
		image4: null,
	});
	const [selectedCity, setSelectedCity] = React.useState({
		id: initialValues.city.id,
		name: initialValues.city.name,
	});
	const [selectedLocation, setSelectedLocation] = React.useState({
		id: initialValues.location.id,
		name: initialValues.location.name,
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
		if (!validateNumber(values.superBuiltupArea)) {
			error.superBuiltupArea = 'Invalid value';
		}
		if (!validateNumber(values.carpetArea)) {
			error.carpetArea = 'Invalid value';
		}
		if (!validateNumber(values.toiletIndian)) {
			error.toiletIndian = 'Invalid value';
		}
		if (!validateNumber(values.toiletWestern)) {
			error.toiletWestern = 'Invalid value';
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
		if (values.roomType === 'shared') {
			if (!values.numberOfRoomMates) {
				error.numberOfRoomMates = 'Invalid value';
			}
		}
		if (Number(values.superBuiltupArea) < Number(values.carpetArea)) {
			error.carpetArea =
				'Super builtup area cannot be less than carpet area';
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
		const type = pType === 'hostel' ? 'Hostel' : 'PG';
		const data = {
			...values,
			city: selectedCity.id,
			location: selectedLocation.id,
			title: `${type}  in ${selectedLocation.name},${selectedCity.name} `,

			type: values.type,
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

		updateProperty(values.id, handlePostProperty, data);
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
				enableReinitialize
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
								<City
									setSelectedCity={setSelectedCity}
									defaultValue={initialValues.city}
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<Location
									city={selectedCity.id}
									setSelectedCity={setSelectedLocation}
								/>
							</Grid>

							{/* <Grid item xs={12} md={6}>
								<Box className={classes.formLabel}>
									Available for{' '}
								</Box>
								<Grid container spacing={0}>
									<Grid item xs={6}>
										<CheckBox
											name="availableFor"
											value="family"
											formLabel="Family"
										/>
									</Grid>

									<Grid item xs={6}>
										<CheckBox
											name="availableFor"
											value="Bachelors (Men)"
											formLabel="Bachelors (Men)"
										/>
									</Grid>
									<Grid item xs={6}>
										<CheckBox
											name="availableFor"
											value="Bachelors (Women)"
											formLabel="Bachelors (Women)"
										/>
									</Grid>
									<Grid item xs={6}>
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
							</Grid> */}
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
								<Select
									name="typeOfToilets"
									formLabel="Toilet type *"
									options={[
										{
											value: 'attached',
											label: 'Attached',
										},
										{
											value: 'common',
											label: 'Common',
										},
									]}
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<Select
									name="roomType"
									formLabel="Room Type *"
									options={[
										{
											value: 'private',
											label: 'Private',
										},
										{
											value: 'shared',
											label: 'Shared',
										},
									]}
								/>
							</Grid>
							{values.roomType === 'shared' && (
								<Grid item xs={12} md={6}>
									<TextField
										name="numberOfRoomMates"
										formLabel="Number of roommates *"
									/>
								</Grid>
							)}
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
							<Grid item xs={12} md={6}>
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
											value="Family"
											formLabel="Family"
											type="checkbox"
										/>
									</Grid>

									<Grid item xs={6} md={3}>
										<CheckBox
											name="availableFor"
											value="Bachelors (Men)"
											formLabel="Bachelors (Men)"
											type="checkbox"
										/>
									</Grid>
									<Grid item xs={6} md={3}>
										<CheckBox
											name="availableFor"
											value="Bachelors (Women)"
											formLabel="Bachelors (Women)"
											type="checkbox"
										/>
									</Grid>
									<Grid item xs={6} md={3}>
										<CheckBox
											name="availableFor"
											value="Job holder (Men)"
											formLabel="Job holder (Men)"
											type="checkbox"
										/>
									</Grid>
									<Grid item xs={6}>
										<CheckBox
											name="availableFor"
											value="Job holder (Women)"
											formLabel="Job holder (Women)"
											type="checkbox"
										/>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12} md={12}>
								<Box mt="1rem" mb="0.5rem">
									<b>Fooding</b>
								</Box>
								<Grid container spacing={0}>
									<Grid item xs={6} md={3}>
										<CheckBox
											name="fooding"
											value="veg"
											formLabel="Veg"
											type="checkbox"
										/>
									</Grid>

									<Grid item xs={6} md={3}>
										<CheckBox
											name="fooding"
											value="nonveg"
											formLabel="Non Veg"
											type="checkbox"
										/>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12} md={12}>
								<Box mt="1rem" mb="0.5rem">
									<b>Food Schedule</b>
								</Box>
								<Grid container spacing={0}>
									<Grid item xs={6} md={3}>
										<CheckBox
											name="foodSchedule"
											value="bedtea"
											formLabel="Bed tea"
											type="checkbox"
										/>
									</Grid>

									<Grid item xs={6} md={3}>
										<CheckBox
											name="foodSchedule"
											value="breakfast"
											formLabel="Breakfast"
											type="checkbox"
										/>
									</Grid>
									<Grid item xs={6} md={3}>
										<CheckBox
											name="foodSchedule"
											value="lunch"
											formLabel="Lunch"
											type="checkbox"
										/>
									</Grid>

									<Grid item xs={6} md={3}>
										<CheckBox
											name="foodSchedule"
											value="dinner"
											formLabel="Dinner"
											type="checkbox"
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
							<ExistingImages property={values} />
							<Grid item xs={12} md={12}>
								<DividerHeading>
									<h3>Update Images</h3>
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
										Update Property
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
	propertyLoading: selectUpdatePropertyLoading,
});

const mapDispatchToProps = (dispatch) => ({
	updateProperty: (id, callback, data) =>
		dispatch(updateProperty({ id, data, callback })),
});

export default connect(mapStateToProps, mapDispatchToProps)(RentApartment);
