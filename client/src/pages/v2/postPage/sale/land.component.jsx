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
import useGlobalStyles from '../../../../common.style';
import useStyles from '../postPage.style';

const legalClearance = [
	{
		name: 'numberOfOwner',
		value: false,
		label: 'Number of owner',
	},
	{
		name: 'withinBlockArea',
		value: false,
		label: 'Within Block Area',
	},
	{
		name: 'approvedByDevelopmentAutority',
		value: false,
		label: 'Approved by Development Authority',
	},
	{
		name: 'withinAreaOfDevelopmentAuthrity',
		value: false,
		label: 'Within Area of Development Authority',
	},
];

const initialValues = {
	for: 'sale',
	title: '',
	description: '',
	length: '',
	width: '',
	plotFrontage: '',
	plotArea: '',
	widthOfRoad: '',
	facing: 'east', //dropdown,
	constructionDone: false, //drop,
	boundaryWallMade: false, //drop
	gatedCommunity: false, //drop,
	landUsingZoning: 'yellow', //drop
	govermentValuation: '',
	salePrice: '',
	pricePerSqFt: '',
	ownerNumber: '',
	verified: true,
	transactionType: 'newbooking',
	distanceSchool: 1,
	distanceRailwayStation: 1,
	distanceAirport: 1,
	distanceBusStop: 1,
	distanceHospital: 1,
	city: '',
	location: '',
	legalClearance,
};

const RentApartment = ({ pType }) => {
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
						</Box>

						{/* Price and area */}
						<Box className={classes.rowWrapper2} mt="2rem">
							<Box className={classes.columnWrapper2}>
								<span>Plot Area</span>
								<Box display="flex" alignItems="center">
									<TextField
										name="plotArea"
										className={clsx(
											classes.input,
											classes.widthSM
										)}
									/>
									<Typography>Sq.ft</Typography>
								</Box>
							</Box>

							<Box className={classes.columnWrapper2}>
								<span>Plot Frontage</span>
								<Box display="flex" alignItems="center">
									<TextField
										name="plotFrontage"
										className={clsx(
											classes.input,
											classes.widthSM
										)}
									/>
									<Typography>Sq.ft</Typography>
								</Box>
							</Box>
							<Box className={classes.columnWrapper2}>
								<span>Length</span>
								<Box display="flex" alignItems="center">
									<TextField
										name="length"
										className={clsx(
											classes.input,
											classes.widthSM
										)}
									/>
									<Typography>Sq.ft</Typography>
								</Box>
							</Box>
							<Box className={classes.columnWrapper2}>
								<span>Width</span>
								<Box display="flex" alignItems="center">
									<TextField
										name="width"
										className={clsx(
											classes.input,
											classes.widthSM
										)}
									/>
									<Typography>Sq.ft</Typography>
								</Box>
							</Box>
							<Box className={classes.columnWrapper2}>
								<span>Width Of Road</span>
								<Box display="flex" alignItems="center">
									<TextField
										name="widthOfRoad"
										className={clsx(
											classes.input,
											classes.widthSM
										)}
									/>
									<Typography>Sq.ft</Typography>
								</Box>
							</Box>
						</Box>
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
								<span>Goverment Valuation</span>
								<Box display="flex" alignItems="center">
									<TextField
										name="govermentValuation"
										className={clsx(
											classes.input,
											classes.widthMD
										)}
									/>
								</Box>
							</Box>
						</Box>
						<Box mt="2rem">
							<Box className={classes.rowWrapper2}>
								<Box className={classes.columnWrapper}>
									<span>Facing</span>
									<DropDown
										options={[
											{ value: 'east', label: 'East' },
											{ value: 'west', label: 'West' },
											{ value: 'north', label: 'Nort' },
											{ value: 'south', label: 'South' },
										]}
										onSet={(val) => {
											setFieldValue('facing', val);
										}}
										value={values.facing}
									/>
								</Box>
								<Box className={classes.columnWrapper}>
									<span>Construction Done </span>
									<DropDown
										options={[
											{ value: true, label: 'Yes' },
											{ value: false, label: 'No' },
										]}
										onSet={(val) => {
											setFieldValue(
												'constructionDone',
												val
											);
										}}
										value={values.constructionDone}
										placeholder="0"
									/>
								</Box>
								<Box className={classes.columnWrapper}>
									<span>Boundary Wall Made </span>
									<DropDown
										options={[
											{ value: true, label: 'Yes' },
											{ value: false, label: 'No' },
										]}
										onSet={(val) => {
											setFieldValue(
												'boundaryWallMade',
												val
											);
										}}
										value={values.boundaryWallMade}
										placeholder="0"
									/>
								</Box>
								<Box className={classes.columnWrapper}>
									<span>Gated Community </span>
									<DropDown
										options={[
											{ value: true, label: 'Yes' },
											{ value: false, label: 'No' },
										]}
										onSet={(val) => {
											setFieldValue(
												'gatedCommunity',
												val
											);
										}}
										value={values.gatedCommunity}
										placeholder="0"
									/>
								</Box>
								<Box className={classes.columnWrapper}>
									<span>Land Using Zoning</span>
									<DropDown
										options={[
											{ value: 'east', label: 'Yellow' },
										]}
										onSet={(val) => {
											setFieldValue(
												'landUsingZoning',
												val
											);
										}}
										value={values.landUsingZoning}
									/>
								</Box>
							</Box>
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
							(c) => c.name === 'numberOfOwner'
						)['value'] && (
							<Box className={classes.rowWrapper2} mt="2rem">
								<Box className={classes.columnWrapper}>
									<span>Owner Number</span>
									<TextField
										name="ownerNumber"
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
