import React from 'react';
import { Box, Paper, Button, Grid, Divider } from '@material-ui/core';
import RowTextField from '../rowTextField/rowFormikTextField.component';
import RowSelect from '../rowSelect/rowFormikSelect.component';
import RowHOC from '../rowCheckBox/rowCheckbox.component';
import { Formik, Form, FieldArray } from 'formik';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectFurnishes } from '../../redux/property/property.selector';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import FormHeader from '../formHeader/formHeader.component';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const facingMenuItems = [
	{
		label: 'East',
		value: 'east',
	},
	{
		label: 'West',
		value: 'west',
	},
	{
		label: 'North',
		value: 'north',
	},
	{
		label: 'South',
		value: 'south',
	},
];

const verifiedMenuItems = [
	{
		label: 'Yes',
		value: true,
	},
	{
		label: 'No',
		value: false,
	},
];

const constructionDoneMenuItems = [
	{
		label: 'Yes',
		value: true,
	},
	{
		label: 'No',
		value: false,
	},
];

const boundaryWallMadeMenuItems = [
	{
		label: 'Yes',
		value: true,
	},
	{
		label: 'No',
		value: false,
	},
];

const gatedCommunityMadeMenuItems = [
	{
		label: 'Yes',
		value: true,
	},
	{
		label: 'No',
		value: false,
	},
];
const landUsingZoningMenuItems = [
	{
		label: 'Yellow Zone',
		value: 'yellow',
	},
];

const transactionTypeMenuItems = [
	{
		label: 'New booking',
		value: 'newbooking',
	},
	{
		label: 'Resale',
		value: 'resale',
	},
];

const initialState = {
	title: '',
	description: '',
	numberOfUnits: '',
	length: '',
	width: '',
	plotFrontage: '',
	plotArea: [0],
	widthOfRoad: '',
	facing: 'east', //dropdown,
	constructionDone: false, //drop,
	boundaryWallMade: false, //drop
	gatedCommunity: false, //drop,
	landUsingZoning: 'yellow', //drop
	govermentValuation: '',
	pricePerSqFtMin: '',
	pricePerSqFtMax: '',
	minPrice: '',
	maxPrice: '',
	carParking: 'open',
	verified: true,
	transactionType: 'newbooking',
	furnishes: [],
};

const basicValidation = (error, values, ...excludeField) => {
	console.log(excludeField);
	let clone = { ...values };
	excludeField.forEach((c) => {
		if (clone[c] !== null || clone[c] !== undefined) {
			delete clone[c];
		}
	});
	console.log(clone);
	for (const key in clone) {
		if (
			clone[key] === '' ||
			clone[key] === 0 ||
			clone[key] === null ||
			clone[key] === undefined
		) {
			error[key] = `${key} required`;
		}
	}
};

const validate = (values) => {
	const error = {};

	basicValidation(
		error,
		values,
		'image1',
		'image2',
		'image3',
		'image4',
		'image5',
		'image6',
		'furnishes',
		'numberOfBedrooms',
		'numberOflivingAreas',
		'pricePerSqFtMin',
		'pricePerSqFtMax'
	);

	if (values.superBuiltupArea < values.carpetArea) {
		console.log('dsfsdfsdfsd');
		let msg = error.carpetArea
			? `${error.carpetArea} | carpet area < super builtup area`
			: 'carpet area < super builtup area';
		error['carpetArea'] = msg;
	}

	if (!values.plotArea.find((c) => c > 0)) {
		error.plotArea = 'Atleast one plot area required';
	}

	return error;
};

