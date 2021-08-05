import { Box, Button, Grid, Typography } from '@material-ui/core';
import { Field, FieldArray, Form, Formik } from 'formik';
import { addProject, updateProject } from '../../../utils/asyncProject';

import AddProjectLoader from '../../../components/addProjectLoader';
import FSelect from '../../../components/formik/select.component';
import FTextField from '../../../components/formik/textField.component';
import React from 'react';
import SearchPlace from '../../../components/searchPlace';
import UploadPhoto from '../../../components/uploadPhotos';
import axios from 'axios';
import { useCancelAxios } from '../../../hooks/useCancel';
import useGlobalStyles from '../../../common.style';
import useStyles from '../addProject.style';
import { validateNumber } from '../../../utils/validation.utils';

// import CheckBox from '../../../components/formik/checkbox.component';

const initialState = {
	projectType: 'flat',
	title: '',
	builder: '',
	complitionStatus: 'ongoing',
	description: '',

	reraId: '',
	ownerNumber: '',
	usp: '',
	bookingAmount: '',
	emi: '',
	totalLandArea: '',
	city: null,
	location: null,
	amenities: [],
	thumbnailImage: null,
	masterFloorPlan: null,
	geogrophicalImage: null,
};

const statusMenuItems = [
	{
		value: 'upcoming',
		label: 'Upcoming',
	},
	{
		value: 'ongoing',
		label: 'Ongoing',
	},
	{
		value: 'completed',
		label: 'Completed',
	},
];

