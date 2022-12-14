import {
	Backdrop,
	Box,
	Button,
	CircularProgress,
	Grid,
} from '@material-ui/core';
import { FieldArray, Form, Formik } from 'formik';
import { validateLength, validateNumber } from '../../utils/validation.utils';

import Checkbox from '../../components/formik/checkbox.component';
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

const RentApartment = ({
	propertyLoading,
	updateProperty,
	pType,
	initialValues,
}) => {
	const history = useHistory();
	const [furnishes] = React.useState({
		furnishes: [],
		amenities: [],
		legalClearances: [],
	});
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
		if (!validateNumber(values.numberOfBedRooms)) {
			error.numberOfBedRooms = 'Invalid value';
		}
		if (!validateNumber(values.superBuiltupArea)) {
			error.superBuiltupArea = 'Invalid value';
		}
		if (!validateNumber(values.carpetArea)) {
			error.carpetArea = 'Invalid value';
		}
		if (!validateNumber(values.landArea)) {
			error.landArea = 'Invalid value';
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
		if (values['sale_type'] === 'flat' && !validateNumber(values.floor)) {
			error.floor = 'Invalid value';
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
		if (!validateNumber(values.salePrice)) {
			error.salePrice = 'Invalid value';
		}
		if (!values.description) {
			error.description = 'Invalid value';
		}
		if (
			values.legalClearance.find((c) => c.name === 'reraapproved')[
				'value'
			] &&
			!values.reraapproveId
		) {
			error.reraapproveId = 'required';
		}

		if (
			values['sale_type'] === 'flat' &&
			Number(values.noOfFloors) < Number(values.floor)
		) {
			error.floor =
				'Property on floor cannot be greater than total floors';
		}
		if (Number(values.superBuiltupArea) < Number(values.carpetArea)) {
			error.carpetArea =
				'Super builtup area cannot be less than carpet area';
		}

		if (!validateLength(values.numberOfBedRooms, 1)) {
			error.numberOfBedRooms = '1 digit allowed';
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
		console.log(furnishes);
		const type = pType === 'flat' ? 'apartment' : 'villa';
		const data = {
			...values,
			city: selectedCity.id,
			location: selectedLocation.id,
			title: `${values.numberOfBedRooms}BHK ${type} for sale in ${selectedLocation.name},${selectedCity.name} `,
			pricePerSqFt:
				values.salePriceOver === 'superBuildUpArea'
					? values.salePrice / values.superBuiltupArea
					: values.salePrice / values.carpetArea,
			sale_type: values.sale_type,
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
				enableReinitialize
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
								<City
									setSelectedCity={setSelectedCity}
									defaultValue={initialValues.city}
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<Location
									city={selectedCity.id}
									setSelectedCity={setSelectedLocation}
									defaultValue={initialValues.location}
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
								<TextField
									name="landArea"
									formLabel="Land Area (Sq. ft) *"
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
								<Select
									name="propertyOwnerShip"
									formLabel="Ownership *"
									options={[
										{
											value: 'freehold',
											label: 'Freehold',
										},
										{
											value: 'leashed',
											label: 'Leashed',
										},
									]}
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<TextField
									name="noOfFloors"
									formLabel="Total number of floors *"
								/>
							</Grid>
							{values['sale_type'] === 'flat' ? (
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
									name="description"
									formLabel="Description"
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
								<TextField
									name="salePrice"
									formLabel="Sale Price *"
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<Select
									name="salePriceOver"
									formLabel="Price over *"
									options={[
										{
											value: 'superBuildUpArea',
											label: 'Super builtup area',
										},
										{
											value: 'carpetArea',
											label: 'Carpet Area',
										},
									]}
								/>
							</Grid>
							{values.superBuiltupArea &&
								values.carpetArea &&
								values.salePrice && (
									<Grid item xs={12} md={12}>
										<TextField
											name="pricePerSqFt"
											formLabel="Price / Sq. ft *"
											disabled={true}
											value={
												values.salePriceOver ===
												'superBuildUpArea'
													? values.salePrice /
													  values.superBuiltupArea
													: values.salePrice /
													  values.carpetArea
											}
										/>
									</Grid>
								)}
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
								<Furnishes
									initialValues={initialValues}
									showFurnishes={
										values.furnished !== 'unfurnished'
									}
								/>
							</Grid>
							<Grid item xs={12} md={12}>
								<Box mt="1rem" mb="0.5rem">
									<b>Legal Clearance</b>
								</Box>
								<FieldArray name="legalClearance">
									{(arrayHelpers) => (
										<Grid container>
											{values.legalClearance.map(
												(c, i) => {
													return (
														<Grid item lg={3}>
															<Checkbox
																key={i}
																heading="test"
																type="checkbox"
																name={`legalClearance.${i}.value`}
																formLabel={
																	c.label
																}
															/>
														</Grid>
													);
												}
											)}
										</Grid>
									)}
								</FieldArray>
							</Grid>
							<Grid item xs={12} md={12}>
								{values.legalClearance.find(
									(c) => c.name === 'reraapproved'
								)['value'] && (
									<TextField
										name="reraapproveId"
										formLabel="RERA ID"
									/>
								)}
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
