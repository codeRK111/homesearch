import { Box, Grid, IconButton, Typography } from '@material-ui/core';
import { Field, FieldArray, Form, Formik } from 'formik';
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
import { connect } from 'react-redux';
import { selectAuthenticated } from '../../../../redux/auth/auth.selectors';
import { setSnackbar } from '../../../../redux/ui/ui.actions';
import { toHumanReadbleString } from '../../../../utils/render.utils';
import useGlobalStyles from '../../../../common.style';
import useStyles from '../postPage.style';

const legalClearance = [
	{
		name: 'approvalOfBuilding',
		value: false,
		label: 'Approval of building',
	},
	{
		name: 'nocFromFireDepts',
		value: false,
		label: 'NOC from Fire depts',
	},
	{
		name: 'electricityConnUse',
		value: false,
		label: 'Electricity Connection use',
	},
	{
		name: 'StructuralStatbilityCertificate',
		value: false,
		label: 'Structural stability certificate',
	},
	{
		name: 'nocFromPollutionDepts',
		value: false,
		label: 'NOC from Pollution deptt',
	},
	{
		name: 'functionalCertificate',
		value: false,
		label: 'Occupation / functional certificate',
	},
	{
		name: 'holdingTax',
		value: false,
		label: 'Municipal /Holding Tax',
	},
	{
		name: 'completionCertificate',
		value: false,
		label: 'Completion Certificate',
	},
	{
		name: 'reraapproved',
		value: false,
		label: 'RERA Approved',
	},
];

const initialValues = {
	for: 'sale',
	numberOfBedRooms: '',
	numberOfBalconies: 1,
	noOfFloors: 1,
	typeOfToilets: '',
	toiletIndian: 1,
	toiletWestern: 1,
	superBuiltupArea: '',
	carpetArea: '',
	salePrice: '',
	furnished: 'semifurnished',
	furnishes: [],
	amenities: [],
	availability: 'immediately',
	availableDate: new Date(),
	description: '',
	city: '',
	location: '',
	carParking: 'open',
	title: '',
	usp: '',
	propertyOwnerShip: 'freehold',
	salePriceOver: '',
	legalClearance: legalClearance,
	reraapproveId: '',
	pricePerSqFt: '',
	transactionType: 'newbooking',
	negotiable: false,
};

