import { Box, Grid, Typography } from '@material-ui/core';
import { FieldArray, Form, Formik } from 'formik';

import CheckBox from '../../../../components/formik/checkbox.component';
import DropDown from '../../../../components/v2/dropdown/chipSelected.component';
import React from 'react';
import Select from '../../../../components/v2/chipSelect/chipSelected.component';
import TextArea from '../../../../components/formik/textArea.component';
import TextField from '../../../../components/formik/textFieldDefault.component';
import UploadPhoto from '../components/uploadPhoto';
import clsx from 'clsx';
import { toHumanReadble } from '../../../../utils/render.utils';
import useGlobalStyles from '../../../../common.style';
import useStyles from '../postPage.style';
import { validateNumber } from '../../../../utils/validation.utils';

// import AddIcon from '@material-ui/icons/Add';

// import ChipWrapper from '../../../../components/v2/chipWrapper/chipWrapper.component';












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
	constructionDone: true, //drop,
	boundaryWallMade: true, //drop
	gatedCommunity: true, //drop,
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

const RentApartment = ({ pType, onPost }) => {
	const classes = useStyles();
	const gClasses = useGlobalStyles();
	const [photos, setPhotos] = React.useState([]);

	const validateForm = (values) => {
		const error = {};
		if (!values.title) {
			error.title = 'Enter project name';
		}
		if (!validateNumber(values['length'])) {
			error['length'] = 'Please enter a number';
		}
		if (!validateNumber(values.width)) {
			error.width = 'Please enter a number';
		}
		if (!validateNumber(values.plotFrontage)) {
			error.plotFrontage = 'Please enter a number';
		}
		if (!validateNumber(values.plotArea)) {
			error.plotArea = 'Please enter a number';
		}
		if (!validateNumber(values.widthOfRoad)) {
			error.widthOfRoad = 'Please enter a number';
		}
		if (!validateNumber(values.govermentValuation)) {
			error.govermentValuation = 'Please enter a number';
		}

		if (!validateNumber(values.salePrice)) {
			error.salePrice = 'Please enter a number';
		}
		if (!values.description) {
			error.description = 'Please mention some description';
		}

		if (
			values.legalClearance.find((c) => c.name === 'numberOfOwner')[
				'value'
			] &&
			!values.ownerNumber
		) {
			error.ownerNumber = 'required';
		}

		if (values.plotArea < values.plotFrontage) {
			error.plotFrontage = 'Plot area cannot be less than plot frontage';
		}

		return error;
	};

	const submitForm = (values) => {
		onPost(values);
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
				onSubmit={submitForm}
			>
				{({ values, setFieldValue, errors }) => (
					<Form>
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
									<Typography>ft</Typography>
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
									<Typography>ft</Typography>
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
									<Typography>ft</Typography>
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
								</Box>
								{values.salePrice && (
									<div>
										<Typography
											display="inline"
											className={gClasses.smText}
										>
											{toHumanReadble(values.salePrice)}
										</Typography>
									</div>
								)}
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
								{values.govermentValuation && (
									<div>
										<Typography
											display="inline"
											className={gClasses.smText}
										>
											{toHumanReadble(
												values.govermentValuation
											)}
										</Typography>
									</div>
								)}
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
										value={
											values.constructionDone
												? 'Yes'
												: 'No'
										}
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
										value={
											values.boundaryWallMade
												? 'Yes'
												: 'No'
										}
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
										value={
											values.gatedCommunity ? 'Yes' : 'No'
										}
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
							/>
						</Box>
						<Box mt="3rem" className={gClasses.justifyCenter}>
							<button
								className={classes.postButton}
								type="submit"
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

export default RentApartment;
