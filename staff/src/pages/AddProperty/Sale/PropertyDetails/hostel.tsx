import {
	AddPropertyPageResponse,
	asyncGetAddPropertyPageResources,
} from '../../../../API/page';
import {
	Box,
	Button,
	CircularProgress,
	Container,
	Grid,
	MenuItem,
	Typography,
} from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import { ResourceType, useRepositoryAction } from '../../../../hooks/useAction';

import { City } from '../../../../model/city.interface';
import DatePickerComponent from '../../../../components/Pickers/date';
import FCheckbox from '../../../../components/Formik/checkbox';
import FRadio from '../../../../components/Formik/radio';
import FSelect from '../../../../components/Formik/select';
import FTextField from '../../../../components/Formik/input';
import { Location } from '../../../../model/location.interface';
import { Ptype } from '../../../../model/property.interface';
import { validateNumber } from '../../../../utils/validation';

const bathroom = [
	{ value: 1, label: '1' },
	{ value: 2, label: '2' },
	{ value: 3, label: '3' },
	{ value: 4, label: '4' },
	{ value: 5, label: '5' },
];
const foodSchedule = [
	{ value: 'bedtea', label: 'Bed Tea' },
	{ value: 'breakfast', label: 'Breakfast' },
	{ value: 'lunch', label: 'Lunch' },
	{ value: 'dinner', label: 'Dinner' },
];

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
	addPropertyLoading: boolean;
}

const RentHostelDetails = ({
	onSubmit,
	pType,
	onBack,
	addPropertyLoading,
}: IRentBasicInfo) => {
	const { setSnackbar } = useRepositoryAction(ResourceType.UI);
	const [fetchLoading, setFetchLoading] = useState(false);
	const [fetchData, setFetchData] = useState<AddPropertyPageResponse | null>(
		null
	);
	const initialState: any = {
		availableFor: [],
		typeOfToilets: 'attached',
		toiletIndian: 1,
		toiletWestern: 1,
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
		roomType: 'shared',
		fooding: [],
		foodSchedule: [],
		numberOfRoomMates: 1,
		usp: '',
		numberOfBedRooms: 1,
		negotiable: false,
		foodingAvailable: 'no',
	};

	const fetchResources = useCallback(async () => {
		try {
			setFetchLoading(true);
			const data = await asyncGetAddPropertyPageResources();
			setFetchData(data);
		} catch (error: any) {
			setSnackbar({
				open: true,
				message: error.message,
				severity: 'error',
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		fetchResources();
	}, [fetchResources]);

	const validateForm = (values: any) => {
		const error: any = {};

		if (!validateNumber(values.toiletIndian)) {
			error.toiletIndian = 'Please enter a number';
		}
		if (!validateNumber(values.toiletWestern)) {
			error.toiletWestern = 'Please enter a number';
		}
		if (Number(values.toiletIndian) > 10) {
			error.toiletIndian = 'Cannot be graeter than 10';
		}
		if (Number(values.toiletWestern) > 10) {
			error.toiletWestern = 'Cannot be graeter than 10';
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
		if (!validateNumber(values.noticePeriod)) {
			error.noticePeriod = 'Please enter a number';
		}
		if (Number(values.securityDeposit) < Number(values.rent)) {
			error.securityDeposit = 'Security deposit cannot be less than rent';
		}

		if (values.roomType === 'shared') {
			if (!values.numberOfRoomMates) {
				error.numberOfRoomMates = 'Please enter a number';
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
									<FSelect
										name={'numberOfBedRooms'}
										label="Number of Bedroom"
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
										name="noticePeriod"
										label="Notice Period in days"
									/>
								</Grid>
								<Grid item xs={12} md={6}>
									<FSelect
										name={'typeOfToilets'}
										label="Types Of Toilets"
									>
										<MenuItem value={'attached'}>
											Attached
										</MenuItem>
										<MenuItem value={'common'}>
											Common
										</MenuItem>
									</FSelect>
								</Grid>

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
										name={'roomType'}
										label="Room Type"
									>
										<MenuItem value={'private'}>
											Private
										</MenuItem>
										<MenuItem value={'shared'}>
											Shared
										</MenuItem>
									</FSelect>
								</Grid>
								{values.roomType === 'shared' && (
									<Grid item xs={12} md={6}>
										<FTextField
											name="numberOfRoomMates"
											label="Number of roommates"
										/>
									</Grid>
								)}
								<Grid item xs={12} md={6}>
									<FRadio
										row
										name="foodingAvailable"
										value={values.foodingAvailable}
										groupLabel="Fooding Available"
										options={[
											{
												label: 'Yes',
												value: 'yes',
											},
											{
												label: 'No',
												value: 'no',
											},
										]}
									/>
								</Grid>
								{values.foodingAvailable === 'yes' && (
									<Grid item xs={12} md={6}>
										<Typography
											variant="caption"
											gutterBottom
											display="block"
										>
											Food Type
										</Typography>
										<Grid container spacing={0}>
											<Grid
												item
												xs={6}
												md={3}
												justify="center"
											>
												<FCheckbox
													type="checkbox"
													name="fooding"
													value={'veg'}
													label={'Veg'}
												/>
											</Grid>
											<Grid
												item
												xs={6}
												md={3}
												justify="center"
											>
												<FCheckbox
													type="checkbox"
													name="fooding"
													value={'nonveg'}
													label={'Non Veg'}
												/>
											</Grid>
										</Grid>
									</Grid>
								)}
								{values.foodingAvailable === 'yes' && (
									<Grid item xs={12} md={6}>
										<Typography
											variant="caption"
											gutterBottom
											display="block"
										>
											Food Schedule
										</Typography>
										<Grid container spacing={0}>
											{foodSchedule.map((c, i) => (
												<Grid
													item
													xs={6}
													md={3}
													key={i}
													justify="center"
												>
													<FCheckbox
														type="checkbox"
														name="foodSchedule"
														value={c.value}
														label={c.label}
													/>
												</Grid>
											))}
										</Grid>
									</Grid>
								)}
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
								{values.furnished !== 'unfurnished' &&
									values.furnished !== '' &&
									fetchData && (
										<Box mt="2rem">
											<Typography
												variant="caption"
												gutterBottom
												display="block"
											>
												Furnishes
											</Typography>
											<Grid container spacing={0}>
												{fetchData.furnishes.map(
													(c, i) => (
														<Grid
															item
															xs={6}
															md={3}
															key={c.id}
															justify="center"
														>
															<FCheckbox
																type="checkbox"
																name="furnishes"
																value={c.id}
																label={c.name}
															/>
														</Grid>
													)
												)}
											</Grid>
										</Box>
									)}
								{fetchData && (
									<Box mt="2rem">
										<Typography
											variant="caption"
											gutterBottom
											display="block"
										>
											Amenities
										</Typography>
										<Grid container spacing={0}>
											{fetchData.amenities.map((c, i) => (
												<Grid
													item
													xs={6}
													md={3}
													key={c.id}
													justify="center"
												>
													<FCheckbox
														type="checkbox"
														name="amenities"
														value={c.id}
														label={c.name}
													/>
												</Grid>
											))}
										</Grid>
									</Box>
								)}
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
									<FTextField
										name="restrictions"
										label="Restrictions (If any)"
										multiline
										rows={5}
									/>
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
											disabled={addPropertyLoading}
											endIcon={
												addPropertyLoading ? (
													<CircularProgress
														size={20}
														color={'inherit'}
													/>
												) : (
													<></>
												)
											}
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

export default RentHostelDetails;
