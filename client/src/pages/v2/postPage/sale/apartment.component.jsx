import { Box, Grid, IconButton, Typography } from '@material-ui/core';
import { FieldArray, Form, Formik } from 'formik';
import {
	validateLength,
	validateNumber,
} from '../../../../utils/validation.utils';

import AddIcon from '@material-ui/icons/Add';
import CheckBox from '../../../../components/formik/checkbox.component';
import ChipWrapper from '../../../../components/v2/chipWrapper/chipWrapper.component';
import DropDown from '../../../../components/v2/dropdown/chipSelected.component';
import Picker from '../../../../components/formik/datePickerCustom.component';
import React from 'react';
import Select from '../../../../components/v2/chipSelect/chipSelected.component';
import TextArea from '../../../../components/formik/textArea.component';
import TextField from '../../../../components/formik/textFieldDefault.component';
import TodayIcon from '@material-ui/icons/Today';
import clsx from 'clsx';
import { renderByPropertyFor } from '../../../../utils/render.utils';
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
	for: 'rent',
	numberOfBedRooms: 0,
	numberOfBalconies: 1,
	noOfFloors: 1,
	typeOfToilets: '',
	toiletIndian: 1,
	toiletWestern: 1,
	superBuiltupArea: '',
	carpetArea: '',
	salePrice: '',
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
	description: '',
	city: '',
	location: '',
	carParking: 'open',
	title: '',
	propertyOwnerShip: '',
	salePriceOver: '',
	legalClearance: legalClearance,
	reraapproveId: '',
	pricePerSqFt: '',
	transactionType: '',
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

		return error;
	};

	const renderPropertyOnFoor = (totalFloors) => {
		const numbers = [
			{
				value: 'Ground Fooor',
				label: 'Ground Fooor',
			},
		];
		for (let index = 1; index < totalFloors; index++) {
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
	return (
		<Box width="100%">
			<Formik
				initialValues={{
					...initialValues,
					floor: pType === 'flat' ? 'Ground Floor' : '',
				}}
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
								<span>Price</span>
								<Box display="flex" alignItems="center">
									<TextField
										name="salePrice"
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
										Leashed
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
						<Box className={classes.rowWrapper2} mt="3rem">
							<Box className={classes.columnWrapper2}>
								<Box mb="1rem">
									<ChipWrapper onClick={addMore}>
										<Box className={classes.contentWrapper}>
											<AddIcon />
											<Typography variant="body2">
												Add Photos
											</Typography>
										</Box>
									</ChipWrapper>
								</Box>
								<Typography variant="caption" align="center">
									Photos 0/15 increase your chances of getting
									genuine leads by adding at least 5 photos of
									Hall, Bedrooms, Kitchen & bathrooms.
								</Typography>
							</Box>
						</Box>
						<Box mt="2rem">
							<Grid container spacing={3}>
								{photos.map((c, i) => (
									<Grid key={c.id} item xs={6} lg={3}>
										<Box className={classes.imageWrapper}>
											<img
												src={
													c.image
														? URL.createObjectURL(
																c.image
														  )
														: require('../../../../assets/no-image.jpg')
												}
												alt="project"
												srcset=""
												className={classes.image}
											/>
										</Box>
										<input
											type="file"
											onChange={handleImage(c)}
											id={`image-${c.id}`}
											className={classes.uploadButton}
										/>
										{c.image ? (
											<Grid container>
												<Grid item xs={6}>
													<label
														htmlFor={`image-${c.id}`}
														className={
															classes.label
														}
													>
														Upload
													</label>
												</Grid>
												<Grid item xs={6}>
													<label
														className={
															classes.remove
														}
														onClick={() =>
															removePhoto(c.id)
														}
													>
														Remove
													</label>
												</Grid>
											</Grid>
										) : (
											<Grid container>
												<Grid item xs={12}>
													<label
														htmlFor={`image-${c.id}`}
														className={
															classes.label
														}
													>
														Upload
													</label>
												</Grid>
											</Grid>
										)}
									</Grid>
								))}
							</Grid>
						</Box>
					</Form>
				)}
			</Formik>
		</Box>
	);
};

export default RentApartment;
