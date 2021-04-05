import {
	Backdrop,
	Box,
	Button,
	CircularProgress,
	Grid,
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import { validateLength, validateNumber } from '../../utils/validation.utils';

import Breadcrumb from '../../components/breadcrumb/breadcrumb.component';
import CheckBox from '../../components/formik/checkbox.component';
import City from './city.component';
import DatePicker from '../../components/formik/datePicker.component';
import DividerHeading from '../../components/DividerHeadinng/dividerHeading.component';
import FormikErrorFocus from 'formik-error-focus';
import Furnishes from '../../components/furnishes/furnishes.component';
import Location from './location.component';
import React from 'react';
import Select from '../../components/formik/select.component';
import Snackbar from '../../components/snackbar/snackbar.component';
import Success from '../../components/propertySuccess/propertySuccess.component';
import TextField from '../../components/formik/textField.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { handleImageUpload } from '../../utils/configure.utils';
import { postProperty } from '../../redux/property/property.actions';
import { selectPostPropertyLoading } from '../../redux/property/property.selectors';
import useStyles from './postPropertyDetails.styles';

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
	const [showSuccess, setShowSuccess] = React.useState(false);
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
		// console.log({ test: validateNumber(values.toiletIndian) });
		if (!validateNumber(values.numberOfBedRooms)) {
			error.numberOfBedRooms = 'Please enter a number';
		}

		if (!validateNumber(values.numberOfBalconies)) {
			error.numberOfBalconies = 'Please enter a number';
		}

		if (!validateNumber(values.superBuiltupArea)) {
			error.superBuiltupArea = 'Please enter a number';
		}
		if (!validateNumber(values.carpetArea)) {
			error.carpetArea = 'Please enter a number';
		}
		if (Number(values.superBuiltupArea) < Number(values.carpetArea)) {
			error.carpetArea =
				'Carpet area cannot be greater than super built up area';
		}
		if (!validateNumber(values.toiletIndian)) {
			error.toiletIndian = 'Please enter a number';
		}
		if (Number(values.toiletIndian) > 10) {
			error.toiletIndian = 'Cannot be graeter than 10';
		}
		if (!validateNumber(values.toiletWestern)) {
			error.toiletWestern = 'Please enter a number';
		}
		if (Number(values.toiletWestern) > 10) {
			error.toiletWestern = 'Cannot be graeter than 10';
		}
		if (!validateNumber(values.noOfFloors)) {
			error.noOfFloors = 'Please enter a number';
		}

		if (pType === 'flat' && Number(values.noOfFloors) > 99) {
			error.noOfFloors = "Can't be greater than 99";
		}
		if (pType === 'independenthouse' && Number(values.noOfFloors) > 4) {
			error.noOfFloors = "Can't be greater than 4";
		}
		if (pType === 'flat' && !validateNumber(values.floor)) {
			error.floor = 'Please enter a number';
		}
		if (
			pType === 'flat' &&
			Number(values.noOfFloors) < Number(values.floor)
		) {
			error.floor =
				'Property on floor cannot be greater than total floors';
		}
		if (!validateNumber(values.distanceSchool)) {
			error.distanceSchool = 'Please enter a number';
		}
		if (!validateNumber(values.distanceRailwayStation)) {
			error.distanceRailwayStation = 'Please enter a number';
		}
		if (!validateNumber(values.distanceAirport)) {
			error.distanceAirport = 'Please enter a number';
		}
		if (!validateNumber(values.distanceBusStop)) {
			error.distanceBusStop = 'Please enter a number';
		}
		if (!validateNumber(values.distanceHospital)) {
			error.distanceHospital = 'Please enter a number';
		}
		if (!validateNumber(values.rent)) {
			error.rent = 'Please enter a number';
		}
		if (!validateNumber(values.securityDeposit)) {
			error.securityDeposit = 'Please enter a number';
		}
		if (Number(values.securityDeposit) < Number(values.rent)) {
			error.securityDeposit = 'Security deposit cannot be less than rent';
		}
		if (!validateNumber(values.noticePeriod)) {
			error.noticePeriod = 'Please enter a number';
		}
		if (!values.description) {
			error.description = 'Please mention some description';
		}

		if (!validateLength(values.numberOfBedRooms, 1)) {
			error.numberOfBedRooms = '1 digit allowed';
		}
		if (!validateLength(values.numberOfBalconies, 1)) {
			error.numberOfBalconies = '1 digit allowed';
		}

		if (!values.description) {
			error.description = 'Please add some description';
		}

		return error;
	};

	const handlePostProperty = (status, data = null) => {
		if (status === 'success') {
			showSnackbar('Property posted successfully');
			setShowSuccess(true);
		} else {
			showSnackbar(data, 'error');
			setShowSuccess(false);
		}
	};

	const submitForm = (values, { setErrors }) => {
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
			setErrors({ image: 'Please upload atleast one image' });
			return;
		}

		postProperty(handlePostProperty, data);
	};
	const handleImage = (e) => {
		const { name, files } = e.target;
		handleImageUpload(files[0], 2)
			.then((data) => {
				setImages((prevState) => ({
					...prevState,
					[name]: data,
				}));
			})
			.catch((err) => {
				console.log(err.message);
			});
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
			{showSuccess ? (
				<Success />
			) : (
				<Formik
					initialValues={initialValues}
					validate={validateForm}
					onSubmit={submitForm}
				>
					{({ values, setFieldValue, errors }) => (
						<Form>
							<Grid container spacing={1}>
								<Grid item xs={12} md={12}>
									<Breadcrumb
										routes={[
											{
												label: 'Post property',
												path: '/#/post-property',
											},
											{
												label: 'Rent',
												path: '/#/post-property',
											},
										]}
										currentText={
											pType === 'flat'
												? 'Apartment'
												: 'Villla'
										}
									/>
								</Grid>
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
								{pType === 'flat' ? (
									<Grid item xs={12} md={6}>
										<TextField
											name="floor"
											formLabel="Property on floor *"
										/>
									</Grid>
								) : (
									<Grid item xs={12} md={6}>
										<Select
											name="floor"
											formLabel="Property on floor *"
											options={[
												{
													value: 'G',
													label: 'G',
												},
												{
													value: '1',
													label: '1',
												},
												{
													value: '2',
													label: '2',
												},
												{
													value: '3',
													label: '3',
												},
												{
													value: '4',
													label: '4',
												},
												{
													value: 'Entire Building',
													label: 'Entire Building',
												},
											]}
										/>
									</Grid>
								)}

								<Grid item xs={12} md={12}>
									<TextField
										name="noticePeriod"
										formLabel="Notice Period (days) *"
									/>
								</Grid>
								<Grid item xs={12} md={12}>
									<TextField
										name="description"
										type="text"
										formLabel="Description"
										multiline={true}
										rows={5}
									/>
								</Grid>
								<Grid item xs={12} md={12}>
									<TextField
										name="restrictions"
										formLabel="Restrictions (If any)"
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
												value="Family"
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
								{errors.image && (
									<p style={{ color: 'red' }}>
										{errors.image}
									</p>
								)}
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
							<FormikErrorFocus
								// See scroll-to-element for configuration options: https://www.npmjs.com/package/scroll-to-element
								offset={-100}
								align={'top'}
								focusDelay={100}
								ease={'linear'}
								duration={500}
							/>
						</Form>
					)}
				</Formik>
			)}
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
