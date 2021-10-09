import * as Yup from 'yup';

import { CircularProgress, Grid } from '@material-ui/core';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { useState } from 'react';
import { ResourceType, useRepositoryAction } from '../../hooks/useAction';

import { Button } from '../UI/Button';
import FTextField from '../Formik/input';
import { asyncCloseLead } from '../../API/lead';

export interface ICloseDealData {
	revenue: number;
	revenueFeedback: string;
}

interface ICloseDealForm {
	onSuccess?: () => void;
	id: string;
}

const CloseDealForm: React.FC<ICloseDealForm> = ({ onSuccess, id }) => {
	const { setSnackbar } = useRepositoryAction(ResourceType.UI);
	const validationSchema = Yup.object({
		revenue: Yup.string().required('Revenue required'),
		revenueFeedback: Yup.string().required('Remark required'),
	});

	const initialValues: ICloseDealData = {
		revenue: 0,
		revenueFeedback: '',
	};

	// State
	const [loading, setLoading] = useState(false);

	// Callbacks
	const onSubmit = async (
		values: ICloseDealData,
		helpers: FormikHelpers<ICloseDealData>
	) => {
		try {
			setLoading(true);
			await asyncCloseLead(id, values);
			setLoading(false);
			helpers.resetForm();
			if (onSuccess) {
				onSuccess();
			}
			setSnackbar({
				open: true,
				message: 'Deal Closed successfully',
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
								<FTextField
									name={'revenue'}
									label="Revenue"
									type="number"
								/>
							</Grid>
							<Grid item xs={12}>
								<FTextField
									name={'revenueFeedback'}
									label="Remark"
									rows={6}
									multiline
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

export default CloseDealForm;
