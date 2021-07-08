import { Box, Grid, IconButton, Typography } from '@material-ui/core';
import { Form, Formik } from 'formik';
import {
	validateLength,
	validateNumber,
} from '../../../../utils/validation.utils';

import CheckBox from '../../../../components/formik/checkbox.component';
import ChipWrapper from '../../../../components/v2/chipWrapper/chipWrapper.component';
import DropDown from '../../../../components/v2/dropdown/chipSelected.component';
import Picker from '../../../../components/formik/datePickerCustom.component';
import React from 'react';
import Select from '../../../../components/v2/chipSelect/chipSelected.component';
import TextArea from '../../../../components/formik/textArea.component';
import TextField from '../../../../components/formik/textFieldDefault.component';
import TodayIcon from '@material-ui/icons/Today';
import UploadPhoto from '../components/uploadPhoto';
import clsx from 'clsx';
import useGlobalStyles from '../../../../common.style';
import useStyles from '../postPage.style';

const initialValues = {
	for: 'rent',
	availableFor: [],
	numberOfBedRooms: 0,
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
	furnished: '',
	furnishes: [],
	amenities: [],
	distanceSchool: 1,
	distanceRailwayStation: 1,
	distanceAirport: 1,
	distanceBusStop: 1,
	distanceHospital: 1,
	availability: '',
	availableDate: new Date(),
	restrictions: '',
	description: '',
	city: '',
	location: '',
	carParking: 'open',
	title: '',
};

