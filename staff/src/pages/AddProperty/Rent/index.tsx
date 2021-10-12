import { Box, Button, Container, Grid } from '@material-ui/core';
import { Form, Formik } from 'formik';

import { City } from '../../../model/city.interface';
import FRadio from '../../../components/Formik/radio';
import FTextField from '../../../components/Formik/input';
import { Location } from '../../../model/location.interface';
import { Ptype } from '../../../model/property.interface';
import React from 'react';
import SearchCity from '../../../components/Search/city';
import SearchLocation from '../../../components/Search/location';

export interface IAddPropertyRent {
	type: Ptype | string;
	city: City | null;
	location: Location | null;
	title: string;
	description: string;
}

const validateForm = (values: IAddPropertyRent) => {
	const errors: any = {};
	if (!values.type) {
		errors.type = 'Please provide a type';
	}
	if (!values.title) {
		errors.title = 'Please provide a title';
	}
	if (!values.description) {
		errors.description = 'Please provide a description';
	}
	if (!values.type) {
		errors.type = 'Please provide a type';
	}
	if (!values.city) {
		errors.city = 'Please provide a city';
	}
	if (!values.location) {
		errors.location = 'Please provide a location';
	}
	return errors;
};

const AddPropertyRent = () => {
	const initialState: IAddPropertyRent = {
		type: '',
		city: null,
		location: null,
		title: '',
		description: '',
	};

	const onSubmit = (values: IAddPropertyRent) => {};
	return (
		<Container>
			<h1>Rent</h1>
			<Box mt="1rem">
				<Formik
					initialValues={initialState}
					onSubmit={onSubmit}
					validate={validateForm}
					enableReinitialize
				>
					{({
						values,
						setFieldValue,
						errors,
						isSubmitting,
						isValidating,
						touched,
					}) => (
						<Form>
							<Grid container spacing={3}>
								<Grid item xs={12}>
									<FRadio
										row
										groupLabel="Property Type"
										name={'type'}
										options={[
											{
												label: 'Apartment',
												value: Ptype.Apartment,
											},
											{
												label: 'Villa',
												value: Ptype.Villa,
											},
											{
												label: 'Hostel',
												value: Ptype.Hostel,
											},
											{
												label: 'PG',
												value: Ptype.PG,
											},
										]}
									/>
								</Grid>
								<Grid item xs={12}>
									<FTextField
										name="title"
										label="Property Title"
									/>
								</Grid>
								<Grid item xs={12}>
									<FTextField
										name="description"
										label="Property Description"
										multiline
										rows={5}
									/>
								</Grid>
								<Grid item xs={12} md={6}>
									<SearchCity
										label="Enter City "
										error={touched.city ? errors.city : ''}
										value={values.city}
										onSelect={(value: City | null) => {
											setFieldValue('city', value);
										}}
									/>
								</Grid>
								{values.city && values.city.id && (
									<Grid item xs={12} md={6}>
										<SearchLocation
											label="Enter Location "
											value={values.location}
											city={values.city.id}
											error={
												touched.location
													? errors.location
													: ''
											}
											onSelect={(
												value: Location | null
											) => {
												setFieldValue(
													'location',
													value
												);
											}}
										/>
									</Grid>
								)}
								<Grid item xs={12}>
									<Button
										type="submit"
										variant="contained"
										color="primary"
										size="large"
									>
										Submit
									</Button>
								</Grid>
							</Grid>
						</Form>
					)}
				</Formik>
			</Box>
		</Container>
	);
};

export default AddPropertyRent;
