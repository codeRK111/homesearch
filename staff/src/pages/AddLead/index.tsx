import * as Yup from 'yup';

import {
	Button,
	CircularProgress,
	Container,
	Grid,
	IconButton,
	MenuItem,
	Typography,
} from '@material-ui/core';
import { Form, Formik, FormikHelpers } from 'formik';
import {
	ILead,
	LeadSource,
	LeadUserCategory,
} from '../../model/lead.interface';
import React, { useRef, useState } from 'react';
import { ResourceType, useRepositoryAction } from '../../hooks/useAction';

import { City } from '../../model/city.interface';
import CloseIcon from '@material-ui/icons/Close';
import FCheckbox from '../../components/Formik/checkbox';
import FSelect from '../../components/Formik/select';
import FTextField from '../../components/Formik/input';
import { PageWrapper } from '../../components/UI/Container';
import SearchCity from '../../components/Search/city';
import { SpaceBetween } from '../../components/UI/Flex';
import { asyncAddLead } from '../../API/lead';

const AddLeadPage = () => {
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
		minPrice: Yup.string().matches(
			/^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/g,
			'Invalid Number'
		),
		maxPrice: Yup.string().matches(
			/^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/g,
			'Invalid Number'
		),
	});
	const initialValues: ILead = {
		name: '',
		source: LeadSource.Staff,
		email: '',
		number: '',
		message: '',
		preferedLocation: '',
		userCategory: LeadUserCategory.Unknown,
		minPrice: 0,
		maxPrice: 0,
		propertyRequirements: [],
		city: null,
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

	const onSubmit = async (values: ILead, helpers: FormikHelpers<ILead>) => {
		try {
			setLoading(true);
			const img = images ? Array.from(images) : undefined;
			const inputData = { ...values };
			if (values.city) {
				inputData.city = (values.city as City).id;
			} else {
				delete inputData.city;
			}
			await asyncAddLead(inputData, img);
			setLoading(false);
			helpers.resetForm();
			setSnackbar({
				open: true,
				message: 'Lead Posted successfully',
				severity: 'success',
			});
		} catch (err: any) {
			console.log(err);
			setLoading(false);
			setSnackbar({
				open: true,
				message: err.message,
				severity: 'error',
			});
		}
	};
	return (
		<div>
			<PageWrapper>
				<Container>
					<Typography variant="h4" gutterBottom align="center">
						Add Lead
					</Typography>
					<Formik
						initialValues={initialValues}
						onSubmit={onSubmit}
						validationSchema={validationSchema}
					>
						{({ values, setFieldValue }) => (
							<Form>
								<Grid container spacing={1}>
									<Grid item xs={12} md={6}>
										<FSelect name={'source'} label="Source">
											<MenuItem
												value={LeadSource.Consultant}
											>
												Consultant
											</MenuItem>
											<MenuItem
												value={LeadSource.Outsource}
											>
												Outsource
											</MenuItem>
											<MenuItem
												value={LeadSource.SocialMedia}
											>
												SocialMedia
											</MenuItem>
											<MenuItem value={LeadSource.Staff}>
												Staff
											</MenuItem>
											<MenuItem
												value={LeadSource.Website}
											>
												Other Website
											</MenuItem>
											<MenuItem
												value={LeadSource.Homesearch}
											>
												Homesearch
											</MenuItem>
										</FSelect>
									</Grid>
									<Grid item xs={12} md={6}>
										<FSelect
											name={'userCategory'}
											label="Category"
										>
											<MenuItem
												value={LeadUserCategory.Tenant}
											>
												Tenant
											</MenuItem>
											<MenuItem
												value={LeadUserCategory.Buyer}
											>
												Buyer
											</MenuItem>

											<MenuItem
												value={LeadUserCategory.Owner}
											>
												Owner
											</MenuItem>
											<MenuItem
												value={LeadUserCategory.Realtor}
											>
												Realtor
											</MenuItem>
											<MenuItem
												value={LeadUserCategory.Builder}
											>
												Builder
											</MenuItem>

											<MenuItem
												value={LeadUserCategory.Unknown}
											>
												Unknown
											</MenuItem>
										</FSelect>
									</Grid>
									<Grid item xs={12}>
										<FTextField
											name={'name'}
											label="Name"
										/>
									</Grid>
									<Grid item xs={12}>
										<FTextField
											name={'email'}
											label="Email"
										/>
									</Grid>
									<Grid item xs={12}>
										<FTextField
											name={'number'}
											label="Phone Number"
										/>
									</Grid>
									<Grid item xs={12}>
										<SearchCity
											value={values.city as null | City}
											onSelect={(val) => {
												setFieldValue('city', val);
											}}
										/>
									</Grid>
									<Grid item xs={12}>
										<FTextField
											name={'preferedLocation'}
											label="Prefered Location ( Max 50 Characters)"
										/>
									</Grid>
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
										<FTextField
											name={'minPrice'}
											label="Min Budget"
										/>
									</Grid>
									<Grid item xs={6}>
										<FTextField
											name={'maxPrice'}
											label="Max Budget"
										/>
									</Grid>
									<Grid item xs={12}>
										<FTextField
											name={'message'}
											multiline={true}
											rows={5}
											label="Message"
										/>
									</Grid>
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
															inputEl.current.value =
																'';
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
				</Container>
			</PageWrapper>
		</div>
	);
};

export default AddLeadPage;
