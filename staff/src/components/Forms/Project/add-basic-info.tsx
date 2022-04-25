import * as Yup from 'yup';

import { Button, CircularProgress, Grid, MenuItem } from '@material-ui/core';
import { Form, Formik, FormikHelpers } from 'formik';

import FSelect from '../../Formik/select';
import FTextField from '../../Formik/input';
import React from 'react';

interface BasicUnitInfo {
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
	city: string;
	location: string;
	amenities: Array<string>;
	thumbnailImage: File | null;
	masterFloorPlan: File | null;
	geogrophicalImage: File | null;
	lunchingDate: Date | number;
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
	city: '',
	location: '',
	amenities: [],
	thumbnailImage: null,
	masterFloorPlan: null,
	geogrophicalImage: null,
	lunchingDate: new Date(),
};

const validationSchema = Yup.object({
	projectType: Yup.mixed()
		.notOneOf(['flat', 'independenthouse', 'land'], 'Invalid project type')
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
	city: Yup.string().required('City required'),
	location: Yup.string().required('Location required'),
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
	const onSubmit = (
		values: BasicUnitInfo,
		helpers: FormikHelpers<BasicUnitInfo>
	) => {};
	return (
		<Formik
			initialValues={initialState}
			onSubmit={onSubmit}
			validationSchema={validationSchema}
			enableReinitialize
		>
			{({ isSubmitting, errors, values }) => (
				<Form>
					<pre>{JSON.stringify(errors, null, 2)}</pre>
					<pre>{JSON.stringify(values, null, 2)}</pre>
					<Grid container spacing={3}>
						<Grid item xs={6}>
							<FSelect
								name="projectType"
								label="Project Type"
								showNone={false}
								variant="outlined"
							>
								<MenuItem value="completed">Completed</MenuItem>
								<MenuItem value="upcoming">Upcoming</MenuItem>
								<MenuItem value="ongoing">Ongoing</MenuItem>
							</FSelect>
						</Grid>
						<Grid item xs={6}>
							<FTextField
								name="title"
								label="Title"
								variant="outlined"
							/>
						</Grid>
						<Grid item xs={12}>
							<FTextField
								name="description"
								label="Description"
								variant="outlined"
								rows={5}
								multiline
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
