import {
	Backdrop,
	Box,
	Button,
	CircularProgress,
	Divider,
	FormControl,
	FormControlLabel,
	Grid,
	Radio,
	RadioGroup,
	Switch,
} from '@material-ui/core';
import { FieldArray, Form, Formik } from 'formik';
import {
	availabilityMenuItems,
	carParkingMenuItems,
	configureForUpdateFlat,
	configureIntialFlat,
	furnishMenuItems,
	ownershipMenuItems,
	renderTypes,
	transactionTypeMenuItems,
	validateFlat,
	verifiedMenuItems,
} from './properties.constant';
import {
	removePropertyFloorplan,
	updateProjectPropertyDetails,
} from '../../redux/project/project.action';
import {
	selectLoading as resourcesLoading,
	selectAmenities,
	selectFurnishes,
} from '../../redux/property/property.selector';
import {
	selectUpdateProjectPropertyDetailsLoading,
	selectremovePropertyFloorplanLoading,
} from '../../redux/project/project.selector';

import Checkbox from '../../components/checkbox/checkbox.component';
import FormHeader from '../../components/formHeader/formHeader.component';
import React from 'react';
import RowDatePicker from '../../components/rowDatePicker/rowDatePicker.component';
import RowHOC from '../../components/rowCheckBox/rowCheckbox.component';
import RowSelect from '../../components/rowSelect/rowFormikSelect.component';
import RowTextField from '../../components/rowTextField/rowFormikTextField.component';
import SelectSpeciality from '../../components/selectSpeciality';
import axios from 'axios';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fetchAllPropertyResourcesStart } from '../../redux/property/property.actions';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
	imageWrapper: {
		width: '100px',
		height: '100px',
	},
	image: {
		height: '100%',
		width: '100%',
	},
	input: {
		display: 'none',
	},
	label: {
		padding: '0.5rem 1rem',
		border: '1px solid #cccccc',
		width: '100%',
		borderRadius: '5px',
		backgroundColor: '#cccccc',
		cursor: 'pointer',
	},
	removeButton: {
		marginBottom: '0.5rem',
		marginTop: '0.5rem',
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
	removeFloorplanLoading,
	removePropertyFloorplan,
	refetch,
}) => {
	// Declaration
	const classes = useStyles();
	const history = useHistory();
	// State hook
	const [visible, setVisible] = React.useState({
		furnishes: false,
	});
	const [asyncError, setAsyncError] = React.useState(null);

	const [photos, setPhotos] = React.useState([]);
	const [loading, setLoading] = React.useState(false);
	const [floorPlans, setFloorPlans] = React.useState([]);

	const addMore = () => {
		setPhotos([
			...photos,
			{
				id: photos.length + 1,
				image: null,
			},
		]);
	};
	const addMoreFloorPlan = () => {
		setFloorPlans([
			...floorPlans,
			{
				id: floorPlans.length + 1,
				image: null,
				label: '',
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
	const handleFloorPlanImage = (img) => (e) => {
		const { name, files } = e.target;
		console.log({ name });
		setFloorPlans((prevState) =>
			prevState.map((c) => {
				if (c.id === img.id) {
					c.image = files[0];
				}
				return c;
			})
		);
	};
	const handleFloorLabel = (img) => (e) => {
		const { value } = e.target;

		setFloorPlans((prevState) =>
			prevState.map((c) => {
				if (c.id === img.id) {
					c.label = value;
				}
				return c;
			})
		);
	};
	const uploadToServer = async () => {
		const i = floorPlans.filter((c) => !!c.image).map((b) => b.image);

		const labels = floorPlans.filter((c) => !!c.image).map((b) => b.label);
		if (i.length > 0) {
			const formData = new FormData();
			i.forEach((c) => {
				formData.append('images', c);
			});
			labels.forEach((c) => {
				formData.append('labels', c);
			});
			try {
				setLoading(true);
				await axios.post(
					`/api/v1/projects/add-floorplans/${id}`,
					formData,
					{
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					}
				);
				setLoading(false);
				refetch();
				setFloorPlans([]);
			} catch (error) {
				setLoading(false);
				console.log(error);
			}
		}
	};
	const addPhotos = async () => {
		const i = photos.filter((c) => !!c.image).map((b) => b.image);

		if (i.length > 0) {
			const formData = new FormData();
			i.forEach((c) => {
				formData.append('images', c);
			});

			try {
				setLoading(true);
				await axios.post(
					`/api/v1/projects/add-project-property-photos/${id}`,
					formData,
					{
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					}
				);
				setLoading(false);
				refetch();
				setPhotos([]);
			} catch (error) {
				setLoading(false);
				console.log(error);
			}
		}
	};

	const handleRemovePropertyImage = (img) => async () => {
		try {
			setLoading(true);
			await axios.get(
				`/api/v1/projects/remove-project-property-photos/${id}/${img._id}`,

				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			);
			setLoading(false);
			refetch();
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};
	const handleRemovefloorPlanImage = (img) => async () => {
		try {
			setLoading(true);
			await axios.get(
				`/api/v1/projects/remove-floorplan-photos/${id}/${img._id}`,

				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			);
			setLoading(false);
			refetch();
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};

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
				open={updateProjectPropertyDetailsLoading || loading}
			>
				<CircularProgress color="secondary" />
			</Backdrop>
			<Backdrop
				className={classes.backdrop}
				open={removeFloorplanLoading}
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
								heading="Number of bedrooms"
								type="number"
								name="numberOfBedrooms"
								value={values.numberOfBedrooms}
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
								heading="Tower Name"
								name="tower"
								type="text"
								label="Enter Tower Name"
							/>
							<SelectSpeciality
								speciality={values.speciality}
								setSpeciality={(c) => {
									setFieldValue('speciality', c);
								}}
								fetchFirst
							/>
							<RowTextField
								heading="Salable area"
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
							<FormHeader text="Images" />
							<RowHOC heading="Exsting Images" center={true}>
								<Grid container spacing={2}>
									{values.photos.map((c) => (
										<Grid item xs={12} lg={3}>
											<Box
												className={classes.imageWrapper}
											>
												<img
													src={
														c.image
															? `/assets/projects/${c.image}`
															: require('../../assets/no-image.jpg')
													}
													alt="project"
													srcset=""
													className={classes.image}
												/>
											</Box>
											<Button
												variant="outlined"
												color="secondary"
												classes={{
													label: 'transform-none',
												}}
												size="small"
												className={classes.removeButton}
												onClick={handleRemovePropertyImage(
													c
												)}
											>
												Remove
											</Button>
										</Grid>
									))}
								</Grid>
							</RowHOC>

							<RowHOC heading="Upload New Images" center={true}>
								<Box p="0.8rem">
									<Grid container spacing={3}>
										{photos.map((c, i) => (
											<Grid key={c.id} item xs={6} lg={3}>
												<Box
													className={
														classes.imageWrapper
													}
												>
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
														className={
															classes.image
														}
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
									<Box mt="2rem">
										<Button
											onClick={addPhotos}
											type="button"
											type="button"
											color="primary"
											variant="contained"
											classes={{
												label: 'transform-none',
											}}
										>
											Save New Images
										</Button>
									</Box>
								</Box>
							</RowHOC>
							<Divider />
							<RowHOC heading="Exsting Floorplans" center={true}>
								<Grid container spacing={2}>
									{values.floorPlans.map((c) => (
										<Grid item xs={12} lg={3}>
											<Box
												className={classes.imageWrapper}
											>
												<img
													src={
														c.image
															? `/assets/projects/${c.image}`
															: require('../../assets/no-image.jpg')
													}
													alt="project"
													srcset=""
													className={classes.image}
												/>
											</Box>
											<Button
												variant="outlined"
												color="secondary"
												classes={{
													label: 'transform-none',
												}}
												size="small"
												className={classes.removeButton}
												onClick={handleRemovefloorPlanImage(
													c
												)}
											>
												Remove
											</Button>
										</Grid>
									))}
								</Grid>
							</RowHOC>
							<RowHOC heading="Add New Floor Plans" center={true}>
								<Box p="0.8rem">
									<Grid container spacing={3}>
										{floorPlans.map((c, i) => (
											<Grid key={c.id} item xs={6} lg={3}>
												<Box
													className={
														classes.imageWrapper
													}
												>
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
														className={
															classes.image
														}
													/>
												</Box>
												<input
													type="text"
													onChange={handleFloorLabel(
														c
													)}
												/>
												<input
													type="file"
													onChange={handleFloorPlanImage(
														c
													)}
													id={`f-image-${c.id}`}
													className={classes.input}
												/>
												<label
													htmlFor={`f-image-${c.id}`}
												>
													Upload
												</label>
											</Grid>
										))}
									</Grid>
									<Box mt="2rem">
										<button
											onClick={addMoreFloorPlan}
											type="button"
										>
											Add More Image
										</button>
									</Box>
									<Box mt="2rem">
										<Button
											onClick={uploadToServer}
											type="button"
											color="primary"
											variant="contained"
											classes={{
												label: 'transform-none',
											}}
										>
											Save New Images
										</Button>
									</Box>
								</Box>
							</RowHOC>
							<Box pt="1rem" pb="1rem">
								<Divider />
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
	updateProjectPropertyDetailsLoading:
		selectUpdateProjectPropertyDetailsLoading,
	removeFloorplanLoading: selectremovePropertyFloorplanLoading,
});

const mapActionToProps = (dispatch) => ({
	fetchResourcesStart: (callback) =>
		dispatch(fetchAllPropertyResourcesStart({ callback })),
	updateProjectPropertyDetails: (callback, projectId, project) =>
		dispatch(
			updateProjectPropertyDetails({ callback, projectId, project })
		),
	removePropertyFloorplan: (callback, floorplan, id) =>
		dispatch(removePropertyFloorplan({ callback, floorplan, id })),
});

export default connect(mapStateToProps, mapActionToProps)(ProjectInfo);
