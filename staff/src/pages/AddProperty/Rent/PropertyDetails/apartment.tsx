import {
	Box,
	Button,
	Container,
	Grid,
	MenuItem,
	Typography,
} from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { validateLength, validateNumber } from '../../../../utils/validation';

import { City } from '../../../../model/city.interface';
import DatePickerComponent from '../../../../components/Pickers/date';
import FCheckbox from '../../../../components/Formik/checkbox';
import FSelect from '../../../../components/Formik/select';
import FTextField from '../../../../components/Formik/input';
import { Location } from '../../../../model/location.interface';
import { Ptype } from '../../../../model/property.interface';
import React from 'react';

const bathroom = [
	{ value: 1, label: '1' },
	{ value: 2, label: '2' },
	{ value: 3, label: '3' },
	{ value: 4, label: '4' },
	{ value: 5, label: '5' },
];

const renderPropertyOnFoor = (totalFloors: any) => {
	const numbers = [
		{
			value: 'Ground Fooor',
			label: 'Ground Fooor',
		},
	];
	for (let index = 1; index <= totalFloors; index++) {
		numbers.push({
			value: `${index}`,
			label: `${index}`,
		});
	}

	if (totalFloors > 1) {
		numbers.push({
			value: 'Entire Building',
			label: 'Entire Building',
		});
	}
	return numbers;
};

export interface IAddPropertyRent {
	type: Ptype | string;
	city: City | null;
	location: Location | null;
	title: string;
	description: string;
}

interface IRentBasicInfo {
	onSubmit: (val: any) => void;
	pType: Ptype | string;
	onBack: () => void;
}

