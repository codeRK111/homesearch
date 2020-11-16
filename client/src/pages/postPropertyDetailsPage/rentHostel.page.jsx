import { Box, Button, Grid } from '@material-ui/core';
import { Form, Formik } from 'formik';

import CheckBox from '../../components/formik/checkbox.component';
import DatePicker from '../../components/formik/datePicker.component';
import DividerHeading from '../../components/DividerHeadinng/dividerHeading.component';
import Furnishes from '../../components/furnishes/furnishes.component';
import LegalClearance from '../../components/legal/legal.component';
import React from 'react';
import Select from '../../components/formik/select.component';
import TextField from '../../components/formik/textField.component';
import useStyles from './postPropertyDetails.styles';

const initialValues = {
	title: '',
	availableFor: [],
	numberOfBedRooms: 1,
	numberOfBalconies: 1,
	noOfFloors: 1,
	floor: 1,
	typeOfToilets: '',
	toiletTypes: '',
	toiletIndian: 1,
	toiletWestern: 1,
	superBuiltupArea: '',
	carpetArea: '',
	rent: '',
	securityDeposit: '',
	noticePeriod: '',
	furnished: 'furnished',
	furnishes: [],
	externalAmenities: [],
	distanceSchool: '',
	distanceRailwayStation: '',
	distanceAirport: '',
	distanceBusStop: '',
	distanceHospital: '',
	availability: '',
	availableDate: new Date(),
	restrictions: '',
	description: '',
	city: '',
	location: '',
	carParking: 'open',
	roomType: 'private',
	fooding: [],
	foodSchedule: [],
};

const RentApartment = () => {
	const classes = useStyles();
	const [images, setImages] = React.useState({
		image1: null,
		image2: null,
		image3: null,
		image4: null,
	});
	const [otherDetails] = React.useState({
		furnishes: [],
		amenities: [],
		legalClearances: [],
	});
	const handleImage = (e) => {
		const { name, files } = e.target;
		setImages((prevState) => ({
			...prevState,
			[name]: files[0],
		}));
	};
	return (
		<Box>
			<Formik initialValues={initialValues}>
				{({ values, setFieldValue }) => (
					<Form>
						<Grid container spacing={1}>
							<Grid item xs={12} md={12}>
								<DividerHeading>
									<h3>Property Details</h3>
								</DividerHeading>
							</Grid>
							<Grid item xs={12} md={6}>
								<TextField name="city" formLabel="City *" />
							</Grid>
							<Grid item xs={12} md={6}>
								<TextField
									name="location"
									formLabel="Location *"
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
								<Box mt="1rem" mb="0.5rem">
									<b>Fooding</b>
								</Box>
								<Grid container spacing={0}>
									<Grid item xs={6} md={3}>
										<CheckBox
											name="fooding"
											value="family"
											formLabel="Veg"
										/>
									</Grid>

									<Grid item xs={6} md={3}>
										<CheckBox
											name="fooding"
											value="Bachelors (Men)"
											formLabel="Non Veg"
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
										/>
									</Grid>

									<Grid item xs={6} md={3}>
										<CheckBox
											name="foodSchedule"
											value="breakfast"
											formLabel="Breakfast"
										/>
									</Grid>
									<Grid item xs={6} md={3}>
										<CheckBox
											name="foodSchedule"
											value="lunch"
											formLabel="Lunch"
										/>
									</Grid>

									<Grid item xs={6} md={3}>
										<CheckBox
											name="foodSchedule"
											value="dinner"
											formLabel="Dinner"
										/>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12} md={12}>
								<Furnishes
									initialValues={otherDetails}
									showFurnishes={
										values.furnished !== 'unfurnished'
									}
								/>
							</Grid>
							<Grid item xs={12} md={12}>
								<LegalClearance initialValues={otherDetails} />
							</Grid>
							<Grid item xs={12} md={12}>
								<DividerHeading>
									<h3>Images</h3>
								</DividerHeading>
							</Grid>
							<Grid item xs={12} lg={3}>
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
							<Grid item xs={12} lg={3}>
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
							<Grid item xs={12} lg={3}>
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
							<Grid item xs={12} lg={3}>
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
							<Grid item xs={12} md={12}>
								<Box mt="2rem">
									<Button
										variant="contained"
										color="primary"
										fullWidth
										size="large"
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

export default RentApartment;
