import * as Yup from 'yup';

import { CircularProgress, Grid } from '@material-ui/core';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { useState } from 'react';
import { ResourceType, useRepositoryAction } from '../../hooks/useAction';

import { Button } from '../UI/Button';
import FTextField from '../Formik/input';

export interface ICreatePaymentLinkData {
	amount: string;
	name: string;
	phone: string;
	notes: string;
}

interface IAddLeadStrategyForm {
	onSuccess?: () => void;
}

const CreatePaymentLinkForm: React.FC<IAddLeadStrategyForm> = ({
	onSuccess,
}) => {
	const { setSnackbar } = useRepositoryAction(ResourceType.UI);
	const validationSchema = Yup.object({
		amount: Yup.string().required('amount required'),
		phone: Yup.string()
			.length(10, '10 digits required')
			.matches(/^\d{10}$/, 'Invalid Number'),
	});

	const initialValues: ICreatePaymentLinkData = {
		amount: '',
		name: '',
		phone: '',
		notes: '',
	};

	// State
	const [loading, setLoading] = useState(false);

	// Callbacks
	const onSubmit = async (
		values: ICreatePaymentLinkData,
		helpers: FormikHelpers<ICreatePaymentLinkData>
	) => {
		try {
		} catch (err: any) {}
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
								<FTextField name={'amount'} label="Amount *" />
							</Grid>
							<Grid item xs={12}>
								<FTextField name={'name'} label="Client Name" />
							</Grid>
							<Grid item xs={12}>
								<FTextField
									name={'phone'}
									label="Client Phone Number"
								/>
							</Grid>
							<Grid item xs={12}>
								<FTextField
									name={'notes'}
									label="Notes"
									rows={5}
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

export default CreatePaymentLinkForm;
