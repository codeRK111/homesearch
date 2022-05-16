import * as Yup from 'yup';

import { Box, Button, CircularProgress } from '@material-ui/core';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { useState } from 'react';
import { ResourceType, useRepositoryAction } from '../../hooks/useAction';

import FTextField from '../../components/Formik/input';
import SendIcon from '@material-ui/icons/Send';
import { asyncAddLeadMessage } from '../../API/lead';

interface IAddLeadComment {
	id: string;
	onSuccess?: (val?: any) => void;
}

export const AddLeadComment: React.FC<IAddLeadComment> = ({
	id,
	onSuccess,
}) => {
	// State
	const [loading, setLoading] = useState(false);

	const { setSnackbar } = useRepositoryAction(ResourceType.UI);
	const validationSchema = Yup.object({
		message: Yup.string().required('Please enter a message'),
	});
	const initialValues: any = {
		message: '',
	};
	const onSubmit = async (values: any, helpers: FormikHelpers<any>) => {
		try {
			setLoading(true);
			helpers.resetForm();
			const updatedLead = await asyncAddLeadMessage(id, values.message);
			setLoading(false);
			if (onSuccess) {
				onSuccess(updatedLead);
			}
			setSnackbar({
				open: true,
				message: 'Message Posted Successfully',
				severity: 'success',
			});
		} catch (err: any) {
			setLoading(false);
			setSnackbar({
				open: true,
				message: err.message,
				severity: 'error',
			});
		}
	};
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={validationSchema}
		>
			{({ values, setFieldValue, errors }) => (
				<Form>
					<Box display="flex">
						<Box flex={1}>
							<FTextField
								name={'message'}
								label="Enter Message"
							/>
						</Box>
						<Button
							variant="contained"
							color="primary"
							type="submit"
							disabled={loading}
						>
							{loading ? (
								<CircularProgress size={20} color="inherit" />
							) : (
								<SendIcon style={{ color: 'white' }} />
							)}
						</Button>
					</Box>
				</Form>
			)}
		</Formik>
	);
};