const RentApartment = ({ pType, furnishes, amenities }) => {
	const classes = useStyles();
	const gClasses = useGlobalStyles();
	const [isOpen, setIsOpen] = React.useState(false);
	const [photos, setPhotos] = React.useState([]);

	const addMore = () => {
		if (photos.length < 15) {
			setPhotos([
				...photos,
				{
					id: photos.length + 1,
					image: null,
				},
			]);
		}
	};
	const handleImage = (img) => (e) => {
		const { name, files } = e.target;
		console.log({ name });
		setPhotos((prevState) =>
			prevState.map((c) => {
				if (c.id === img.id) {
					c.image = files[0];
				}
				return c;
			})
		);
	};

	const removePhoto = (id) => {
		setPhotos((prevState) => prevState.filter((c) => c.id !== id));
	};
	const validateForm = (values) => {
		const error = {};
		if (!validateNumber(values.numberOfBedRooms)) {
			error.numberOfBedRooms = 'Please enter a number';
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
		if (pType === 'flat' && !validateNumber(values.floor)) {
			error.floor = 'Please enter a number';
		}
		if (
			pType === 'flat' &&
			Number(values.noOfFloors) < Number(values.floor)
		) {
			error.floor =
				'Property on floor cannot be greater than total floors';
		}
		return error;
	};
	return (
		<Box width="100%">
			<Formik
				initialValues={initialValues}
				validate={validateForm}
				enableReinitialize
			>
				{({ values, setFieldValue, errors }) => (
					<Form>
						<Box className={classes.rowWrapper2}>
							<Box className={classes.columnWrapper}>
								<span>Property Name</span>
								<TextField
									name="title"
									formLabel="Bedrooms *"
									className={clsx(
										classes.input,
										classes.widthLG
									)}
								/>
							</Box>
							<Box className={classes.columnWrapper}>
								<span>Totla Floors</span>
								<TextField
									name="noOfFloors"
									className={clsx(
										classes.input,
										classes.widthSM
									)}
								/>
							</Box>
							<Box className={classes.columnWrapper}>
								<span>Property On Floor</span>
								<TextField
									name="floor"
									className={clsx(
										classes.input,
										classes.widthSM
									)}
								/>
							</Box>
						</Box>
						{/* Unit Type  */}
						<Box mt="2rem" className={classes.contentWrapper}>
							<Typography
								variant="h5"
								gutterBottom
								align="center"
							>
								Unit Type
							</Typography>
							<Box
								mt="1rem"
								className={clsx(
									classes.alignCenter,
									gClasses.smFlexWrap
								)}
							>
								<Box className={classes.selectChip}>
									<Select
										selected={values.numberOfBedRooms === 1}
										onClick={() => {
											setFieldValue(
												'numberOfBedRooms',
												1
											);
										}}
									>
										1BHK
									</Select>
								</Box>
								<Box className={classes.selectChip}>
									<Select
										selected={values.numberOfBedRooms === 2}
										onClick={() => {
											setFieldValue(
												'numberOfBedRooms',
												2
											);
										}}
									>
										2BHK
									</Select>
								</Box>
								<Box className={classes.selectChip}>
									<Select
										selected={values.numberOfBedRooms === 3}
										onClick={() => {
											setFieldValue(
												'numberOfBedRooms',
												3
											);
										}}
									>
										3BHK
									</Select>
								</Box>
								<Box className={classes.selectChip}>
									<Select
										selected={values.numberOfBedRooms === 4}
										onClick={() => {
											setFieldValue(
												'numberOfBedRooms',
												4
											);
										}}
									>
										4BHK
									</Select>
								</Box>
								<Box className={classes.selectChip}>
									<Select
										selected={values.numberOfBedRooms === 5}
										onClick={() => {
											setFieldValue(
												'numberOfBedRooms',
												5
											);
										}}
									>
										4BHK+
									</Select>
								</Box>
							</Box>
						</Box>
						{/* Price and area */}
						<Box className={classes.rowWrapper2} mt="3rem">
							<Box className={classes.columnWrapper2}>
								<span>Rent</span>
								<Box display="flex" alignItems="center">
									<TextField
										name="rent"
										className={clsx(
											classes.input,
											classes.widthSM
										)}
									/>
									<div>
										<input
											type="checkbox"
											id="male"
											name="gender"
											value="male"
											className={classes.bgShadow}
										/>
										<label for="male">
											<Typography
												display="inline"
												className={gClasses.smText}
											>
												Negotiable
											</Typography>
										</label>{' '}
									</div>
								</Box>
							</Box>
							<Box className={classes.columnWrapper2}>
								<span>Security Deposit</span>
								<TextField
									name="securityDeposit"
									className={clsx(
										classes.input,
										classes.widthSM
									)}
								/>
							</Box>
							<Box className={classes.columnWrapper2}>
								<span>Maintainance Fee (If any)</span>
								<TextField
									name="securityDeposit"
									className={clsx(
										classes.input,
										classes.widthSM
									)}
								/>
							</Box>
							<Box className={classes.columnWrapper2}>
								<span>Built up area</span>
								<Box display="flex" alignItems="center">
									<TextField
										name="superBuiltupArea"
										className={clsx(
											classes.input,
											classes.widthSM
										)}
									/>
									<Typography>Sq.ft</Typography>
								</Box>
							</Box>

							<Box className={classes.columnWrapper2}>
								<span>Carpet Area</span>
								<Box display="flex" alignItems="center">
									<TextField
										name="carpetArea"
										className={clsx(
											classes.input,
											classes.widthSM
										)}
									/>
									<Typography>Sq.ft</Typography>
								</Box>
							</Box>
							<Box className={classes.columnWrapper2}>
								<span>Notice Period</span>
								<Box display="flex" alignItems="center">
									<TextField
										name="noticePeriod"
										className={clsx(
											classes.input,
											classes.widthSM
										)}
									/>
									<Typography>Days</Typography>
								</Box>
							</Box>
						</Box>

						{/* Furnishes  */}
						<Box mt="2rem" className={classes.contentWrapper}>
							<Typography
								variant="h5"
								gutterBottom
								align="center"
							>
								Furnishing Status
							</Typography>
							<Box
								mt="1rem"
								className={clsx(
									classes.alignCenter,
									gClasses.smFlexWrap
								)}
							>
								<Box className={classes.selectChip}>
									<Select
										selected={
											values.furnished === 'furnished'
										}
										onClick={() => {
											setFieldValue(
												'furnished',
												'furnished'
											);
										}}
									>
										Fully Furnished
									</Select>
								</Box>
								<Box className={classes.selectChip}>
									<Select
										selected={
											values.furnished === 'semifurnished'
										}
										onClick={() => {
											setFieldValue(
												'furnished',
												'semifurnished'
											);
										}}
									>
										Semi furnished
									</Select>
								</Box>

								<Box className={classes.selectChip}>
									<Select
										selected={
											values.furnished === 'unfurnished'
										}
										onClick={() => {
											setFieldValue(
												'furnished',
												'unfurnished'
											);
										}}
									>
										Unfurnished
									</Select>
								</Box>
							</Box>
						</Box>
						{values.furnished !== 'unfurnished' &&
							values.furnished !== '' && (
								<Box mt="2rem">
									<Grid container spacing={0}>
										{furnishes.map((c, i) => (
											<Grid
												item
												xs={6}
												md={3}
												key={c.id}
												justify="center"
											>
												<CheckBox
													type="checkbox"
													name="furnishes"
													value={c.id}
													formLabel={c.name}
												/>
											</Grid>
										))}
									</Grid>
								</Box>
							)}
						<Box mt="2rem">
							<Typography
								variant="h5"
								gutterBottom
								align="center"
							>
								Amenities
							</Typography>
							<Grid container spacing={0}>
								{amenities.map((c, i) => (
									<Grid
										item
										xs={6}
										md={3}
										key={c.id}
										justify="center"
									>
										<CheckBox
											type="checkbox"
											name="amenities"
											value={c.id}
											formLabel={c.name}
										/>
									</Grid>
								))}
							</Grid>
						</Box>

						<Box mt="2rem">
							<Typography
								variant="h5"
								gutterBottom
								align="center"
							>
								Available For
							</Typography>
							<Box className={classes.rowWrapper2}>
								<Box className={classes.columnWrapper2}>
									<CheckBox
										type="checkbox"
										name="availableFor"
										value={'Family'}
										formLabel={'Family'}
									/>
								</Box>
								<Box className={classes.columnWrapper2}>
									<CheckBox
										type="checkbox"
										name="availableFor"
										value="Bachelors (Men)"
										formLabel="Bachelors (Men)"
									/>
								</Box>
								<Box className={classes.columnWrapper2}>
									<CheckBox
										type="checkbox"
										name="availableFor"
										value="Bachelors (Women)"
										formLabel="Bachelors (Women)"
									/>
								</Box>
								<Box className={classes.columnWrapper2}>
									<CheckBox
										type="checkbox"
										name="availableFor"
										value="Job holder (Men)"
										formLabel="Job holder (Men)"
									/>
								</Box>
								<Box className={classes.columnWrapper2}>
									<CheckBox
										type="checkbox"
										name="availableFor"
										value="Job holder (Women)"
										formLabel="Job holder (Women)"
									/>
								</Box>
							</Box>
						</Box>
						<Box mt="2rem">
							<Box className={classes.rowWrapper2}>
								<Box className={classes.columnWrapper}>
									<span>No. of Bedroom</span>
									<DropDown
										options={[
											{ value: 1, label: '1' },
											{ value: 2, label: '2' },
											{ value: 3, label: '3' },
											{ value: 4, label: '4' },
											{ value: 5, label: '5' },
										]}
										onSet={(val) => {
											setFieldValue(
												'numberOfBedRooms',
												val
											);
										}}
										value={values.numberOfBedRooms}
										placeholder="0"
									/>
								</Box>
								<Box className={classes.columnWrapper}>
									<span>No. of indian bathroom </span>
									<DropDown
										options={[
											{ value: 1, label: '1' },
											{ value: 2, label: '2' },
											{ value: 3, label: '3' },
											{ value: 4, label: '4' },
											{ value: 5, label: '5' },
										]}
										onSet={(val) => {
											setFieldValue('toiletIndian', val);
										}}
										value={values.toiletIndian}
										placeholder="0"
									/>
								</Box>
								<Box className={classes.columnWrapper}>
									<span>No. of western bathroom </span>
									<DropDown
										options={[
											{ value: 1, label: '1' },
											{ value: 2, label: '2' },
											{ value: 3, label: '3' },
											{ value: 4, label: '4' },
											{ value: 5, label: '5' },
										]}
										onSet={(val) => {
											setFieldValue('toiletWestern', val);
										}}
										value={values.toiletWestern}
										placeholder="0"
									/>
								</Box>
								<Box className={classes.columnWrapper}>
									<span>No. of balconies </span>
									<DropDown
										options={[
											{ value: 1, label: '1' },
											{ value: 2, label: '2' },
											{ value: 3, label: '3' },
											{ value: 4, label: '4' },
											{ value: 5, label: '5' },
										]}
										onSet={(val) => {
											setFieldValue(
												'numberOfBalconies',
												val
											);
										}}
										value={values.numberOfBalconies}
										placeholder="0"
									/>
								</Box>
							</Box>
						</Box>
						<Box mt="2rem" className={classes.contentWrapper}>
							<Typography
								variant="h5"
								gutterBottom
								align="center"
							>
								Availability
							</Typography>
							<Box
								mt="1rem"
								className={clsx(
									classes.alignCenter,
									gClasses.smFlexWrap
								)}
							>
								<Box className={classes.selectChip}>
									<Select
										selected={
											values.availability ===
											'immediately'
										}
										onClick={() => {
											setFieldValue(
												'availability',
												'immediately'
											);
										}}
									>
										Ready to move
									</Select>
								</Box>
								<Box className={classes.selectChip}>
									<Select
										selected={
											values.availability ===
											'specificdate'
										}
										onClick={() => {
											setFieldValue(
												'availability',
												'specificdate'
											);
										}}
									>
										Specific date
									</Select>
								</Box>
							</Box>
						</Box>
						{values.availability === 'specificdate' && (
							<Box mt="2rem">
								<Typography
									variant="h5"
									gutterBottom
									align="center"
								>
									Available From
								</Typography>
								<Box mt="1rem" className={classes.rowWrapper2}>
									<ChipWrapper>
										<Box className={classes.alignCenter}>
											<Box ml="1rem">
												<Picker
													open={isOpen}
													onOpen={() =>
														setIsOpen(true)
													}
													onClose={() =>
														setIsOpen(false)
													}
													formLabel="Select date"
													name="availableDate"
													value={values.availableDate}
													onChange={(value) => {
														setFieldValue(
															'availableDate',
															value
														);
													}}
												/>
											</Box>
											<Box ml="1rem">
												<IconButton
													onClick={() =>
														setIsOpen(true)
													}
												>
													<TodayIcon />
												</IconButton>
											</Box>
										</Box>
									</ChipWrapper>
								</Box>
							</Box>
						)}
						<Box mt="2rem">
							<Typography
								variant="h5"
								gutterBottom
								align="center"
							>
								Restrictions (If any)
							</Typography>
							<TextArea
								name="restrictions"
								rows={4}
								className={clsx(
									classes.input,
									classes.width100
								)}
							/>
						</Box>
						<Box mt="2rem">
							<Typography
								variant="h5"
								gutterBottom
								align="center"
							>
								Description
							</Typography>
							<TextArea
								name="descriptions"
								rows={8}
								className={clsx(
									classes.input,
									classes.width100
								)}
							/>
						</Box>
						<Box mt="2rem">
							<UploadPhoto
								photos={photos}
								setPhotos={setPhotos}
							/>
						</Box>
					</Form>
				)}
			</Formik>
		</Box>
	);
};

export default RentApartment;
