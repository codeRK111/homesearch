import { Box, Button, Grid } from '@material-ui/core';
import { Field, FieldArray, Form, Formik } from 'formik';

import FSelect from '../../../components/formik/select.component';
import FTextField from '../../../components/formik/textField.component';
import React from 'react';
import SearchPlace from '../../../components/searchPlace';
import useStyles from '../addProject.style';

// import CheckBox from '../../../components/formik/checkbox.component';

const initialState = {
	projectType: 'flat',
	title: '',
	builder: '',
	complitionStatus: 'ongoing',
	description: '',
	distanceSchool: '',
	distanceRailwayStation: '',
	distanceAirport: '',
	distanceBusStop: '',
	distanceHospital: '',
	reraId: '',
	ownerNumber: '',
	usp: '',
	towers: '',
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

const ProjectInformation = ({ resources, projectType }) => {
	const classes = useStyles();
	const validate = (values) => {
		const error = {};
		return error;
	};

	const onSubmit = (values) => {};
	console.log({ resources });
	return (
		<div>
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
				{({ values, setFieldValue, resetForm }) => (
					<Form>
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
									formLabel="Number of towers"
									label="Enter Number"
									name="towers"
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
								) && (
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