const Land = ({ bhk, furnishes, setProject }) => {
	const onSubmit = (values) => {
		const clone = { ...values };
		clone.plotArea = values.plotArea.filter((c) => c);
		const obj = {
			land: clone,
		};

		console.log(obj);
		setProject(obj);
	};

	const imageCreater = (arr, setFieldValue, values) => {
		return arr.map((c) => (
			<Grid item xs={12} md={3} lg={2} key={c}>
				<Box
					display="flex"
					flexDirection="column"
					justifyContent="center"
					alignItems="center"
				>
					{/* <p>{values[`image${c}`]}</p> */}
					<div className="image-wrapper">
						<img
							src={
								!values[`image${c}`]
									? require('../../assets/no-image.jpg')
									: URL.createObjectURL(values[`image${c}`])
							}
							alt=""
							srcset=""
							className="image"
						/>
					</div>
					<input
						accept="image/*"
						className="input"
						id={`contained-button-file-${c}`}
						multiple
						type="file"
						onChange={(event) => {
							setFieldValue(
								`image${c}`,
								event.currentTarget.files[0]
							);
						}}
					/>
					<label htmlFor={`contained-button-file-${c}`}>
						<Button
							variant="contained"
							color="default"
							component="span"
							startIcon={<CloudUploadIcon />}
							size="small"
							fullWidth
						>
							Upload
						</Button>
					</label>
				</Box>
			</Grid>
		));
	};

	return (
		<Paper>
			<Formik
				enableReinitialize={true}
				initialValues={{
					...initialState,
				}}
				validate={validate}
				onSubmit={onSubmit}
			>
				{({ values, handleChange, setFieldValue, errors }) => (
					<Form>
						{/* <p>{JSON.stringify(errors)}</p> */}
						<RowTextField
							heading="Title"
							name="title"
							type="text"
							label="Enter title"
						/>
						<RowTextField
							heading="Description"
							name="description"
							type="text"
							label="Enter description"
							multiline={true}
							rows={5}
						/>
						<RowTextField
							heading="Number of units"
							name="numberOfUnits"
							type="number"
							label="Enter number"
						/>
						<RowTextField
							heading="Length"
							name="length"
							type="number"
							label="SqFt"
						/>
						<RowTextField
							heading="Width"
							name="width"
							type="number"
							label="SqFt"
						/>
						<RowTextField
							heading="Plot frontage"
							name="plotFrontage"
							type="number"
							label="SqFt"
						/>

						<FormHeader text="Area" />
						<RowHOC heading="Plot area" center>
							<FieldArray
								name="plotArea"
								render={(arrayHelpers) => (
									<Box>
										{errors.plotArea && (
											<p className="color-red">
												{errors.plotArea}
											</p>
										)}
										{values.plotArea.map((c, i) => (
											<Box display="flex">
												<RowTextField
													key={i}
													heading={`Area ${i + 1}`}
													name={`plotArea.${i}`}
													type="number"
													label="SqFt"
												/>
												<IconButton
													aria-label="delete"
													onClick={() =>
														arrayHelpers.remove(i)
													}
												>
													<DeleteIcon
														fontSize="small"
														color="secondary"
													/>
												</IconButton>
											</Box>
										))}
										<Box mb="1rem" mt="0.5rem">
											<Divider />
										</Box>
										<Box
											display="flex"
											justifyContent="flex-end"
										>
											<Button
												variant="outlined"
												color="primary"
												classes={{
													label: 'transform-none',
												}}
												onClick={() =>
													arrayHelpers.push(0)
												}
												fullWidth
											>
												Add more area
											</Button>
										</Box>
									</Box>
								)}
							/>
						</RowHOC>
						<RowTextField
							heading="Width of road"
							name="widthOfRoad"
							// type="number"
							label="SqFt"
							onChange={(event) => {
								if (isFinite(event.target.value)) {
									// UPDATE YOUR STATE (i am using formik)
									setFieldValue(
										'widthOfRoad',
										event.target.value
									);
								}
							}}
						/>

						<RowSelect
							heading="Facing"
							name="facing"
							label="Choose"
							menuItems={facingMenuItems}
						/>
						<RowSelect
							heading="Is construction done"
							name="constructionDone"
							label="Choose"
							menuItems={constructionDoneMenuItems}
						/>
						<RowSelect
							heading="Is boundary wall made"
							name="boundaryWallMade"
							label="Choose"
							menuItems={boundaryWallMadeMenuItems}
						/>
						<RowSelect
							heading="Is in a gated community"
							name="gatedCommunity"
							label="Choose"
							menuItems={gatedCommunityMadeMenuItems}
						/>
						<RowSelect
							heading="Land use zoning"
							name="landUsingZoning"
							label="Choose"
							menuItems={landUsingZoningMenuItems}
						/>
						<RowSelect
							heading="Verified"
							name="verified"
							type="number"
							label="Choose"
							menuItems={verifiedMenuItems}
						/>
						<RowSelect
							heading="Transaction type"
							name="transactionType"
							type="number"
							label="Choose"
							menuItems={transactionTypeMenuItems}
						/>
						<FormHeader text="Price" />
						<RowTextField
							heading="Government Valuation"
							name="govermentValuation"
							type="number"
							label="Enter price"
						/>
						<RowTextField
							heading="Minimum price"
							name="minPrice"
							type="number"
							label="Enter price"
						/>
						<RowTextField
							heading="Maximum price"
							name="maxPrice"
							type="number"
							label="Enter price"
						/>

						{/* {values.plotArea && values.minPrice && values.maxPrice && (
							<Box>
								<RowTextField
									heading="Price per sqFt (Min)"
									name="pricePerSqFtMin"
									onChange={handleChange}
									type="number"
									value={(
										values.minPrice / values.plotArea
									).toFixed(2)}
									label="Price per SqFt"
									disabled={true}
								/>
								<RowTextField
									heading="Price per sqFt(Max)"
									name="pricePerSqFtMax"
									onChange={handleChange}
									type="number"
									value={(
										values.maxPrice / values.plotArea
									).toFixed(2)}
									label="Price per SqFt"
									disabled={true}
								/>
							</Box>
						)} */}
						{/* <Box
							p="1rem"
							display="flex"
							justifyContent="space-between"
						>
							<Grid container spacing={2}>
								{imageCreater(
									Array.of(1, 2, 3, 4, 5, 6),
									setFieldValue,
									values
								)}
							</Grid>
						</Box> */}
						<Box p="1rem" display="flex" justifyContent="flex-end">
							<Button
								type="submit"
								variant="contained"
								color="primary"
								classes={{
									label: 'transform-none',
								}}
							>
								Save
							</Button>
						</Box>
					</Form>
				)}
			</Formik>
		</Paper>
	);
};

Land.propTypes = {
	furnishes: PropTypes.array,
	setProject: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
	furnishes: selectFurnishes,
});

export default connect(mapStateToProps)(Land);
