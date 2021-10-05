import * as Yup from 'yup';

import { CircularProgress, Grid, Typography } from '@material-ui/core';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { useState } from 'react';
import { ResourceType, useRepositoryAction } from '../../hooks/useAction';

import { Button } from '../UI/Button';
import FTextField from '../Formik/input';
import { ILeadStrategy } from '../../model/leadStrategy';

export interface IAddLeadStrategyData {
	url: string;
	description: string;
	photo: File | null;
}

interface IAddLeadStrategyForm {
	onSuccess?: () => void;
	strategy: ILeadStrategy;
}

interface IStateData extends Omit<ILeadStrategy, 'photo'> {
	photo: File | string;
}

const UpdateLeadStrategyForm: React.FC<IAddLeadStrategyForm> = ({
	onSuccess,
	strategy,
}) => {
	const { setSnackbar } = useRepositoryAction(ResourceType.UI);
	const validationSchema = Yup.object({
		url: Yup.string().required('URL required'),
		description: Yup.string().required('Description required'),
		photo: Yup.mixed().required('Photo Required'),
	});

	const initialValues: IStateData = {
		...strategy,
	};

	// State
	const [loading, setLoading] = useState(false);

	const getImageUrl = (img: string | File) => {
		if (typeof img === 'string') {
			return `/assets/lead-strategies/${img}`;
		} else {
			return URL.createObjectURL(img);
		}
	};

	// Callbacks
	const onSubmit = async (
		values: IStateData,
		helpers: FormikHelpers<IStateData>
	) => {
		try {
			setLoading(true);
			// await asyncAddLeadStrategy(values);
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
				enableReinitialize
			>
				{({ errors, setFieldValue, values }) => (
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
								<img
									src={getImageUrl(values.photo)}
									alt="Poster"
									style={{
										width: '100%',
										height: 200,
										objectFit: 'contain',
									}}
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

export default UpdateLeadStrategyForm;
