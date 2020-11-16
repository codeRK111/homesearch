import { Box, Button, Grid } from '@material-ui/core';
import { Form, Formik } from 'formik';

import DividerHeading from '../../components/DividerHeadinng/dividerHeading.component';
import React from 'react';
import Select from '../../components/formik/select.component';
import TextField from '../../components/formik/textField.component';
import useStyles from './postPropertyDetails.styles';

const initialValues = {
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
	distanceSchool: '',
	distanceRailwayStation: '',
	distanceAirport: '',
	distanceBusStop: '',
	distanceHospital: '',
	city: '',
	location: '',
};

const RentApartment = () => {
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
