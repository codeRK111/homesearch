import React from 'react';
import { Formik, Form, FieldArray } from 'formik';
import RowTextField from '../../components/rowTextField/rowFormikTextField.component';
import RowDatePicker from '../../components/rowDatePicker/rowDatePicker.component';
import {
	configureIntialFlat,
	configureForUpdateFlat,
	validateFlat,
	availabilityMenuItems,
	furnishMenuItems,
	renderTypes,
	carParkingMenuItems,
	ownershipMenuItems,
	transactionTypeMenuItems,
	verifiedMenuItems,
} from './properties.constant';
import RowSelect from '../../components/rowSelect/rowFormikSelect.component';
import Checkbox from '../../components/checkbox/checkbox.component';
import RowHOC from '../../components/rowCheckBox/rowCheckbox.component';
import FormHeader from '../../components/formHeader/formHeader.component';
import {
	Box,
	Backdrop,
	CircularProgress,
	Button,
	Switch,
	Grid,
	Radio,
	RadioGroup,
	FormControlLabel,
	FormControl,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
	selectAmenities,
	selectFurnishes,
	selectLoading as resourcesLoading,
} from '../../redux/property/property.selector';
import { selectUpdateProjectPropertyDetailsLoading } from '../../redux/project/project.selector';
import { fetchAllPropertyResourcesStart } from '../../redux/property/property.actions';
import { updateProjectPropertyDetails } from '../../redux/project/project.action';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
}));

