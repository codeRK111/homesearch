import './oneBHK.style.scss';

import {
	Box,
	Button,
	FormControl,
	FormControlLabel,
	Grid,
	Paper,
	Radio,
	RadioGroup
} from '@material-ui/core';
import { FieldArray, Form, Formik } from 'formik';

import Checkbox from '../checkbox/checkbox.component';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import FormHeader from '../formHeader/formHeader.component';
import PropTypes from 'prop-types';
import React from 'react';
import RowDatePicker from '../rowDatePicker/rowDatePicker.component';
import RowHOC from '../rowCheckBox/rowCheckbox.component';
import RowSelect from '../rowSelect/rowFormikSelect.component';
import RowTextField from '../rowTextField/rowFormikTextField.component';
import SelectSpeciality from '../selectSpeciality';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectFurnishes } from '../../redux/property/property.selector';

const furnishMenuItems = [
	{
		label: 'Furnished',
		value: 'furnished',
	},
	{
		label: 'Unfurnished',
		value: 'unfurnished',
	},
	{
		label: 'Semifurnished',
		value: 'semifurnished',
	},
];

const availabilityMenuItems = [
	{
		label: 'Ready to move',
		value: 'immediately',
	},
	{
		label: 'Available from',
		value: 'specificdate',
	},
];

const initialState = {
	title: '',
	description: '',
	numberOfUnits: '',
	superBuiltupArea: '',
	carpetArea: '',
	indianToilet: '',
	westernToilet: '',
	furnished: 'unfurnished',
	availability: 'immediately',
	availableDate: Date.now(),
	priceOver: 'superBuiltUpArea',
	pricePerSqFtMin: '',
	pricePerSqFtMax: '',
	minPrice: '',
	maxPrice: '',
	bookingAmount: 0,
	numberOfBedrooms: 0,
	numberOflivingAreas: 0,
	furnishes: [],
	speciality: null,
	tower: '',
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
		if (!clone[key]) {
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

	return error;
};

const OneBHK = ({ bhk, furnishes, setProject }) => {
	const onSubmit = (values) => {
		const clone = { ...values };
		if (clone.availability === 'immediately') {
			delete clone['availableDate'];
		}
		const obj = {
			[`bhk${bhk}`]: clone,
		};
		obj[`bhk${bhk}`]['toiletTypes'] = [
			{
				toiletType: 'indian',
				numbers: clone.indianToilet,
			},
			{
				toiletType: 'western',
				numbers: clone.westernToilet,
			},
		];
		if (clone.furnished !== 'unfurnished') {
			obj[`bhk${bhk}`]['furnishes'] = clone.furnishes
				.filter((c) => c.value)
				.map((b) => b.id);
		} else {
			delete obj[`bhk${bhk}`]['furnishes'];
		}

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
					numberOfBedrooms: bhk,
					furnishes: furnishes.map((c) => ({ ...c, value: false })),
				}}
				validate={validate}
				onSubmit={onSubmit}
			>
				{({ values, handleChange, setFieldValue, error }) => (
					<Form>
						<p>{JSON.stringify(error)}</p>
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
							heading="Number of bedrooms"
							name="numberOfBedrooms"
							type="number"
							disabled={true}
						/>
						<RowTextField
							heading="Number of living areas"
							name="numberOflivingAreas"
							type="number"
						/>
						<RowTextField
							heading="Salable area"
							name="superBuiltupArea"
							type="number"
							label="Enter number"
						/>
						<RowTextField
							heading="Carpet Area"
							name="carpetArea"
							type="number"
							label="Enter number"
						/>
						<RowTextField
							heading="Number of indian toilet"
							name="indianToilet"
							type="number"
							label="Enter number"
						/>
						<RowTextField
							heading="Number of western toilet"
							name="westernToilet"
							type="number"
							label="Enter number"
						/>
						<RowTextField
							heading="Tower Name"
							name="tower"
							type="text"
							label="Enter Towen Name"
						/>
						<SelectSpeciality
							speciality={values.speciality}
							setSpeciality={(c) => {
								setFieldValue('speciality', c);
							}}
						/>
						<RowSelect
							heading="Furnished"
							name="furnished"
							label="Choose"
							menuItems={furnishMenuItems}
						/>
						{values.furnished !== 'unfurnished' && (
							<RowHOC heading="Furnishes">
								<FieldArray name="legalClearance">
									{(arrayHelpers) => (
										<Grid container>
											{values.furnishes.map((c, i) => {
												return (
													<Grid item lg={6}>
														<Checkbox
															key={i}
															color="primary"
															heading="test"
															name={`furnishes.${i}.value`}
															label={c.name}
														/>
													</Grid>
												);
											})}
										</Grid>
									)}
								</FieldArray>
							</RowHOC>
						)}
						<RowSelect
							heading="Property availability"
							name="availability"
							label="Choose"
							menuItems={availabilityMenuItems}
						/>
						{values.availability === 'specificdate' && (
							<RowDatePicker
								heading="Select date"
								name="availableDate"
								label="Choose Date"
								value={values.availableDate}
								onChange={(value) =>
									setFieldValue('availableDate', value)
								}
							/>
						)}
						<FormHeader text="Price" />
						<RowTextField
							heading="Booking amount"
							name="bookingAmount"
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
						<RowHOC heading="Price over">
							<FormControl component="fieldset">
								<RadioGroup
									aria-label="priceOver"
									name="priceOver"
									value={values.priceOver}
									onChange={handleChange}
								>
									<Box display="flex">
										<FormControlLabel
											value="superBuiltUpArea"
											control={<Radio />}
											label="Super builtup area"
										/>
										<FormControlLabel
											value="carpetArea"
											control={<Radio />}
											label="Carpet area"
										/>
									</Box>
								</RadioGroup>
							</FormControl>
						</RowHOC>
						{values.superBuiltupArea &&
							values.minPrice &&
							values.maxPrice && (
								<Box>
									<RowTextField
										heading="Price per sqFt (Min)"
										name="pricePerSqFtMin"
										onChange={handleChange}
										type="number"
										value={(
											values.minPrice /
											(values.priceOver ===
											'superBuiltUpArea'
												? values.superBuiltupArea
												: values.carpetArea)
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
											values.maxPrice /
											(values.priceOver ===
											'superBuiltUpArea'
												? values.superBuiltupArea
												: values.carpetArea)
										).toFixed(2)}
										label="Price per SqFt"
										disabled={true}
									/>
								</Box>
							)}

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

OneBHK.propTypes = {
	bhk: PropTypes.number.isRequired,
	furnishes: PropTypes.array,
	setProject: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
	furnishes: selectFurnishes,
});

export default connect(mapStateToProps)(OneBHK);
