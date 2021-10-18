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

export interface SaleBasicInfoData {
	sale_type: Ptype | string;
	city: City | null;
	location: Location | null;
	title: string;
	description: string;
}

interface IRentBasicInfo {
	onSubmit: (val: any) => void;
}

const validateForm = (values: SaleBasicInfoData) => {
	const errors: any = {};
	if (!values.sale_type) {
		errors.sale_type = 'Please provide a sale_type';
	}
	if (!values.title) {
		errors.title = 'Please provide a title';
	}
	if (!values.description) {
		errors.description = 'Please provide a description';
	}
	if (!values.sale_type) {
		errors.sale_type = 'Please provide a sale_type';
	}
	if (!values.city) {
		errors.city = 'Please provide a city';
	}
	if (!values.location) {
		errors.location = 'Please provide a location';
	}
	return errors;
};

const RentBasicInfo = ({ onSubmit }: IRentBasicInfo) => {
	const initialState: SaleBasicInfoData = {
		sale_type: '',
		city: null,
		location: null,
		title: '',
		description: '',
	};

	const onSubmitForm = (values: SaleBasicInfoData) => {
		onSubmit(values);
	};
	return (
		<Container>
			<Box mt="1rem">
				<Formik
					initialValues={initialState}
					onSubmit={onSubmitForm}
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
										name={'sale_type'}
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
												label: 'Land',
												value: Ptype.Land,
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
									<Box
										display="flex"
										justifyContent="flex-end"
									>
										<Button
											type="submit"
											variant="contained"
											color="primary"
											size="large"
										>
											Next
										</Button>
									</Box>
								</Grid>
							</Grid>
						</Form>
					)}
				</Formik>
			</Box>
		</Container>
	);
};

export default RentBasicInfo;