const ProjectInformation = ({
	resources,
	projectType,
	handleNext,
	setProjectInfo,
}) => {
	const classes = useStyles();
	const gClasses = useGlobalStyles();
	const cancelToken = React.useRef(undefined);
	const cancelTokenImage = React.useRef(undefined);
	const [addProjectLoading, setAddProjectLoading] = React.useState(false);
	const [uploadPhotosLoading, setUploadPhotosLoading] = React.useState(false);
	const [addProjectError, setAddProjectError] = React.useState(null);
	const [photos, setPhotos] = React.useState([]);
	useCancelAxios(cancelToken.current);
	useCancelAxios(cancelTokenImage.current);
	const validate = (values) => {
		const error = {};
		if (!values.title) {
			error.title = 'Enter project name';
		}
		if (!values.builder) {
			error.builder = 'Enter builder name';
		}
		if (!values.description) {
			error.description = 'Enter Description';
		}
		if (!values.usp) {
			error.usp = 'Enter USP';
		}
		if (!values.city) {
			error.city = 'Select City';
		}
		if (!values.location) {
			error.location = 'Select Location';
		}
		if (!values.thumbnailImage) {
			error.thumbnailImage = 'Select Thumbnail Image';
		}
		if (!values.masterFloorPlan) {
			error.masterFloorPlan = 'Select Master floorplan image';
		}
		if (!values.geogrophicalImage) {
			error.geogrophicalImage = 'Select Geographical Image';
		}

		if (!validateNumber(values.bookingAmount)) {
			error.bookingAmount = 'Please enter a number';
		}
		if (!validateNumber(values.emi)) {
			error.emi = 'Please enter a number';
		}
		if (!validateNumber(values.totalLandArea)) {
			error.totalLandArea = 'Please enter a number';
		}

		if (
			values.legalClearance.find((c) => c.name === 'reraapproved') &&
			values.legalClearance.find((c) => c.name === 'reraapproved')[
				'value'
			] &&
			!values.reraId
		) {
			error.reraId = 'required';
		}
		if (
			values.legalClearance.find((c) => c.name === 'numberOfOwner') &&
			values.legalClearance.find((c) => c.name === 'numberOfOwner')[
				'value'
			] &&
			!values.ownerNumber
		) {
			error.ownerNumber = 'required';
		}

		if (values.usp.trim().length > 20) {
			error.usp = 'Max 20 characters allowed';
		}
		return error;
	};

	const addPhotos = (project, values) => {
		const formData = new FormData();
		cancelTokenImage.current = axios.CancelToken.source();
		formData.append('thumbnailImage', values.thumbnailImage);
		formData.append('masterFloorPlan', values.masterFloorPlan);
		formData.append('geogrophicalImage', values.geogrophicalImage);
		photos.forEach((c) => {
			formData.append('photos', c);
		});
		updateProject(
			project,
			formData,
			cancelTokenImage.current,
			setUploadPhotosLoading
		)
			.then((resp) => {
				setProjectInfo({
					id: project,
					towers: resp.towers,
				});
				setAddProjectError(null);
				handleNext();
			})
			.catch((error) => {
				console.log(error);
				// setAddProjectError(error);
			});
	};

	const onSubmit = (values, { setErrors }) => {
		const data = {
			...values,
			bookingAmount: Number(values.bookingAmount),
			emi: Number(values.emi),
			totalLandArea: Number(values.totalLandArea),
		};
		if (projectType === 'land') {
			const numberOfOwner = values.legalClearance.find(
				(c) => c.name === 'numberOfOwner'
			);
			if (numberOfOwner && numberOfOwner['value']) {
				data.legalClearance = values.legalClearance.map((c) => {
					if (c.name === 'numberOfOwner') {
						c.details = values.ownerNumber;
					}
					return c;
				});
			}
		} else {
			const reraApproved = values.legalClearance.find(
				(c) => c.name === 'reraapproved'
			);
			if (reraApproved && reraApproved['value']) {
				data.legalClearance = values.legalClearance.map((c) => {
					if (c.name === 'reraapproved') {
						c.details = values.reraId;
					}
					return c;
				});
			}
		}

		delete data.thumbnailImage;
		delete data.masterFloorPlan;
		delete data.geogrophicalImage;

		cancelToken.current = axios.CancelToken.source();
		addProject(data, cancelToken.current, setAddProjectLoading)
			.then((resp) => {
				setProjectInfo({
					id: resp.id,
					towers: 0,
				});
				setAddProjectError(null);
				addPhotos(resp.id, values);
			})
			.catch((error) => {
				console.log({ error });
				if (error.validation) {
					error.validationFields.forEach((c) => {
						setErrors({
							[c.param]: c.msg,
						});
					});
					setAddProjectError(error.message);
				} else {
					setAddProjectError(error.message);
				}
			});
	};

	return (
		<div>
			<AddProjectLoader
				addProjectLoading={addProjectLoading}
				addImageLoading={uploadPhotosLoading}
			/>
			<Formik
				initialValues={{
					...initialState,
					legalClearance:
						projectType === 'land'
							? resources.legalClearancesForLand
							: resources.legalClearances,
					projectType,
				}}
				enableReinitialize
				validate={validate}
				onSubmit={onSubmit}
			>
				{({ values, setFieldValue, errors }) => (
					<Form>
						{/* <pre>{JSON.stringify(errors, null, 2)}</pre> */}
						<Grid container spacing={3}>
							<Grid item xs={12} md={6}>
								<FSelect
									formLabel="Select Status"
									label="status"
									name="complitionStatus"
									options={statusMenuItems.map((c) => ({
										value: c.value,
										label: c.label,
									}))}
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<FTextField
									formLabel="Enter Project Title"
									label="Project Title"
									name="title"
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<FSelect
									formLabel="Enter Builder Name"
									label="Builder Name"
									name="builder"
									options={resources.builders.map((c) => ({
										value: c.id,
										label: c.developerName,
									}))}
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<SearchPlace
									type="city"
									onSelect={(c) => {
										setFieldValue('city', c);
										setFieldValue('location', null);
									}}
									error={errors.city}
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<SearchPlace
									type="location"
									label="Enter Location Name"
									city={values.city}
									location={values.location}
									onSelect={(c) =>
										setFieldValue('location', c)
									}
									error={errors.location}
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<FTextField
									formLabel="Enter Booking Amount"
									label="Rs"
									name="bookingAmount"
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<FTextField
									formLabel="EMI"
									label="Rs"
									name="emi"
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<FTextField
									formLabel="Total Land Area"
									label="Acres"
									name="totalLandArea"
								/>
							</Grid>

							<Grid item xs={12} md={6}>
								<FTextField
									formLabel="USP"
									label="Enter USP"
									name="usp"
								/>
							</Grid>
							{projectType !== 'land' && (
								<Grid item xs={12}>
									<h3>Amenities</h3>
									<Grid container>
										{resources.amenities.map((c, i) => {
											return (
												<Grid item lg={3}>
													<label>
														<Field
															type="checkbox"
															name="amenities"
															value={c.id}
														/>
														{c.name}
													</label>
												</Grid>
											);
										})}
									</Grid>
								</Grid>
							)}
							<Grid item xs={12}>
								<h3>Legal Clearance</h3>
								<Grid container spacing={0}>
									<FieldArray name="legalClearance">
										{(arrayHelpers) => (
											<Grid container>
												{values.legalClearance.map(
													(c, i) => {
														return (
															<Grid item lg={3}>
																{/* <CheckBox
																	key={i}
																	heading="test"
																	name={`legalClearance.${i}.value`}
																	formLabel={
																		c.label
																	}
																/> */}
																<label>
																	<Field
																		type="checkbox"
																		name={`legalClearance.${i}.value`}
																		// value={c.id}
																	/>
																	{c.label}
																</label>
															</Grid>
														);
													}
												)}
											</Grid>
										)}
									</FieldArray>
								</Grid>
							</Grid>
							{projectType !== 'land' &&
								values.legalClearance.find(
									(c) => c.name === 'reraapproved'
								) &&
								values.legalClearance.find(
									(c) => c.name === 'reraapproved'
								)['value'] && (
									<Grid item xs={12}>
										<FTextField
											formLabel="RERA ID"
											label="Enter rera ID"
											name="reraId"
										/>
									</Grid>
								)}

							{projectType === 'land' &&
								values.legalClearance.find(
									(c) => c.name === 'numberOfOwner'
								) &&
								values.legalClearance.find(
									(c) => c.name === 'numberOfOwner'
								)['value'] && (
									<Grid item xs={12}>
										<FTextField
											formLabel="Number of owners"
											label="Enter Number"
											name="ownerNumber"
										/>
									</Grid>
								)}
							<Grid item xs={12}>
								<FTextField
									formLabel="Description"
									label="Enter Description"
									name="description"
									multiline
									rows={10}
								/>
							</Grid>
							<Grid item xs={12}>
								<h3>Images</h3>
								<Grid container spacing={3}>
									<Grid item xs={12} md={3}>
										{errors.thumbnailImage && (
											<Box>
												<Typography
													variant="caption"
													className={
														gClasses.errorColor
													}
												>
													{errors.thumbnailImage}
												</Typography>
											</Box>
										)}
										<input
											type="file"
											id="thumbnail-image"
											onChange={(e) => {
												const {
													target: { files },
												} = e;
												setFieldValue(
													'thumbnailImage',
													files[0]
												);
											}}
										/>
										<label htmlFor="thumbnail-image">
											Thumbnail
										</label>

										{values.thumbnailImage && (
											<Box>
												<img
													src={URL.createObjectURL(
														values.thumbnailImage
													)}
													alt="Thumbnail"
													className={
														classes.imageWrapper
													}
												/>
											</Box>
										)}
									</Grid>
									<Grid item xs={12} md={3}>
										{errors.masterFloorPlan && (
											<Box>
												<Typography
													variant="caption"
													className={
														gClasses.errorColor
													}
												>
													{errors.masterFloorPlan}
												</Typography>
											</Box>
										)}
										<input
											type="file"
											id="master-floorplan"
											onChange={(e) => {
												const {
													target: { files },
												} = e;
												setFieldValue(
													'masterFloorPlan',
													files[0]
												);
											}}
										/>
										<label htmlFor="master-floorplan">
											Master Floorplan
										</label>
										{values.masterFloorPlan && (
											<Box>
												<img
													src={URL.createObjectURL(
														values.masterFloorPlan
													)}
													alt="Thumbnail"
													className={
														classes.imageWrapper
													}
												/>
											</Box>
										)}
									</Grid>
									<Grid item xs={12} md={3}>
										{errors.geogrophicalImage && (
											<Box>
												<Typography
													variant="caption"
													className={
														gClasses.errorColor
													}
												>
													{errors.geogrophicalImage}
												</Typography>
											</Box>
										)}
										<input
											type="file"
											id="geographical-image"
											onChange={(e) => {
												const {
													target: { files },
												} = e;
												setFieldValue(
													'geogrophicalImage',
													files[0]
												);
											}}
										/>
										<label htmlFor="geographical-image">
											Location Image
										</label>
										{values.geogrophicalImage && (
											<Box>
												<img
													src={URL.createObjectURL(
														values.geogrophicalImage
													)}
													alt="Thumbnail"
													className={
														classes.imageWrapper
													}
												/>
											</Box>
										)}
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<UploadPhoto
									photos={photos}
									setPhotos={setPhotos}
								/>
							</Grid>
							<p className={gClasses.errorColor}>
								{addProjectError}
							</p>
							<Grid item xs={12}>
								<Button
									type="submit"
									variant="contained"
									color="primary"
									size="large"
								>
									Add Project
								</Button>
							</Grid>
						</Grid>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default ProjectInformation;
