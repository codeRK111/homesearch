import {
	Box,
	Button,
	Container,
	Grid,
	MenuItem,
	Typography,
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';

import { City } from '../../../../model/city.interface';
import FCheckbox from '../../../Formik/checkbox';
import FRadio from '../../../Formik/radio';
import FSelect from '../../../Formik/select';
import FTextField from '../../../Formik/input';
import { Location } from '../../../../model/location.interface';
import { Ptype } from '../../../../model/property.interface';
import SearchCity from '../../../Search/city';
import SearchLocation from '../../../Search/location';

export interface RentBasicInfoData {
	type: Ptype | string;
	city: City | null;
	location: Location | null;
	title: string;
	description: string;
	[key: string]: any;
}

interface IRentBasicInfo {
	onSubmit: (val: any) => void;
	initialData: any;
}

export const getBedroomNumber = (requirement: Array<string> = []): number => {
	if (requirement.includes('1RK') || requirement.includes('1BHK')) {
		return 1;
	} else if (requirement.includes('2BHK')) {
		return 2;
	} else if (requirement.includes('3BHK')) {
		return 3;
	} else if (requirement.includes('4BHK')) {
		return 4;
	} else {
		return 0;
	}
};

const validateForm = (values: RentBasicInfoData) => {
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
	// if (!values.type) {
	// 	errors.type = 'Please provide a type';
	// }
	if (!values.city) {
		errors.city = 'Please provide a city';
	}
	if (!values.location) {
		errors.location = 'Please provide a location';
	}
	return errors;
};

const RentBasicInfo = ({ onSubmit, initialData }: IRentBasicInfo) => {
	const [pData, setPdata] = useState<RentBasicInfoData>({
		city: null,
		for: 'rent',
		type: '',
		location: null,
		title: '',
		availableFor: [],
		numberOfBedRooms: 0,
		numberOfBalconies: 0,
		noOfFloors: 1,
		floor: '',
		typeOfToilets: '',
		toiletTypes: '',
		toiletIndian: '',
		toiletWestern: '',
		superBuiltupArea: '',
		carpetArea: '',
		rent: '',
		securityDeposit: '',
		noticePeriod: '',
		furnished: 'furnished',
		furnishes: [],
		amenities: [],
		distanceSchool: '',
		distanceRailwayStation: '',
		distanceAirport: '',
		distanceBusStop: '',
		distanceHospital: '',
		availability: '',
		availableDate: new Date(),
		restrictions: '',
		description: '',
		carParking: 'open',
	});

	const onSubmitForm = (values: RentBasicInfoData) => {
		onSubmit(values);
	};

	useEffect(() => {
		console.log({ initialData });
		setPdata({
			...pData,
			...initialData,
			numberOfBedRooms: getBedroomNumber(
				initialData.propertyRequirements
			),
		});
	}, []);
	return (
		<Container>
			<Box mt="1rem">
				<Formik
					initialValues={pData}
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
							<pre>{JSON.stringify(values, null, 4)}</pre>
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
								<Grid item xs={6}>
									<FTextField
										name="floor"
										label="Total number of floor"
									/>
								</Grid>
								<Grid item xs={6}>
									<FTextField
										name="propertyOnFloor"
										label="Property on floor"
									/>
								</Grid>
								<Grid item xs={12}>
									<Typography variant="caption">
										Available For
									</Typography>
									<Grid container spacing={1}>
										<Grid item>
											<FCheckbox
												type="checkbox"
												name="availableFor"
												value={'Family'}
												label="Family"
											/>
										</Grid>
										<Grid item>
											<FCheckbox
												type="checkbox"
												name="availableFor"
												value={'Bachelors (Men)'}
												label="Bachelors (Men)"
											/>
										</Grid>
										<Grid item>
											<FCheckbox
												type="checkbox"
												name="availableFor"
												value={'Bachelors (Women)'}
												label="Bachelors (Women)"
											/>
										</Grid>
										<Grid item>
											<FCheckbox
												type="checkbox"
												name="availableFor"
												value={'Job holder (Men)'}
												label="Job holder (Men)"
											/>
										</Grid>
										<Grid item>
											<FCheckbox
												type="checkbox"
												name="availableFor"
												value={'Job holder (Women)'}
												label="Job holder (Women)"
											/>
										</Grid>
									</Grid>
								</Grid>
								<Grid item xs={6}>
									<FTextField
										name="numberOfBedRooms"
										label="Number of bedrooms"
									/>
								</Grid>
								<Grid item xs={6}>
									<FTextField
										name="numberOfBalconies"
										label="Number of balconies"
									/>
								</Grid>
								<Grid item xs={12} md={6}>
									<FSelect
										name={'typeOfToilets'}
										label="Type of toilets"
									>
										<MenuItem value={'Aattached'}>
											Attached
										</MenuItem>
										<MenuItem value={'common'}>
											Common
										</MenuItem>
									</FSelect>
								</Grid>
								<Grid item xs={6}>
									<FTextField
										name="toiletIndian"
										label="Number of indian toilet"
									/>
								</Grid>
								<Grid item xs={6}>
									<FTextField
										name="toiletWestern"
										label="Number of western toilet"
									/>
								</Grid>
								<Grid item xs={6}>
									<FTextField
										name="superBuiltupArea"
										label="Super built up area"
									/>
								</Grid>
								<Grid item xs={6}>
									<FTextField
										name="carpetArea"
										label="Carpet Area"
									/>
								</Grid>
								<Grid item xs={6}>
									<FTextField
										name="securityDeposit"
										label="Security Deposit"
									/>
								</Grid>
								<Grid item xs={6}>
									<FTextField name="rent" label="Rent" />
								</Grid>
								<Grid item xs={6}>
									<FTextField
										name="noticePeriod"
										label="Notice Period"
									/>
								</Grid>
								<Grid item xs={12} md={6}>
									<FSelect
										name={'carParking'}
										label="Car Parking"
									>
										<MenuItem value={'open'}>Open</MenuItem>
										<MenuItem value={'covered'}>
											Covered
										</MenuItem>
									</FSelect>
								</Grid>
								<Grid item xs={12} md={6}>
									<FSelect
										name={'furnished'}
										label="Furnishing Status"
									>
										<MenuItem value={'unfurnished'}>
											Unfurnished
										</MenuItem>
										<MenuItem value={'furnished'}>
											Furnished
										</MenuItem>
										<MenuItem value={'semifurnished'}>
											Semi furnished
										</MenuItem>
									</FSelect>
								</Grid>
								<Grid item xs={12}>
									<FTextField
										name="restrictions"
										label="Restrictions ( If any )"
										multiline
										rows={5}
									/>
								</Grid>
								<Grid item xs={12} md={6}>
									<FSelect
										name={'availability'}
										label="Availability"
									>
										<MenuItem value={'immediately'}>
											Immediately
										</MenuItem>
										<MenuItem value={'specificdate'}>
											Specific Date
										</MenuItem>
									</FSelect>
								</Grid>
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
											Submit
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
