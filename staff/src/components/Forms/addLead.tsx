import * as Yup from 'yup';

import {
	Box,
	Button,
	Chip,
	CircularProgress,
	Fab,
	Grid,
	MenuItem,
	TextField,
	Typography,
} from '@material-ui/core';
import { FieldArray, Form, Formik, FormikHelpers } from 'formik';
import {
	ILead,
	LeadSource,
	LeadUserCategory,
} from '../../model/lead.interface';
import React, { useState } from 'react';
import { ResourceType, useRepositoryAction } from '../../hooks/useAction';
import { asyncAddLead, asyncCheckNumber } from '../../API/lead';

import AddIcon from '@material-ui/icons/Add';
import { City } from '../../model/city.interface';
import FCheckbox from '../../components/Formik/checkbox';
import FSelect from '../../components/Formik/select';
import FTextField from '../../components/Formik/input';
import SearchCity from '../../components/Search/city';
import { leadStatusData } from '../../utils/render';

export type AddLeadData = Omit<ILead, 'reschedules' | 'leadStatus' | 'assigns'>;

export const AddLeadForm: React.FC<{
	onSuccess: (lead: ILead) => void;
}> = ({ onSuccess }) => {
	const [checknumberLoading, setCheckNumberLoading] = useState(false);
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
			/^(\(?\+?[0-9]*\)?)?[0-9_\- ()]*$/g,
			'Invalid Number'
		),
		maxPrice: Yup.string().matches(
			/^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/g,
			'Invalid Number'
		),
	});
	const initialValues: AddLeadData = {
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
		tags: [],
		commentStatus: '',
	};

	// State
	const [loading, setLoading] = useState(false);
	const [images, setImages] = useState<any>(null);
	const [tagText, setTagText] = useState('');

	// Callbacks
	const fileSelectedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setImages(e.target.files);
		}
	};

	const onSubmit = async (
		values: AddLeadData,
		helpers: FormikHelpers<AddLeadData>
	) => {
		try {
			setLoading(true);
			const img = images ? Array.from(images) : undefined;
			const inputData = { ...values };
			if (values.city) {
				inputData.city = (values.city as City).id;
			} else {
				delete inputData.city;
			}
			const resp = await asyncAddLead(inputData, img);
			setLoading(false);
			helpers.resetForm();
			setSnackbar({
				open: true,
				message: 'Lead Posted successfully',
				severity: 'success',
			});
			onSuccess(resp);
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

	const checkNumber = async (
		number: string,
		callback: (msg: string) => void,
		setStatus: (msg: string) => void
	) => {
		try {
			setStatus('loading');
			const resp = await asyncCheckNumber(number);
			setCheckNumberLoading(false);
			if (resp.exists) {
				callback('Number already exists');
			}
			setStatus('finished');
		} catch (error) {
			setStatus('finished');
		}
	};
	return (
		<div>
			<Formik
				initialValues={initialValues}
				onSubmit={onSubmit}
				validationSchema={validationSchema}
			>
				{({
					values,
					setFieldValue,
					setFieldError,
					status,
					setStatus,
				}) => (
					<Form>
						<Grid container spacing={1}>
							<Grid item xs={12} md={6}>
								<Box display={'flex'} alignItems="center">
									<FTextField
										name={'number'}
										label="Phone Number"
										onChange={(v: any) => {
											if (v.target.value.length < 11) {
												setFieldValue(
													'number',
													v.target.value
												);
											}
											if (v.target.value.length === 10) {
												checkNumber(
													v.target.value,
													(errorMessage: any) => {
														setFieldError(
															'number',
															errorMessage
														);
													},
													(statusValue: any) => {
														setStatus(statusValue);
													}
												);
											}
										}}
									/>
									{status === 'loading' && (
										<CircularProgress
											size={20}
											color="inherit"
										/>
									)}
								</Box>
							</Grid>
							<Grid item xs={12} md={6}>
								<FSelect name={'source'} label="Source">
									<MenuItem value={LeadSource.Consultant}>
										Consultant
									</MenuItem>
									<MenuItem value={LeadSource.Outsource}>
										Outsource
									</MenuItem>
									<MenuItem value={LeadSource.SocialMedia}>
										SocialMedia
									</MenuItem>
									<MenuItem value={LeadSource.Staff}>
										Staff
									</MenuItem>
									<MenuItem value={LeadSource.Website}>
										Other Website
									</MenuItem>
									<MenuItem value={LeadSource.Homesearch}>
										Homesearch
									</MenuItem>
								</FSelect>
							</Grid>
							<Grid item xs={12} md={6}>
								<FSelect name={'userCategory'} label="Category">
									<MenuItem value={LeadUserCategory.Tenant}>
										Tenant
									</MenuItem>
									<MenuItem value={LeadUserCategory.Buyer}>
										Buyer
									</MenuItem>

									<MenuItem value={LeadUserCategory.Owner}>
										Owner
									</MenuItem>
									<MenuItem value={LeadUserCategory.Realtor}>
										Realtor
									</MenuItem>
									<MenuItem value={LeadUserCategory.Builder}>
										Builder
									</MenuItem>
									<MenuItem
										value={LeadUserCategory.Associate}
									>
										Associate
									</MenuItem>

									<MenuItem value={LeadUserCategory.Unknown}>
										Unknown
									</MenuItem>
								</FSelect>
							</Grid>
							<Grid item xs={12} md={6}>
								<FTextField name={'name'} label="Name" />
							</Grid>
							<Grid item xs={12} md={6}>
								<FTextField name={'email'} label="Email" />
							</Grid>

							<Grid item xs={12} md={6}>
								<SearchCity
									value={values.city as null | City}
									onSelect={(val) => {
										setFieldValue('city', val);
									}}
								/>
							</Grid>
							<Grid item xs={12} md={12}>
								<FTextField
									name={'preferedLocation'}
									label="Prefered Location ( Max 50 Characters)"
								/>
							</Grid>
							<Grid item xs={12}>
								<Typography
									variant="caption"
									display="block"
									align="center"
								>
									Property Types
								</Typography>
								<Grid
									container
									spacing={1}
									justifyContent="center"
								>
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
											value={'1RK'}
											label="1RK"
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
								<FSelect
									name={'commentStatus'}
									label="Comment Status"
								>
									{leadStatusData.map((c: string, i) => (
										<MenuItem key={i} value={c}>
											{c}
										</MenuItem>
									))}
								</FSelect>
							</Grid>
							<Grid item xs={12}>
								<FieldArray
									name="tags"
									render={(arrayHelpers) => (
										<>
											<Box
												display="flex"
												alignItems={'center'}
											>
												<TextField
													value={tagText}
													onChange={(e) =>
														setTagText(
															e.target.value
														)
													}
													label={'Enter a tag name'}
													variant="filled"
													size="small"
													style={{ flex: 1 }}
												/>
												<Fab
													color="default"
													size="small"
													onClick={() => {
														if (tagText) {
															arrayHelpers.push(
																tagText
															);
															setTagText('');
														}
													}}
												>
													<AddIcon />
												</Fab>
											</Box>
											<Box mt="1rem">
												{values.tags &&
													values.tags.map((c, i) => (
														<Chip
															label={c}
															onDelete={() =>
																arrayHelpers.remove(
																	i
																)
															}
															variant="outlined"
															key={i}
														/>
													))}
											</Box>
										</>
									)}
								/>
							</Grid>

							<Grid item xs={12}>
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
		</div>
	);
};
