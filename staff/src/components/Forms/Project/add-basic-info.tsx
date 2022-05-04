import * as Yup from 'yup';

import {
	AddProjectPageResponse,
	asyncGetAddProjectPageResources,
} from '../../../API/page';
import {
	Box,
	Button,
	CircularProgress,
	Grid,
	MenuItem,
	TextField,
	Typography,
} from '@material-ui/core';
import { Field, FieldArray, Form, Formik, FormikHelpers } from 'formik';
import React, { useEffect, useState } from 'react';

import { City } from '../../../model/city.interface';
import FSelect from '../../Formik/select';
import FTextField from '../../Formik/input';
import { FetchBuildersResponseType } from '../../../API/builder';
import { Location } from '../../../model/location.interface';
import { MonthYearPicker } from '../../Pickers/monthYear';
import { PLegalClearance } from '../../../model/property.interface';
import SearchCity from '../../Search/city';
import SearchLocation from '../../Search/location';
import { UploadBulkPhoto } from '../../uploadPhotos';
import { asyncAddProjectBasicInfo } from '../../../API/project';
import { getEmbedId } from '../../../utils/render';
import { sanitizeToSubmit } from './data.sanitize';
import useStyles from './project.style';

export interface BasicUnitInfo {
	projectType: 'flat' | 'independenthouse' | 'land';
	title: string;
	builder: string;
	complitionStatus: 'ongoing' | 'upcoming' | 'completed';
	description: string;
	reraId: string;
	ownerNumber: string;
	usp: string;
	bookingAmount: string;
	emi: string;
	totalLandArea: string;
	city: null | City;
	location: null | Location;
	amenities: Array<string>;
	thumbnailImage: File | null;
	masterFloorPlan: File | null;
	geogrophicalImage: File | null;
	lunchingDate: Date | null;
	photos: Array<File>;
	legalClearancesForLand: PLegalClearance[];
	legalClearances: PLegalClearance[];
	virtualTours: Array<string>;
}

const initialState: BasicUnitInfo = {
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
	lunchingDate: new Date(),
	photos: [],
	legalClearancesForLand: [],
	legalClearances: [],
	virtualTours: [],
};

const validationSchema = Yup.object({
	projectType: Yup.mixed()
		.oneOf(['flat', 'independenthouse', 'land'], 'Invalid project type')
		.required('Project type required'),
	title: Yup.string().required('Title required'),
	builder: Yup.string().required('Builder required'),
	complitionStatus: Yup.mixed().oneOf(
		['ongoing', 'upcoming', 'completed'],
		'Complition status required'
	),
	description: Yup.string().required('Description required'),
	bookingAmount: Yup.number()
		.integer('Invalid booking amount')
		.required('Booking amount required'),
	city: Yup.mixed().required('City required'),
	location: Yup.mixed().required('Location required'),
	thumbnailImage: Yup.mixed().required('Thumbnail image required'),
	masterFloorPlan: Yup.mixed().required('Master floorplan image required'),
	geogrophicalImage: Yup.mixed().required('Geographical image required'),
	totalLandArea: Yup.number()
		.integer('Invalid land area')
		.required('Land area  required'),
	lunchingDate: Yup.date().when('complitionStatus', (status, schema) => {
		if (['ongoing', 'upcoming'].includes(status)) {
			return schema.required('Lunching date required');
		}
	}),
});

