import {
	Backdrop,
	Box,
	Button,
	CircularProgress,
	Grid,
	Switch,
} from '@material-ui/core';
import { FieldArray, Form, Formik } from 'formik';
import {
	complitionStatusMenuItems,
	configureForUpdate,
	configureIntial,
	projectTypeMenuItens,
	showNumber,
	showReraId,
	statusMenuItems,
	validate,
} from './projectInfo.constant';
import {
	removePropertyFloorplan,
	updateProjectDetails,
} from '../../redux/project/project.action';
import {
	selectLoading as resourcesLoading,
	selectAmenities,
} from '../../redux/property/property.selector';
import {
	selectUpdateProjectDetailsLoading,
	selectremovePropertyFloorplanLoading,
} from '../../redux/project/project.selector';

import Checkbox from '../../components/checkbox/checkbox.component';
import FormHeader from '../../components/formHeader/formHeader.component';
import React from 'react';
import RowHOC from '../../components/rowCheckBox/rowCheckbox.component';
import RowSelect from '../../components/rowSelect/rowFormikSelect.component';
import RowTextField from '../../components/rowTextField/rowFormikTextField.component';
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
}));

const ProjectInfo = ({
	initialValue,
	amenities,
	resourcesLoading,
	fetchResourcesStart,
	id,
	updateProjectDetailsLoading,
	updateProjectDetails,
	removeFloorplanLoading,
	removePropertyFloorplan,
	refetch,
}) => {
	// Declaration
	const classes = useStyles();
	const history = useHistory();
	// State hook
	const [visible, setVisible] = React.useState({
		amenities: false,
		legalClearance: false,
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
	const [asyncError, setAsyncError] = React.useState(null);

	// Api response handler
	const handleFetchResources = (type, data) => {
		if (type === 'fail') {
			setAsyncError(data);
		} else {
			setAsyncError(null);
		}
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
		if (clone.amenities.length === 0) {
			if (clone.initialAmenities) {
				clone.amenities = clone.initialAmenities;
			}
		} else {
			clone.amenities = clone.amenities
				.filter((c) => c.value)
				.map((b) => b.id);
		}
		configureForUpdate(clone);
		console.log(clone);

		updateProjectDetails(handleUpdateProjectDetails, id, clone);
	};

	const handleRemoveImage = (name) => (e) => {
		removePropertyFloorplan(handleRemovePropertyFloorplan, name, id);
	};

	const handleRemovePropertyImage = (img) => async () => {
		try {
			await axios.get(
				`/api/v1/projects/remove-project-photos/${id}/${img._id}`,

				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			);
			refetch();
		} catch (error) {
			console.log(error);
		}
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

	const addPhotos = async () => {
		const i = photos.filter((c) => !!c.image).map((b) => b.image);

		if (i.length > 0) {
			const formData = new FormData();
			i.forEach((c) => {
				formData.append('images', c);
			});

			try {
				await axios.post(
					`/api/v1/projects/add-project-image/${id}`,
					formData,
					{
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					}
				);
				refetch();
			} catch (error) {
				console.log(error);
			}
		}
	};

	// UseEffect hooks
	React.useEffect(() => {
		fetchResourcesStart(handleFetchResources);
	}, [visible.amenities]);
	return (
		<Box>
			<Backdrop
				className={classes.backdrop}
				open={updateProjectDetailsLoading}
			>
				<CircularProgress color="secondary" />
			</Backdrop>
			<Backdrop
				className={classes.backdrop}
				open={removeFloorplanLoading}
			>
				<CircularProgress color="secondary" />
			</Backdrop>
			<FormHeader text="Project Info" />
			<Box p="1rem">
				<p className="color-red">{asyncError}</p>
				{/* <pre>
					{JSON.stringify(
						configureIntial(initialValue, amenities),
						null,
						2
					)}
				</pre> */}
				<Formik
					initialValues={configureIntial(initialValue, amenities)}
					validate={validate}
					enableReinitialize={true}
					onSubmit={updateProject}
				>
					{({ values }) => (
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
							<RowSelect
								heading="Complition status"
								name="complitionStatus"
								value={values.complitionStatus}
								menuItems={complitionStatusMenuItems}
								label="Choose"
							/>
							<RowSelect
								heading="Project type"
								name="projectType"
								value={values.projectType}
								menuItems={projectTypeMenuItens}
								label="Choose"
							/>
							<RowTextField
								heading="Distance from School"
								name="distanceSchool"
								value={values.distanceSchool}
							/>
							<RowTextField
								heading="Distance from bus stop"
								name="distanceSchool"
								value={values.distanceBusStop}
							/>
							<RowTextField
								heading="Distance from railway station"
								name="distanceSchool"
								value={values.distanceRailwayStation}
							/>
							<RowTextField
								heading="Distance from airport"
								name="distanceSchool"
								value={values.distanceAirport}
							/>
							<RowTextField
								heading="Distance from hospital"
								name="distanceHospital"
								value={values.distanceHospital}
							/>
							<RowSelect
								heading="Status"
								name="status"
								value={values.status}
								menuItems={statusMenuItems}
								label="Choose"
							/>
							{values.showAmenities && (
								<RowHOC heading="Show amenities">
									<Switch
										checked={visible.amenities}
										onChange={handleChangeSwitch}
										color="primary"
										name="amenities"
										inputProps={{
											'aria-label': 'primary checkbox',
										}}
									/>
								</RowHOC>
							)}
							<RowHOC heading="Amenities">
								{resourcesLoading ? (
									<p>Loading amenities...</p>
								) : (
									<FieldArray name="amenities">
										{(arrayHelpers) => (
											<div>
												{values.amenities.map(
													(c, i) => {
														return (
															<Checkbox
																key={i}
																heading="test"
																type="checkbox"
																name={`amenities.${i}.value`}
																label={c.name}
															/>
														);
													}
												)}
											</div>
										)}
									</FieldArray>
								)}
							</RowHOC>
							<RowHOC heading="Show legal clearance">
								<Switch
									checked={visible.legalClearance}
									onChange={handleChangeSwitch}
									color="primary"
									name="legalClearance"
									inputProps={{
										'aria-label': 'primary checkbox',
									}}
								/>
							</RowHOC>
							{visible.legalClearance && (
								<RowHOC heading="Legal clearance">
									<FieldArray name="legalClearance">
										{(arrayHelpers) => (
											<div>
												{values.legalClearance.map(
													(c, i) => {
														return (
															<Checkbox
																key={i}
																heading="test"
																type="checkbox"
																name={`legalClearance.${i}.value`}
																label={c.label}
															/>
														);
													}
												)}
											</div>
										)}
									</FieldArray>
								</RowHOC>
							)}
							{showReraId(values, visible) && (
								<RowTextField
									heading="RERA ID"
									name="reraId"
									value={values.reraId}
								/>
							)}
							{showNumber(values, visible) && (
								<RowTextField
									heading="Owner number"
									name="numberOfOwner"
									value={values.numberOfOwner}
								/>
							)}
							<RowHOC heading="Exsting Images" center={true}>
								<Grid container spacing={2}>
									{values.photos &&
										values.photos.map((c) => (
											<Grid item xs={12} lg={3}>
												<Box
													className={
														classes.imageWrapper
													}
												>
													<img
														src={
															c.image
																? `/assets/projects/${c.image}`
																: require('../../assets/no-image.jpg')
														}
														alt="project"
														srcset=""
														className={
															classes.image
														}
													/>
												</Box>
												<Button
													variant="outlined"
													color="secondary"
													classes={{
														label: 'transform-none',
													}}
													size="small"
													className={
														classes.removeButton
													}
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
							<RowHOC heading="Add New Images" center={true}>
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
							<Grid>
								<Grid item xs={12}>
									<Box
										display="flex"
										justifyContent="flex-end"
										mt="2rem"
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
								</Grid>
							</Grid>
						</Form>
					)}
				</Formik>
			</Box>
		</Box>
	);
};

const mapStateToProps = createStructuredSelector({
	amenities: selectAmenities,
	resourcesLoading,
	updateProjectDetailsLoading: selectUpdateProjectDetailsLoading,
	removeFloorplanLoading: selectremovePropertyFloorplanLoading,
});

const mapActionToProps = (dispatch) => ({
	fetchResourcesStart: (callback) =>
		dispatch(fetchAllPropertyResourcesStart({ callback })),
	updateProjectDetails: (callback, projectId, project) =>
		dispatch(updateProjectDetails({ callback, projectId, project })),
	removePropertyFloorplan: (callback, floorplan, id) =>
		dispatch(
			removePropertyFloorplan({
				callback,
				floorplan,
				id,
				type: 'project',
			})
		),
});

export default connect(mapStateToProps, mapActionToProps)(ProjectInfo);
