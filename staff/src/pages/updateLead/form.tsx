import * as Yup from 'yup';

import { Button, CircularProgress, Grid } from '@material-ui/core';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { useState } from 'react';
import { ResourceType, useRepositoryAction } from '../../hooks/useAction';

import ClientRequirement from './requirement';
import FTextField from '../../components/Formik/input';
import { ILead } from '../../model/lead.interface';
import { PageWrapper } from '../../components/UI/Container';
import Typography from '@material-ui/core/Typography';
import { asyncUpdateLead } from '../../API/lead';

interface IUpdateLeadForm {
	initialValues: ILead;
	id: string;
}

const UpdateLeadForm: React.FC<IUpdateLeadForm> = ({ initialValues, id }) => {
	const { setSnackbar } = useRepositoryAction(ResourceType.UI);
	const validationSchema = Yup.object({
		name: Yup.string().matches(/^[a-zA-Z ]+$/, 'Invalid Name'),
		email: Yup.string().email('Invalid email'),
		number: Yup.string()
			.length(10, '10 digits required')
			.matches(/^\d{10}$/, 'Invalid Number')
			.required('Phone number required'),
	});

	// State
	const [loading, setLoading] = useState(false);

	const onSubmit = async (values: ILead, helpers: FormikHelpers<ILead>) => {
		try {
			setLoading(true);
			await asyncUpdateLead(id, values);
			setLoading(false);
			helpers.resetForm();
			setSnackbar({
				open: true,
				message: 'Lead Updated successfully',
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
				<Typography variant="h5" gutterBottom>
					Update Lead
				</Typography>
				<Formik
					initialValues={initialValues}
					onSubmit={onSubmit}
					validationSchema={validationSchema}
					enableReinitialize
				>
					{() => (
						<Form>
							<Grid container spacing={1}>
								<Grid item xs={12} md={4}>
									<FTextField name={'name'} label="Name" />
								</Grid>
								<Grid item xs={12} md={4}>
									<FTextField name={'email'} label="Email" />
								</Grid>
								<Grid item xs={12} md={4}>
									<FTextField
										name={'number'}
										label="Phone Number"
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
									<ClientRequirement />
								</Grid>

								<Grid item xs={12}>
									<FTextField
										name={'feedback'}
										multiline={true}
										rows={5}
										label="Client Feedback"
									/>
								</Grid>

								<Grid item xs={12}>
									<Button
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
			</PageWrapper>
		</div>
	);
};

export default UpdateLeadForm;