const RentApartment = ({
	pType,
	furnishes,
	amenities,
	onPost,
	setSnackbar,
	loading,
	isAuthenticated,
}) => {
	const classes = useStyles();
	const gClasses = useGlobalStyles();
	const [isOpen, setIsOpen] = React.useState(false);

	const [photos, setPhotos] = React.useState([]);
	const [defaultPhoto, setDefaultPhoto] = React.useState(0);

	const validateForm = (values) => {
		const error = {};
		if (!values.title) {
			error.title = 'Enter project name';
		}
		if (!values.numberOfBedRooms) {
			error.numberOfBedRooms = 'Please choose a unit type';
		}

		if (!validateNumber(values.superBuiltupArea)) {
			error.superBuiltupArea = 'Please enter a number';
		}
		if (!validateNumber(values.carpetArea)) {
			error.carpetArea = 'Please enter a number';
		}
		// if (!validateNumber(values.landArea)) {
		// 	error.landArea = 'Please enter a number';
		// }
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

		if (Number(values.noOfFloors) > 99) {
			error.toiletWestern = 'Cannot be graeter than 99';
		}
		if (!validateNumber(values.salePrice)) {
			error.salePrice = 'Please enter a number';
		}
		if (!values.description) {
			error.description = 'Please mention some description';
		}

		if (
			values.legalClearance.find((c) => c.name === 'reraapproved')[
				'value'
			] &&
			!values.reraapproveId
		) {
			error.reraapproveId = 'required';
		}

		if (Number(values.superBuiltupArea) < Number(values.carpetArea)) {
			error.carpetArea =
				'Carpet area cannot be greater than super built up area';
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
			sale_type: pType,
			defaultPhoto,
		};
		onPost(data, photos)
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
		floor: pType === 'flat' ? 'Ground Floor' : '',
	};

	if (pType === 'independenthouse') {
		initialData.landArea = '';
	}

	// React.useEffect(() => {
	// 	if (isAuthenticated && resubmitForm) {
	// 		postProperty(

	// 		);
	// 	}
	// }, [isAuthenticated]);
	return (
		<Box width="100%">
			<Formik
				initialValues={initialData}
				validate={validateForm}
				enableReinitialize
				onSubmit={submitForm}
			>
				{({ values, setFieldValue, errors }) => (
					<Form>
						{/* <pre>{JSON.stringify(errors, null, 2)}</pre> */}
						<Box className={classes.rowWrapper2}>
							<Box className={classes.columnWrapper}>
								<span>Project Name</span>
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
								<span>Total Floors</span>
								<TextField
									name="noOfFloors"
									className={clsx(
										classes.input,
										classes.widthSM
									)}
								/>
							</Box>
							{pType === 'flat' && (
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
							)}
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
							{errors.numberOfBedRooms && (
								<Box align="center">
									<Typography
										className={gClasses.colorWarning}
										variant="caption"
									>
										{errors.numberOfBedRooms}
									</Typography>
								</Box>
							)}
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
								<span>Price</span>
								<Box display="flex" alignItems="center">
									<TextField
										name="salePrice"
										className={clsx(
											classes.input,
											classes.widthMD
										)}
									/>
								</Box>
								{values.salePrice && (
									<div>
										<Typography
											display="inline"
											className={clsx(
												gClasses.smText,
												gClasses.bold
											)}
										>
											{toHumanReadbleString(
												values.salePrice
											)}
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
						</Box>

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
						<Box mt="2rem" className={classes.contentWrapper}>
							<Typography
								variant="h5"
								gutterBottom
								align="center"
							>
								Property Ownership
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
											values.propertyOwnerShip ===
											'freehold'
										}
										onClick={() => {
											setFieldValue(
												'propertyOwnerShip',
												'freehold'
											);
										}}
									>
										Freehold
									</Select>
								</Box>
								<Box className={classes.selectChip}>
									<Select
										selected={
											values.propertyOwnerShip ===
											'leashed'
										}
										onClick={() => {
											setFieldValue(
												'propertyOwnerShip',
												'leashed'
											);
										}}
									>
										Leased
									</Select>
								</Box>
							</Box>
						</Box>
						<Box mt="2rem" className={classes.contentWrapper}>
							<Typography
								variant="h5"
								gutterBottom
								align="center"
							>
								Transaction Type
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
											values.transactionType ===
											'newbooking'
										}
										onClick={() => {
											setFieldValue(
												'transactionType',
												'newbooking'
											);
										}}
									>
										New booking
									</Select>
								</Box>
								<Box className={classes.selectChip}>
									<Select
										selected={
											values.transactionType === 'resale'
										}
										onClick={() => {
											setFieldValue(
												'transactionType',
												'resale'
											);
										}}
									>
										Resale
									</Select>
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
								Legal Clearance
							</Typography>
							<Grid container spacing={0}>
								<FieldArray name="legalClearance">
									{(arrayHelpers) => (
										<Grid container>
											{values.legalClearance.map(
												(c, i) => {
													return (
														<Grid item lg={3}>
															<CheckBox
																key={i}
																heading="test"
																name={`legalClearance.${i}.value`}
																formLabel={
																	c.label
																}
															/>
														</Grid>
													);
												}
											)}
										</Grid>
									)}
								</FieldArray>
							</Grid>
						</Box>
						{values.legalClearance.find(
							(c) => c.name === 'reraapproved'
						)['value'] && (
							<Box className={classes.rowWrapper2} mt="2rem">
								<Box className={classes.columnWrapper}>
									<span>Rera Id</span>
									<TextField
										name="reraapproveId"
										className={clsx(
											classes.input,
											classes.widthLG
										)}
									/>
								</Box>
							</Box>
						)}

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
	isAuthenticated: selectAuthenticated,
});

export default connect(null, mapDispatchToProps)(RentApartment);
