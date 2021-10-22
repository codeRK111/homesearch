import * as Yup from 'yup';

import { Box, CircularProgress, Grid } from '@material-ui/core';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { useState } from 'react';
import { ResourceType, useRepositoryAction } from '../../hooks/useAction';

import { Button } from '../UI/Button';
import DateTimePickerComponent from '../Pickers/dateTime';
import FTextField from '../Formik/input';
import { asyncCreatePaymentLink } from '../../API/payment';
import dayjs from 'dayjs';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	linkWrapper: {
		width: 600,
		padding: '1rem',
		background: '#cccccc',
	},
	copyButton: {
		border: 'none',
		background: theme.palette.primary.main,
		color: '#ffffff',
		cursor: 'pointer',
	},
}));

export interface ICreatePaymentLinkData {
	amount: string;
	name: string;
	phone: string;
	notes: string;
	expiryDate: Date | null;
}

interface IAddLeadStrategyForm {
	onSuccess?: () => void;
}

const CreatePaymentLinkForm: React.FC<IAddLeadStrategyForm> = ({
	onSuccess,
}) => {
	const { linkWrapper, copyButton } = useStyles();
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
		expiryDate: dayjs().add(1, 'h').toDate(),
	};

	// State
	const [loading, setLoading] = useState(false);
	const [isCopied, setIsCopied] = useState(false);
	const [link, setLink] = useState('');

	// Callbacks
	const onSubmit = async (
		values: ICreatePaymentLinkData,
		helpers: FormikHelpers<ICreatePaymentLinkData>
	) => {
		try {
			setLoading(true);
			const response = await asyncCreatePaymentLink(values);
			setLink(response);
			setLoading(false);
			setSnackbar({
				open: true,
				message: 'Link created successfully',
				severity: 'success',
			});
			helpers.resetForm();
			setIsCopied(false);
		} catch (err: any) {
			setLoading(false);
			setIsCopied(false);
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
				{({ values, setFieldValue }) => (
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
								<DateTimePickerComponent
									label="Choose expiry date and time"
									handleDateChange={(date: Date | null) => {
										setFieldValue('expiryDate', date);
									}}
									date={values.expiryDate}
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
			{link && (
				<Box display="flex" mt="1rem">
					<Box className={linkWrapper}>{link}</Box>
					<button
						className={copyButton}
						onClick={() => {
							navigator.clipboard.writeText(link);
							setIsCopied(true);
						}}
					>
						{isCopied ? 'Copied!' : 'Copy'}
					</button>
				</Box>
			)}
		</div>
	);
};

export default CreatePaymentLinkForm;
