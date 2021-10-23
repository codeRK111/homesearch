import * as Yup from 'yup';

import {
	Button,
	CircularProgress,
	Grid,
	IconButton,
	Typography,
} from '@material-ui/core';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { useRef, useState } from 'react';
import { ResourceType, useRepositoryAction } from '../../hooks/useAction';

import { AddPropertyLeadData } from '../../model/propertyLead.interface';
import { City } from '../../model/city.interface';
import CloseIcon from '@material-ui/icons/Close';
import FCheckbox from '../Formik/checkbox';
import FRadio from '../Formik/radio';
import FTextField from '../Formik/input';
import { LeadSource } from '../../model/lead.interface';
import { Location } from '../../model/location.interface';
import SearchCity from '../Search/city';
import SearchLocation from '../Search/location';
import { SpaceBetween } from '../UI/Flex';

const AddPropertyLeadForm = () => {
	const inputEl = useRef<null | HTMLInputElement>(null);
	const { setSnackbar } = useRepositoryAction(ResourceType.UI);
	const validationSchema = Yup.object({
		source: Yup.mixed()
			.oneOf([
				LeadSource.Consultant,
				LeadSource.Outsource,
				LeadSource.SocialMedia,
				LeadSource.Staff,
				LeadSource.Website,
				LeadSource.Homesearch,
			])
			.required('Source of lead required'),
		name: Yup.string(),
		preferedLocation: Yup.string().max(50, 'Max 50 characters allowed'),
		email: Yup.string().email('Invalid email'),
		number: Yup.string()
			.length(10, '10 digits required')
			.matches(/^\d{10}$/, 'Invalid Number')
			.required('Phone number required'),
	});
	const initialValues: AddPropertyLeadData = {
		name: '',
		email: '',
		number: '',
		location: null,
		minPrice: 0,
		maxPrice: 0,
		propertyRequirements: [],
		availableFor: [],
		city: null,
		for: 'rent',
		photos: [],
	};

	// State
	const [loading, setLoading] = useState(false);
	const [images, setImages] = useState<any>(null);

	// Callbacks
	const fileSelectedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setImages(e.target.files);
		}
	};

	const onSubmit = async (
		values: AddPropertyLeadData,
		helpers: FormikHelpers<AddPropertyLeadData>
	) => {};
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={validationSchema}
		>
			{({ values, setFieldValue, touched, errors }) => (
				<Form>
					<Grid container spacing={1}>
						<Grid item xs={12}>
							<FRadio
								row
								groupLabel="Property For"
								name={'for'}
								options={[
									{
										label: 'Rent',
										value: 'rent',
									},
									{
										label: 'Sale',
										value: 'sale',
									},
								]}
							/>
						</Grid>
						<Grid item xs={12}>
							<FTextField name={'name'} label="Name" />
						</Grid>
						<Grid item xs={12}>
							<FTextField name={'email'} label="Email" />
						</Grid>
						<Grid item xs={12}>
							<FTextField name={'number'} label="Phone Number" />
						</Grid>
						<Grid item xs={12}>
							<SearchCity
								label="Enter City "
								error={touched.city ? errors.city : ''}
								value={values.city}
								onSelect={(value: City | null) => {
									setFieldValue('city', value);
								}}
							/>
						</Grid>
						{values.city && values.city.id && (
							<Grid item xs={12}>
								<SearchLocation
									label="Enter Location "
									value={values.location}
									city={values.city.id}
									error={
										touched.location ? errors.location : ''
									}
									onSelect={(value: Location | null) => {
										setFieldValue('location', value);
									}}
								/>
							</Grid>
						)}
						<Grid item xs={12}>
							<Typography variant="caption">
								Property Types
							</Typography>
							<Grid container spacing={1}>
								<Grid item>
									<FCheckbox
										type="checkbox"
										name="propertyRequirements"
										value={'Flat'}
										label="Flat"
									/>
								</Grid>
								<Grid item>
									<FCheckbox
										type="checkbox"
										name="propertyRequirements"
										value={'Duplex'}
										label="Duplex"
									/>
								</Grid>
								<Grid item>
									<FCheckbox
										type="checkbox"
										name="propertyRequirements"
										value={'1BHK'}
										label="1BHK"
									/>
								</Grid>
								<Grid item>
									<FCheckbox
										type="checkbox"
										name="propertyRequirements"
										value={'2BHK'}
										label="2BHK"
									/>
								</Grid>
								<Grid item>
									<FCheckbox
										type="checkbox"
										name="propertyRequirements"
										value={'3BHK'}
										label="3BHK"
									/>
								</Grid>
								<Grid item>
									<FCheckbox
										type="checkbox"
										name="propertyRequirements"
										value={'4BHK'}
										label="4BHK"
									/>
								</Grid>
								<Grid item>
									<FCheckbox
										type="checkbox"
										name="propertyRequirements"
										value={'Fully Furnished'}
										label="Fully Furnished"
									/>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={6}>
							<FTextField name={'minPrice'} label="Min Budget" />
						</Grid>
						<Grid item xs={6}>
							<FTextField name={'maxPrice'} label="Max Budget" />
						</Grid>
						{values.for === 'rent' && (
							<Grid item xs={12}>
								<Typography variant="caption">
									Available For
								</Typography>
								<Grid container spacing={1}>
									<Grid item>
										<FCheckbox
											type="checkbox"
											name="availableFor"
											value={'Family'}
											label="Family"
										/>
									</Grid>
									<Grid item>
										<FCheckbox
											type="checkbox"
											name="availableFor"
											value={'Bachelors (Men)'}
											label="Bachelors (Men)"
										/>
									</Grid>
									<Grid item>
										<FCheckbox
											type="checkbox"
											name="availableFor"
											value={'Bachelors (Women)'}
											label="Bachelors (Women)"
										/>
									</Grid>
									<Grid item>
										<FCheckbox
											type="checkbox"
											name="availableFor"
											value={'Job holder (Men)'}
											label="Job holder (Men)"
										/>
									</Grid>
									<Grid item>
										<FCheckbox
											type="checkbox"
											name="availableFor"
											value={'Job holder (Men)'}
											label="Job holder (Women)"
										/>
									</Grid>
								</Grid>
							</Grid>
						)}
						<Grid item xs={12}>
							<SpaceBetween>
								<input
									type="file"
									multiple
									ref={inputEl}
									onChange={fileSelectedHandler}
								/>
								{images && (
									<IconButton
										onClick={() => {
											setImages(null);
											if (inputEl.current) {
												inputEl.current.value = '';
											}
										}}
									>
										<CloseIcon />
									</IconButton>
								)}
							</SpaceBetween>
						</Grid>
						<Grid item xs={12} md={2}>
							<Button
								fullWidth
								variant={'contained'}
								color={'primary'}
								size={'large'}
								type={'submit'}
								disabled={loading}
								endIcon={
									loading ? (
										<CircularProgress
											size={20}
											color={'inherit'}
										/>
									) : (
										<></>
									)
								}
							>
								Submit
							</Button>
						</Grid>
					</Grid>
				</Form>
			)}
		</Formik>
	);
};

export default AddPropertyLeadForm;
