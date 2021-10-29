import { Box, Grid, IconButton, Typography } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import {
	validateLength,
	validateNumber,
} from '../../../../utils/validation.utils';

import CheckBox from '../../../../components/formik/checkbox.component';
import ChipWrapper from '../../../../components/v2/chipWrapper/chipWrapper.component';
import DropDown from '../../../../components/v2/dropdown/chipSelected.component';
import ErrorContainer from '../../../../components/formik/errorContainer';
import Picker from '../../../../components/formik/datePickerCustom.component';
import React from 'react';
import Select from '../../../../components/v2/chipSelect/chipSelected.component';
import TextArea from '../../../../components/formik/textArea.component';
import TextField from '../../../../components/formik/textFieldDefault.component';
import TodayIcon from '@material-ui/icons/Today';
import UploadPhoto from '../components/uploadPhoto';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { setSnackbar } from '../../../../redux/ui/ui.actions';
import { toHumanReadbleString } from '../../../../utils/render.utils';
import useGlobalStyles from '../../../../common.style';
import useStyles from '../postPage.style';

const initialValues = {
	for: 'rent',
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
	description: '',
	city: '',
	location: '',
	carParking: 'open',
	title: '',
	usp: '',
	negotiable: false,
};

const RentApartment = ({
	pType,
	furnishes,
	amenities,
	onPost,
	setSnackbar,
	loading,
}) => {
	const classes = useStyles();
	const gClasses = useGlobalStyles();
	const [isOpen, setIsOpen] = React.useState(false);
	const [defaultPhoto, setDefaultPhoto] = React.useState(0);
	const [photos, setPhotos] = React.useState([]);

	const validateForm = (values) => {
		const error = {};
		if (!values.title) {
			error.title = 'Enter project name';
		}
		// console.log({ test: validateNumber(values.toiletIndian) });

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
		if (!values.description) {
			error.description = 'Please mention some description';
		}

		if (!validateLength(values.numberOfBedRooms, 1)) {
			error.numberOfBedRooms = '1 digit allowed';
		}
		if (!validateLength(values.numberOfBalconies, 1)) {
			error.numberOfBalconies = '1 digit allowed';
		}
		if (values.availableFor.length === 0) {
			error.availableFor =
				'Please choose suitable candidate for your property';
		}

		if (!values.description) {
			error.description = 'Please add some description';
		}

		if (!validateLength(values.numberOfBedRooms, 1)) {
			error.numberOfBedRooms = '1 digit allowed';
		}

		if (pType === 'independenthouse') {
			if (!validateNumber(values.landArea)) {
				error.landArea = 'Please enter a number';
			}
		}

		if (values.usp.trim().length > 20) {
			error.usp = 'Max 20 characters allowed';
		}

		if (!values.numberOfBedRooms) {
			error.numberOfBedRooms = 'Please choose a unit type';
		}

		return error;
	};

	const renderPropertyOnFoor = (totalFloors) => {
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

	const submitForm = (values) => {
		const data = {
			...values,
			type: pType,
			defaultPhoto,
		};

		onPost(data, photos, 'rent')
			.then((data) => {
				console.log(data);
			})
			.catch((error) => {
				if (error) {
					setSnackbar({
						open: true,
						message: error,
						severity: 'error',
					});
				}
			});
	};

	const initialData = {
		...initialValues,
		floor: 'Ground Floor',
	};

	if (pType === 'independenthouse') {
		initialData.landArea = '';
	}
	return (
		<Box width="100%">
			<Formik
				initialValues={initialData}
				validate={validateForm}
				enableReinitialize
				onSubmit={submitForm}
			>
				{({ values, setFieldValue, errors, isSubmitting }) => (
					<Form>
						{/* <pre>{JSON.stringify(errors, null, 2)}</pre> */}
						<Box className={classes.rowWrapper2}>
							<Box className={classes.columnWrapper}>
								<span>Society Name</span>
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
								<span>Property on floor</span>
								<DropDown
									options={renderPropertyOnFoor(
										values.noOfFloors
									)}
									onSet={(val) => {
										setFieldValue('floor', val);
									}}
									value={values.floor}
									placeholder="0"
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

							<ErrorContainer
								errors={errors}
								name="numberOfBedRooms"
								isSubmitting={isSubmitting}
							/>

							<Box mt="1rem">
								<Grid container spacing={3}>
									{Array.from(
										{ length: 6 },
										(_, i) => i + 1
									).map((c) => (
										<Grid item xs={4} md={2} key={c}>
											<Select
												selected={
													values.numberOfBedRooms ===
													c
												}
												onClick={() => {
													setFieldValue(
														'numberOfBedRooms',
														c
													);
												}}
											>
												{c}BHK
											</Select>
										</Grid>
									))}
								</Grid>
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
											classes.widthMD
										)}
									/>
								</Box>
								{values.rent && (
									<div>
										<Typography
											display="inline"
											className={clsx(
												gClasses.smText,
												gClasses.bold
											)}
										>
											{toHumanReadbleString(values.rent)}
										</Typography>
									</div>
								)}
								<div>
									<Field
										type="checkbox"
										name="negotiable"
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
							<Box className={classes.columnWrapper2}>
								<span>Security Deposit</span>
								<TextField
									name="securityDeposit"
									className={clsx(
										classes.input,
										classes.widthSM
									)}
								/>
								{values.securityDeposit && (
									<div>
										<Typography
											display="inline"
											className={clsx(
												gClasses.smText,
												gClasses.bold
											)}
										>
											{toHumanReadbleString(
												values.securityDeposit
											)}
										</Typography>
									</div>
								)}
							</Box>

							<Box className={classes.columnWrapper2}>
								<span>Maintainance Fee (If any)</span>
								<TextField
									name="maintainanceFee"
									className={clsx(
										classes.input,
										classes.widthSM
									)}
								/>
								{values.maintainanceFee && (
									<div>
										<Typography
											display="inline"
											className={clsx(
												gClasses.smText,
												gClasses.bold
											)}
										>
											{toHumanReadbleString(
												values.maintainanceFee
											)}
										</Typography>
									</div>
								)}
							</Box>
							<Box className={classes.columnWrapper2}>
								<span>Super Built up area</span>
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
							{pType === 'independenthouse' && (
								<Box className={classes.columnWrapper2}>
									<span>Land Area</span>
									<Box display="flex" alignItems="center">
										<TextField
											name="landArea"
											className={clsx(
												classes.input,
												classes.widthSM
											)}
										/>
										<Typography>Sq.ft</Typography>
									</Box>
								</Box>
							)}
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
						{/* Bathroom */}
						<Box mt="2rem">
							<Box className={classes.rowWrapper2}>
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

							<Box display="flex" justifyContent="center">
								<ErrorContainer
									errors={errors}
									name="availableFor"
									isSubmitting={isSubmitting}
								/>
							</Box>
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
						{/* USP  */}
						<Box className={classes.rowWrapper2} mt="2rem">
							<Box className={classes.columnWrapper}>
								<span>Speciality</span>
								<Box>
									<TextField
										name="usp"
										formLabel="USP *"
										className={clsx(
											classes.input,
											classes.widthMD
										)}
									/>
									<Box className={gClasses.justifyCenter}>
										<Typography variant="caption">
											Max 20 Characters
										</Typography>
									</Box>
									<Box
										className={clsx(gClasses.justifyCenter)}
									>
										<Typography variant="caption">
											Ex: Swimming Pool, Near NH etc
										</Typography>
									</Box>
								</Box>
							</Box>
						</Box>
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
								name="description"
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
								defaultPhoto={defaultPhoto}
								setDefaultPhoto={setDefaultPhoto}
							/>
						</Box>
						<Box mt="3rem" className={gClasses.justifyCenter}>
							<button
								className={classes.postButton}
								type="submit"
								disabled={loading}
							>
								Post Ad Now
							</button>
						</Box>
					</Form>
				)}
			</Formik>
		</Box>
	);
};

const mapDispatchToProps = (dispatch) => ({
	setSnackbar: (config) => dispatch(setSnackbar(config)),
});

export default connect(null, mapDispatchToProps)(RentApartment);
