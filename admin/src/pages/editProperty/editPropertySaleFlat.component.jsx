import React from 'react';
import { Formik, Form, FieldArray } from 'formik';
import RowTextField from '../../components/rowTextField/rowFormikTextField.component';
import RowSelect from '../../components/rowSelect/rowFormikSelect.component';
import Checkbox from '../../components/checkbox/checkbox.component';
import RowHOC from '../../components/rowCheckBox/rowCheckbox.component';
import FormHeader from '../../components/formHeader/formHeader.component';
import RowDatePicker from '../../components/rowDatePicker/rowDatePicker.component';
import {
	Box,
	Button,
	Grid,
	Radio,
	RadioGroup,
	FormControlLabel,
	FormControl,
} from '@material-ui/core';

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
		label: 'Procession From',
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

const carParkingMenuItems = [
	{
		label: 'Open',
		value: 'open',
	},
	{
		label: 'Covered',
		value: 'covered',
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
	if (state.carpetArea > state.superBuildUpArea) {
		errors.carpetArea =
			'Carpet area cannot be greater than super build up area';
	}
	if (!state.numberOfFloors) {
		errors.numberOfFloors = 'Number of floors required';
	}
	if (!state.floor) {
		errors.floor = 'Property on floor required';
	}
	if (!state.numberOfFloors) {
		errors.numberOfFloors = 'Number of floors required';
	}
	if (!state.numberOfBedRooms) {
		errors.numberOfBedRooms = 'required';
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
	if (
		state.legalClearance.find((c) => c.name === 'reraapproved')['value'] &&
		!state.reraapproveId
	) {
		errors.reraapproveId = 'required';
	}

	return errors;
};

const filter = (a) => {
	let state = { ...a };
	if (state.furnished === 'unfurnished') {
		delete state['furnishes'];
	} else {
		state['furnishes'] = state.furnishes
			.filter((c) => c.value === true)
			.map((c) => c.id);
	}

	state.amenities = state.amenities
		.filter((c) => c.value === true)
		.map((c) => c.id);
	if (state.availability !== 'specificdate') {
		delete state['availableDate'];
	}

	if (state.reraapproveId) {
		state.legalClearance = state.legalClearance.map((c) => {
			if (c.name === 'reraapproved') {
				c.details = state.reraapproveId;
			}
			return c;
		});
	}

	if (!state.legalClearance.find((c) => c.name === 'reraapproved')['value']) {
		state.legalClearance = state.legalClearance.map((c) => {
			if (c.name === 'reraapproved') {
				c.details = null;
			}
			return c;
		});
	}

	return state;
};

const PropertySale = ({ state, furnishes, amenities, onSubmit }) => {
	const [initialValues, setInitialValues] = React.useState({
		title: '',
		description: '',
		salePrice: '',
		pricePerSqFt: '',
		carParking: 'open',
		salePriceOver: 'superBuildUpArea',
		legalClearance,
		superBuildUpArea: '',
		carpetArea: '',
		numberOfFloors: '',
		floor: '',
		numberOfBedRooms: '',
		toiletIndian: '',
		toiletWestern: '',
		furnished: 'unfurnished',
		furnishes: [],
		amenities: [],
		propertyOwnerShip: 'freehold',
		availability: 'immediately',
		availableDate: Date.now(),
		verified: true,
		transactionType: 'newbooking',
		reraapproveId: '',
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

	React.useEffect(() => {
		setInitialValues((prevState) => {
			if (
				state.legalClearance.find((c) => c.name === 'reraapproved')[
					'details'
				]
			) {
				return {
					...state,
					superBuildUpArea: state.superBuiltupArea,
					numberOfFloors: state.noOfFloors,
					toiletIndian: state.toiletTypes.find(
						(c) => c.toiletType === 'indian'
					)['numbers'],
					toiletWestern: state.toiletTypes.find(
						(c) => c.toiletType === 'western'
					)['numbers'],
					reraapproveId: state.legalClearance.find(
						(c) => c.name === 'reraapproved'
					)['details'],
				};
			} else {
				return {
					...state,
					superBuildUpArea: state.superBuiltupArea,
					numberOfFloors: state.noOfFloors,
					toiletIndian: state.toiletTypes.find(
						(c) => c.toiletType === 'indian'
					)['numbers'],
					toiletWestern: state.toiletTypes.find(
						(c) => c.toiletType === 'western'
					)['numbers'],
				};
			}
		});
	}, [state]);

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
		if (state.amenities.length > 0) {
			setInitialValues((prevState) => ({
				...prevState,
				amenities: amenities.map((c) => ({
					...c,
					value: state.amenities.includes(c.id) ? true : false,
				})),
			}));
		} else {
			setInitialValues((prevState) => ({
				...prevState,
				amenities: amenities.map((c) => ({ ...c, value: false })),
			}));
		}
	}, [amenities, state.amenities.length]);
	React.useEffect(() => {
		if (state.furnishes.length > 0) {
			setInitialValues((prevState) => ({
				...prevState,
				furnishes: furnishes.map((c) => ({
					...c,
					value: state.furnishes.find((b) => b.id === c.id)
						? true
						: false,
				})),
			}));
		} else {
			setInitialValues((prevState) => ({
				...prevState,
				furnishes: furnishes.map((c) => ({ ...c, value: false })),
			}));
		}
	}, [furnishes, state.furnishes.length]);

	const onSubmitForm = (data, { setSubmitting }) => {
		setSubmitting(true);
		let propertyDetails = filter(data);
		if (file.length > 0) {
			console.log('--------Img--------');
			propertyDetails['image'] = file;
		}

		console.log('------orop', propertyDetails);

		propertyDetails['toiletTypes'] = [
			{
				toiletType: 'indian',
				numbers: data.toiletIndian,
			},
			{
				toiletType: 'western',
				numbers: data.toiletWestern,
			},
		];
		onSubmit(propertyDetails);
		setSubmitting(false);
	};
	return (
		<Formik
			validate={validate}
			enableReinitialize={true}
			validateOnChange={false}
			validateOnBlur={false}
			initialValues={initialValues}
			onSubmit={onSubmitForm}
		>
			{({
				values,
				handleSubmit,
				handleChange,
				isSubmitting,
				errors,
				setFieldValue,
				isValid,
				isValidating,
			}) => (
				<Form>
					{/* <div>{JSON.stringify(values.amenities, null, '\t')}</div> */}
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
						name="floor"
						type="number"
						label="Enter number"
					/>
					<RowTextField
						heading="Number of bed rooms"
						name="numberOfBedRooms"
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
						name="availability"
						type="number"
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
					<RowSelect
						heading="Car parking"
						name="carParking"
						label="Choose"
						menuItems={carParkingMenuItems}
					/>
					<RowTextField
						heading="Sale price"
						name="salePrice"
						type="number"
						label="Enter price"
					/>
					<RowTextField
						heading="Price per sqFt"
						name="pricePerSqFt"
						type="number"
						label="Enter sale price"
					/>
					<RowHOC heading="Sale price over">
						<FormControl component="fieldset">
							<RadioGroup
								aria-label="salePriceOver"
								name="salePriceOver"
								value={values.salePriceOver}
								onChange={handleChange}
							>
								<Box display="flex">
									<FormControlLabel
										value="superBuildUpArea"
										control={<Radio />}
										label="Super buildup area"
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
					<FormHeader text="Furnishes And Amenities" />
					<RowSelect
						heading="Furnishing"
						name="furnished"
						type="number"
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
														type="checkbox"
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
						<FieldArray name="legalClearance">
							{(arrayHelpers) => (
								<Grid container>
									{values.amenities.map((c, i) => {
										return (
											<Grid item lg={6}>
												<Checkbox
													key={i}
													type="checkbox"
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
						<FieldArray name="legalClearance">
							{(arrayHelpers) => (
								<Grid container>
									{values.legalClearance.map((c, i) => {
										return (
											<Grid item lg={6}>
												<Checkbox
													key={i}
													heading="test"
													type="checkbox"
													name={`legalClearance.${i}.value`}
													label={c.label}
												/>
											</Grid>
										);
									})}
								</Grid>
							)}
						</FieldArray>
					</RowHOC>
					{values.legalClearance.find(
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
								label: 'transform-none',
							}}
						>
							Edit Property
						</Button>
					</Box>
				</Form>
			)}
		</Formik>
	);
};

export default PropertySale;
