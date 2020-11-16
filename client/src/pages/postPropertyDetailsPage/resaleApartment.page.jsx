import { Box, Button, Grid } from '@material-ui/core';
import { Form, Formik } from 'formik';

import DatePicker from '../../components/formik/datePicker.component';
import DividerHeading from '../../components/DividerHeadinng/dividerHeading.component';
import Furnishes from '../../components/furnishes/furnishes.component';
import LegalClearance from '../../components/legal/legal.component';
import React from 'react';
import Select from '../../components/formik/select.component';
import TextField from '../../components/formik/textField.component';
import useStyles from './postPropertyDetails.styles';

const initialValues = {
	numberOfBedRooms: 1,
	superBuiltupArea: '',
	carpetArea: '',
	availability: 'immediately',
	carParking: 'open',
	furnished: 'unfurnished',
	toiletIndian: 1,
	toiletWestern: 1,
	propertyOwnerShip: 'freehold',
	noOfFloors: 1,
	floor: 1,
	distanceSchool: 1,
	distanceRailwayStation: 1,
	distanceAirport: 1,
	distanceBusStop: 1,
	distanceHospital: 1,
	salePrice: '',
	salePriceOver: 'superBuildUpArea',
	availableDate: Date.now(),
	description: '',
	city: '',
	location: '',
};

const RentApartment = () => {
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
							<Grid item xs={12} md={6}>
								<TextField
									name="floor"
									formLabel="Property on floor *"
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
									initialValues={furnishes}
									showFurnishes={
										values.furnished !== 'unfurnished'
									}
								/>
							</Grid>
							<Grid item xs={12} md={12}>
								<LegalClearance initialValues={furnishes} />
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
