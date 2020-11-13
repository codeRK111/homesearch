import { Box, Grid } from '@material-ui/core';
import { Form, Formik } from 'formik';

import DatePicker from '../../components/formik/datePicker.component';
import React from 'react';
import Select from '../../components/formik/select.component';
import TextField from '../../components/formik/textField.component';

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
	distanceSchool: 0,
	distanceRailwayStation: 0,
	distanceAirport: 0,
	distanceBusStop: 0,
	distanceHospital: 0,
	salePrice: '',
	salePriceOver: 'superBuildUpArea',
	availableDate: Date.now(),
};

const RentApartment = () => {
	return (
		<Box>
			<Formik initialValues={initialValues}>
				{({ values, setFieldValue }) => (
					<Form>
						<Grid container spacing={1}>
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
						</Grid>
					</Form>
				)}
			</Formik>
			<h1>Rent</h1>
		</Box>
	);
};

export default RentApartment;
