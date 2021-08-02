import {
	Backdrop,
	Box,
	Button,
	CircularProgress,
	Divider,
	Grid,
} from '@material-ui/core';
import { FieldArray, Form, Formik } from 'formik';
import {
	boundaryWallMadeMenuItems,
	carParkingMenuItems,
	configureForUpdateLand,
	configureIntialLand,
	constructionDoneMenuItems,
	facingMenuItems,
	gatedCommunityMadeMenuItems,
	landUsingZoningMenuItems,
	renderTypes,
	transactionTypeMenuItems,
	validateLand,
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

import DeleteIcon from '@material-ui/icons/Delete';
import FormHeader from '../../components/formHeader/formHeader.component';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
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
	furnishes,
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

	const updateProject = (data) => {
		const clone = { ...data };
		configureForUpdateLand(clone);
		console.log(clone);
		clone.plotArea = data.plotArea.filter((c) => c);
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
			<Backdrop
				className={classes.backdrop}
				open={removeFloorplanLoading || loading}
			>
				<CircularProgress color="secondary" />
			</Backdrop>
			<FormHeader
				text={`Property Info (${renderTypes(initialValue.type)})`}
			/>
			<Box p="1rem">
				<p className="color-red">{asyncError}</p>
				<Formik
					initialValues={configureIntialLand(initialValue)}
					validate={validateLand}
					enableReinitialize={true}
					onSubmit={updateProject}
				>
					{({ values, handleChange, setFieldValue, errors }) => (
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
							<Box mb="0.5rem" mt="0.5rem">
								<Divider />
							</Box>
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
														heading={`Area ${
															i + 1
														}`}
														name={`plotArea.${i}`}
														type="number"
														label="SqFt"
													/>
													<IconButton
														aria-label="delete"
														onClick={() =>
															arrayHelpers.remove(
																i
															)
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
							<Box mb="0.5rem" mt="0.5rem">
								<Divider />
							</Box>
							<SelectSpeciality
								speciality={values.speciality}
								setSpeciality={(c) => {
									setFieldValue('speciality', c);
								}}
								fetchFirst
							/>
							<RowTextField
								heading="Plot frontage"
								type="number"
								name="plotFrontage"
								value={values.plotFrontage}
							/>
							<RowTextField
								heading="Length"
								type="number"
								name="length"
								value={values.length}
							/>
							<RowTextField
								heading="Width"
								type="number"
								name="width"
								value={values.width}
							/>
							<RowTextField
								heading="Width of road"
								type="number"
								name="widthOfRoad"
								value={values.widthOfRoad}
							/>
							<RowSelect
								heading="Facing"
								name="facing"
								value={values.facing}
								menuItems={facingMenuItems}
								label="Choose"
							/>
							<RowSelect
								heading="Boundary wall made"
								name="boundaryWallMade"
								value={values.boundaryWallMade}
								menuItems={boundaryWallMadeMenuItems}
								label="Choose"
							/>

							<RowSelect
								heading="Car parking"
								name="carParking"
								value={values.carParking}
								menuItems={carParkingMenuItems}
								label="Choose"
							/>
							<RowSelect
								heading="Construction done"
								name="constructionDone"
								value={values.constructionDone}
								menuItems={constructionDoneMenuItems}
								label="Choose"
							/>
							<RowSelect
								heading="Gated community"
								name="gatedCommunity"
								value={values.gatedCommunity}
								menuItems={gatedCommunityMadeMenuItems}
								label="Choose"
							/>
							<RowSelect
								heading="Land using zoining"
								name="landUsingZoning"
								value={values.landUsingZoning}
								menuItems={landUsingZoningMenuItems}
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

							{/* <RowTextField
								heading="Booking Amount"
								type="number"
								name="bookingAmount"
								value={values.bookingAmount}
							/> */}
							<RowTextField
								heading="Goverment valuation"
								type="number"
								name="govermentValuation"
								value={values.govermentValuation}
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
							{/* <Box>
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
							</Box> */}
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
