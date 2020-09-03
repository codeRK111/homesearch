import React from 'react';
import { Formik, Form, FieldArray } from 'formik';
import RowTextField from '../../components/rowTextField/rowFormikTextField.component';
import RowSelect from '../../components/rowSelect/rowFormikSelect.component';
import Checkbox from '../../components/checkbox/checkbox.component';
import RowHOC from '../../components/rowCheckBox/rowCheckbox.component';
import FormHeader from '../../components/formHeader/formHeader.component';
import RowDatePicker from '../../components/rowDatePicker/rowDatePicker.component';
import { Box, Button, Grid } from '@material-ui/core';

const legalClerance = [
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

const furnishMenuItems = [
	{
		label: 'Furnished',
		value: 'furnished',
	},
	{
		label: 'Unfurnished',
		value: 'unfurnished',
	},
];
const ownershipMenuItems = [
	{
		label: 'Freehold',
		value: 'freehold',
	},
	{
		label: 'Leased',
		value: 'leashed',
	},
];

const availabilityMenuItems = [
	{
		label: 'Ready to Move',
		value: 'immediately',
	},
	{
		label: 'Specific date',
		value: 'specificdate',
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

const postedByMenuItems = [
	{
		label: 'Owner',
		value: 'owner',
	},
	{
		label: 'Broker',
		value: 'broker',
	},
];

const transactionTypeMenuItems = [
	{
		label: 'New booking',
		value: 'newBooking',
	},
	{
		label: 'New Sale',
		value: 'newSale',
	},
];

const validate = (state) => {
	const errors = {};
	if (!state.title) {
		errors.title = 'Title required';
	}
	if (!state.description) {
		errors.description = 'Description required';
	}
	if (!state.superBuildUpArea) {
		errors.superBuildUpArea = 'Super build up area required';
	}
	if (!state.carpetArea) {
		errors.carpetArea = 'Carpet area required';
	}
	if (!state.numberOfFloors) {
		errors.numberOfFloors = 'Number of floors required';
	}
	if (!state.propertyOnFloor) {
		errors.propertyOnFloor = 'Property on floor required';
	}
	if (!state.numberOfFloors) {
		errors.numberOfFloors = 'Number of floors required';
	}
	if (!state.toiletIndian) {
		errors.toiletIndian = ' required';
	}
	if (!state.toiletWestern) {
		errors.toiletWestern = ' required';
	}
	if (!state.salePrice) {
		errors.salePrice = ' required';
	}
	if (!state.distanceSchool) {
		errors.distanceSchool = ' required';
	}
	if (!state.distanceRailwayStation) {
		errors.distanceRailwayStation = ' required';
	}
	if (!state.distanceAirport) {
		errors.distanceAirport = ' required';
	}
	if (!state.distanceBusStop) {
		errors.distanceBusStop = ' required';
	}
	if (!state.distanceHospital) {
		errors.distanceHospital = ' required';
	}
	if (state.legalClerance.find((c) => c.name === 'reraapproved')['value']) {
		errors.reraapproveId = 'required';
	}

	return errors;
};

const PropertySale = ({ furnishes, amenities, onSubmit }) => {
	const [initialValues, setInitialValues] = React.useState({
		title: '',
		description: '',
		salePrice: null,
		legalClerance,
		superBuildUpArea: null,
		carpetArea: null,
		numberOfFloors: null,
		propertyOnFloor: null,
		toiletIndian: null,
		toiletWestern: null,
		furnishing: 'unfurnished',
		furnishes: [],
		amenities: [],
		propertyOwnerShip: 'freehold',
		propertyAvailability: 'immediately',
		availableDate: Date.now(),
		verified: true,
		postedBy: 'owner',
		transactionType: 'newBooking',
		reraapproveId: null,
		distanceSchool: '',
		distanceRailwayStation: '',
		distanceAirport: '',
		distanceBusStop: '',
		distanceHospital: '',
	});
	const [file, setFile] = React.useState([]);

	const handleFileChange = (event) => {
		const b = event.target;
		setFile((prevState) => [...prevState, b.files[0]]);
	};

	const imageInput = (number) => {
		const images = [];
		for (let index = 0; index < number; index++) {
			images.push(
				<Box m="0.3rem" key={index}>
					<input
						type="file"
						name=""
						id=""
						onChange={handleFileChange}
					/>
				</Box>
			);
		}
		return images;
	};

	React.useEffect(() => {
		setInitialValues((prevState) => ({
			...prevState,
			amenities: amenities.map((c) => ({ ...c, value: false })),
		}));
	}, [amenities]);
	React.useEffect(() => {
		setInitialValues((prevState) => ({
			...prevState,
			furnishes: furnishes.map((c) => ({ ...c, value: false })),
		}));
	}, [furnishes]);

	console.log(initialValues);
	return (
		<Formik
			validate={validate}
			enableReinitialize={true}
			validateOnChange={false}
			validateOnBlur={false}
			initialValues={initialValues}
			onSubmit={(data, { setSubmitting, va }) => {
				setSubmitting(true);
				console.log(data);
				onSubmit();
				setSubmitting(false);
			}}
		>
			{({
				values,
				handleSubmit,
				isSubmitting,
				errors,
				setFieldValue,
				isValid,
				isValidating,
			}) => (
				<Form>
					{/* <div>{JSON.stringify(values.amenities, null, '\t')}</div>
					<div>{JSON.stringify(errors, null, '\t')}</div> */}
					<FormHeader text="Property Info" />
					<RowTextField
						heading="Title"
						name="title"
						label="Enter title"
					/>
					<RowTextField
						heading="Description"
						name="description"
						label="Enter Description"
						multiline={true}
						rows={6}
					/>
					<RowTextField
						heading="Super build up area"
						name="superBuildUpArea"
						type="number"
						label="in sqFt"
					/>
					<RowTextField
						heading="Carpet area"
						name="carpetArea"
						type="number"
						label="in sqFt"
					/>
					<RowTextField
						heading="Number of floors"
						name="numberOfFloors"
						type="number"
						label="Enter number"
					/>
					<RowTextField
						heading="Property on floor"
						name="propertyOnFloor"
						type="number"
						label="Enter number"
					/>

					<RowTextField
						heading="Number of indian toilet"
						name="toiletIndian"
						type="number"
						label="Enter number"
					/>
					<RowTextField
						heading="Number of western toilet"
						name="toiletWestern"
						type="number"
						label="Enter number"
					/>

					<RowSelect
						heading="Property ownership"
						name="propertyOwnerShip"
						type="number"
						label="Choose"
						menuItems={ownershipMenuItems}
					/>
					<RowSelect
						heading="Property Availability"
						name="propertyAvailability"
						type="number"
						label="Choose"
						menuItems={availabilityMenuItems}
					/>

					{values.propertyAvailability === 'specificdate' && (
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

					<RowSelect
						heading="Verified"
						name="verified"
						type="number"
						label="Choose"
						menuItems={verifiedMenuItems}
					/>
					<RowSelect
						heading="Posted by"
						name="postedBy"
						type="number"
						label="Choose"
						menuItems={postedByMenuItems}
					/>
					<RowSelect
						heading="Transaction type"
						name="transactionType"
						type="number"
						label="Choose"
						menuItems={transactionTypeMenuItems}
					/>
					<RowTextField
						heading="Sale price"
						name="salePrice"
						type="number"
						label="Enter sale price"
					/>
					<FormHeader text="Furnishes And Amenities" />
					<RowSelect
						heading="Furnishing"
						name="furnishing"
						type="number"
						label="Choose"
						menuItems={furnishMenuItems}
					/>
					{values.furnishing !== 'unfurnished' && (
						<RowHOC heading="Furnishes">
							<FieldArray name="legalClerance">
								{(arrayHelpers) => (
									<Grid container>
										{values.furnishes.map((c, i) => {
											return (
												<Grid item lg={6}>
													<Checkbox
														key={i}
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
					<RowHOC heading="Amenities">
						<FieldArray name="legalClerance">
							{(arrayHelpers) => (
								<Grid container>
									{values.amenities.map((c, i) => {
										return (
											<Grid item lg={6}>
												<Checkbox
													key={i}
													heading="test"
													name={`amenities.${i}.value`}
													label={c.name}
												/>
											</Grid>
										);
									})}
								</Grid>
							)}
						</FieldArray>
					</RowHOC>
					<FormHeader text="Legal Clearance" />

					<RowHOC heading="Legal clearance">
						<FieldArray name="legalClerance">
							{(arrayHelpers) => (
								<Grid container>
									{values.legalClerance.map((c, i) => {
										return (
											<Grid item lg={6}>
												<Checkbox
													key={i}
													heading="test"
													name={`legalClerance.${i}.value`}
													label={c.label}
												/>
											</Grid>
										);
									})}
								</Grid>
							)}
						</FieldArray>
					</RowHOC>
					{values.legalClerance.find(
						(c) => c.name === 'reraapproved'
					)['value'] && (
						<RowTextField
							heading="RERA approve Id"
							name="reraapproveId"
							label="Enter ID"
						/>
					)}

					<FormHeader text="Nearby Places" />
					<RowTextField
						heading="Distance from school"
						name="distanceSchool"
						type="number"
						label="In KM"
					/>
					<RowTextField
						heading="Distance from railway station"
						name="distanceRailwayStation"
						type="number"
						label="In KM"
					/>
					<RowTextField
						heading="Distance from airport"
						name="distanceAirport"
						type="number"
						label="In KM"
					/>
					<RowTextField
						heading="Distance from bus stop"
						name="distanceBusStop"
						type="number"
						label="In KM"
					/>
					<RowTextField
						heading="Distance from hospital"
						name="distanceHospital"
						type="number"
						label="In KM"
					/>
					<Box p="0.8rem">
						<Grid container>
							<Grid item xs={12} md={12} lg={4}>
								Image
							</Grid>
							<Grid item xs={12} md={12} lg={8}>
								{imageInput(3)}
							</Grid>
						</Grid>
					</Box>
					<Box>
						<Button
							type="submit"
							color="primary"
							variant="contained"
							classes={{
								label: 'tranform-none',
							}}
						>
							Add Property
						</Button>
					</Box>
				</Form>
			)}
		</Formik>
	);
};

export default PropertySale;
