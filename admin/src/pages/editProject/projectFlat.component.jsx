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
	Divider,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
	selectAmenities,
	selectFurnishes,
	selectLoading as resourcesLoading,
} from '../../redux/property/property.selector';
import {
	selectUpdateProjectPropertyDetailsLoading,
	selectremovePropertyFloorplanLoading,
} from '../../redux/project/project.selector';
import { fetchAllPropertyResourcesStart } from '../../redux/property/property.actions';
import {
	updateProjectPropertyDetails,
	removePropertyFloorplan,
} from '../../redux/project/project.action';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
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
	const [floorplans, setFloorplans] = React.useState({
		floorplan1: null,
		floorplan2: null,
	});
	const [images, setImages] = React.useState({
		image1: null,
		image2: null,
		image3: null,
		image4: null,
	});

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

	const handleRemovePropertyFloorplan = (type, data) => {
		if (type === 'fail') {
			setAsyncError(data);
		} else {
			console.log(data);
			setAsyncError(null);
			refetch();
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
		clone.floorplans = floorplans;
		clone.propertyImages = images;
		updateProjectPropertyDetails(handleUpdateProjectDetails, id, clone);
	};
	const handleImageFloorPlan = (e) => {
		const { name, files } = e.target;
		setFloorplans((prevState) => ({
			...prevState,
			[name]: files[0],
		}));
	};

	const handleRemove = (name) => (e) => {
		console.log(name);
		removePropertyFloorplan(handleRemovePropertyFloorplan, name, id);
	};

	const handleRemoveImage = (name) => (e) => {
		console.log(name);
		removePropertyFloorplan(handleRemovePropertyFloorplan, name, id);
	};

	const handleImage = (e) => {
		const { name, files } = e.target;
		setImages((prevState) => ({
			...prevState,
			[name]: files[0],
		}));
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
								heading="Number of bed rooms"
								type="number"
								name="numberOfBedrooms"
								value={values.numberOfBedrooms}
							/>
							<RowTextField
								heading="Number of living areas"
								type="number"
								name="numberOflivingAreas"
								value={values.numberOflivingAreas}
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
							<FormHeader text="Floor plans & Images" />
							<RowHOC heading="Exsting floorplans" center={true}>
								<Grid container spacing={2}>
									<Grid item xs={12} lg={3}>
										<Box className={classes.imageWrapper}>
											<img
												src={
													values.floorplan1
														? `/assets/projects/${values.floorplan1}`
														: require('../../assets/no-image.jpg')
												}
												alt="project"
												srcset=""
												className={classes.image}
											/>
										</Box>
										{values.floorplan1 && (
											<Button
												variant="outlined"
												color="secondary"
												classes={{
													label: 'transform-none',
												}}
												size="small"
												className={classes.removeButton}
												onClick={handleRemove(
													'floorplan1'
												)}
											>
												Remove
											</Button>
										)}
									</Grid>
									<Grid item xs={12} lg={3}>
										<Box className={classes.imageWrapper}>
											<img
												src={
													values.floorplan2
														? `/assets/projects/${values.floorplan2}`
														: require('../../assets/no-image.jpg')
												}
												alt="project"
												srcset=""
												className={classes.image}
											/>
										</Box>
										{values.floorplan2 && (
											<Button
												variant="outlined"
												color="secondary"
												classes={{
													label: 'transform-none',
												}}
												size="small"
												className={classes.removeButton}
												onClick={handleRemove(
													'floorplan2'
												)}
											>
												Remove
											</Button>
										)}
									</Grid>
								</Grid>
							</RowHOC>
							<Divider />
							<RowHOC heading="Update floorplans" center={true}>
								<Grid item xs={12} lg={3}>
									<Box className={classes.imageWrapper}>
										<img
											src={
												floorplans.floorplan1
													? URL.createObjectURL(
															floorplans.floorplan1
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
										name="floorplan1"
										onChange={handleImageFloorPlan}
										id="floorplan1"
										className={classes.input}
									/>
									<label
										htmlFor="floorplan1"
										className={classes.label}
									>
										Floorplan1
									</label>
								</Grid>
								<Grid item xs={12} lg={3}>
									<Box className={classes.imageWrapper}>
										<img
											src={
												floorplans.floorplan2
													? URL.createObjectURL(
															floorplans.floorplan2
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
										name="floorplan2"
										onChange={handleImageFloorPlan}
										id="floorplan2"
										className={classes.input}
									/>
									<label
										htmlFor="floorplan2"
										className={classes.label}
									>
										floorplan2
									</label>
								</Grid>
							</RowHOC>
							<Box pt="1rem" pb="1rem">
								<Divider />
							</Box>
							<RowHOC heading="Exsting Images" center={true}>
								<Grid container spacing={2}>
									<Grid item xs={12} lg={3}>
										<Box className={classes.imageWrapper}>
											<img
												src={
													values.image1
														? `/assets/projects/${values.image1}`
														: require('../../assets/no-image.jpg')
												}
												alt="project"
												srcset=""
												className={classes.image}
											/>
										</Box>
										{values.image1 && (
											<Button
												variant="outlined"
												color="secondary"
												classes={{
													label: 'transform-none',
												}}
												size="small"
												className={classes.removeButton}
												onClick={handleRemoveImage(
													'image1'
												)}
											>
												Remove
											</Button>
										)}
									</Grid>
									<Grid item xs={12} lg={3}>
										<Box className={classes.imageWrapper}>
											<img
												src={
													values.image2
														? `/assets/projects/${values.image2}`
														: require('../../assets/no-image.jpg')
												}
												alt="project"
												srcset=""
												className={classes.image}
											/>
										</Box>
										{values.image2 && (
											<Button
												variant="outlined"
												color="secondary"
												classes={{
													label: 'transform-none',
												}}
												size="small"
												className={classes.removeButton}
												onClick={handleRemoveImage(
													'image2'
												)}
											>
												Remove
											</Button>
										)}
									</Grid>
									<Grid item xs={12} lg={3}>
										<Box className={classes.imageWrapper}>
											<img
												src={
													values.image3
														? `/assets/projects/${values.image3}`
														: require('../../assets/no-image.jpg')
												}
												alt="project"
												srcset=""
												className={classes.image}
											/>
										</Box>
										{values.image3 && (
											<Button
												variant="outlined"
												color="secondary"
												classes={{
													label: 'transform-none',
												}}
												size="small"
												className={classes.removeButton}
												onClick={handleRemoveImage(
													'image3'
												)}
											>
												Remove
											</Button>
										)}
									</Grid>
									<Grid item xs={12} lg={3}>
										<Box className={classes.imageWrapper}>
											<img
												src={
													values.image4
														? `/assets/projects/${values.image4}`
														: require('../../assets/no-image.jpg')
												}
												alt="project"
												srcset=""
												className={classes.image}
											/>
										</Box>
										{values.image4 && (
											<Button
												variant="outlined"
												color="secondary"
												classes={{
													label: 'transform-none',
												}}
												size="small"
												className={classes.removeButton}
												onClick={handleRemoveImage(
													'image4'
												)}
											>
												Remove
											</Button>
										)}
									</Grid>
								</Grid>
							</RowHOC>
							<Box pt="1rem" pb="1rem">
								<Divider />
							</Box>
							<RowHOC heading="Update images" center>
								<Grid container spacing={2}>
									<Grid item xs={12} lg={3}>
										<Box className={classes.imageWrapper}>
											<img
												src={
													images.image1
														? URL.createObjectURL(
																images.image1
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
											name="image1"
											onChange={handleImage}
											id="pimage1"
											className={classes.input}
										/>
										<label
											htmlFor="pimage1"
											className={classes.label}
										>
											Image1
										</label>
									</Grid>
									<Grid item xs={12} lg={3}>
										<Box className={classes.imageWrapper}>
											<img
												src={
													images.image2
														? URL.createObjectURL(
																images.image2
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
											name="image2"
											onChange={handleImage}
											id="pimage2"
											className={classes.input}
										/>
										<label
											htmlFor="pimage2"
											className={classes.label}
										>
											Image2
										</label>
									</Grid>
									<Grid item xs={12} lg={3}>
										<Box className={classes.imageWrapper}>
											<img
												src={
													images.image3
														? URL.createObjectURL(
																images.image3
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
											name="image3"
											onChange={handleImage}
											id="pimage3"
											className={classes.input}
										/>
										<label
											htmlFor="pimage3"
											className={classes.label}
										>
											Image3
										</label>
									</Grid>
									<Grid item xs={12} lg={3}>
										<Box className={classes.imageWrapper}>
											<img
												src={
													images.image4
														? URL.createObjectURL(
																images.image4
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
											name="image4"
											id="pimage4"
											onChange={handleImage}
											className={classes.input}
										/>
										<label
											htmlFor="pimage4"
											className={classes.label}
										>
											Image4
										</label>
									</Grid>
								</Grid>
							</RowHOC>
							<Box
								display="flex"
								justifyContent="flex-end"
								mt="1rem"
							>
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
