import {
	Backdrop,
	Box,
	Button,
	CircularProgress,
	Grid,
} from '@material-ui/core';
import { FieldArray, Form, Formik } from 'formik';

import Breadcrumb from '../../components/breadcrumb/breadcrumb.component';
import Checkbox from '../../components/formik/checkbox.component';
import City from './city.component';
import DividerHeading from '../../components/DividerHeadinng/dividerHeading.component';
import FormikErrorFocus from 'formik-error-focus';
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
import { validateNumber } from '../../utils/validation.utils';

const legalClearance = [
	{
		name: 'numberOfOwner',
		value: false,
		label: 'Number of owner',
	},
	{
		name: 'withinBlockArea',
		value: false,
		label: 'Within Block Area',
	},
	{
		name: 'approvedByDevelopmentAutority',
		value: false,
		label: 'Approved by Development Authority',
	},
	{
		name: 'withinAreaOfDevelopmentAuthrity',
		value: false,
		label: 'Within Area of Development Authority',
	},
];

const initialValues = {
	for: 'sale',
	title: '',
	description: '',
	length: '',
	width: '',
	plotFrontage: '',
	plotArea: '',
	widthOfRoad: '',
	facing: 'east', //dropdown,
	constructionDone: false, //drop,
	boundaryWallMade: false, //drop
	gatedCommunity: false, //drop,
	landUsingZoning: 'yellow', //drop
	govermentValuation: '',
	salePrice: '',
	pricePerSqFt: '',
	ownerNumber: '',
	verified: true,
	transactionType: 'newbooking',
	distanceSchool: 1,
	distanceRailwayStation: 1,
	distanceAirport: 1,
	distanceBusStop: 1,
	distanceHospital: 1,
	city: '',
	location: '',
	legalClearance,
};

const RentApartment = ({ propertyLoading, postProperty }) => {
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
		if (!validateNumber(values['length'])) {
			error['length'] = 'Please enter a number';
		}
		if (!validateNumber(values.width)) {
			error.width = 'Please enter a number';
		}
		if (!validateNumber(values.plotFrontage)) {
			error.plotFrontage = 'Please enter a number';
		}
		if (!validateNumber(values.plotArea)) {
			error.plotArea = 'Please enter a number';
		}
		if (!validateNumber(values.widthOfRoad)) {
			error.widthOfRoad = 'Please enter a number';
		}
		if (!validateNumber(values.govermentValuation)) {
			error.govermentValuation = 'Please enter a number';
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
		if (!validateNumber(values.salePrice)) {
			error.salePrice = 'Please enter a number';
		}
		if (!values.description) {
			error.description = 'Please mention some description';
		}

		if (
			values.legalClearance.find((c) => c.name === 'numberOfOwner')[
				'value'
			] &&
			!values.ownerNumber
		) {
			error.ownerNumber = 'required';
		}

		if (values.plotArea < values.plotFrontage) {
			error.plotFrontage = 'Plot area cannot be less than plot frontage';
		}

		return error;
	};

	const handlePostProperty = (status, data = null) => {
		if (status === 'success') {
			showSnackbar('Property posted successfully');
			setShowSuccess(true);
		} else {
			setShowSuccess(false);
			showSnackbar(data, 'error');
		}
	};

	const submitForm = (values) => {
		console.log(values);
		const data = {
			...values,
			city: selectedCity.id,
			location: selectedLocation.id,
			title: `${values.plotArea} Sq.ft land for sale in ${selectedLocation.name},${selectedCity.name} `,
			pricePerSqFt: values.salePrice / values.plotArea,
			sale_type: 'land',
		};
		if (values.ownerNumber) {
			data.legalClearance = values.legalClearance.map((c) => {
				if (c.name === 'numberOfOwner') {
					c.details = values.ownerNumber;
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
					{({ values }) => (
						<Form>
							{/* <div>{JSON.stringify(errors, null, '\t')}</div> */}
							<Grid container spacing={1}>
								<Grid item xs={12} md={12}>
									<Breadcrumb
										routes={[
											{
												label: 'Post property',
												path: '/post-property',
											},
											{
												label: 'Sale',
												path: '/post-property',
											},
										]}
										currentText="Land"
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
										name="plotArea"
										formLabel="Plot area(Sq. ft) *"
									/>
								</Grid>
								<Grid item xs={12} md={6}>
									<TextField
										name="plotFrontage"
										formLabel="Plot frontage (Sq. ft) *"
									/>
								</Grid>
								<Grid item xs={12} md={6}>
									<TextField
										name="length"
										formLabel="Length (ft) *"
									/>
								</Grid>
								<Grid item xs={12} md={6}>
									<TextField
										name="width"
										formLabel="Width (ft) *"
									/>
								</Grid>
								<Grid item xs={12} md={6}>
									<TextField
										name="widthOfRoad"
										formLabel="Width of road (ft) *"
									/>
								</Grid>
								<Grid item xs={12} md={6}>
									<Select
										name="constructionDone"
										formLabel="Is construction done *"
										options={[
											{
												value: true,
												label: 'Yes',
											},
											{
												value: false,
												label: 'No',
											},
										]}
									/>
								</Grid>
								<Grid item xs={12} md={6}>
									<Select
										name="boundaryWallMade"
										formLabel="Is boundary wall made *"
										options={[
											{
												value: true,
												label: 'Yes',
											},
											{
												value: false,
												label: 'No',
											},
										]}
									/>
								</Grid>
								<Grid item xs={12} md={6}>
									<Select
										name="gatedCommunity"
										formLabel="Is gated community *"
										options={[
											{
												value: true,
												label: 'Yes',
											},
											{
												value: false,
												label: 'No',
											},
										]}
									/>
								</Grid>
								<Grid item xs={12} md={6}>
									<Select
										name="landUsingZoning"
										formLabel="Land using zoning *"
										options={[
											{
												value: 'yellow',
												label: 'Yellow',
											},
										]}
									/>
								</Grid>
								<Grid item xs={12} md={6}>
									<Select
										name="facing"
										formLabel="Facing *"
										options={[
											{
												value: 'east',
												label: 'East',
											},
											{
												value: 'wast',
												label: 'Wast',
											},
											{
												value: 'north',
												label: 'North',
											},
											{
												value: 'south',
												label: 'South',
											},
										]}
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
									<TextField
										name="govermentValuation"
										formLabel="Goverment valuation *"
									/>
								</Grid>
								{values.plotArea && values.salePrice && (
									<Grid item xs={12} md={12}>
										<TextField
											name="pricePerSqFt"
											formLabel="Price / Sq. ft *"
											disabled={true}
											value={
												values.salePrice /
												values.plotArea
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
								<DividerHeading>
									<h3>Other Details</h3>
								</DividerHeading>
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
										(c) => c.name === 'numberOfOwner'
									)['value'] && (
										<TextField
											name="ownerNumber"
											formLabel="Owner Number"
										/>
									)}
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
