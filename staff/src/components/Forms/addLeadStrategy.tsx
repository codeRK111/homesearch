import * as Yup from 'yup';

import { CircularProgress, Grid, Typography } from '@material-ui/core';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { useState } from 'react';
import { ResourceType, useRepositoryAction } from '../../hooks/useAction';

import { Button } from '../UI/Button';
import FTextField from '../Formik/input';
import { asyncAddLeadStrategy } from '../../API/leadStrategy';

export interface IAddLeadStrategyData {
	url: string;
	description: string;
	photo: File | null;
}

interface IAddLeadStrategyForm {
	onSuccess?: () => void;
}

const AddLeadStrategyForm: React.FC<IAddLeadStrategyForm> = ({ onSuccess }) => {
	const { setSnackbar } = useRepositoryAction(ResourceType.UI);
	const validationSchema = Yup.object({
		url: Yup.string().required('URL required'),
		description: Yup.string().required('Description required'),
		photo: Yup.mixed().required('Photo Required'),
	});

	const initialValues: IAddLeadStrategyData = {
		url: '',
		description: '',
		photo: null,
	};

	// State
	const [loading, setLoading] = useState(false);

	// Callbacks
	const onSubmit = async (
		values: IAddLeadStrategyData,
		helpers: FormikHelpers<IAddLeadStrategyData>
	) => {
		try {
			setLoading(true);
			await asyncAddLeadStrategy(values);
			setLoading(false);
			helpers.resetForm();
			if (onSuccess) {
				onSuccess();
			}
			setSnackbar({
				open: true,
				message: 'Strategy Posted successfully',
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
			<Formik
				initialValues={initialValues}
				onSubmit={onSubmit}
				validationSchema={validationSchema}
			>
				{({ errors, setFieldValue }) => (
					<Form>
						<Grid container spacing={1}>
							<Grid item xs={12}>
								<FTextField name={'url'} label="URL" />
							</Grid>
							<Grid item xs={12}>
								<FTextField
									name={'description'}
									label="Description"
									rows={5}
									multiline
								/>
							</Grid>

							<Grid item xs={12}>
								{errors.photo && (
									<Typography
										color="error"
										variant="caption"
										display="block"
										gutterBottom
									>
										{errors.photo}
									</Typography>
								)}
								<input
									type="file"
									onChange={(e) => {
										if (e.target.files) {
											setFieldValue(
												'photo',
												e.target.files[0]
											);
										}
									}}
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
		</div>
	);
};

export default AddLeadStrategyForm;