const ProjectInfo = ({
	initialValue,
	amenities,
	furnishes,
	resourcesLoading,
	fetchResourcesStart,
	id,
	updateProjectPropertyDetailsLoading,
	updateProjectPropertyDetails,
}) => {
	// Declaration
	const classes = useStyles();
	const history = useHistory();
	// State hook
	const [visible, setVisible] = React.useState({
		furnishes: false,
	});
	const [asyncError, setAsyncError] = React.useState(null);

	// Api response handler
	const handleFetchResources = (type, data) => {
		// if (type === 'fail') {
		// 	setAsyncError(data);
		// } else {
		// 	setAsyncError(null);
		// }
	};

	const handleUpdateProjectDetails = (type, data) => {
		if (type === 'fail') {
			setAsyncError(data);
		} else {
			setAsyncError(null);
			history.push('/projects/active');
		}
	};

	// Event handler
	const handleChangeSwitch = (e) => {
		const { name, checked } = e.target;
		setVisible({ ...visible, [name]: checked });
	};

	const updateProject = (data) => {
		const clone = { ...data };
		configureForUpdateFlat(clone);
		console.log(clone);
		updateProjectPropertyDetails(handleUpdateProjectDetails, id, clone);
	};

	// UseEffect hooks
	React.useEffect(() => {
		if (visible.furnishes) {
			if (furnishes.length === 0) {
				fetchResourcesStart(handleFetchResources);
			}
		}
	}, [visible.furnishes]);
	return (
		<Box>
			<Backdrop
				className={classes.backdrop}
				open={updateProjectPropertyDetailsLoading}
			>
				<CircularProgress color="secondary" />
			</Backdrop>
			<FormHeader
				text={`Property Info (${renderTypes(initialValue.type)})`}
			/>
			<Box p="1rem">
				<p className="color-red">{asyncError}</p>
				<Formik
					initialValues={configureIntialFlat(initialValue, furnishes)}
					validate={validateFlat}
					enableReinitialize={true}
					onSubmit={updateProject}
				>
					{({ values, handleChange, setFieldValue }) => (
						<Form>
							<RowTextField
								heading="Title"
								name="title"
								value={values.title}
							/>
							<RowTextField
								heading="Description"
								name="description"
								value={values.description}
							/>
							<RowTextField
								heading="Number of units"
								type="number"
								name="numberOfUnits"
								value={values.numberOfUnits}
							/>
							<RowTextField
								heading="Indian toilet"
								type="number"
								name="indianToilet"
								value={values.indianToilet}
							/>
							<RowTextField
								heading="Western toilet"
								type="number"
								name="westernToilet"
								value={values.westernToilet}
							/>
							<RowTextField
								heading="Super built-up area"
								type="number"
								name="superBuiltupArea"
								value={values.superBuiltupArea}
							/>
							<RowTextField
								heading="Carpet area"
								type="number"
								name="carpetArea"
								value={values.carpetArea}
							/>
							<RowSelect
								heading="Availability"
								name="availability"
								value={values.availability}
								menuItems={availabilityMenuItems}
								label="Choose"
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
								heading="Furnished"
								name="furnished"
								value={values.furnished}
								menuItems={furnishMenuItems}
								label="Choose"
							/>
							<RowHOC heading="Show Furnishes">
								<Switch
									checked={visible.furnishes}
									onChange={handleChangeSwitch}
									color="primary"
									name="furnishes"
									disabled={
										values.furnished === 'unfurnished'
									}
									inputProps={{
										'aria-label': 'primary checkbox',
									}}
								/>
							</RowHOC>
							{visible.furnishes &&
								values.furnished !== 'unfurnished' && (
									<RowHOC heading="Furnishes">
										{resourcesLoading ? (
											<p>Loading furnishes...</p>
										) : (
											<FieldArray name="furnishes">
												{(arrayHelpers) => (
													<div>
														{values.furnishes.map(
															(c, i) => {
																return (
																	<Checkbox
																		key={i}
																		heading="test"
																		type="checkbox"
																		name={`furnishes.${i}.value`}
																		label={
																			c.name
																		}
																	/>
																);
															}
														)}
													</div>
												)}
											</FieldArray>
										)}
									</RowHOC>
								)}
							<RowSelect
								heading="Car parking"
								name="carParking"
								value={values.carParking}
								menuItems={carParkingMenuItems}
								label="Choose"
							/>
							<RowSelect
								heading="Ownership"
								name="propertyOwnerShip"
								value={values.propertyOwnerShip}
								menuItems={ownershipMenuItems}
								label="Choose"
							/>
							<RowSelect
								heading="Transaction Type"
								name="transactionType"
								value={values.transactionType}
								menuItems={transactionTypeMenuItems}
								label="Choose"
							/>
							<RowSelect
								heading="Verified"
								name="verified"
								value={values.verified}
								menuItems={verifiedMenuItems}
								label="Choose"
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
							<RowTextField
								heading="Booking Amount"
								type="number"
								name="bookingAmount"
								value={values.bookingAmount}
							/>
							<RowTextField
								heading="Max price"
								type="number"
								name="maxPrice"
								value={values.maxPrice}
							/>
							<RowTextField
								heading="Min price"
								type="number"
								name="minPrice"
								value={values.minPrice}
							/>
							<Box>
								<RowTextField
									heading="Price per sqFt (Min)"
									name="pricePerSqFtMin"
									onChange={handleChange}
									type="number"
									value={(
										values.minPrice /
										(values.priceOver === 'superBuiltUpArea'
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
										(values.priceOver === 'superBuiltUpArea'
											? values.superBuiltupArea
											: values.carpetArea)
									).toFixed(2)}
									label="Price per SqFt"
									disabled={true}
								/>
							</Box>
							<Box display="flex" justifyContent="flex-end">
								<Button
									type="submit"
									color="primary"
									variant="contained"
									classes={{
										label: 'transform-none',
									}}
									size="large"
								>
									Update
								</Button>
							</Box>
						</Form>
					)}
				</Formik>
			</Box>
		</Box>
	);
};

const mapStateToProps = createStructuredSelector({
	amenities: selectAmenities,
	furnishes: selectFurnishes,
	resourcesLoading,
	updateProjectPropertyDetailsLoading: selectUpdateProjectPropertyDetailsLoading,
});

const mapActionToProps = (dispatch) => ({
	fetchResourcesStart: (callback) =>
		dispatch(fetchAllPropertyResourcesStart({ callback })),
	updateProjectPropertyDetails: (callback, projectId, project) =>
		dispatch(
			updateProjectPropertyDetails({ callback, projectId, project })
		),
});

export default connect(mapStateToProps, mapActionToProps)(ProjectInfo);