export const AddBasicProjectInfoForm = () => {
	const style = useStyles();
	const [buildersData, setBuildersData] = useState<FetchBuildersResponseType>(
		{
			builders: [],
			totalDocs: 0,
		}
	);
	const [pageData, setPageData] = useState<AddProjectPageResponse>({
		amenities: [],
		furnishes: [],
		legalClearancesForLand: [],
		legalClearances: [],
		builders: [],
	});
	const [virtualTour, setVirtualTour] = useState('');
	useEffect(() => {
		(async () => {
			try {
				const resp = await asyncGetAddProjectPageResources();
				console.log({ resp });
				if (resp) {
					setPageData(resp);
				}
			} catch (error: any) {
				console.log(error.message);
			}
		})();
	}, []);
	const onSubmit = async (
		values: BasicUnitInfo,
		helpers: FormikHelpers<BasicUnitInfo>
	) => {
		const data = sanitizeToSubmit(values);
		try {
			helpers.setSubmitting(true);
			const resp = await asyncAddProjectBasicInfo(data);
			console.log({ resp });

			helpers.setSubmitting(false);
		} catch (error) {
			helpers.setSubmitting(false);
			console.log({ error });
		}
	};

	const renderReraText = (values: BasicUnitInfo) => {
		if (values.projectType === 'land') {
			return <></>;
		}
		let reraClearnace = values.legalClearances.find(
			(c) => c.name === 'reraapproved'
		);
		if (reraClearnace && reraClearnace.value) {
			return (
				<Grid item xs={12}>
					<FTextField label="Enter rera ID" name="reraId" />
				</Grid>
			);
		}
	};
	const renderOwnerNumber = (values: BasicUnitInfo) => {
		let ownerNumberClearance = values.legalClearancesForLand.find(
			(c) => c.name === 'numberOfOwner'
		);

		if (values.projectType !== 'land') {
			return <></>;
		}

		if (ownerNumberClearance && ownerNumberClearance.value) {
			return (
				<Grid item xs={12}>
					<FTextField
						label="Enter owner phone number"
						name="ownerNumber"
					/>
				</Grid>
			);
		}
	};

	const renderVirtualTours = (values: BasicUnitInfo) => {
		return (
			<FieldArray name="virtualTours">
				{(arrayHelpers) => (
					<Box width="100%" p="1rem">
						<Typography variant="h6" gutterBottom>
							Add Virtual Tour
						</Typography>
						<Box mb="1rem">
							<TextField
								label="Youtube Link"
								variant="filled"
								value={virtualTour}
								onChange={(e) => setVirtualTour(e.target.value)}
								fullWidth
							/>
							<Button
								type="button"
								variant="contained"
								color="primary"
								size="small"
								onClick={() => {
									if (virtualTour) {
										arrayHelpers.push(virtualTour);
										setVirtualTour('');
									}
								}}
							>
								Add
							</Button>
						</Box>
						<Grid container spacing={3}>
							{values.virtualTours.map((c, i) => {
								return (
									<Grid item xs={12} md={3}>
										<iframe
											width="100%"
											height="300"
											src={`https://www.youtube.com/embed/${getEmbedId(
												c
											)}`}
											frameBorder="0"
											allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
											allowFullScreen
											title="Embedded youtube"
										/>
										<Button
											type="button"
											variant="contained"
											color="secondary"
											size="small"
											fullWidth
											onClick={() => {
												arrayHelpers.remove(i);
											}}
										>
											Remove
										</Button>
									</Grid>
								);
							})}
						</Grid>
					</Box>
				)}
			</FieldArray>
		);
	};
	return (
		<Formik
			initialValues={{
				...initialState,
				legalClearances: pageData.legalClearances,
				legalClearancesForLand: pageData.legalClearancesForLand,
			}}
			onSubmit={onSubmit}
			validationSchema={validationSchema}
			enableReinitialize
		>
			{({ isSubmitting, errors, values, setFieldValue }) => (
				<Form>
					{/* <pre>{JSON.stringify(errors, null, 2)}</pre>
					<pre>{JSON.stringify(values, null, 2)}</pre> */}
					<Grid container spacing={3}>
						<Grid item xs={6}>
							<FSelect
								name="projectType"
								label="Project Type"
								showNone={false}
							>
								<MenuItem value="flat">
									Flat / Apartment
								</MenuItem>
								<MenuItem value="independenthouse">
									Villa
								</MenuItem>
								<MenuItem value="land">Land</MenuItem>
							</FSelect>
						</Grid>

						<Grid item xs={6}>
							<FSelect
								name="complitionStatus"
								label="Completion Status"
								showNone={false}
							>
								<MenuItem value="upcoming">Upcoming</MenuItem>
								<MenuItem value="ongoing">Ongoing</MenuItem>
								<MenuItem value="completed">Completed</MenuItem>
							</FSelect>
						</Grid>
						{values.complitionStatus !== 'completed' && (
							<Grid item xs={6}>
								<MonthYearPicker
									date={values.lunchingDate}
									handleDateChange={(date: Date | null) => {
										setFieldValue('lunchingDate', date);
									}}
									label="Choose Lunching Date"
								/>
							</Grid>
						)}
						<Grid item xs={12}>
							<FSelect
								name="builder"
								label="Builder"
								showNone={false}
							>
								{pageData.builders.map((c) => (
									<MenuItem key={c.id} value={c.id}>
										{c.developerName}
									</MenuItem>
								))}
							</FSelect>
						</Grid>
						<Grid item xs={12}>
							<FTextField name="title" label="Title" />
						</Grid>
						<Grid item xs={12}>
							<FTextField
								name="description"
								label="Description"
								rows={5}
								multiline
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<SearchCity
								value={values.city as null | City}
								onSelect={(val) => {
									setFieldValue('city', val);
								}}
							/>
						</Grid>
						{values.city && (
							<Grid item xs={12}>
								<SearchLocation
									city={values.city.id}
									label="Search By Location"
									onSelect={(value: Location | null) => {
										setFieldValue('location', value);
									}}
									value={values.location}
								/>
							</Grid>
						)}
						<Grid item xs={12} md={6}>
							<FTextField
								name="bookingAmount"
								label="Booking Amount"
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<FTextField name="emi" label="EMI" />
						</Grid>
						<Grid item xs={12} md={6}>
							<FTextField
								name="totalLandArea"
								label="Total Land Area"
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<FTextField name="usp" label="USP" />
						</Grid>
						<Grid item xs={12}>
							<h3>Amenities</h3>
							<Grid container>
								{pageData.amenities.map((c, i) => {
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
						<Grid item xs={12}>
							<h3>Legal Clearance</h3>
							<Grid container spacing={0}>
								<FieldArray
									name={
										values.projectType === 'land'
											? 'legalClearancesForLand'
											: 'legalClearances'
									}
								>
									{(arrayHelpers) => (
										<Grid container>
											{values[
												values.projectType === 'land'
													? 'legalClearancesForLand'
													: 'legalClearances'
											].map((c, i) => {
												return (
													<Grid item lg={3}>
														<label>
															<Field
																type="checkbox"
																name={
																	values.projectType ===
																	'land'
																		? `legalClearancesForLand.${i}.value`
																		: `legalClearances.${i}.value`
																}
																// value={c.id}
															/>
															{c.label}
														</label>
													</Grid>
												);
											})}
										</Grid>
									)}
								</FieldArray>
							</Grid>
						</Grid>
						{renderReraText(values)}
						{renderOwnerNumber(values)}
						{renderVirtualTours(values)}
						<Grid item xs={12}>
							<Grid item xs={12}>
								<h3>Images</h3>
								<Grid container spacing={3}>
									<Grid item xs={12} md={3}>
										{errors.thumbnailImage && (
											<Box>
												<Typography variant="caption">
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
													files ? files[0] : null
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
														style.imageWrapper
													}
												/>
											</Box>
										)}
									</Grid>
									<Grid item xs={12} md={3}>
										{errors.masterFloorPlan && (
											<Box>
												<Typography variant="caption">
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
													files ? files[0] : null
												);
											}}
										/>
										<label htmlFor="master-floorplan">
											Master floor plan
										</label>
										{values.masterFloorPlan && (
											<Box>
												<img
													src={URL.createObjectURL(
														values.masterFloorPlan
													)}
													alt="Thumbnail"
													className={
														style.imageWrapper
													}
												/>
											</Box>
										)}
									</Grid>
									<Grid item xs={12} md={3}>
										{errors.geogrophicalImage && (
											<Box>
												<Typography variant="caption">
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
													files ? files[0] : null
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
														style.imageWrapper
													}
												/>
											</Box>
										)}
									</Grid>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={12}>
							<UploadBulkPhoto
								photos={values.photos}
								setPhotos={(photos: Array<File>) => {
									setFieldValue('photos', photos);
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							<Button
								type="submit"
								disabled={isSubmitting}
								variant="contained"
								size="large"
								color="primary"
								fullWidth
								endIcon={
									isSubmitting ? (
										<CircularProgress
											size={20}
											color="inherit"
										/>
									) : (
										<></>
									)
								}
							>
								Submit & Proceed
							</Button>
						</Grid>
					</Grid>
				</Form>
			)}
		</Formik>
	);
};
