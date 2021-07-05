import {
	Box,
	Button,
	FormControl,
	FormControlLabel,
	Grid,
	Radio,
	RadioGroup,
} from '@material-ui/core';
import { FieldArray, Form, Formik } from 'formik';

import Checkbox from '../../components/checkbox/checkbox.component';
import FormHeader from '../../components/formHeader/formHeader.component';
import React from 'react';
import RowDatePicker from '../../components/rowDatePicker/rowDatePicker.component';
import RowHOC from '../../components/rowCheckBox/rowCheckbox.component';
import RowSelect from '../../components/rowSelect/rowFormikSelect.component';
import RowTextField from '../../components/rowTextField/rowFormikTextField.component';
import useStyles from '../addProperty/addProperty.styles';

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
	if (!state.length) {
		errors.length = 'Length required';
	}
	if (!state.width) {
		errors.width = 'Width required';
	}
	if (!state.plotFrontage) {
		errors.plotFrontage = 'Plot frontage required';
	}
	if (!state.plotArea) {
		errors.plotArea = 'Plot area required';
	}
	if (!state.widthOfRoad) {
		errors.widthOfRoad = 'Width of road required';
	}
	// if (typeof state.widthOfRoad != 'number') {
	// 	errors.widthOfRoad = 'Only number allowed';
	// }
	if (!state.govermentValuation) {
		errors.govermentValuation = 'Goverment valuation required';
	}

	if (!state.salePrice) {
		errors.salePrice = 'Sale price required';
	}
	// if (!state.pricePerSqFt) {
	// 	errors.pricePerSqFt = 'Price per SqFt required';
	// }
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

	return errors;
};

const filter = (a) => {
	let state = { ...a };

	if (state.ownerNumber) {
		state.legalClearance = state.legalClearance.map((c) => {
			if (c.name === 'numberOfOwner') {
				c.details = state.ownerNumber;
			}
			return c;
		});
	}

	return state;
};

const PropertySale = ({ furnishes, amenities, onSubmit, location, city }) => {
	const classes = useStyles();
	const [initialValues, setInitialValues] = React.useState({
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
		legalClearance,
		ownerNumber: '',
		verified: true,
		transactionType: 'newbooking',
		distanceSchool: '',
		distanceRailwayStation: '',
		distanceAirport: '',
		distanceBusStop: '',
		distanceHospital: '',
	});
	const [photos, setPhotos] = React.useState([]);

	const addMore = () => {
		setPhotos([
			...photos,
			{
				id: photos.length + 1,
				image: null,
			},
		]);
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

	const onSubmitForm = (data, { setSubmitting }) => {
		setSubmitting(true);
		let propertyDetails = filter(data);
		const propertyImages = photos
			.filter((c) => !!c.image)
			.map((b) => b.image);

		propertyDetails['propertyImages'] = propertyImages;
		propertyDetails[
			'title'
		] = `${propertyDetails.plotArea} Sq.ft land for sale in ${location},${city} `;
		onSubmit(propertyDetails);
		setSubmitting(false);
	};
	return (
		<Formik
			validate={validate}
			enableReinitialize={true}
			// validateOnChange={false}
			// validateOnBlur={false}
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
					<RowTextField
						heading="Plot area"
						name="plotArea"
						type="number"
						label="SqFt"
					/>
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

					<RowTextField
						heading="Government Valuation"
						name="govermentValuation"
						type="number"
						label="Enter price"
					/>

					<RowTextField
						heading="Sale price"
						name="salePrice"
						type="number"
						label="Enter price"
					/>

					{values.plotArea && values.salePrice && (
						<RowTextField
							heading="Price per sqFt"
							name="pricePerSqFt"
							type="number"
							value={(values.salePrice / values.plotArea).toFixed(
								2
							)}
							label="Price per SqFt"
							disabled={true}
						/>
					)}

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
						(c) => c.name === 'numberOfOwner'
					)['value'] && (
						<RowTextField
							heading="Owner mobile number"
							name="ownerNumber"
							type="number"
							label="Enter number"
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
													: require('../../assets/no-image.jpg')
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
										className={classes.input}
									/>
									<label
										htmlFor={`image-${c.id}`}
										className={classes.label}
									>
										Upload
									</label>
								</Grid>
							))}
						</Grid>
						<Box mt="2rem">
							<button onClick={addMore} type="button">
								Add More Image
							</button>
						</Box>
					</Box>
					<Box>
						<Button
							type="submit"
							// disabled={true}
							color="primary"
							variant="contained"
							classes={{
								label: 'transform-none',
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