const RentApartmentDetails = ({ onSubmit, pType, onBack }: IRentBasicInfo) => {
	const initialState: any = {
		availableFor: [],
		numberOfBedRooms: '',
		numberOfBalconies: 1,
		noOfFloors: 1,
		floor: 1,
		typeOfToilets: '',
		toiletIndian: 1,
		toiletWestern: 1,
		superBuiltupArea: '',
		carpetArea: '',
		rent: '',
		maintainanceFee: '',
		securityDeposit: '',
		noticePeriod: '',
		furnished: 'semifurnished',
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
		carParking: 'open',
		usp: '',
		negotiable: false,
	};

	const validateForm = (values: any) => {
		const error: any = {};
		// console.log({ test: validateNumber(values.toiletIndian) });
		if (!values.numberOfBedRooms) {
			error.numberOfBedRooms = 'Please choose a unit type';
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

		if (
			pType === 'flat' &&
			Number(values.noOfFloors) < Number(values.floor)
		) {
			error.floor =
				'Property on floor cannot be greater than total floors';
		}

		if (!validateNumber(values.rent)) {
			error.rent = 'Please enter a number';
		}
		if (values.maintainanceFee) {
			if (!validateNumber(values.maintainanceFee)) {
				error.maintainanceFee = 'Please enter a number';
			}
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

		if (!validateLength(values.numberOfBedRooms, 1)) {
			error.numberOfBedRooms = '1 digit allowed';
		}
		if (!validateLength(values.numberOfBalconies, 1)) {
			error.numberOfBalconies = '1 digit allowed';
		}

		if (!validateLength(values.numberOfBedRooms, 1)) {
			error.numberOfBedRooms = '1 digit allowed';
		}

		if (pType === 'independenthouse') {
			if (!validateNumber(values.landArea)) {
				error.landArea = 'Please enter a number';
			}
		}

		if (values.availableFor.length === 0) {
			error.availableFor =
				'Please choose suitable candidate for your property';
		}
		if (values.usp.trim().length > 20) {
			error.usp = 'Max 20 characters allowed';
		}

		return error;
	};

	const onSubmitForm = (values: any) => {
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
								<Grid item xs={12} md={6}>
									<FTextField
										name="noOfFloors"
										label="Total Floors"
									/>
								</Grid>
								<Grid item xs={12} md={6}>
									<FSelect
										name={'floor'}
										label="Property on floor"
									>
										{renderPropertyOnFoor(
											values.noOfFloors
										).map((c, i) => (
											<MenuItem value={c.value} key={i}>
												{c.label}
											</MenuItem>
										))}
									</FSelect>
								</Grid>
								<Grid item xs={12} md={6}>
									<FSelect
										name={'numberOfBedRooms'}
										label="Unit Type"
									>
										{Array.from(
											{ length: 6 },
											(_, i) => i + 1
										).map((c, i) => (
											<MenuItem value={`${c}`} key={i}>
												{c}
											</MenuItem>
										))}
									</FSelect>
								</Grid>
								<Grid item xs={12} md={6}>
									<FTextField name="rent" label="Rent" />
									<div>
										<Field
											type="checkbox"
											name="negotiable"
										/>
										<label>
											<Typography display="inline">
												Negotiable
											</Typography>
										</label>{' '}
									</div>
								</Grid>
								<Grid item xs={12} md={6}>
									<FTextField
										name="securityDeposit"
										label="Security Deposit"
									/>
								</Grid>
								<Grid item xs={12} md={6}>
									<FTextField
										name="maintainanceFee"
										label="Maintainance Fee (If any)"
									/>
								</Grid>
								<Grid item xs={12} md={6}>
									<FTextField
										name="superBuiltupArea"
										label="Super Built up area"
									/>
								</Grid>
								<Grid item xs={12} md={6}>
									<FTextField
										name="carpetArea"
										label="Carpet Area"
									/>
								</Grid>
								{pType === Ptype.Villa && (
									<Grid item xs={12} md={6}>
										<FTextField
											name="landArea"
											label="Land Area"
										/>
										<Grid item xs={12} md={6}>
											<FTextField
												name="noticePeriod"
												label="Notice Period"
											/>
										</Grid>
									</Grid>
								)}
								<Grid item xs={12} md={6}>
									<FSelect
										name={'toiletIndian'}
										label="No. of indian bathroom "
									>
										{bathroom.map((c, i) => (
											<MenuItem
												value={`${c.value}`}
												key={i}
											>
												{c.label}
											</MenuItem>
										))}
									</FSelect>
								</Grid>
								<Grid item xs={12} md={6}>
									<FSelect
										name={'toiletWestern'}
										label="No. of western bathroom "
									>
										{bathroom.map((c, i) => (
											<MenuItem
												value={`${c.value}`}
												key={i}
											>
												{c.label}
											</MenuItem>
										))}
									</FSelect>
								</Grid>
								<Grid item xs={12} md={6}>
									<FSelect
										name={'numberOfBalconies'}
										label="No. of balconies "
									>
										{bathroom.map((c, i) => (
											<MenuItem
												value={`${c.value}`}
												key={i}
											>
												{c.label}
											</MenuItem>
										))}
									</FSelect>
								</Grid>
								<Grid item xs={12} md={6}>
									<FSelect
										name={'furnished'}
										label="Furnishing Status"
									>
										<MenuItem value={'furnished'}>
											Furnished
										</MenuItem>
										<MenuItem value={'semifurnished'}>
											Semi furnished
										</MenuItem>
										<MenuItem value={'unfurnished'}>
											Unfurnished
										</MenuItem>
									</FSelect>
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
												value={'Job holder (Men)'}
												label="Job holder (Women)"
											/>
										</Grid>
									</Grid>
								</Grid>
								<Grid item xs={12} md={6}>
									<FSelect
										name={'availability'}
										label="Availability"
									>
										<MenuItem value={'immediately'}>
											Ready to move
										</MenuItem>
										<MenuItem value={'specificdate'}>
											Specific date
										</MenuItem>
									</FSelect>
								</Grid>
								{values.availability === 'specificdate' && (
									<Grid item xs={12} md={6}>
										<DatePickerComponent
											label="Choose date "
											handleDateChange={(val) => {
												setFieldValue(
													'availableDate',
													val
												);
											}}
											date={values.availableDate}
										/>
									</Grid>
								)}
								<Grid item xs={12} md={6}>
									<FTextField name="usp" label="USP" />
								</Grid>
								<Grid item xs={12}>
									<Box
										display="flex"
										justifyContent="space-between"
									>
										<Button
											type="button"
											variant="contained"
											color="primary"
											size="large"
											onClick={onBack}
										>
											Back
										</Button>
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

export default RentApartmentDetails;
