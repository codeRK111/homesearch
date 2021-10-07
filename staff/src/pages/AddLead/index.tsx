import * as Yup from 'yup';

import {
	Button,
	CircularProgress,
	Container,
	Grid,
	MenuItem,
	Typography,
} from '@material-ui/core';
import { Form, Formik, FormikHelpers } from 'formik';
import {
	ILead,
	LeadSource,
	LeadUserCategory,
} from '../../model/lead.interface';
import React, { useState } from 'react';
import { ResourceType, useRepositoryAction } from '../../hooks/useAction';

import FSelect from '../../components/Formik/select';
import FTextField from '../../components/Formik/input';
import { PageWrapper } from '../../components/UI/Container';
import { asyncAddLead } from '../../API/lead';

const AddLeadPage = () => {
	const { setSnackbar } = useRepositoryAction(ResourceType.UI);
	const validationSchema = Yup.object({
		source: Yup.mixed()
			.oneOf([
				LeadSource.Consultant,
				LeadSource.Outsource,
				LeadSource.SocialMedia,
				LeadSource.Staff,
				LeadSource.Website,
			])
			.required('Source of lead required'),
		name: Yup.string().matches(/^[a-zA-Z ]+$/, 'Invalid Name'),
		email: Yup.string().email('Invalid email'),
		number: Yup.string()
			.length(10, '10 digits required')
			.matches(/^\d{10}$/, 'Invalid Number')
			.required('Phone number required'),
	});
	const initialValues: ILead = {
		name: '',
		source: LeadSource.Staff,
		email: '',
		number: '',
		message: '',
		preferedLocation: '',
		userCategory: LeadUserCategory.Unknown,
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
			await asyncAddLead(values, img);
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
						{() => (
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
												Website
											</MenuItem>
										</FSelect>
									</Grid>
									<Grid item xs={12} md={6}>
										<FSelect
											name={'userCategory'}
											label="Category"
										>
											<MenuItem
												value={LeadUserCategory.Builder}
											>
												Builder
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
												value={LeadUserCategory.Tenant}
											>
												Tenant
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
										<FTextField
											name={'preferedLocation'}
											label="Prefered Location"
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
										<input
											type="file"
											multiple
											onChange={fileSelectedHandler}
										/>
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
